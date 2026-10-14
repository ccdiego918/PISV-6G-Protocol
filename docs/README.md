# Demo PISV para MuestraTech

Demo estática con inferencia real en el navegador. Conserva la arquitectura y los pesos de la demo local del proyecto original (commit 1644d06). GitHub Pages sirve los archivos; ONNX Runtime Web ejecuta el modelo en el dispositivo del visitante. No necesita el Mac del autor, un túnel ni un servidor Python.

## Uso

Elegir una imagen de la galería, una sustitución, el ruido y el umbral. Transmitir ejecuta encoder, ruido gaussiano y decoder. Cambiar el umbral recalcula la decisión sobre la misma reconstrucción. Cada transmisión obtiene una nueva muestra de ruido. El recorrido interactivo muestra datos reales de cada etapa: imagen, encoder, canal, decoder, dHash, autenticación, Hamming y decisión. Las comparaciones de bits se muestran dentro del paso Hamming.

## Ejemplos y límites

Diez imágenes reales de CIFAR-10 test, seleccionadas manualmente por reconocimiento visual del original: 10, 105, 75, 103, 159, 16, 7, 60, 55 y 47. No se seleccionaron por su aceptación y no constituyen una muestra de evaluación. Todas conservan 32 × 32 píxeles. El modelo no se ha reentrenado ni se han retocado las reconstrucciones.

La demo añade HMAC-SHA256 a la referencia (versión, algoritmo, identificador, nonce y dHash), junto al verificador perceptual dHash/Hamming. Permite probar una referencia intacta, alterada o repetida. Si la validación falla, no calcula Hamming. La clave temporal se genera con Web Crypto, no se exporta y se comparte entre los dos roles simulados en la misma página. La clave y el registro de nonces se reinician al recargar. Es una demostración de los mecanismos, no una separación segura entre emisor y receptor. La similitud perceptual no garantiza el significado. El canal está simulado.

## Validación

- Modelo ONNX frente a PyTorch: 30 combinaciones de imagen y ruido; error absoluto máximo inferior a 0,000001.
- dHash JavaScript frente a Pillow/ImageHash: 160 casos idénticos.
- Comprobación numérica en navegador: abrir `?verify=1` y desplegar los detalles.
- HMAC: referencia intacta, alteración, repetición, clave incorrecta, contexto incorrecto, formato inválido y comparación con una implementación independiente.
- Salidas intermedias del modelo: se conserva la reconstrucción y se verifica que la representación recibida es la original más el ruido.
- Arquitectura, índices, SHA-256 y entrenamiento en `provenance.json`.

El ruido aleatorio se genera en JavaScript y no comparte semilla con PyTorch. La comparación entre motores utiliza el mismo tensor de ruido suministrado explícitamente.

## Alojamiento

GitHub Settings → Pages → Deploy from a branch → main → /docs. Los recursos se cargan con rutas relativas, sin CDN ni API externa. La descarga inicial del motor y del modelo ronda los 15 MB.

ONNX Runtime Web 1.30.0 se distribuye bajo su licencia incluida en ONNXRUNTIME-LICENSE.txt. CIFAR-10: Alex Krizhevsky, Vinod Nair y Geoffrey Hinton, https://www.cs.toronto.edu/~kriz/cifar.html.
