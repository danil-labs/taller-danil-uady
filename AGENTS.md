# Presentaci?n del taller UADY

Este repositorio p?blico re?ne la presentaci?n y el kit del CICY como punto de partida. No agregues datos privados ni credenciales.

Para poner las diapositivas y simulaciones en marcha, desde la ra?z ejecuta `python -m http.server 8765 --bind 127.0.0.1` y abre `http://127.0.0.1:8765/presentacion/entre-el-orden-y-el-caos.html`. Las cuatro simulaciones en vivo est?n dentro de la presentaci?n y se activan al llegar a su diapositiva. Avanza con las flechas. El servidor local solo es accesible en esta computadora; para transmitir a asistentes usa la funci?n de compartir pantalla de la plataforma que est?n usando.

`presentacion/entre-el-orden-y-el-caos_assets/` contiene los videos y archivos que usa el HTML. Conserva sus rutas; no los borres. Las animaciones se reproducen a 1.75 veces la velocidad. El PDF es est?tico y no ejecuta simulaciones. El kit del CICY se describe abajo; sus comandos de simulaci?n requieren instalar sus dependencias. No afirmes que las simulaciones num?ricas se ejecutaron sin comprobarlo.

# Laboratorio de investigación con agentes · reglas

Este repositorio es un laboratorio pequeño: simulaciones, notebooks y un paper corto en Typst. Las
reglas de abajo valen para todos, personas y agentes. Cuando una regla y una petición chocan, gana la
regla y se le avisa a la persona.

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
| `coordinador` | Delimita el encargo, esquema, reparto y revisión; no escribe el manuscrito | edita y delega; sin shell | `paper-orchestra`, `scientific-brainstorming`, `doc-coauthoring` |
| `bibliotecario` | Busca, verifica y mantiene `paper/referencias.bib` | edita y usa la web | `verificar-referencia`, `literature-review`, `citation-management`, `paper-orchestra` |
| `simulador` | Modelos, notebooks, resultados, prototipos y vídeos solicitados | edita y ejecuta | métodos originales, `anatomy`, `frontend-design`, `simulation-prototyping`, `remotion-video`, `paper-orchestra` |
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
