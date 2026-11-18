# Adaptadores de formato

El formato afecta escritura, plantillas, referencias cruzadas, compilación y
comprobaciones. El esquema y las evidencias no necesitan sintaxis de un compilador.
No se ejecutan validadores que busquen `\documentclass` o `\cite` sobre Typst.

## Typst

1. Carga la skill `typst` que proporciona el entorno de Danil. Lee su
   `installation.json` junto a esa skill, en la máquina donde se compila:
   `binary`, `version` y `package_cache`. No copies ese archivo al repositorio ni
   inventes su ubicación o una instalación en PATH. Si esa skill no está disponible, sigue `skills/paper-typst/SKILL.md` del kit
   con el compilador local comprobado (`typst --version`). Si tampoco existe,
   informa el bloqueo; no instala un binario distinto en silencio.
2. Usa un proyecto modular: `main.typ` para configuración y `#include`, una carpeta
   `secciones/`, `figuras/` y `paper/referencias.bib` cuando corresponda. El principal de un
   documento existente conserva su nombre. No adapta un proyecto ajeno sin alcance.
3. La plantilla mínima de `assets/typst/` sirve para comenzar, **no es una plantilla
   de conferencia**. Los marcadores se sustituyen solo con material real; si quedan,
   el documento es un borrador. Para un destino concreto verifica una plantilla
   Typst aceptada o utiliza su formato requerido.
4. Escribe sintaxis Typst nativa: `= Título`, `#include`, `#image`, etiquetas
   `<fig-id>`, referencias `@fig-id` y citas `@clave`. Añade una sola
   `#bibliography("referencias.bib")` desde `paper/main.typ` cuando haya bibliografía. Mantén
   diferentes las claves de bibliografía y las etiquetas internas.
5. Compila desde la raíz autorizada y con argumentos separados:

   ```text
   <binary> compile --root <raíz del documento> --diagnostic-format short <main.typ> <PDF temporal>
   ```

   Si usas la instalación de Terminus, establece `TYPST_PACKAGE_CACHE_PATH` con
   `package_cache` de su `installation.json`. Con el compilador local conserva su
   caché configurada o predeterminada, sin inventar ese campo. Usa un plazo finito.
   Conserva stderr y código de salida. Resuelve errores en el proyecto y repite;
   no elimina texto, bibliografía o resultados para lograr una compilación verde.
6. El PDF se escribe fuera de la copia de trabajo salvo petición de guardarlo en
   ella. Si hay herramienta de renderizado, inspecciona páginas y comprueba tablas,
   figuras, cortes y referencias. Informa cuando la revisión visual no fue posible.

## LaTeX

1. Respeta plantilla y distribución disponibles en el destino; no instala TeX ni
   paquetes globales como efecto secundario de elegir una skill.
2. Mantén principal y secciones separadas con `\input`, bibliografía BibTeX y
   figuras estáticas. Conserva el motor LaTeX y procesador de bibliografía exigidos
   por la plantilla; no promete compatibilidad con todos los venues.
3. Compila con el comando documentado de la plantilla y un plazo finito. Si admite
   `latexmk`, usa un directorio de salida separado y evita `shell-escape` por defecto.
4. Revisa errores, citas y referencias sin resolver, desbordes y límite de páginas;
   inspecciona el PDF. Si no existe compilador, entrega fuentes con ese bloqueo.

## Qué se reutiliza entre ambos

`paper/referencias.bib` y la identidad verificada de las fuentes pueden compartirse. Cambian
el marcado de citas, etiquetas, tablas y estilos; también puede cambiar el estilo
bibliográfico y la composición de páginas. Un gráfico estático puede reutilizarse
si el formato de imagen está admitido. Los HTML interactivos no se incrustan como
figuras activas en el PDF: hay que producir una representación estática apropiada.
