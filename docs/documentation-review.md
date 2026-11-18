# Revisión del flujo guiado

Fecha: 2026-11-18. Base revisada: 18f03a2. Alcance: entrada del taller,
coordinador y método de coordinación; no es una auditoría integral del kit.

- Pasa: seis agentes validados con validate_agent.py --strict, sin errores ni
  advertencias; cuatro avisos informativos de capacidades solicitadas no concedidas.
- Pasa: guía, contexto y catálogo del CLI consultados; seis handlers reconocidos.
- Pasa: git diff --check; raíz AGENTS.md de 112 líneas.
- Pasa: separación entre instrucciones comunes, entrada para personas y método
  detallado. Cada salida de investigación conserva su dueño.
- Falla en este entorno: python no está en PATH; python3 sí. El validador se
  ejecutó con python3. No se comprobó la instalación de dependencias del kit.
- Sin comprobar: ensayo completo de coordinación, transferencia entre árboles,
  aclaraciones, correcciones y duración del taller con participantes.
- Sin comprobar: simulaciones, compilación Typst y revisión visual del PDF.

El coordinador conserva su identidad, alcance repository y memoria project.
Se añade execute para acceder al CLI. La restricción a coordinación es una
instrucción, no una lista de comandos impuesta técnicamente por el manifiesto.
No se crean agentes ni skills adicionales: el método amplía paper-orchestra.

## Intento de ensayo operativo

La creación del commit se bloqueó por ausencia de identidad Git (user.name y
user.email); no se cambió la configuración ni se inventó autoría. Los cambios
quedan preparados localmente en docs/flujo-investigacion-guiada.

El lanzamiento del coordinador devolvió handler_limit_unenforceable: el proveedor
Codex no puede imponer la selección de herramientas del handler. No se inició
ninguna tarea. Como el commit no se creó, la rama todavía resolvía la declaración
anterior (sin execute): este intento no prueba la declaración editada. El motor
ofreció Claude como alternativa; no se cambió de proveedor ni se quitaron límites.
Queda pendiente guardar la versión con identidad autorizada y ensayar en un
proveedor que sostenga sus permisos.

## Skill de Manim Slides y marca Danil

Fecha: 2026-11-18. Base: `2cb1fa6`. Revisión limitada a la nueva skill, sus
enlaces de catálogo y asignación al simulador; no sustituye la revisión anterior.
Se adapta la skill MIT de Ruben Branco con commit y licencia conservados en
`.agents/skills/manim-slides/`; las APIs se contrastaron con documentación oficial.

Comprobaciones: **4 pasan · 0 fallan · 2 sin comprobar**.

- Pasa: `quick_validate.py .agents/skills/manim-slides` del skill-creator.
  Se ejecutó con PyYAML en un entorno temporal de `uv`.
- Pasa: ejemplo Python analizado con `ast.parse`, enlaces locales existentes,
  cuerpo de 88 líneas, catorce skills adicionales y ruta incluida en el manifiesto.
- Pasa: `validate_agent.py --root . --strict` de create-agent y
  `danil handler validate --root . --strict --json`: seis agentes válidos,
  cero errores y advertencias; cuatro avisos informativos de requisitos previos.
- Pasa: `git diff --check`. No se amplían permisos, identidad ni memoria del simulador.
- Sin comprobar: selección automática por una nueva conversación y ejecución
  del handler con la skill; solo se comprobó su declaración y asignación.
- Sin comprobar: render y exportación del ejemplo. Manim y Manim Slides no
  están en PATH; los comandos se documentan como ejemplos para un entorno preparado.

Los cambios de marca de la misma entrega afectan tres videos y las páginas 8,
50 y 51 del PDF. Los videos conservan resolución, fps y número de fotogramas;
las otras 48 páginas se compararon por hash de su render y permanecen idénticas.

## Ritmo y corte de la introducción

Fecha: 2026-11-18. Se corrige el video de portada: las máscaras de marca y la
copia centrada del logo se activan desde el segundo 2.8 del video fuente, cuando
ya terminó de salir «Y todas viven…». Antes tapaban parte de esa frase durante
la transición. Se conserva la duración de 5.3 segundos, 159 fotogramas y 1080p30.
Las animaciones del HTML pasan de 1.75× a 3×; Reveal conserva `transition: none`.

- Pasa: inspección visual del primer fotograma corregido y de la portada final.
- Pasa: navegador Chromium, avance y retroceso entre diapositivas 7 y 8;
  `playbackRate` vale 3 en ambas y la portada termina en menos de 2.2 segundos.
- Pasa: `ffprobe` confirma resolución, fps, número de fotogramas y duración.
- Pasa: `git diff --check`. No se modifican las simulaciones ni el PDF estático.
- Se consultaron modern-web-guidance y MDN sobre reproducción de video. Las
  búsquedas del primero no ofrecieron una guía específica para `playbackRate`;
  no se aplicaron patrones de carga o diseño ajenos a este cambio.


## Entrada para proyectos propios

Fecha: 2026-11-18. Base: `77ea00a`. Plataforma: Linux x86_64.
Alcance: reorientación autorizada de AGENTS.md y README hacia las personas que
usan el laboratorio. La presentación queda como consulta opcional. Se preservan
las reglas de rigor, los dueños y los recursos de la presentación.

Delta comprobado: **6 pasan · 0 fallan · 3 sin comprobar**.

| Estado | Evidencia |
|---|---|
| Pasa | AGENTS.md contiene instrucciones explícitas de primer contacto y seis grupos de capacidades; README abre con proyectos propios y peticiones de ejemplo. |
| Pasa | Enlaces locales de ambos documentos resueltos con pathlib; sin rutas ausentes. |
| Pasa | Inventario: seis agent.md, cinco SKILL.md originales y catorce adicionales, contados desde el árbol. |
| Pasa | Servidor con python3: respuesta HTTP 200 del HTML actual; detenido tras la comprobación. |
| Pasa | Typst 0.15.1 instalado tras detectar su ausencia; compilación del paper correcta y plugin typst ready=true. Sin revisión visual del PDF. |
| Pasa | git diff --check. Revisión con criterios de root-instructions: entrada humana en README, reglas comunes en AGENTS, rutas comprobadas y sin archivo de proveedor nuevo. |
| Sin comprobar | Bienvenida efectiva de una conversación nueva en otra cuenta. La instrucción editorial no acredita su cumplimiento por cada modelo. |
| Sin comprobar | Comandos numéricos y notebooks heredados; python no está en PATH, python3 sí. README conserva los comandos del kit y declara el límite. |
| Sin comprobar | HTML autocontenido solicitado después: task create --handler simulador fue rechazado con handler_limit_unenforceable bajo Codex. No arrancó el especialista; cambiar de proveedor requiere decisión humana según el flujo local. |

AGENTS.md queda en 207 líneas y README en 234; se supera el presupuesto orientativo
de 150 líneas de la raíz para conservar los procedimientos existentes sin ampliar
esta edición a una reorganización operativa. No se realiza una auditoría integral.
La presentación sigue usando sus assets y servidor hasta completar su empaquetado.


## Portabilidad de roles e instalación inicial obligatoria

Fecha: 2026-11-18. Versión ensayada: `3058ce9` en
`docs/entrada-para-participantes`. Cambio solicitado explícitamente por la persona:
que todos los roles y skills puedan usarse con el proveedor elegido y que Typst
más el plugin se instalen desde el primer mensaje.

Se retiran los bloques `permissions` de los seis manifiestos; se preservan IDs,
memoria, skills y dependencias declaradas. Se heredan los permisos de la tarea.
Las fronteras de rol siguen como instrucciones: el revisor no modifica archivos,
pero ya no se promete un sandbox ni una lista de herramientas impuesta técnicamente.
La excepción de preparación inicial permite verificar/instalar Typst, activar el
plugin y compilar la plantilla antes de aplicar el trabajo del especialista.
No permite corregir el paper ni elevar los permisos de la cuenta.

Comprobaciones: **5 pasan · 0 fallan · 2 sin comprobar**.

| Estado | Evidencia |
|---|---|
| Pasa | validate_agent.py --root . --strict: seis agentes, cero errores y advertencias; cuatro avisos informativos de dependencias solicitadas. |
| Pasa | danil handler validate --root . --strict --json: mismo resultado. |
| Pasa | Arranque real de revisor con Codex sobre `3058ce9`: started=true y respuesta de revisión recibida, sin contradicciones; su árbol quedó limpio. |
| Pasa | La revisión distingue instrucciones y permisos efectivos, y confirma coherencia README/AGENTS sobre Typst en el primer mensaje. |
| Pasa | Enlaces locales comprobados; los seis manifiestos no contienen permissions, model ni provider; skills sin listas de herramientas o modelos impuestos en sus cabeceras. |
| Sin comprobar | Ejecución de estos manifiestos con todos los demás proveedores y cuentas. El arranque exitoso con Codex no acredita esa matriz. |
| Sin comprobar | Instalación automática desde una cuenta nueva. Aquí se comprobó la instalación real de Typst 0.15.1, compilación y plugin listo, pero no se simuló un nuevo espacio sin plugin. |

El primer intento de prueba del revisor leyó la base anterior y fue rechazado:
los cambios sin commit no llegan al árbol de una tarea nueva. El ensayo válido
usa explícitamente la rama con la corrección guardada. El commit local está
atribuido a «Danil agent» con identidad local, sin modificar configuración Git.
No se publica ni se prueba acceso a cuentas ajenas.


## Presentación autocontenida integrada

Fecha: 2026-11-18. Entrega del simulador con Claude, integrada en
`docs/entrada-para-participantes` sobre `3058ce9`.

- Fuente original renombrada a `presentacion/entre-el-orden-y-el-caos.fuente.html`,
  sin cambios de contenido. Recursos originales intactos.
- Empaquetador estándar Python y comprobador Node/CDP conservados en simulaciones/.
- HTML generado en el nombre solicitado: 127.998.319 bytes (122,1 MiB), SHA-256
  `1aa36217883d411425182a5318039dd04a1eeec4e634d1cd6729f73a361c393b`.
- Generación repetida en el árbol receptor: mismo hash; 47 videos incrustados
  idénticos a los originales por SHA-256, 51 diapositivas y cuatro simulaciones.
- El simulador probó una copia aislada con Chrome headless 159, red desactivada y
  proxy sin servicio: 33 comprobaciones pasan, 47 videos reproducidos a 3×,
  navegación/pausa/controles de las cuatro simulaciones funcionales, sin errores
  de consola ni peticiones externas. La tarea principal inspeccionó capturas de
  Mandelbrot y arena y verificó identidad del archivo integrado.
- No se repitió la prueba completa de navegador tras integrar: el hash coincide
  con la entrega comprobada. Firefox, Safari, Edge y doble clic en Windows no
  se ensayaron. Los iconos de pausa/paso dependen de las fuentes de símbolos del
  sistema; en el entorno headless faltan esos glifos, como en la fuente original.
- El HTML generado queda ignorado y se entrega como archivo; Git conserva fuente,
  recursos y scripts. README ya no pide servidor y explica el paso de generación
  tras clonar. No se ha publicado una Release ni configurado LFS.

El límite de 100 MiB por archivo se contrastó el 2026-11-18 con
[GitHub Docs](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github).
La prueba de presentación no valida los experimentos numéricos ni los notebooks.


## Primera instalación sin depender de la skill instalada

Fecha: 2026-11-18. Base: `fc3cff0`. Ajuste solicitado antes de abrir y fusionar el PR.

- AGENTS.md autoriza la instalación en el primer turno aunque la skill typst aún
  no esté cargada. Se usa el CLI de Danil para preparar el plugin; luego se
  consulta el catálogo del proveedor y se conserva cualquier carga pendiente.
- Se separan los estados installed, enabled (por espacio) y ready. Una instalación
  global o una solicitud aceptada no bastan para declarar el entorno preparado.
- README explica la misma secuencia y el caso de actualización del catálogo en
  el turno siguiente. No se fijan proveedor ni modelo y no se amplían permisos.

Comprobaciones del delta: **3 pasan · 0 fallan · 1 sin comprobar**.

| Estado | Evidencia |
|---|---|
| Pasa | plugin list: typst installed=true y enabled=true en este espacio; plugin check: ready=true. |
| Pasa | skill list --agent codex: el catálogo resuelto contiene typst. |
| Pasa | Enlaces locales y git diff --check; la regla no convierte la falta inicial de skill en requisito circular. |
| Sin comprobar | Instalación desde cero en otra cuenta y recarga del catálogo de una sesión que inicialmente carezca de la skill. No se desinstaló el entorno funcional para simularlo. |
