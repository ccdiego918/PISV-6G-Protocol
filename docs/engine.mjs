// dHash de 64 bits: RGB -> gris -> Lanczos 9x8 -> comparaciones horizontales.
// Coeficientes fijos para igualar el redimensionado entero de Pillow.
export function dhashStages(rgb, coeff) {
 const gray=new Uint8Array(1024),horizontal=new Uint8Array(32*9),small=new Uint8Array(72);
 for(let i=0;i<1024;i++)gray[i]=(19595*rgb[i*3]+38470*rgb[i*3+1]+7471*rgb[i*3+2]+32768)>>16;
 const clip=v=>Math.max(0,Math.min(255,Math.floor(v/4194304)));
 for(let y=0;y<32;y++)for(let x=0;x<9;x++){
  const c=coeff.x[x];let sum=2097152;
  for(let k=0;k<c.weights.length;k++)sum+=gray[y*32+c.start+k]*c.weights[k];
  horizontal[y*9+x]=clip(sum);
 }
 for(let y=0;y<8;y++)for(let x=0;x<9;x++){
  const c=coeff.y[y];let sum=2097152;
  for(let k=0;k<c.weights.length;k++)sum+=horizontal[(c.start+k)*9+x]*c.weights[k];
  small[y*9+x]=clip(sum);
 }
 const bits=[];for(let y=0;y<8;y++)for(let x=0;x<8;x++)bits.push(+(small[y*9+x+1]>small[y*9+x]));
 return {gray,small,bits};
}
export function hex(bits){let s='';for(let i=0;i<64;i+=4)s+=parseInt(bits.slice(i,i+4).join(''),2).toString(16);return s;}
export function hamming(a,b){return a.reduce((n,v,i)=>n+(v!==b[i]),0);}
export function pixelsToTensor(rgb){const out=new Float32Array(3072);for(let i=0;i<1024;i++)for(let c=0;c<3;c++)out[c*1024+i]=rgb[i*3+c]/255;return out;}
export function tensorToPixels(x){const out=new Uint8Array(3072);for(let i=0;i<1024;i++)for(let c=0;c<3;c++)out[i*3+c]=Math.max(0,Math.min(255,Math.floor(Math.fround(x[c*1024+i]*255))));return out;}
export function gaussianNoise(sigma,random=Math.random){const out=new Float32Array(2048);for(let i=0;i<out.length;i+=2){const u=1-random(),v=random(),r=Math.sqrt(-2*Math.log(u))*sigma;out[i]=r*Math.cos(2*Math.PI*v);out[i+1]=r*Math.sin(2*Math.PI*v);}return out;}

export function dhash(rgb,coeff){return dhashStages(rgb,coeff).bits;}
