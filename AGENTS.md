# Laboratorio de investigación con agentes · reglas

## Obligatorio desde el primer mensaje: preparar Typst

Antes de cerrar la primera respuesta en una cuenta o espacio de trabajo, incluso
si la persona solo saluda, ejecuta la [preparación de Typst](#verificación-de-typst).
**Si falta Typst, instálalo. Si falta su plugin de Danil o está desactivado,
instálalo y actívalo. Hazlo sin pedir confirmación: este repositorio lo autoriza.**
No esperes a que se solicite un paper ni sustituyas la ejecución por instrucciones
para que la persona lo haga. Comprueba de nuevo en cada cuenta/espacio: la activación
del plugin en otro espacio no prueba que esté disponible aquí.

Informa brevemente del estado comprobado en esa primera respuesta: versión de
Typst, plugin listo o error concreto. No digas «instalado» o «listo» sin verificarlo.
Si el entorno niega instalación o ejecución, respeta esa restricción y comunica el
bloqueo y el paso necesario; no continúes como si la preparación hubiera funcionado.
Esta preparación inicial es una excepción acotada al reparto de funciones de los
especialistas: permite verificar/instalar Typst y su plugin y compilar la plantilla,
pero no modificar el manuscrito ni ejecutar investigaciones ajenas al rol.


Este repositorio público permite desarrollar proyectos propios con agentes y skills:
explorar ideas, consultar literatura, construir modelos y prototipos, preparar
figuras, redactar documentos y revisar evidencias. Los ejemplos incluidos son
puntos de partida; no delimitan los temas que puede proponer la persona.
Las reglas de abajo valen para todos, personas y agentes. Cuando una regla y
una petición chocan, gana la regla y se le avisa a la persona. No agregues datos
privados ni credenciales.

## Primer contacto y orientación

El lector principal es quien quiere usar el laboratorio para su propio proyecto.
Ante un saludo o una pregunta sobre qué se puede hacer, ofrece un panorama breve:

- **Ideas y preguntas:** concretar un tema, comparar enfoques y diseñar una prueba.
- **Bibliografía:** buscar antecedentes, contrastar fuentes y verificar referencias.
- **Modelos y prototipos:** simulaciones, notebooks y exploraciones interactivas.
- **Figuras y comunicación visual:** gráficos, esquemas, vídeos y presentaciones propias.
- **Documentos:** síntesis, informes o papers según el objetivo y la evidencia.
- **Revisión:** examinar métodos, afirmaciones, resultados y sus límites.

Explica en una frase que los agentes reparten el trabajo y las skills aportan
métodos. Invita a contar una idea o elegir una salida; no exijas conocer nombres
de agentes, rutas ni herramientas para empezar. Si ya hay una petición concreta,
atiéndela directamente sin repetir el catálogo.
No presentes el proyecto como una herramienta para expositores ni menciones el
taller en la bienvenida. La presentación incluida es material de consulta opcional:
muéstrala cuando la persona quiera verla o necesite un ejemplo. No reduzcas las
capacidades a los ejemplos de caos ni supongas que toda salida será un paper.
Distingue los métodos disponibles de las herramientas comprobadas en esa cuenta;
no prometas ejecución, acceso web ni render de vídeo sin verificar el entorno.

## Portabilidad entre proveedores

Las declaraciones de `.agents/agents/` y los métodos de `skills/` y
`.agents/skills/` se usan con el proveedor que elija la persona. No fijes proveedor,
modelo ni listas de herramientas específicas en los manifiestos. Los agentes
heredan los permisos efectivos de la tarea anfitriona; el repositorio no los amplía.
Los límites de cada función (por ejemplo, el revisor no modifica archivos) son
instrucciones de trabajo, no una garantía técnica de sandbox o filtrado de herramientas.
Conserva esas reglas al cambiar de proveedor. Comprueba qué herramientas ofrece
el entorno y reporta las ausentes; una skill es un método, no una instalación.
No fuerces Claude ni otro proveedor para ejecutar un rol. Si un entorno bloquea
una operación, comunica la causa sin cambiar sus permisos o proveedor por tu cuenta.

## Nombre de la aplicación

La aplicación se llama **Danil**. Usa ese nombre en documentación, ejemplos y
respuestas a la persona. «Terminus» es el nombre anterior; no lo presentes como
nombre actual. Conserva sin modificar los identificadores técnicos heredados
(rutas, esquemas de enlaces o claves) cuando sean necesarios para funcionar.

## Mostrar los resultados

Muestra por defecto los resultados generados en el chat, salvo que la persona
pida explícitamente otro lugar. Publica los prototipos interactivos como
visualizaciones del chat y las imágenes o documentos con su vista previa.
Incluye una explicación breve de qué se puede explorar y sus límites; no
sustituyas el resultado por una ruta, un enlace al servidor o instrucciones para
abrirlo. Conserva también las fuentes reproducibles en su carpeta correspondiente.
La carpeta `.local/` es local: no la añadas a Git ni la subas a GitHub.

## Prototipado rápido

En prototipos exploratorios, prioriza rapidez y aprendizaje sobre perfección.
Entrega primero una versión mínima utilizable en el chat: un mecanismo principal,
controles esenciales y supuestos visibles. Reutiliza ejemplos, componentes y
herramientas disponibles; evita instalaciones, dependencias nuevas, detalles
ornamentales y auditorías extensas que no sean necesarias para probar la idea.
No conviertas una petición de prototipo en un producto terminado.

Acota la primera pasada a unos cinco minutos de trabajo efectivo como objetivo,
no como plazo garantizado. Si el alcance no cabe, simplifícalo y entrega lo que
funciona con límites explícitos; no sigas puliendo en silencio. Comprueba que
carga y que funciona el control principal cuando el entorno lo permita. Declara
las comprobaciones pendientes y conserva las reglas de reproducibilidad y rigor.
Tras mostrar la primera versión, deja las mejoras visuales, casos adicionales y
revisión exhaustiva para una segunda iteración según la respuesta de la persona.
El coordinador incluye esta prioridad en los encargos y muestra cada entrega
utilizable al recibirla; no espera al cierre de todo el trabajo para enseñarla.

## Acompañamiento de proyectos

Ante una idea, acompaña a la persona desde la pregunta hasta la salida elegida.
Lee el [flujo guiado](.agents/skills/paper-orchestra/references/flujo-guiado.md).
El coordinador activa cada especialidad como tarea real con su handler de Danil;
no basta mencionarla ni representar sus funciones en el chat. Paraleliza trabajos
independientes y conserva un escritor por archivo. Registra decisiones, tareas,
versiones y etapa en trabajo/encargo.md. No fuerces una simulación ni un paper.

## Verificación de Typst

El agente ejecuta estos pasos en el primer turno, antes de dar por terminada la
bienvenida. En turnos posteriores reutiliza la verificación de la misma cuenta y
espacio si el entorno no cambió; antes de compilar vuelve a comprobar la versión.

1. **Detectar.** Ejecuta `typst --version`. Si responde `typst 0.15.x` (o posterior), sigue con el paso 4. Si es anterior, actualízalo con el paso 2.
2. **Si falta o es anterior a 0.15, instálalo o actualízalo sin preguntar**, con la versión fijada `0.15.1`:
   - **Linux (x86_64):** descarga el binario oficial a `~/.local/bin`, que ya está en el PATH:
     ```sh
     mkdir -p ~/.local/bin && cd /tmp/opencode 2>/dev/null || cd /tmp
     curl -fsSL -o typst.tar.xz https://github.com/typst/typst/releases/download/v0.15.1/typst-x86_64-unknown-linux-musl.tar.xz
     python3 -c "import tarfile,shutil,os; t=tarfile.open('typst.tar.xz','r:xz'); t.extractall('.'); s=[m for m in t.getnames() if m.endswith('/typst')][0]; d=os.path.expanduser('~/.local/bin/typst'); shutil.copy(s,d); os.chmod(d,0o755)"
     ```
     Usa Python porque `tar -xJ` falla si el sistema no tiene `xz`.
   - **macOS:** `brew install typst`.
   - **Windows:** `winget install --id Typst.Typst -e`.
3. **Verificar la instalación.** Vuelve a ejecutar `typst --version`. Si el comando sigue sin existir, revisa el PATH (en Linux, que `~/.local/bin` esté incluido) y reinicia la terminal. Si la instalación falla, detente y dile a la persona qué error apareció; no compiles con un Typst que no sea el verificado.
4. **Instalar y activar el plugin typst de Danil en este espacio.** Ejecuta `danil plugin check --id typst --json`. Si responde `"ready": true`, continúa. Si falta o no está listo, ejecuta sin preguntar:
   ```sh
   danil plugin install --id typst --json
   danil plugin enable --id typst --json
   danil plugin check --id typst --json
   ```
   Exige `"ready": true` en la comprobación final. No basta con instalar el binario de consola.
   Si `install` falla con `xz: Cannot exec`, crea un `xz` de usuario en `~/.local/bin`
   que use `lzma` de Python (stdin → stdout; `-z` comprime y, sin `-z`, descomprime),
   hazlo ejecutable y reintenta. No uses `sudo`. Si Danil exige autoridad de la
   persona, informa del rechazo y del paso pendiente en Configuración; no eludas el límite.
5. **Comprobar la compilación de la plantilla.** Desde la raíz:
   ```sh
   typst compile --root paper paper/main.typ paper/main.pdf
   ```
   Si falla, conserva el error para el redactor: es un problema del paper y no
   invalida una instalación que ya quedó verificada. No corrijas el manuscrito
   como parte de la preparación inicial.

El PDF es un artefacto que se regenera; no se versiona.

## Comandos

Desde la raíz del repositorio (Python 3.10 o posterior):

```sh
python -m pip install -r requirements.txt          # una vez
python simulaciones/correr_todo.py --rapido        # comprobar que todo corre (~3 min)
python simulaciones/correr_todo.py                 # resultados para el paper (~3 min)
python simulaciones/logistica.py                   # o un script suelto
python simulaciones/copiar_al_paper.py logistica_bifurcacion.png
typst compile --root paper paper/main.typ paper/main.pdf
```

Los notebooks de `notebooks/` corren de principio a fin en Google Colab o en local
(«Ejecutar todo»). Los agentes se validan con el validador de agent-creator:
`python <agent-creator>/scripts/validate_agent.py --root . --strict`.

## Reglas

1. **Reproducibilidad.** Toda figura y todo número sale de un script de `simulaciones/` o de un
   notebook de `notebooks/` que lo regenera con un comando. Todo azar tiene semilla fija, escrita
   como constante y guardada en el JSON de resultados. Rutas relativas a la raíz, nunca absolutas.
   Método: `skills/simulacion-reproducible/SKILL.md`.
2. **Ninguna referencia sin verificar.** Una cita entra en `paper/referencias.bib` solo si su DOI
   resuelve, sus metadatos coinciden con los del editor y sostiene la frase donde se cita. Nadie
   cita de memoria, ni personas ni agentes. Método: `skills/verificar-referencia/SKILL.md`.
3. **Cada afirmación del paper tiene respaldo en el repositorio**: una figura de `paper/figuras/`,
   un número de `resultados/` (con un comentario que dice archivo y clave) o una cita verificada.
   Sin respaldo, la afirmación no se escribe: se deja un `#pendiente[...]`.
   Método: `skills/paper-typst/SKILL.md`.
4. **Se reporta también lo que no funcionó.** Todo informe de simulación tiene «No funcionó» y
   todo paper tiene «Lo que no funcionó» en la Discusión. Una prueba de sensibilidad que «estorba»
   se reporta, no se esconde.
5. **Una ley de potencias se afirma solo con el método completo**: máxima verosimilitud,
   comparación contra ley con corte y log-normal, y variación del tamaño del sistema.
   Método: `skills/ajuste-ley-de-potencias/SKILL.md`.
6. **No se publican datos privados.** Nada de datos personales, de pacientes, de terceros sin
   permiso, credenciales ni archivos con licencia que no permita redistribuirlos. Los datos
   privados se quedan fuera del repositorio (la carpeta `datos-privados/` está ignorada por git) y
   en Colab se leen desde tu Drive, no se copian aquí.
7. **Un dueño por carpeta.** Cada agente escribe solo en lo suyo (tabla de abajo); para cambiar lo
   de otro, se le pide a su dueño.

## Dónde va cada cosa

| Carpeta o archivo | Qué contiene | Dueño | ¿Se versiona? |
|---|---|---|---|
| `simulaciones/` | Scripts reproducibles; `comun.py` con rutas y estilo | @simulador | sí |
| `notebooks/` | Notebooks para Colab, sin salidas | @simulador | sí |
| `figuras/` | Figuras generadas por los scripts | @simulador | no (se regeneran) |
| `resultados/` | Números en JSON/CSV, con semillas y parámetros | @simulador | sí |
| `paper/main.typ` | El paper | @redactor | sí |
| `paper/figuras/` | Figuras finales y su `PROCEDENCIA.md`, a partir de datos o prototipos | @ilustrador | sí |
| `paper/referencias.bib` | Referencias verificadas | @bibliotecario | sí |
| `skills/` | Los métodos que comparten los agentes | la persona | sí |
| `.agents/agents/` | Los agentes | la persona | sí |
| `.agents/skills/` | Skills adicionales con licencia y procedencia | la persona | sí |
| `prototipos/` | Modelos explicativos, prototipos interactivos y vídeos | @simulador | fuentes sí; cachés no |
| `trabajo/` | Encargo, esquema, afirmaciones y revisión; fuentes y figuras por sus dueños | @coordinador, salvo fuentes/figuras | sí, sin datos privados |
| PDF del paper, entornos, cachés | Se regeneran | — | no |

## Agentes

| Agente | Qué hace | Alcance por instrucciones | Skills |
|---|---|---|---|
| `coordinador` | Guía desde la idea, delimita, reparte y registra revisión; no escribe el manuscrito | edita, delega y ejecuta CLI de coordinación | `paper-orchestra`, `scientific-brainstorming`, `doc-coauthoring` |
| `bibliotecario` | Busca, verifica y mantiene `paper/referencias.bib` | edita y usa la web | `verificar-referencia`, `literature-review`, `citation-management`, `paper-orchestra` |
| `simulador` | Modelos, notebooks, resultados, prototipos, vídeos y presentaciones solicitadas | edita y ejecuta | métodos originales, `anatomy`, `frontend-design`, `simulation-prototyping`, `remotion-video`, `manim-slides`, `paper-orchestra` |
| `ilustrador` | Prepara figuras finales estáticas y conceptuales con procedencia | edita y ejecuta | `figura-para-paper`, `scientific-visualization`, `anatomy`, `paper-orchestra` |
| `redactor` | Escribe y compila el paper; Typst principal, LaTeX cuando se requiera | edita y ejecuta | `paper-typst`, `figura-para-paper`, `scientific-writing`, `paper-orchestra` |
| `revisor` | Contrasta afirmaciones y emite dictamen en la respuesta | lee y consulta la web; no modifica archivos ni ejecuta scripts de investigación | métodos originales, `peer-review`, `scientific-critical-thinking`, `scientific-visualization`, `paper-orchestra` |

Los agentes siguen la especificación v1 de agent-creator
(https://github.com/danil-labs/agent-creator). Sus flujos y relevos están en cada
`.agents/agents/<nombre>/agent.md`; el flujo habitual es
coordinador → simulador y bibliotecario en paralelo → ilustrador → redactor →
revisor → de vuelta al dueño de cada observación, con registro del coordinador.
El paper lo da por terminado la persona, no un agente.

La ampliación conserva las skills originales de `skills/`. Las nuevas viven en
`.agents/skills/`; sus recomendaciones opcionales no amplían permisos ni sustituyen
las reglas del kit. El simulador entrega datos y gráficos de trabajo en `figuras/`;
el ilustrador prepara `paper/figuras/` y usa `simulaciones/copiar_al_paper.py` para
copias numéricas. El redactor conserva el principal existente; en documentos
nuevos separa principal y secciones. No se publica ni se envía un documento por
crear un borrador. Remotion requiere su entorno cuando se pida vídeo; no se
instala automáticamente al leer una skill.

[Catálogo de skills y fuentes](.agents/skills/paper-orchestra/references/fleet.md).

## Presentación de consulta

La presentación *Entre el orden y el caos* se conserva en `presentacion/` para
quien quiera explorar sus ejemplos. El procedimiento vigente para abrirla está
en el [README](README.md#presentación-de-consulta-opcional).
Conserva `presentacion/entre-el-orden-y-el-caos_assets/` y sus rutas: contiene los
videos y recursos originales. Las animaciones se reproducen a 3 veces la
velocidad. Las cuatro simulaciones se activan en su diapositiva; el PDF es estático.
No afirmes que las simulaciones numéricas del kit se ejecutaron sin comprobarlo.
