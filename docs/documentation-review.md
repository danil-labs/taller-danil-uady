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
