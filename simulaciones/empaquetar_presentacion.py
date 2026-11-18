"""Empaqueta la presentación «Entre el orden y el caos» en un solo HTML autocontenido.

    python simulaciones/empaquetar_presentacion.py

Lee la fuente editable `presentacion/entre-el-orden-y-el-caos.fuente.html` (la que exporta
Manim Slides, más las simulaciones en vivo) y sus archivos en
`presentacion/entre-el-orden-y-el-caos_assets/`, y escribe
`presentacion/entre-el-orden-y-el-caos.html`: un único archivo que se abre con doble clic
(file://), sin red ni servidor.

Qué hace, sin tocar los originales:

- Cada `<link rel="stylesheet">` local pasa a un `<style>` (las fuentes ya vienen en data: dentro
  de black.css).
- Cada `<script src>` local pasa a un `<script>` en línea. Si el código contiene secuencias que
  confunden al analizador HTML dentro de un <script> («<!--», «<script», «</script»), se incrusta
  como `src="data:text/javascript;base64,…"`, byte a byte idéntico.
- Cada video de `data-background-video` se guarda en base64 dentro de un
  `<script type="application/octet-stream">`. Un pequeño script, que corre antes de
  `Reveal.initialize`, lo convierte en Blob y escribe su `blob:` URL en `data-background-video`.
  No se usan data: URL porque reveal.js separa ese atributo por comas y una data: URL lleva una.
- Los videos no se recodifican. Los que no se referencian no se incluyen.

Solo usa la biblioteca estándar (no importa `comun.py`, que carga matplotlib y numpy, porque aquí
no hacen falta); fuerza UTF-8 en la consola por la misma razón que `comun.py`.
"""
import base64
import hashlib
import re
import sys
import time
from pathlib import Path

for _flujo in (sys.stdout, sys.stderr):
    if hasattr(_flujo, "reconfigure"):
        _flujo.reconfigure(encoding="utf-8", errors="replace")

RAIZ = Path(__file__).resolve().parent.parent
PRES = RAIZ / "presentacion"
FUENTE = PRES / "entre-el-orden-y-el-caos.fuente.html"
SALIDA = PRES / "entre-el-orden-y-el-caos.html"
CREDITOS = PRES / "CREDITOS.md"

# Lo que la presentación debe conservar; si cambia la fuente a propósito, se cambia aquí.
DIAPOSITIVAS = 51
VIDEOS = 47
SIMULACIONES = {"mandelbrot", "automatas", "arena", "bosque"}

PELIGROSO_EN_SCRIPT = re.compile(r"<!--|<script|</script", re.IGNORECASE)

DECODIFICADOR = """<script>
/* Videos incrustados: base64 -> Blob -> blob: URL, antes de Reveal.initialize. */
(function () {
  "use strict";
  var datos = {};
  document.querySelectorAll('script[type="application/octet-stream"][data-video]').forEach(function (s) {
    datos[s.getAttribute("data-video")] = s;
  });
  function bytes(b64) {
    if (typeof Uint8Array.fromBase64 === "function") return Uint8Array.fromBase64(b64);
    var bin = atob(b64), n = bin.length, u = new Uint8Array(n);
    for (var i = 0; i < n; i++) u[i] = bin.charCodeAt(i);
    return u;
  }
  var urls = {};
  document.querySelectorAll("section[data-video-incrustado]").forEach(function (sec) {
    var clave = sec.getAttribute("data-video-incrustado");
    if (!urls[clave]) {
      var s = datos[clave];
      if (!s) { console.error("[video] falta " + clave); return; }
      urls[clave] = URL.createObjectURL(new Blob([bytes(s.textContent.trim())], { type: "video/mp4" }));
    }
    sec.setAttribute("data-background-video", urls[clave]);
  });
  Object.keys(datos).forEach(function (k) { datos[k].remove(); });  /* libera el texto base64 */
  window.__videosIncrustados = urls;
})();
</script>
"""


def ruta_local(href):
    """La fuente de Manim Slides usa «\\» en algunas rutas; aquí se normaliza a «/»."""
    return (PRES / href.replace("\\", "/")).resolve()


def incrustar_css(m):
    ruta = ruta_local(m.group("href"))
    css = ruta.read_text(encoding="utf-8")
    assert "</style" not in css.lower(), f"{ruta.name} contiene </style"
    return f"<style>/* {ruta.name} */\n{css}\n</style>"


def incrustar_js(m):
    ruta = ruta_local(m.group("src"))
    js = ruta.read_bytes()
    if PELIGROSO_EN_SCRIPT.search(js.decode("utf-8")):
        b64 = base64.b64encode(js).decode("ascii")
        return f'<script src="data:text/javascript;base64,{b64}"></script><!-- {ruta.name} -->'
    return f"<script>/* {ruta.name} */\n{js.decode('utf-8')}\n</script>"


def fuera_de_comentarios(patron, funcion, html):
    """re.subn que no toca lo que está dentro de <!-- … -->."""
    cuenta = 0
    def cambio(m):
        nonlocal cuenta
        if m.group(0).startswith("<!--"):
            return m.group(0)
        cuenta += 1
        return funcion(m)
    return re.sub(r"<!--.*?-->|" + patron, cambio, html, flags=re.S), cuenta


def main():
    t0 = time.time()
    html = FUENTE.read_text(encoding="utf-8")

    # --- comprobaciones de la fuente ---
    n_sec = len(re.findall(r"<section\b", html))
    vivos = set(re.findall(r'data-vivo="([^"]+)"', html))
    refs = re.findall(r'data-background-video="([^"]+)"', html)
    assert n_sec == DIAPOSITIVAS, f"la fuente tiene {n_sec} diapositivas, se esperaban {DIAPOSITIVAS}"
    assert len(refs) == VIDEOS, f"la fuente referencia {len(refs)} videos, se esperaban {VIDEOS}"
    assert vivos == SIMULACIONES, f"simulaciones en vivo: {sorted(vivos)}"
    assert html.count("Reveal.initialize({") == 1

    # --- CSS y JS ---
    # Los comentarios se dejan como están (la fuente tiene <script src="index.js"> comentado).
    html, n_css = fuera_de_comentarios(
        r'<link\s+href="(?P<href>[^"]+)"\s+rel="stylesheet"\s*/?>', incrustar_css, html)
    html, n_js = fuera_de_comentarios(
        r'<script\s+src="(?P<src>[^"]+)"\s*>\s*</script>', incrustar_js, html)

    # --- videos ---
    claves = {}
    def marcar(m):
        ruta = ruta_local(m.group(1))
        clave = ruta.name
        claves[clave] = ruta
        return f'data-video-incrustado="{clave}"'
    html = re.sub(r'data-background-video="([^"]+)"', marcar, html)

    bloques = []
    total_bytes = 0
    for clave, ruta in claves.items():
        crudo = ruta.read_bytes()
        total_bytes += len(crudo)
        b64 = base64.b64encode(crudo).decode("ascii")
        bloques.append(f'<script type="application/octet-stream" data-video="{clave}">{b64}</script>')
    registro = "<!-- videos incrustados (base64, sin recodificar) -->\n" + "\n".join(bloques) + "\n" + DECODIFICADOR

    # El registro va justo antes del primer script de la página (reveal.js), que va antes de
    # Reveal.initialize: así los <section> ya existen y el atributo está listo cuando reveal lo lee.
    i = html.index("<script")
    html = html[:i] + registro + html[i:]
    assert html.rindex("Reveal.initialize({") > html.index("window.__videosIncrustados = urls;")

    # --- procedencia y créditos dentro del propio archivo, que viaja solo ---
    creditos = CREDITOS.read_text(encoding="utf-8").replace("--", "—")
    cabecera = (
        "<!--\n"
        "  Entre el orden y el caos · versión autocontenida (file://, sin red).\n"
        "  GENERADO: no editar. Fuente: presentacion/entre-el-orden-y-el-caos.fuente.html\n"
        "  Comando: python simulaciones/empaquetar_presentacion.py\n"
        "  Exportada con Manim Slides; usa reveal.js (MIT, © Hakim El Hattab, licencia íntegra en su bloque).\n\n"
        f"{creditos}\n"
        "-->\n"
    )
    html = html.replace("<html>", "<html>\n" + cabecera, 1)

    # --- verificación del resultado ---
    sin_comentarios = re.sub(r"<!--.*?-->", "", html, flags=re.S)
    assert "_assets" not in sin_comentarios, "queda una referencia a la carpeta de assets"
    assert not re.search(r'<(?:link|script|img|video|source|iframe)\b[^>]*\b(?:src|href)="(?!data:|\$\{)',
                         sin_comentarios), "queda un recurso externo"
    assert len(re.findall(r"<section\b", html)) == DIAPOSITIVAS
    assert len(re.findall(r'data-video-incrustado="', html)) == VIDEOS

    tmp = SALIDA.with_suffix(".html.tmp")
    tmp.write_text(html, encoding="utf-8")
    tmp.replace(SALIDA)

    tam = SALIDA.stat().st_size
    sha = hashlib.sha256(SALIDA.read_bytes()).hexdigest()
    print(f"Escrito {SALIDA.relative_to(RAIZ)}")
    print(f"  diapositivas {DIAPOSITIVAS}, videos {len(claves)} ({total_bytes / 2**20:.1f} MiB sin codificar),"
          f" simulaciones {len(vivos)}, CSS {n_css}, JS {n_js}")
    print(f"  tamaño {tam} bytes = {tam / 2**20:.1f} MiB · sha256 {sha}")
    print(f"  {time.time() - t0:.1f} s")


if __name__ == "__main__":
    main()
