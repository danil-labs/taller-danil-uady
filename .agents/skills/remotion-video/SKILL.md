---
name: remotion-video
description: Prepara animaciones y vídeos reproducibles con Remotion a partir de un guion, datos o modelo existente. Úsala cuando pidan un vídeo explicativo, una animación de una simulación, una composición Remotion o exportar un MP4. Coordina fotogramas, duración, audio, vista previa y entrega estática para documentos. Es una guía local apoyada en documentación oficial; no instala ni ejecuta Remotion por sí sola.
---

# Vídeos explicativos con Remotion

Guía propia de Danil. No es una copia del paquete oficial de skills. Consulta
`references/official.md` para las fuentes y para resolver APIs de la versión usada.

## Entradas

Guion u objetivo, público, datos/modelo, recursos autorizados, proporción, duración
y salida solicitada. Conserva el proyecto y cambios de la persona; trabaja en la
carpeta de prototipo asignada, separada de las fuentes del documento.

## Pasos

1. Revisa si ya existe un proyecto Remotion y su lockfile. Usa sus dependencias
   y versión; si se necesita crear uno, hazlo en una carpeta nueva y consulta
   las instrucciones oficiales actuales. No instala un proyecto al cargar la skill.
2. Define composición, dimensiones, fps y duración. El estado visual de cada
   fotograma debe depender del fotograma y de entradas explícitas, de forma que
   buscar hacia atrás o renderizar fuera de orden produzca el mismo resultado.
3. Consume el modelo de la simulación, cuando exista; no lo sustituye por una
   coreografía que cambie sus resultados. Evita reloj real, aleatoriedad sin
   semilla o estados de navegador como fuente del avance de la composición.
4. Revisa una vista previa si se puede ejecutar el navegador autorizado. Comprueba
   inicio, cambios de escena y final, texto legible y concordancia con datos y
   unidades. Si hay audio, comprueba sincronización. Declara verificaciones pendientes.
5. Renderiza cuando se haya pedido una entrega exportada o el encargo la incluya;
   usa la CLI de la versión del proyecto, un plazo y un destino concretos.
   Consulta requisitos de navegador, codecs y licencia antes de ejecutar; no
   configura servicios de render ni publica archivos por defecto.
6. Entrega fuentes, instrucciones, recursos y ubicación del vídeo si se produjo.
   Para Typst, entrega además a figuras un fotograma o esquema estático con su
   pie: un enlace al vídeo es complementario y no una animación dentro del PDF.

## Qué comprobar

- Misma entrada y fotograma, mismo estado visual.
- Duración, fps, dimensiones y recursos completos.
- Audio y cambios de escena revisados cuando existan.
- Ninguna cifra inventada para acompañar una animación atractiva.
- Distinguir «código preparado», «vista previa revisada» y «vídeo renderizado».

## Se activa con

- «Haz un vídeo para explicar este mecanismo».
- «Anima esta simulación con Remotion».
- «Exporta la composición a MP4».

No se activa con «resuelve el modelo físico» (simulation-prototyping) ni
«compila el documento Typst» (typst).
