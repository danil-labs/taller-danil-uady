# Funciones y reparto de la escritura

Son los métodos de los agentes declarados en `.agents/agents/`, separados del
equipo de desarrollo. No requieren otro proveedor o SDK. El anfitrión aporta
modelo, herramientas y permisos; la declaración no garantiza que se hayan lanzado
ni autoriza elevar permisos si el entorno no puede aplicar sus límites.

| Función | Lee | Entrega y posee | No modifica |
|---|---|---|---|
| Coordinación y esquema, @coordinador | Encargo y evidencias originales | `trabajo/encargo.md`, `esquema.md`, `afirmaciones.md`, `revision.md` | Datos originales, texto de las secciones |
| Prototipos y simulación, @simulador | Encargo, supuestos y datos autorizados | `simulaciones/`, `notebooks/`, `figuras/`, `resultados/` y `prototipos/` | Figuras finales, manuscrito, datos originales |
| Bibliografía, @bibliotecario | Esquema, fuentes proporcionadas y fuentes públicas consultadas | `paper/referencias.bib`, `trabajo/fuentes.md` | Cifras experimentales, secciones de otros escritores |
| Figuras, @ilustrador | Esquema, datos y prototipos pertinentes | `paper/figuras/` y `trabajo/figuras.md` | Bibliografía, principal, fuentes de prototipos |
| Redacción, @redactor | Esquema reconciliado, evidencias, bibliografía y figuras | Principal, plantilla y secciones asignadas | Fuentes, datos originales, secciones ajenas |
| Revisión, @revisor | Todas las fuentes originales y borrador | Informe en respuesta; coordinación lo registra | Cualquier archivo; propone correcciones al escritor |

Si hay varios redactores, la coordinación les asigna archivos concretos y fija
terminología, claves de cita y etiquetas antes de escribir. No se ejecutan dos
escritores sobre un mismo archivo. Bibliografía y figuras se pueden producir
en paralelo después del esquema. La revisión comienza sobre una versión fijada;
si el escritor cambia después, se revalida lo afectado.

## Esquema

- Identifica la pregunta, la contribución que realmente se puede defender y la
  diferencia entre antecedentes, evidencia nueva, interpretación y limitaciones.
- Pide las secciones que requiere el tipo de documento. No fuerza metodología
  experimental a una propuesta sin experimentos ni atribuye novedad sin búsqueda.
- Por sección, lista afirmaciones previstas, evidencia, figuras y dudas.
- Entrega preguntas cuando falten datos; no llena huecos con resultados plausibles.

## Bibliografía

- Busca fuentes primarias y verifica identidad mediante DOI, página del editor,
  repositorio oficial o registro equivalente. Lee la fuente pertinente, no solo
  el título de un resultado de búsqueda.
- Registra título, autores, año, URL/DOI, clave BibTeX, afirmación que respalda y
  ubicación dentro de la fuente. Separa «verificada» de «pendiente».
- Deduplica por identificador verificable. No exige un mínimo artificial de citas.
- Si la persona proporciona Zotero, usa la integración y la skill `typst` para
  exportar `paper/referencias.bib`; no modifica a mano entradas administradas por Zotero.
- Una cita existente no acredita que respalde la frase. Si el contenido no se
  puede consultar, conserva la limitación y no asegura apoyo a una afirmación.

## Figuras

- Para números, usa un programa de trazado con datos originales y unidades;
  conserva el script y el archivo de entrada. Distingue valor observado,
  cálculo derivado, estimación e intervalo; no inventa dispersión ni muestras.
- Para esquemas conceptuales, usa `anatomy` si la representación física ayuda
  a explicar; Mermaid o un SVG sencillo también sirven según el encargo.
- Entrega figuras estáticas utilizables en PDF y un pie que explique exactamente
  lo mostrado. Un HTML interactivo opcional no sustituye el recurso estático.
- Verifica etiquetas, ejes, escalas, contraste y tamaño de lectura. Una ilustración
  conceptual no se presenta como resultado experimental.

## Redacción

- Escribe directamente en el formato elegido; el contenido no depende de LaTeX.
- Usa cifras y afirmaciones trazables; señala los huecos. Mantén separadas
  observaciones, inferencias, hipótesis y recomendaciones.
- Usa claves de bibliografía y etiquetas acordadas. No crea entradas para hacer
  desaparecer una cita sin resolver ni cambia resultados para mejorar la narrativa.
- El ensamblador conserva el orden, las referencias cruzadas y la configuración
  de la plantilla; evita repetir conclusiones o contradecir otras secciones.

## Revisión

- Contrasta las cifras del texto, tablas y figuras con archivos originales,
  unidades, tamaño de muestra y transformaciones declaradas.
- Revisa qué respalda cada cita, inferencias excesivas, contradicciones, límites
  del experimento y requisitos del destinatario. Puede rechazar un borrador que
  compile perfectamente.
- Enumera hallazgos con severidad, archivo/ubicación, fuente que los contradice
  o falta, y corrección solicitada. No emite una nota global sin justificación.
- Tras correcciones, registra qué fue comprobado otra vez y qué sigue pendiente.

## Límites de ejecución

Acuerda un presupuesto o reutiliza el límite de la tarea anfitriona. No convierte
los conteos de llamadas publicados por PaperOrchestra en promesas de consumo o
tiempo de Danil. Los fallos de red o falta de herramientas se reportan como tales.
Al llegar al límite, entrega trabajo parcial y pendientes, sin ocultar errores.

En este kit el principal es `paper/main.typ` y su bibliografía
`paper/referencias.bib`. @simulador conserva los modelos y resultados;
@ilustrador prepara las figuras finales en `paper/figuras/`, puede ejecutar
`simulaciones/copiar_al_paper.py` y mantiene su procedencia. La redacción no
modifica las figuras. Otros encargos fijan rutas equivalentes antes de empezar.
