# Procedencia e integración

Fuente: [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills/tree/ec59a29a03d5c40f73ab40878df04860bc00e876/skills/scientific-brainstorming),
commit `ec59a29a03d5c40f73ab40878df04860bc00e876`, ruta `skills/scientific-brainstorming`. Licencia MIT,
conservada en `LICENSE.md`. Integración solicitada por Mauricio el 2026-11-18.

Cambios locales en `SKILL.md`: nota de integración para Typst, autoridad del
encargo, límites del agente y proveedores opcionales; se retira `allowed-tools`
específico de CLI y metadata anidada de OpenClaw, conservando metadata escalar.
No se cambia la lógica de los scripts. Se normaliza whitespace final en los
archivos de texto importados para pasar la comprobación de Git.

Las referencias y scripts se conservan con la skill. Sus dependencias se instalan
solo al necesitarlas para una tarea autorizada. Los validadores de citas que
buscan sintaxis LaTeX no se aplican al texto Typst; se usan las comprobaciones de
BibTeX y el compilador Typst según `.agents/skills/paper-orchestra`.

No se ejecutó el instalador de la suite completa ni se configuraron claves,
servicios de búsqueda, APIs de imágenes o cuentas de terceros.
