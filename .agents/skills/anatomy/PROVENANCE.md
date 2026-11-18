# Procedencia e integración

Fuente: [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy), commit
[`1482e8469b0a9e0d8cc18ea2740a01423d29ae80`](https://github.com/wheresryan22/anatomy/tree/1482e8469b0a9e0d8cc18ea2740a01423d29ae80).
Integrada por pedido de Mauricio el 2026-11-18 UTC. Licencia MIT; se conserva
el texto original en `LICENSE`.

Los archivos importados se conservan sin cambios funcionales. Se omiten `.github/` y los
25 HTML/PDF generados dentro de `examples/`; se conservan los scripts que los
construyen, el kit, las referencias, los ejemplos fuente y las pruebas del autor.
Este archivo es la única adición local. Se normalizan únicamente espacios al final
de línea y líneas vacías al final del archivo en `examples/test-rig/view.ts`,
`references/webgl.md` y `scripts/turn-fidelity.mjs`, para pasar `git diff --check`.

## Uso en Danil

La fuente compartida es `.agents/skills/anatomy/SKILL.md`, con metadatos de Codex
en `agents/openai.yaml`. Sirve para ilustraciones isométricas interactivas que
explican máquinas y sistemas; no cambia las responsabilidades ni permisos de
los agentes del repositorio. Se puede invocar por nombre o por la ruta del skill.

La ejecución de sus herramientas requiere Node.js 20.10 o posterior. Las capturas
y comprobaciones visuales requieren Chrome/Chromium según la guía original;
instalar esta skill no habilita control del Firefox ni elimina un bloqueo de
ejecución del entorno. La integración no instala navegadores ni arranca servicios.

`scripts/publish.mjs` es una herramienta opcional de publicación externa. La
instalación no la ejecuta ni autoriza compartir documentación o figuras de Danil;
se aplican las reglas de publicación y privacidad del repositorio.

Para actualizar, elegir un nuevo commit del origen, volver a importar los mismos
archivos con las exclusiones anteriores y actualizar esta procedencia. Mantener
`SKILL.md` y sus referencias en la misma versión.
