# Flota y skills de autoría

Integración solicitada por Mauricio el 2026-11-18. Son seis declaraciones de
agente con métodos asignados; no un servicio permanente ni un runtime nuevo.
La puerta de entrada es @coordinador y el reparto vive en `roles.md`.
Las verificaciones y sus límites quedan en [validation.md](validation.md).

| Agente | Skills asignadas | Para qué |
|---|---|---|
| `coordinador` | paper-orchestra, scientific-brainstorming, doc-coauthoring | Delimitar, explorar ideas y coordinar entregas verificables |
| `simulador` | paper-orchestra, anatomy, frontend-design, simulation-prototyping, remotion-video, manim-slides | Prototipos interactivos, modelos explícitos, vídeos y presentaciones animadas |
| `bibliotecario` | paper-orchestra, literature-review, citation-management | Búsqueda, síntesis, metadatos y BibTeX verificables |
| `ilustrador` | paper-orchestra, scientific-visualization, anatomy | Gráficos derivados de datos e ilustraciones conceptuales |
| `redactor` | paper-orchestra, scientific-writing; typst del entorno | Manuscrito modular, evidencia y compilación Typst; alternativa LaTeX |
| `revisor` | paper-orchestra, peer-review, scientific-critical-thinking, scientific-visualization | Revisión independiente de afirmaciones, método y figuras, sin modificar archivos |

## Fuentes de las skills incorporadas

Se conservan además los métodos originales de `skills/` y sus asignaciones:
verificar-referencia, simulacion-reproducible, ajuste-ley-de-potencias,
figura-para-paper y paper-typst. `roles.md` fija las rutas del kit; el principal
sigue en `paper/main.typ` y la bibliografía en `paper/referencias.bib`.

Las copias de terceros fijan el commit y sus adaptaciones en su `PROVENANCE.md`
y conservan la licencia. Se seleccionan las siguientes, sin instalar el catálogo
completo ni ejecutar sus scripts durante la incorporación:

- K-Dense, MIT, `ec59a29a03d5c40f73ab40878df04860bc00e876`:
  [literature-review](https://github.com/K-Dense-AI/scientific-agent-skills/tree/ec59a29a03d5c40f73ab40878df04860bc00e876/skills/literature-review),
  [citation-management](https://github.com/K-Dense-AI/scientific-agent-skills/tree/ec59a29a03d5c40f73ab40878df04860bc00e876/skills/citation-management),
  [scientific-writing](https://github.com/K-Dense-AI/scientific-agent-skills/tree/ec59a29a03d5c40f73ab40878df04860bc00e876/skills/scientific-writing),
  [scientific-visualization](https://github.com/K-Dense-AI/scientific-agent-skills/tree/ec59a29a03d5c40f73ab40878df04860bc00e876/skills/scientific-visualization),
  [peer-review](https://github.com/K-Dense-AI/scientific-agent-skills/tree/ec59a29a03d5c40f73ab40878df04860bc00e876/skills/peer-review),
  [scientific-critical-thinking](https://github.com/K-Dense-AI/scientific-agent-skills/tree/ec59a29a03d5c40f73ab40878df04860bc00e876/skills/scientific-critical-thinking),
  [scientific-brainstorming](https://github.com/K-Dense-AI/scientific-agent-skills/tree/ec59a29a03d5c40f73ab40878df04860bc00e876/skills/scientific-brainstorming).
- Anthropic, Apache-2.0, `e4bb5d960d87126ff3b3a8af1a104b7db67560ba`:
  [frontend-design](https://github.com/anthropics/skills/tree/e4bb5d960d87126ff3b3a8af1a104b7db67560ba/skills/frontend-design),
  [doc-coauthoring](https://github.com/anthropics/skills/tree/e4bb5d960d87126ff3b3a8af1a104b7db67560ba/skills/doc-coauthoring).
- Anatomy ya incorporada, MIT:
  [fuente](https://github.com/wheresryan22/anatomy/tree/1482e8469b0a9e0d8cc18ea2740a01423d29ae80).
- Métodos locales: [paper-orchestra](../SKILL.md),
  [simulation-prototyping](../../simulation-prototyping/SKILL.md) y
  [remotion-video](../../remotion-video/SKILL.md). Esta última enlaza la
  [documentación oficial de Remotion](https://www.remotion.dev/docs/ai/skills);
  no redistribuye su pack sin licencia declarada.

## Qué aporta y qué necesita el entorno

La skill [manim-slides](../../manim-slides/SKILL.md) adapta de forma breve el
método de Ruben Branco (MIT) para presentaciones como la del taller. Su
[procedencia](../../manim-slides/PROVENANCE.md) fija el commit y las fuentes
oficiales; conserva la licencia. No instala Manim ni regenera la presentación
por incorporarse al catálogo.

Typst es el formato principal; el escritor usa la skill `typst` instalada en su
entorno para resolver el compilador privado. Esta integración no instala Typst
en servidores beta ni corrige sus dependencias de sistema. LaTeX se conserva
para documentos existentes o destinos que lo requieran; no se instala una
distribución TeX para trabajar en Typst.

Las instrucciones no instalan Remotion, navegadores, Matplotlib, Pandoc, claves
ni proveedores adicionales. Cada encargo comprueba las herramientas que realmente
necesita y comunica lo ausente. Remotion representa el vídeo; la validez del modelo
de simulación se comprueba por separado. Anatomy produce explicación conceptual;
los resultados científicos se trazan desde datos con herramientas de gráficos.

Las reglas locales de integración preservan Typst y los permisos de los agentes
frente a recomendaciones opcionales de las skills importadas. El revisor solo
lee y consulta fuentes; solicita a coordinación la evidencia de ejecución.
El diseño de prototipos no autoriza rediseñar la web o Desk de Danil.
