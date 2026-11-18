# Laboratorio de investigación con agentes en Danil

Desarrolla tu propia idea con un equipo de agentes: desde una pregunta inicial
hasta una exploración interactiva, una síntesis de fuentes o un documento con
evidencias. Tú eliges el tema, el alcance y el resultado; los agentes ayudan a
buscar, programar, visualizar, escribir y revisar.

## Qué puedes hacer

| Quiero… | Podemos trabajar en… |
|---|---|
| Explorar una idea | Preguntas concretas, comparación de enfoques y una primera prueba pequeña |
| Entender qué se sabe | Búsqueda bibliográfica, síntesis de antecedentes y referencias verificadas |
| Probar un modelo | Simulaciones reproducibles, notebooks y prototipos con controles interactivos |
| Explicar un mecanismo o resultado | Gráficos, esquemas conceptuales, vídeos y presentaciones propias |
| Preparar un documento | Síntesis, informes o papers con figuras, fuentes y resultados trazables |
| Revisar mi trabajo | Evaluación de métodos, afirmaciones, figuras, evidencia y limitaciones |

Puedes empezar sin datos ni una pregunta cerrada. Los ejemplos de logística,
autómatas celulares, pila de arena e incendios sirven para aprender y adaptar;
tu proyecto puede tratar otro tema. El método y las herramientas se eligen según
lo que quieras explorar. Una ilustración explica un mecanismo; su validez necesita
evidencia independiente.

## Empieza con tu proyecto

Abre una tarea en Danil con el handler **coordinador** y cuenta lo que quieres hacer.
No necesitas aprender el catálogo de agentes o skills antes de empezar. Puedes pegar:

> Quiero explorar [mi tema]. Tengo [datos, notas o solo una idea]. Ayúdame a
> concretar una pregunta y una primera prueba. Activa los especialistas necesarios
> y muéstrame los resultados en el chat, con lo que se comprobó y lo que falta.
> Elegiremos la salida que me sirva: un prototipo, una síntesis, un informe o un paper.

También puedes pedir algo concreto: «Ayúdame a comparar estas explicaciones»,
«Construye un prototipo para explorar este mecanismo» o «Revisa si mis conclusiones
están respaldadas». El coordinador adapta el recorrido a lo que ya tienes:
**idea → pregunta → prueba mínima → decisión → salida elegida → revisión**.

Recibes los prototipos interactivos y las vistas previas de figuras y documentos
en el chat; las fuentes quedan en el proyecto para reproducir el trabajo.
Tú decides los cambios de rumbo y cuándo la entrega satisface tu objetivo.
Consulta el [método y criterios de avance](.agents/skills/paper-orchestra/references/flujo-guiado.md).

## Agentes y skills incluidos

Puedes usar estas mismas declaraciones y skills con el proveedor que elijas en
Danil. Los roles no fijan modelo ni proveedor: heredan los permisos de tu tarea.
Sus responsabilidades son instrucciones de trabajo; por ejemplo, el revisor
no debe editar archivos, pero el manifiesto no impone un sandbox de solo lectura.
Las herramientas disponibles y la autenticación dependen de tu cuenta.


Los **agentes** son especialistas con responsabilidades y límites. Las **skills**
son los métodos que consultan para realizar el trabajo; no son servicios que se
ejecuten solos ni garantizan que una herramienta esté instalada en tu cuenta.

- **Seis agentes:** coordinador, bibliotecario, simulador, ilustrador, redactor y revisor.
- **Cinco skills originales y catorce adicionales:** métodos de investigación,
  búsqueda y citas, simulación reproducible, escritura, revisión y visualización;
  también Anatomy, Remotion y Manim Slides para explicaciones y comunicación visual.
- **Scripts y dos notebooks** con ejemplos de sistemas dinámicos y autómatas celulares.
- **Una plantilla de paper en Typst** con una figura de ejemplo y marcadores «Tu turno».
- **Una presentación de consulta opcional** con animaciones y cuatro simulaciones.

El [catálogo de skills y fuentes](.agents/skills/paper-orchestra/references/fleet.md)
explica los métodos y su procedencia. Las [reglas del laboratorio](AGENTS.md)
fijan reproducibilidad, privacidad, verificación de citas y responsabilidades.
Las herramientas de simulación, compilación y vídeo requieren su entorno;
el agente debe comprobarlo antes de prometer una ejecución.

## Qué hay en cada carpeta

```
AGENTS.md              las reglas del laboratorio y quién es dueño de qué
.agents/agents/        los seis agentes (formato agent-creator v1)
.agents/skills/        skills adicionales; licencia, fuente y adaptación en cada carpeta
skills/                los métodos que usan los agentes
simulaciones/          scripts reproducibles; cada uno escribe en figuras/ y resultados/
notebooks/             01_logistica_y_caos.ipynb y 02_automatas_celulares.ipynb (para Colab)
figuras/               figuras generadas (no se versionan: se regeneran)
resultados/            números en JSON y CSV, con semillas y parámetros
paper/                 main.typ, referencias.bib y figuras/ del paper
prototipos/            fuentes de modelos explicativos y exploraciones interactivas
trabajo/               encargo, decisiones y estado para retomar tu proyecto
presentacion/          presentación de consulta y sus recursos originales
requirements.txt       dependencias de Python
```

## 1. Abrirlo en Danil

1. Clona el repositorio (o descárgalo como ZIP desde GitHub: **Code → Download ZIP**):
   ```sh
   git clone https://github.com/danil-labs/taller-danil-uady
   ```
   Si quieres guardar tu propio historial, haz un *fork* o crea un repositorio vacío tuyo y súbelo ahí.
2. Abre Danil y añade la carpeta del kit a tu espacio de trabajo.
3. Crea una tarea sobre esa carpeta con el agente de IA que uses (Claude, Codex u otro). Danil
   lee los agentes de `.agents/agents/` y las reglas de `AGENTS.md`.
4. Primera petición, para comprobar que todo está en su sitio:
   > Muéstrame qué puedo hacer con este laboratorio y ayúdame a empezar con mi idea.

**Preparación automática desde el primer mensaje.** El agente debe comprobar
Typst y su plugin de Danil antes de cerrar la bienvenida, instalar lo que falte
y activar el plugin en tu espacio, sin esperar a que pidas un paper. Te indica
la versión y el resultado comprobado. Si el entorno bloquea una operación,
te explica qué falta; una instrucción en el repositorio no sustituye los permisos
de tu cuenta. El [procedimiento obligatorio](AGENTS.md#verificación-de-typst)
está en las reglas del proyecto.

Para correr las simulaciones en tu computadora necesitas Python 3.10 o posterior.
Los siguientes comandos son los del kit; su ejecución numérica y la de los
notebooks sigue pendiente de comprobar en este entorno. Si tu sistema solo
reconoce `python3`, úsalo en lugar de `python`:

```sh
python -m pip install -r requirements.txt
python simulaciones/correr_todo.py --rapido     # comprueba que todo corre (~3 min)
```

## 2. Trabajar con los agentes

Cada agente tiene un trabajo y una frontera. Para encargar trabajo, abre una tarea con su handler o pide al coordinador que la active.
Una mención `@nombre` identifica el rol, pero no crea una tarea. Los agentes se
pasan el trabajo entre ellos con el mismo mecanismo, y cada relevo lleva qué se entrega, dónde está
y qué quedó abierto.

| Agente | Le pides | No hace |
|---|---|---|
| `@coordinador` | Delimitar tu idea, elegir una primera prueba, repartir tareas y acompañar la salida elegida | Redactar el paper o inventar evidencias |
| `@bibliotecario` | Buscar y verificar referencias; mantener `paper/referencias.bib` | Escribir el paper |
| `@simulador` | Simulaciones, notebooks, prototipos, vídeos y números reproducibles | Escribir el paper o el `.bib` |
| `@ilustrador` | Preparar figuras finales y esquemas conceptuales | Cambiar resultados para que encajen con una conclusión |
| `@redactor` | Escribir y compilar secciones del paper | Inventar números o citas |
| `@revisor` | Revisar el paper contra figuras, datos y referencias | Corregir nada: solo lee |

Ejemplos de peticiones:

- «@bibliotecario busca y verifica 5 referencias sobre criticalidad autoorganizada en la pila de
  arena, para sostener la primera frase de la introducción.»
- «@simulador corre la logística y entrega la figura de bifurcación a @ilustrador para prepararla para el paper.»
- «@coordinador organiza un paper en Typst con estos resultados y fuentes; reparte la bibliografía, figuras, texto y revisión.»
- «@simulador prepara un prototipo Anatomy y un vídeo explicativo con Remotion; distingue modelo y resultados observados.»
- «@simulador corre la pila de arena con L = 32, 64 y 128 y dime si se puede afirmar una ley de
  potencias.»
- «@simulador repite el barrido de las 256 reglas con ancho 257 y dime qué cambia.»
- «@redactor escribe la sección de resultados con la figura de tamaño finito y los números de
  `resultados/pila_de_arena.json`.»
- «@revisor revisa la sección de resultados.»

Ejemplo de recorrido para una pregunta ya delimitada (duración por medir):

1. **Pregunta** (tú): escoge algo pequeño y verificable. Ideas: ¿cambia δ con otro mapa? ¿qué
   reglas elementales son sensibles al ancho? ¿el corte del incendio crece con θ?
2. **Referencias** (`@bibliotecario`) y **simulación** (`@simulador`), en paralelo.
3. **Redacción** (`@redactor`), solo con lo que quedó en el repositorio.
4. **Revisión** (`@revisor`) y correcciones de cada dueño, hasta que el dictamen sea «listo».
5. **Tu revisión**: abre las figuras, comprueba dos o tres números contra `resultados/`, abre los DOI.
   El agente escribe el borrador; el criterio es tuyo.

## 3. Compilar el paper

El paper está en `paper/main.typ`. Desde la raíz del kit:

```sh
typst compile --root paper paper/main.typ paper/main.pdf
```

Danil trae Typst; si no lo tienes en la terminal, instálalo desde https://typst.app o sube la
carpeta `paper/` a la web de Typst y compila ahí. También puedes pedírselo a `@redactor`. Los
recuadros amarillos «Tu turno» marcan lo que falta: un paper terminado no tiene ninguno.

Para llevar una figura al paper:

```sh
python simulaciones/copiar_al_paper.py arena_tamano_finito.png
```

La copia queda en `paper/figuras/` y su script de origen, en `paper/figuras/PROCEDENCIA.md`.

## 4. Notebooks en Google Colab desde una carpeta de Drive

Los notebooks corren de principio a fin en Colab sin instalar nada a mano (instalan `powerlaw` si
falta; numpy, matplotlib, scipy y numba ya vienen en Colab).

1. Sube la carpeta `entre-el-orden-y-el-caos` completa a **Mi unidad** de Google Drive (arrástrala a
   drive.google.com).
2. En Drive, entra a `entre-el-orden-y-el-caos/notebooks/`, haz clic derecho en `01_logistica_y_caos.ipynb` →
   **Abrir con** → **Google Colaboratory**. (Si no aparece, en el mismo menú elige «Conectar más
   aplicaciones» y añade Colaboratory.)
3. **Entorno de ejecución → Ejecutar todo.** La primera celda pide permiso para montar tu Drive:
   acéptalo. Las figuras se guardan en `entre-el-orden-y-el-caos/figuras/` y los números en
   `entre-el-orden-y-el-caos/resultados/` de tu Drive.
4. Si pusiste la carpeta en otro lugar, cambia la ruta `RAIZ` en la primera celda de código.
5. Opcional: **Entorno de ejecución → Cambiar tipo de entorno → GPU**. El notebook 01 usa la GPU si
   hay CuPy y, si no, NumPy; el resultado es el mismo.

Para traer a tu computadora lo que hiciste en Colab, descarga las figuras o los JSON desde Drive a
las carpetas `figuras/` y `resultados/` del kit. Si cambiaste el código de un notebook, descarga el
`.ipynb` (Archivo → Descargar) y reemplaza el del kit. Tus datos privados se quedan en tu Drive: no
los copies al repositorio.

## 5. Validar los agentes

Si cambias un agente, valídalo con el validador de agent-creator:

```sh
git clone https://github.com/danil-labs/agent-creator
python agent-creator/scripts/validate_agent.py --root . --strict
```

## Presentación de consulta (opcional)

Puedes consultar *Entre el orden y el caos* para explorar los ejemplos incluidos.
La versión actual usa archivos de `presentacion/entre-el-orden-y-el-caos_assets/`:
conserva esa carpeta junto al HTML. Para abrirla, desde la raíz ejecuta:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Abre [la presentación en tu navegador](http://127.0.0.1:8765/presentacion/entre-el-orden-y-el-caos.html).
Avanza y retrocede con las flechas. Las simulaciones de Mandelbrot, autómatas,
pila de arena y bosque se activan al llegar a su diapositiva. Las animaciones
se reproducen a 3×. Para detener el servidor, presiona Ctrl+C en la terminal.
El enlace local solo funciona en tu computadora.

También está la [versión PDF estática](presentacion/entre-el-orden-y-el-caos-estatica.pdf),
sin animaciones ni simulaciones interactivas. Consulta los [créditos de imágenes](presentacion/CREDITOS.md).

## Referencias de los temas de ejemplo

Verificadas, en [`paper/referencias.bib`](paper/referencias.bib): May (1976) *Nature* 261:459, la
aplicación logística; Wolfram (1983) *Rev. Mod. Phys.* 55:601, los autómatas celulares; Bak, Tang y
Wiesenfeld (1987) *Phys. Rev. Lett.* 59:381, la pila de arena. El método de ajuste de leyes de
potencias es de Clauset, Shalizi y Newman (2009) *SIAM Review* 51:661; antes de citarlo en tu
paper, pídele a `@bibliotecario` que lo verifique.

## Procedencia y licencia

Los ejemplos y la presentación parten del material *Entre el orden y el caos*
del CICY. Se conservan como recursos para explorar y desarrollar proyectos propios.

El material propio del kit conserva la licencia MIT: ver [`LICENSE`](LICENSE).
Las skills de terceros conservan sus licencias y avisos en cada carpeta:
K-Dense y Anatomy usan MIT; las skills de Anthropic usan Apache-2.0.
El [catálogo de skills](.agents/skills/paper-orchestra/references/fleet.md)
enlaza sus fuentes y versiones. La guía de Remotion es local y no redistribuye
el pack oficial sin licencia declarada.
