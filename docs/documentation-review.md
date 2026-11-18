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
