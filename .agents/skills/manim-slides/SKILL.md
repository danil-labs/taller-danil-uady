---
name: manim-slides
description: Prepara presentaciones animadas con Python, Manim y Manim Slides, con pausas controladas por el expositor y exportación a HTML o PDF. Úsala cuando pidan «haz una presentación con manim-slides», «anima estas diapositivas» o «una presentación como Entre el orden y el caos». Incluye el flujo del taller y distingue los videos renderizados de las simulaciones interactivas del navegador.
license: MIT
---

# Presentaciones con Manim Slides

Adaptación breve de una skill existente; fuentes, versión y licencia en
[PROVENANCE.md](PROVENANCE.md). Consulta la documentación oficial enlazada allí
para opciones que dependan de la versión instalada.

## Entradas y capacidades

Objetivo, público, tiempo disponible, guion y recursos autorizados. Manim anima
texto, ecuaciones, gráficas y geometría; `Slide` divide la animación en segmentos
que avanzan con el teclado. `ThreeDSlide` permite escenas 3D; `next_slide(loop=True)`
inicia un segmento en bucle. HTML usa RevealJS; PDF conserva imágenes estáticas.

## Flujo breve

1. Revisa las fuentes y el entorno antes de cambiar una presentación. Comprueba
   `manim-slides --version`, `manim-slides render --help` y
   `manim-slides convert --help`. Si faltan, prepara un entorno virtual con Manim
   Community y `manim-slides[manim]`, siguiendo su instalación oficial. Revisa las
   dependencias de Manim y FFmpeg; LaTeX se necesita para `Tex`/`MathTex`, no para
   `Text`. La GUI requiere además bindings Qt. Cargar esta skill no instala nada.
2. Escribe un guion con una idea por diapositiva, letra legible y objetos que se
   transforman para explicar cambios. Guarda las fuentes Python, datos y recursos
   junto a la nueva presentación, sin sobrescribir la existente.
3. Hereda de `Slide`, anima con `self.play(...)` y coloca `self.next_slide()` entre
   segmentos. Por ejemplo, guarda esto como `presentacion/demo/slides.py`:

   ```python
   from manim import Circle, Create, FadeOut, Text, Write
   from manim_slides import Slide

   class Charla(Slide):
       def construct(self):
           titulo = Text("Entre el orden y el caos", font_size=48)
           self.play(Write(titulo))
           self.next_slide()
           self.play(FadeOut(titulo), Create(Circle()))
           self.wait(0.5)
   ```

4. Desde la raíz, renderiza primero un borrador y revisa sus cortes. Para la
   entrega, sube la calidad y convierte las escenas en el orden del guion.
   Estos comandos son ejemplos para un entorno con las dependencias instaladas:

   ```sh
   manim-slides render -ql presentacion/demo/slides.py Charla
   manim-slides render -qh presentacion/demo/slides.py Charla
   manim-slides convert Charla presentacion/demo/charla.html --offline
   manim-slides convert --to=pdf Charla presentacion/demo/charla.pdf
   ```

   Conserva el HTML y su carpeta de assets juntos. `--one-file --offline` permite
   una entrega HTML autocontenida, a costa de incrustar los videos y aumentar su
   tamaño. Guarda versiones de dependencias y comandos para regenerar la entrega.
5. Sirve la raíz con `python -m http.server 8765 --bind 127.0.0.1` y abre
   `http://127.0.0.1:8765/presentacion/demo/charla.html`. Revisa inicio, transiciones,
   final, flechas, bucles y recursos. Entrega fuentes, HTML con assets y PDF si se
   pidió; distingue lo renderizado, lo revisado visualmente y lo pendiente.

## Aplicación a esta presentación

- Usa `presentacion/entre-el-orden-y-el-caos.html` como ejemplo visual: fondo oscuro,
  desarrollo progresivo, animaciones a 1.75× y marca Danil. Conserva las rutas de
  `entre-el-orden-y-el-caos_assets/` y los créditos de imágenes.
- Aquí se conserva la exportación, no sus escenas Python originales. Antes de
  regenerarla, recupera esas fuentes; reconvertir puede perder cambios del HTML.
- Las cuatro simulaciones en vivo son código adicional del navegador, no una
  capacidad de los videos de Manim. Conserva su montaje por diapositiva, liberación
  del foco del teclado y pausa/cancelación al salir. Guarda esos cambios en una
  plantilla o paso reproducible para futuras exportaciones.
- Un PDF no ejecuta las simulaciones ni las animaciones. El enlace local funciona
  solo en esta computadora; para una sesión remota, comparte pantalla.
- Una animación no demuestra resultados científicos: usa los datos y métodos del
  repositorio. No reportes un render ni una simulación como ejecutados sin probarlos.

## Se activa con

- «Haz una presentación con manim-slides sobre estos resultados» → fuentes y HTML.
- «Anima estas diapositivas con pausas para explicar» → segmentos con `next_slide`.
- «Quiero una presentación como Entre el orden y el caos» → guion y entrega equivalente.

No se activa con «haz un video con Remotion» ni «calcula el diagrama de bifurcación».
