# Demo PISV para MuestraTech

Demo estática con inferencia real en el navegador. Conserva la arquitectura y los pesos de la demo local del proyecto original (commit 1644d06). GitHub Pages sirve los archivos; ONNX Runtime Web ejecuta el modelo en el dispositivo del visitante. No necesita el Mac del autor, un túnel ni un servidor Python.

## Uso

Elegir una imagen de la galería, una sustitución, el ruido y el umbral. Transmitir ejecuta encoder, ruido gaussiano y decoder. Cambiar el umbral recalcula la decisión sobre la misma reconstrucción. Cada transmisión obtiene una nueva muestra de ruido. La sección de detalles muestra las 64 comparaciones de dHash.

## Ejemplos y límites

Diez imágenes reales de CIFAR-10 test, seleccionadas manualmente por reconocimiento visual del original: 10, 105, 75, 103, 159, 16, 7, 60, 55 y 47. No se seleccionaron por su aceptación y no constituyen una muestra de evaluación. Todas conservan 32 × 32 píxeles. El modelo no se ha reentrenado ni se han retocado las reconstrucciones.

Esta demo representa el verificador original dHash/Hamming, sin HMAC. La similitud perceptual no garantiza el significado ni autentica al emisor. El canal es una simulación, no una red 6G física.

## Validación

- Modelo ONNX frente a PyTorch: 30 combinaciones de imagen y ruido; error absoluto máximo inferior a 0,000001.
- dHash JavaScript frente a Pillow/ImageHash: 160 casos idénticos.
- Comprobación numérica en navegador: abrir `?verify=1` y desplegar los detalles.
- Arquitectura, índices, SHA-256 y entrenamiento en `provenance.json`.

El ruido aleatorio se genera en JavaScript y no comparte semilla con PyTorch. La comparación entre motores utiliza el mismo tensor de ruido suministrado explícitamente.

## Alojamiento

GitHub Settings → Pages → Deploy from a branch → main → /docs. Los recursos se cargan con rutas relativas, sin CDN ni API externa. La descarga inicial del motor y del modelo ronda los 15 MB.

ONNX Runtime Web 1.30.0 se distribuye bajo su licencia incluida en ONNXRUNTIME-LICENSE.txt. CIFAR-10: Alex Krizhevsky, Vinod Nair y Geoffrey Hinton, https://www.cs.toronto.edu/~kriz/cifar.html.
