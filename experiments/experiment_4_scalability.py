import time
import hashlib
import imagehash
import numpy as np
import requests
from io import BytesIO
from PIL import Image
from skimage.metrics import structural_similarity as ssim

print("COMPARATIVA DE BASELINES")

# Cargar Imagen
url = "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=3840"
response = requests.get(url)
img_pil = Image.open(BytesIO(response.content))
img_np = np.array(img_pil)
print(f"Imagen cargada: {img_pil.size}")

# SHA-256
t0 = time.time()
sha = hashlib.sha256(img_pil.tobytes()).hexdigest()
t_sha = (time.time() - t0) * 1000
print(f"1. SHA-256: {t_sha:.2f} ms")

# SSIM

t0 = time.time()

_ = ssim(img_np, img_np, channel_axis=2) 
t_ssim = (time.time() - t0) * 1000
print(f"2. SSIM:    {t_ssim:.2f} ms")

# PISV
t0 = time.time()
_ = imagehash.dhash(img_pil)
t_pisv = (time.time() - t0) * 1000
print(f"3. PISV:    {t_pisv:.2f} ms")

print("-" * 30)
print(f"SPEEDUP vs SSIM: {t_ssim / t_pisv:.1f}x más rápido")