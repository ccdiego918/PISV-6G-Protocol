<h1 align="center">PISV: Protocolo de Integridad Semántica Verificable para 6G</h1> <p align="center"> <img src="https://img.shields.io/badge/Python-3.8%2B-blue"/> <img src="https://img.shields.io/badge/PyTorch-Deep%20Learning-red"/> <img src="https://img.shields.io/badge/License-MIT-green"/> </p>


Este repositorio contiene la implementación oficial y el código de simulación del paper **"Protocolo de Integridad Semántica Verificable (PISV): Un Enfoque Basado en Deep Learning para Comunicaciones 6G Confiables"**.

## Descripción
El proyecto implementa un sistema de transmisión semántica (**Deep Joint Source-Channel Coding**) utilizando PyTorch, integrado con un mecanismo de verificación basado en **Hashing Perceptual** para detectar y mitigar alucinaciones semánticas en canales ruidosos.

El protocolo aborda el problema crítico de la "Alucinación Semántica" en redes 6G, donde la IA generativa reconstruye información plausible pero semánticamente incorrecta debido a la degradación de la señal o ataques adversarios.
## Contenido
- **Simulación JSCC:** Entrenamiento de Autoencoder Convolucional.
- **Protocolo PISV:** Implementación de verificación de integridad semántica.
- **Pruebas de Estrés:** Scripts para generar curvas de Robustez vs. Seguridad.
- **Análisis Adversario:** Evaluación de resistencia ante ataques FGSM.



## Requisitos
- Python 3.8+
- PyTorch
- ImageHash
- Matplotlib

## Autor
Diego Acevedo Estudiante de Ingeniería Civil Telemática Universidad Técnica Federico Santa María (UTFSM)

## Referencia

Si utilizas este código o protocolo en tu investigación, por favor cita el repositorio original:

```bibtex
@article{PISV2025,
  title={Protocolo de Integridad Semántica Verificable (PISV): Un Enfoque Basado en Deep Learning para Comunicaciones 6G Confiables},
  author={Acevedo, Diego},
  journal={Universidad Técnica Federico Santa María},
  year={2025},
  url={https://github.com/ccdiego918/PISV-6G-Protocol}
}
