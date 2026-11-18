# Presentaci?n del taller UADY

Este repositorio p?blico re?ne la presentaci?n y el kit del CICY como punto de partida. No agregues datos privados ni credenciales.

Para poner las diapositivas y simulaciones en marcha, desde la ra?z ejecuta `python -m http.server 8765 --bind 127.0.0.1` y abre `http://127.0.0.1:8765/presentacion/entre-el-orden-y-el-caos.html`. Las cuatro simulaciones en vivo est?n dentro de la presentaci?n y se activan al llegar a su diapositiva. Avanza con las flechas. El servidor local solo es accesible en esta computadora; para transmitir a asistentes usa la funci?n de compartir pantalla de la plataforma que est?n usando.

`presentacion/entre-el-orden-y-el-caos_assets/` contiene los videos y archivos que usa el HTML. Conserva sus rutas; no los borres. Las animaciones se reproducen a 1.75 veces la velocidad. El PDF es est?tico y no ejecuta simulaciones. El kit del CICY se describe abajo; sus comandos de simulaci?n requieren instalar sus dependencias. No afirmes que las simulaciones num?ricas se ejecutaron sin comprobarlo.

# Laboratorio de investigación con agentes · reglas

Este repositorio es un laboratorio pequeño: simulaciones, notebooks y un paper corto en Typst. Las
reglas de abajo valen para todos, personas y agentes. Cuando una regla y una petición chocan, gana la
regla y se le avisa a la persona.

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

## Acompañamiento del taller

Ante una idea, acompaña a la persona desde la pregunta hasta la salida elegida.
Lee el [flujo guiado](.agents/skills/paper-orchestra/references/flujo-guiado.md).
El coordinador activa cada especialidad como tarea real con su handler de Danil;
no basta mencionarla ni representar sus funciones en el chat. Paraleliza trabajos
independientes y conserva un escritor por archivo. Registra decisiones, tareas,
versiones y etapa en trabajo/encargo.md. No fuerces una simulación ni un paper.

## Verificación de Typst

El paper se compila con Typst. Al iniciar cualquier tarea en este proyecto, y antes de compilar, el agente (o la persona) revisa estos pasos en orden:

1. **Detectar.** Ejecuta `typst --version`. Si responde `typst 0.15.x` (o posterior), sigue con el paso 4.
2. **Si no está instalado,** instálalo sin preguntar, con la versión fijada `0.15.1`:
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
4. **Comprobar la compilación del paper.** Desde la raíz del repositorio:
   ```sh
   typst compile --root paper paper/main.typ paper/main.pdf
   ```
   Si falla, el error es del paper, no de la instalación: repórtalo al redactor.
5. **Plugin typst de Danil (vista previa).** Sin él, los `.typ` no se muestran como preview en la vista de archivos. Revísalo con `danil plugin check --id typst --json`. Si responde `"ready": true`, está listo. Si no, instálalo y actívalo:
   ```sh
   danil plugin install --id typst --json
   danil plugin enable --id typst --json
   ```
   Si `install` falla con `xz: Cannot exec`, el sistema no tiene `xz`. En ese caso crea un `xz` de usuario en `~/.local/bin` que use el módulo `lzma` de Python (lee stdin, escribe stdout, con `-z` comprime y sin `-z` descomprime), hazlo ejecutable y vuelve a instalar. No uses `sudo`.

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

| Agente | Qué hace | Techo | Skills |
|---|---|---|---|
| `coordinador` | Guía desde la idea, delimita, reparte y registra revisión; no escribe el manuscrito | edita, delega y ejecuta CLI de coordinación | `paper-orchestra`, `scientific-brainstorming`, `doc-coauthoring` |
| `bibliotecario` | Busca, verifica y mantiene `paper/referencias.bib` | edita y usa la web | `verificar-referencia`, `literature-review`, `citation-management`, `paper-orchestra` |
| `simulador` | Modelos, notebooks, resultados, prototipos, vídeos y presentaciones solicitadas | edita y ejecuta | métodos originales, `anatomy`, `frontend-design`, `simulation-prototyping`, `remotion-video`, `manim-slides`, `paper-orchestra` |
| `ilustrador` | Prepara figuras finales estáticas y conceptuales con procedencia | edita y ejecuta | `figura-para-paper`, `scientific-visualization`, `anatomy`, `paper-orchestra` |
| `redactor` | Escribe y compila el paper; Typst principal, LaTeX cuando se requiera | edita y ejecuta | `paper-typst`, `figura-para-paper`, `scientific-writing`, `paper-orchestra` |
| `revisor` | Contrasta afirmaciones y emite dictamen en la respuesta | solo lectura y web; sin shell | métodos originales, `peer-review`, `scientific-critical-thinking`, `scientific-visualization`, `paper-orchestra` |

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
