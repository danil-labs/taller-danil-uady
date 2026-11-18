"""Empaqueta la presentación «Entre el orden y el caos» en un solo HTML autocontenido.

    python simulaciones/empaquetar_presentacion.py

Lee la fuente editable `presentacion/entre-el-orden-y-el-caos.fuente.html` (la que exporta
Manim Slides, más las simulaciones en vivo) y sus archivos en
`presentacion/entre-el-orden-y-el-caos_assets/`, y escribe
`presentacion/entre-el-orden-y-el-caos.html`: un único archivo que se abre con doble clic
(file://), sin red ni servidor.

El mismo archivo funciona también en el visor HTML de Danil, que lo pinta dentro de un
<iframe sandbox="allow-scripts"> con una CSP sin red: script-src 'unsafe-inline' (sin data:),
media-src/img-src/font-src data: (sin blob:). Qué hace, sin tocar los originales:

- Declara `<meta name="harness-artefacto" content="web">`: el visor no le aplica su modo
  documento ni su navegación propia; reveal.js navega.
- Cada `<link rel="stylesheet">` local pasa a un `<style>` (las fuentes ya vienen en data: dentro
  de black.css).
- Cada `<script src>` local pasa a un `<script>` en línea. «<!--», «<script» y «</script» se
  escriben «\x3C!--»… (en notes.js están dentro de plantillas y de una expresión regular, donde
  significan lo mismo), con el número exacto esperado por archivo.
- Cada video va como `data:video/mp4;base64,…` en su propio `data-background-video`. reveal.js
  separa ese atributo por comas; en la copia empaquetada se cambia exactamente una expresión para
  que una data: URL vaya entera (falla si reveal.js cambia).
- Todos los videos llevan `data-background-video-muted`, para que arranquen sin gesto del usuario
  dentro del marco; antes se comprueba que ningún MP4 tiene pista de audio.
- Los videos no se recodifican. Los que no se referencian no se incluyen.

Prueba: `simulaciones/probar_presentacion.mjs` (file:// y, con --visor, el envoltorio oficial).

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

# El visor de Danil pinta el HTML en un iframe sandbox="allow-scripts" (origen opaco) con esta CSP
# (packages/chat/src/sandbox.ts): script-src 'unsafe-inline' (sin data:), media-src data: (sin blob:),
# img/font-src data:. Todo lo de abajo está hecho para caber en ella y, a la vez, abrir con file://.
PELIGROSO_EN_SCRIPT = re.compile(r"<!--|<script|</script", re.IGNORECASE)
# Cuántas secuencias peligrosas se espera escapar en cada script; si cambia la versión, se revisa.
ESCAPES_ESPERADOS = {"reveal.js": 0, "notes.js": 3}

# reveal.js separa data-background-video por comas para admitir varias <source>, y una data: URL
# lleva una coma tras «base64». Solo en la copia empaquetada: una data: URL va entera.
REVEAL_ORIGINAL = "o.split(`,`).forEach(t=>{let n=document.createElement(`source`)"
REVEAL_PARCHE = "(/^data:/.test(o.trim())?[o.trim()]:o.split(`,`)).forEach(t=>{let n=document.createElement(`source`)"

# Le dice al visor que es una página web: no le aplica su modo «documento» ni su navegación de
# diapositivas; reveal.js se encarga de todo.
META_VISOR = '<meta name="harness-artefacto" content="web"/>'


def pistas_mp4(datos):
    """Tipos de pista (hdlr) de un MP4: 'vide', 'soun'… Recorre moov/trak/mdia/hdlr."""
    tipos = []
    def cajas(ini, fin):
        i = ini
        while i + 8 <= fin:
            tam = int.from_bytes(datos[i:i + 4], "big"); tipo = datos[i + 4:i + 8]; cab = 8
            if tam == 1:
                tam = int.from_bytes(datos[i + 8:i + 16], "big"); cab = 16
            elif tam == 0:
                tam = fin - i
            if tam < cab:
                break
            yield tipo, i + cab, i + tam
            i += tam
    def bajar(ini, fin):
        for tipo, a, b in cajas(ini, fin):
            if tipo in (b"moov", b"trak", b"mdia"):
                bajar(a, b)
            elif tipo == b"hdlr":
                tipos.append(datos[a + 8:a + 12].decode("latin-1"))
    bajar(0, len(datos))
    return tipos


def ruta_local(href):
    """La fuente de Manim Slides usa «\\» en algunas rutas; aquí se normaliza a «/»."""
    return (PRES / href.replace("\\", "/")).resolve()


def incrustar_css(m):
    ruta = ruta_local(m.group("href"))
    css = ruta.read_text(encoding="utf-8")
    assert "</style" not in css.lower(), f"{ruta.name} contiene </style"
    return f"<style>/* {ruta.name} */\n{css}\n</style>"


def incrustar_js(m):
    """Siempre en línea (la CSP del visor no admite script src=data:). «<!--», «<script» y
    «</script» se escriben «\x3C!--»…: dentro de una cadena, una plantilla o una expresión regular
    de JS, «\x3C» es «<», así que el código no cambia, y el analizador HTML ya no los ve."""
    ruta = ruta_local(m.group("src"))
    js = ruta.read_text(encoding="utf-8")
    n = len(PELIGROSO_EN_SCRIPT.findall(js))
    assert n == ESCAPES_ESPERADOS.get(ruta.name, 0), f"{ruta.name}: {n} secuencias que escapar"
    js = PELIGROSO_EN_SCRIPT.sub(lambda x: "\\x3C" + x.group(0)[1:], js)
    if ruta.name == "reveal.js":
        assert js.count(REVEAL_ORIGINAL) == 1, "reveal.js cambió: revisa el parche de data-background-video"
        js = js.replace(REVEAL_ORIGINAL, REVEAL_PARCHE)
    assert not PELIGROSO_EN_SCRIPT.search(js)
    return f"<script>/* {ruta.name} */\n{js}\n</script>"


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

    # --- videos: data: URL en el propio atributo, sin recodificar ---
    # Sin pista de audio, «muted» no cambia nada que se oiga y deja que el navegador los arranque
    # sin un gesto del usuario, como hace falta dentro del iframe del visor.
    claves = {}
    total_bytes = 0
    def incrustar_video(m):
        nonlocal total_bytes
        ruta = ruta_local(m.group(1))
        crudo = ruta.read_bytes()
        pistas = pistas_mp4(crudo)
        assert pistas == ["vide"], f"{ruta.name}: pistas {pistas}; con audio, «muted» lo silenciaría"
        if ruta.name not in claves:
            total_bytes += len(crudo)
        claves[ruta.name] = ruta
        b64 = base64.b64encode(crudo).decode("ascii")
        return f'data-background-video="data:video/mp4;base64,{b64}" data-video-origen="{ruta.name}"'
    html = re.sub(r'data-background-video="([^"]+)"', incrustar_video, html)
    html = re.sub(r'(<section\b[^>]*?) data-background-video-muted=""', r"\1", html)
    html, n_mudos = re.subn(r"(<section\b[^>]*?)(data-background-video=)", r"\1data-background-video-muted \2", html)
    assert n_mudos == VIDEOS

    # --- el visor ---
    html, n_meta = re.subn(r'(<meta charset="utf-8"\s*/?>)', r"\1" + META_VISOR, html, count=1)
    assert n_meta == 1

    # --- procedencia y créditos dentro del propio archivo, que viaja solo ---
    creditos = CREDITOS.read_text(encoding="utf-8").replace("--", "—")
    cabecera = (
        "<!--\n"
        "  Entre el orden y el caos · versión autocontenida: file:// sin red y visor HTML de Danil (CSP + sandbox).\n"
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
    assert len(re.findall(r'data-background-video="data:video/mp4;base64,', html)) == VIDEOS
    assert len(re.findall(r'<section\b[^>]*?data-background-video-muted data-background-video="data:', html)) == VIDEOS
    assert "blob:" not in sin_comentarios and "<script src=" not in sin_comentarios

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
