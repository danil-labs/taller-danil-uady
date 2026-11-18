# Procedencia, alcance y diferencias

Integración local solicitada por Mauricio el 2026-11-18: aprovechar PaperOrchestra
como método de escritura y añadir Typst. Esta carpeta contiene instrucciones
redactadas para Danil; **no es una copia ni una ejecución del framework original**,
ni una validación de los resultados científicos publicados por sus autores.

## Fuentes inspeccionadas

- [Google Research: paper-orchestra](https://github.com/google-research/paper-orchestra/tree/d9bae997e793a015ed38bb1605be9eb58c00284f),
  commit `d9bae997e793a015ed38bb1605be9eb58c00284f`.
  Licencia de ese código: Apache-2.0. Se leyeron `README.md`,
  `paper_writing_cli.py`, `requirements.txt`, `methods/paper_writer.py` y
  `methods/paper_writer_with_plotting.py`. Es un programa Python con SDKs y
  configuración de proveedores, cinco clases de agentes y salida LaTeX.
- [Ar9av: PaperOrchestra](https://github.com/Ar9av/PaperOrchestra/tree/6a319132932ee031e2d759b0f7f5075cf77bd1cf),
  commit `6a319132932ee031e2d759b0f7f5075cf77bd1cf`.
  Su licencia declara MIT y separa los extractos de prompts del paper. Se
  inspeccionaron el coordinador, contratos de entregas, controles de escritura,
  validación de entradas y ejemplos. Es una adaptación de la comunidad en skills;
  no se confunde con la implementación de Google.
- Skill `typst` de Danil, disponible en el entorno de los agentes: proyecto
  modular, compilador privado, caché de paquetes y bibliografía. Es la autoridad
  para resolver la instalación; aquí no se guarda una ruta personal.

Referencia del método: Song et al., *PaperOrchestra: A Multi-Agent Framework
for Automated AI Research Paper Writing*, arXiv:2604.05018,
[página del paper](https://arxiv.org/abs/2604.05018).

No se copian fuentes Python, prompts literales, datos de ejemplo ni evaluadores
del framework o de la adaptación. El método se describe con redacción propia;
los enlaces fijan la atribución y permiten comparar futuras revisiones.

## Qué incorpora Danil

- Cinco funciones de autoría y un rol adicional de prototipos y simulación,
  con entregas y un escritor por archivo.
- Bibliografía verificable y afirmaciones ligadas a evidencias.
- Figuras científicas derivadas de datos e ilustraciones conceptuales opcionales
  con `anatomy`, con recurso estático para el documento.
- Typst nativo para documentos nuevos sin restricción, preservación del formato
  existente y alternativa LaTeX cuando se requiera.
- Separación entre revisión factual, compilación y revisión visual.

## Qué no instala ni acredita

No ejecuta `setup.sh` de terceros, no crea symlinks globales, no busca historiales
privados de agentes, no instala un segundo runtime ni requiere nuevos SDKs de LLM.
El agente anfitrión sigue necesitando sus herramientas y acceso a fuentes; las
funciones de búsqueda no se convierten por ello en gratuitas o ilimitadas.

No se incorporan benchmarks/autoraters ni se trasladan sus puntuaciones a Typst.
La plantilla incluida es una estructura básica con marcadores, no una plantilla
editorial aprobada. La incorporación de la skill no acredita una ejecución de
investigación completa ni resuelve la instalación Typst de contenedores beta.
