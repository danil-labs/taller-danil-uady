---
name: paper-orchestra
description: Coordina la escritura de un paper o documento técnico desde notas, fuentes y resultados mediante esquema, bibliografía, figuras, redacción y revisión. Úsala cuando pidan «convierte mis experimentos en un paper», «usa PaperOrchestra», «escribe un documento técnico con estas evidencias» o un equipo de escritura con salida Typst o LaTeX. Reutiliza la skill typst del entorno para compilar y anatomy para ilustraciones conceptuales cuando corresponda.
metadata:
  origin: Adaptación local del método PaperOrchestra; ver PROVENANCE.md
---

# Escritura coordinada con Typst o LaTeX

Convierte materiales existentes en un documento trazable y revisado. Esta skill
coordina tareas con las herramientas del agente anfitrión; no instala ni ejecuta
el framework Python de Google. Lee `PROVENANCE.md` para distinguir ambos.

La flota declarada entra por @coordinador. Si te invocan como especialista,
ejecuta solo tu función en `references/roles.md` y devuelve la entrega al
coordinador; no reinicies el ciclo ni asumas la autoridad de los otros escritores.
Consulta `references/fleet.md` para la asignación de skills y sus fuentes.

Para una idea sin resultados, consulta `references/flujo-guiado.md` antes de
organizar el documento: delimita la pregunta, encarga una prueba y permite otra
salida. En este repositorio las especialidades se ejecutan mediante handlers en
tareas reales de Danil; no se representan sus funciones en una sola conversación.

## Entradas

- Carpeta autorizada, idea, datos o resultados y fuentes disponibles. Para un
  documento sin experimentos, pide las evidencias apropiadas; no inventes un log.
- Audiencia, idioma, objetivo, plantilla y restricciones del destino, si existen.
- Formato: Typst para un documento nuevo sin restricción; conserva el formato de
  uno existente y respeta LaTeX cuando el destino lo exija. Explicita la elección.
- Un paper experimental requiere datos y método. Si faltan, prepara un esquema
  con preguntas o un borrador marcado pendiente; no prometas un paper terminado.

## Pasos

1. **Delimitar:** abre solo los materiales autorizados. Registra entrada, formato,
   criterios de entrega y límites de búsqueda en `trabajo/encargo.md`. Lee
   `references/artifacts.md` antes de repartir tareas. Conserva originales.
2. **Esquematizar:** asigna el rol de esquema de `references/roles.md`. Produce
   `trabajo/esquema.md`, con secciones, preguntas, afirmaciones y figuras previstas.
   Vincula cada resultado con su archivo y ubicación en la fuente original.
3. **Investigar y dibujar:** asigna en paralelo los roles de bibliografía y figuras
   de `references/roles.md` si hay herramientas de subtareas; en otro caso registra la capacidad faltante; no suplantes al especialista. Si se pide prototipo, simulación o vídeo, asigna
   @simulador una carpeta `prototipos/` separada antes de que figuras use
   sus salidas. Cada entrega tiene un solo escritor. No llames
   «agentes activos» a funciones que ejecutas tú mismo.
4. **Reconciliar:** contrasta esquema, bibliografía y figuras. La coordinación es
   dueña de `trabajo/afirmaciones.md` y registra allí las fuentes y revisiones.
   Ajusta afirmaciones
   sin respaldo y corrige contradicciones antes de redactar. Conserva citas
   pendientes explícitas; una búsqueda sin resultados no prueba originalidad.
5. **Redactar:** asigna las secciones y su escritor según `references/roles.md`.
   Usa `references/formats.md` para Typst o LaTeX. Una persona/tarea ensambla el
   principal; los escritores de sección no lo modifican. Reutiliza la skill
   `typst` del entorno para proyectos `.typ`; su instalación no se copia aquí.
6. **Revisar:** asigna @revisor con las fuentes originales, además del
   borrador. Comprueba cifras, citas, alcance de las conclusiones y legibilidad.
   El revisor entrega su informe sin editar; la coordinación lo registra en
   `trabajo/revision.md` y el escritor responsable aplica cada corrección.
7. **Compilar e inspeccionar:** sigue `references/formats.md`, vuelve a compilar
   tras cambios y revisa el PDF visualmente si hay herramienta disponible. Una
   compilación correcta no acredita la exactitud ni el cumplimiento editorial.
8. **Cerrar:** entrega fuentes y ubicación del PDF, materiales usados, revisión y
   pendientes. Si quedan hechos sin fuente, citas falsas, errores de compilación
   o restricciones incumplidas, informa «borrador/incompleto». Si se agota el
   presupuesto de revisión, conserva el borrador y enumera los bloqueos.

## Salida esperada

Proyecto Typst o LaTeX, bibliografía verificable cuando se cite, figuras con
datos o explicación de su origen y `trabajo/revision.md` con la evidencia de
compilación, revisión factual y revisión visual, cada una por separado.
Publicar, enviar a una revista o reemplazar archivos existentes requiere el
alcance autorizado por la persona; generar un documento no autoriza esos pasos.

## Ejemplo

Petición: «Con estos resultados de simulación, escribe un documento técnico en Typst».
Resultado: proyecto modular, tabla y gráfico derivados de las mediciones,
limitaciones de la muestra y fuentes. Sin resultados de un escenario, no se inventa una
fila ni se presenta una estimación como observación.

## Qué no hacer

- No traducir `.tex` a `.typ` cambiando extensiones o con sustituciones de texto:
  cambian sintaxis, citas, etiquetas y plantillas; consulta el adaptador de formato.
- No escanear historiales privados de agentes ni credenciales para fabricar el
  material inicial. Las fuentes y los resultados se solicitan o se autorizan.
- No generar gráficos científicos con Anatomy ni con imágenes inventadas. Usa
  herramientas de trazado sobre datos; Anatomy es para explicación conceptual.
- No presentar una evaluación automática como garantía de calidad científica ni
  prometer aceptación editorial o ausencia de alucinaciones.

## Se activa con

- «Convierte mis experimentos en un paper en Typst».
- «Usa PaperOrchestra con estas notas y resultados».
- «Organiza un equipo para redactar y revisar este documento técnico en LaTeX».

No se activa con «arregla este error de compilación Typst» (skill `typst`) ni
«dibuja una máquina isométrica» (skill `anatomy`).
