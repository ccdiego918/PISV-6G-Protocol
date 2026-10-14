// HMAC-SHA256 over the same canonical fields as the local PISV verifier.
const encoder=new TextEncoder();
const toHex=bytes=>Array.from(bytes,x=>x.toString(16).padStart(2,'0')).join('');
export const referenceMessage=data=>encoder.encode(JSON.stringify(Object.fromEntries(Object.keys(data).sort().map(k=>[k,data[k]]))));
export const createSessionKey=()=>crypto.subtle.generateKey({name:'HMAC',hash:'SHA-256',length:256},false,['sign','verify']);
export async function createReference(dhash,imageId,key){
 const data={version:'PISV-1.1',algoritmo:'dhash64',image_id:imageId,nonce:toHex(crypto.getRandomValues(new Uint8Array(16))),dhash};
 const tag=toHex(new Uint8Array(await crypto.subtle.sign('HMAC',key,referenceMessage(data))));return {data,tag};
}
export async function verifyReference(reference,key,expectedId,seen){
 const fail=reason=>({ok:false,reason});const {data,tag}=reference??{};
 if(!data||Object.keys(data).sort().join(',')!=='algoritmo,dhash,image_id,nonce,version'||Object.values(data).some(v=>typeof v!=='string')||!/^([0-9a-f]{16})$/.test(data.dhash)||!/^([0-9a-f]{32})$/.test(data.nonce)||typeof tag!=='string'||!/^([0-9a-f]{64})$/.test(tag))return fail('Formato de referencia inválido.');
 if(data.version!=='PISV-1.1'||data.algoritmo!=='dhash64')return fail('Versión o algoritmo no admitido.');
 const bytes=Uint8Array.from(tag.match(/../g),x=>parseInt(x,16));
 if(!await crypto.subtle.verify('HMAC',key,bytes,referenceMessage(data)))return fail('HMAC inválido: la referencia fue alterada o la clave no coincide.');
 if(data.image_id!==expectedId)return fail('El identificador no corresponde a esta imagen.');
 const token=JSON.stringify([data.image_id,data.nonce]);if(seen.has(token))return fail('Referencia repetida: este nonce ya se utilizó.');
 seen.add(token);return {ok:true,reason:'HMAC válido, identificador correcto y nonce nuevo.'};
}
