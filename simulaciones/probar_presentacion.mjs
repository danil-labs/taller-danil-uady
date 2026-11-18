// Prueba de la presentación autocontenida en un Chrome sin red.
//
//   node simulaciones/probar_presentacion.mjs <copia.html> <chrome> [carpeta-capturas]
//   node --experimental-strip-types simulaciones/probar_presentacion.mjs <copia.html> <chrome> [capturas] \
//        --visor <ruta>/sandbox.ts
//
// Sin --visor abre la copia con file://. Con --visor la pinta como el visor HTML de Danil: escribe al
// lado de la copia un anfitrión con <iframe sandbox="…" srcdoc="envolver(html)">, usando
// `envolver` y `SANDBOX_ARTEFACTO` del sandbox.ts oficial (su CSP incluida), y prueba dentro del
// marco. Usa una copia del HTML en una carpeta vacía (sin entre-el-orden-y-el-caos_assets/) para
// demostrar que no depende de nada más. Sin dependencias: habla CDP con el WebSocket de Node ≥ 22.
// La política de autoplay es la normal de Chrome de escritorio (hace falta gesto salvo en silencio).
// Comprueba: 51 diapositivas, 47 videos data: que arrancan solos y se reproducen a 3x, la barra
// espaciadora, las flechas, las cuatro simulaciones en vivo (dibujan, se animan, responden a sus
// controles), que no se pidió nada fuera de file:/data:/about: y que no hubo violaciones de CSP.
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const iv = args.indexOf("--visor");
const sandboxTs = iv >= 0 ? args.splice(iv, 2)[1] : null;
const iw = args.indexOf("--ventana");                       // p. ej. 820,760: el tamaño del panel
const ventana = iw >= 0 ? args.splice(iw, 2)[1] : "1600,900";
const ih = args.indexOf("--humo");                          // solo arranque, una flecha y una simulación, con capturas
const humo = ih >= 0 ? !!args.splice(ih, 1) : false;
const [html, chrome, capturas] = args;
if (!html || !chrome) { console.error("uso: node probar_presentacion.mjs <copia.html> <chrome> [capturas] [--visor sandbox.ts]"); process.exit(2); }

let destino = pathToFileURL(resolve(html)).href;
if (sandboxTs) {
  const { envolver, SANDBOX_ARTEFACTO, CSP_ARTEFACTO, formaDe } = await import(pathToFileURL(resolve(sandboxTs)).href);
  const crudo = readFileSync(html, "utf8");
  const doc = envolver(crudo);
  const attr = doc.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const anfitrion = join(dirname(resolve(html)), "anfitrion-visor.html");
  // frame-src 'self' imita la política de la ventana de la app que embebe el marco.
  writeFileSync(anfitrion, `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="frame-src 'self'"></head>` +
    `<body style="margin:0;overflow:hidden"><iframe id="marco" sandbox="${SANDBOX_ARTEFACTO}" srcdoc="${attr}" style="display:block;border:0;width:100vw;height:100vh"></iframe></body></html>`);
  destino = pathToFileURL(anfitrion).href;
  console.log(`Visor: forma «${formaDe(crudo)}», sandbox="${SANDBOX_ARTEFACTO}", CSP «${CSP_ARTEFACTO.slice(0, 60)}…»`);
}

const perfil = mkdtempSync(join(dirname(resolve(html)), ".perfil-"));
const proc = spawn(chrome, [
  "--headless", "--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader",  // WebGL por software para Mandelbrot
  "--mute-audio", "--hide-scrollbars",
  "--autoplay-policy=document-user-activation-required", `--window-size=${ventana}`,  // la política normal, no la relajada
  "--proxy-server=127.0.0.1:9", "--proxy-bypass-list=<-loopback>",   // cualquier petición de red falla
  `--user-data-dir=${perfil}`, "--remote-debugging-port=0", "about:blank",
], { stdio: ["ignore", "ignore", "pipe"] });

const wsUrl = await new Promise((ok, mal) => {
  let buf = "";
  proc.stderr.on("data", d => { buf += d; const m = buf.match(/DevTools listening on (ws:\S+)/); if (m) ok(m[1]); });
  setTimeout(() => mal(new Error("Chrome no arrancó:\n" + buf)), 20000);
});
const puerto = new URL(wsUrl).port;
const pags = await (await fetch(`http://127.0.0.1:${puerto}/json/list`)).json();
const ws = new WebSocket(pags.find(p => p.type === "page").webSocketDebuggerUrl);
await new Promise(ok => ws.addEventListener("open", ok));

let id = 0; const pend = new Map(); const peticiones = []; const errores = []; const csp = [];
let sesionMarco = null; const contextos = [];           // el marco puede ser otro proceso (OOPIF) o un contexto del mismo
ws.addEventListener("message", ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pend.has(m.id)) { const { ok, mal } = pend.get(m.id); pend.delete(m.id); m.error ? mal(new Error(JSON.stringify(m.error))) : ok(m.result); }
  const p = m.params || {};
  if (m.method === "Target.attachedToTarget" && p.targetInfo.type === "iframe") { sesionMarco = p.sessionId; prepararSesion(p.sessionId); }
  if (m.method === "Runtime.executionContextCreated") contextos.push({ s: m.sessionId || null, id: p.context.id, frame: p.context.auxData?.frameId, def: p.context.auxData?.isDefault, origin: p.context.origin });
  if (m.method === "Network.requestWillBeSent") peticiones.push(p.request.url.slice(0, 80));
  if (m.method === "Runtime.exceptionThrown") errores.push(p.exceptionDetails.exception?.description || p.exceptionDetails.text);
  if (m.method === "Runtime.consoleAPICalled" && p.type === "error") errores.push(p.args.map(a => a.value ?? a.description).join(" "));
  if (m.method === "Log.entryAdded" && /Content Security Policy|Refused to/i.test(p.entry.text)) csp.push(p.entry.text.slice(0, 200));
});
const enviar = (sessionId, method, params = {}) => new Promise((ok, mal) => {
  const i = ++id; pend.set(i, { ok, mal }); ws.send(JSON.stringify({ id: i, method, params, ...(sessionId ? { sessionId } : {}) }));
});
const cdp = (method, params = {}) => enviar(null, method, params);   // página de arriba: entrada y capturas
async function prepararSesion(s) {
  await enviar(s, "Runtime.enable"); await enviar(s, "Log.enable"); await enviar(s, "Network.enable").catch(() => {});
  await enviar(s, "Runtime.runIfWaitingForDebugger").catch(() => {});
}
let marcoId = null;
function contextoMarco() {
  if (!sandboxTs) return { s: null, ctx: undefined };
  if (sesionMarco) { const c = contextos.filter(c => c.s === sesionMarco && c.def).pop(); return { s: sesionMarco, ctx: c?.id }; }
  const c = contextos.filter(c => !c.s && c.def && c.frame && c.frame !== marcoId).pop();
  return { s: null, ctx: c?.id };
}
const ev = async (expr) => {
  const { s, ctx } = contextoMarco();
  const r = await enviar(s, "Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true, ...(ctx ? { contextId: ctx } : {}) });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
};
const espera = ms => new Promise(ok => setTimeout(ok, ms));
const tecla = async (key, code, keyCode) => {
  for (const type of ["keyDown", "keyUp"]) await cdp("Input.dispatchKeyEvent", { type, key, code, windowsVirtualKeyCode: keyCode, nativeVirtualKeyCode: keyCode, ...(key === " " && type === "keyDown" ? { text: " " } : {}) });
};
const clic = async (x, y) => {
  for (const type of ["mousePressed", "mouseReleased"]) await cdp("Input.dispatchMouseEvent", { type, x, y, button: "left", clickCount: 1 });
};
const captura = async nombre => {
  if (!capturas) return;
  const { data } = await cdp("Page.captureScreenshot", { format: "png" });
  writeFileSync(join(capturas, (sandboxTs ? "visor-" : "") + nombre + ".png"), Buffer.from(data, "base64"));
};

const fallos = []; const ok = (cond, msg) => { console.log((cond ? "  ok    " : "  FALLA ") + msg); if (!cond) fallos.push(msg); };

await cdp("Target.setAutoAttach", { autoAttach: true, waitForDebuggerOnStart: false, flatten: true });
await cdp("Network.enable"); await cdp("Runtime.enable"); await cdp("Page.enable"); await cdp("Log.enable");
await cdp("Network.emulateNetworkConditions", { offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
marcoId = (await cdp("Page.getFrameTree")).frameTree.frame.id;
const t0 = Date.now();
await cdp("Page.navigate", { url: destino });
for (let i = 0; i < 240; i++) { await espera(250); if (await ev("!!(window.Reveal && Reveal.isReady && Reveal.isReady())").catch(() => false)) break; }
console.log(`Reveal listo en ${((Date.now() - t0) / 1000).toFixed(1)} s${sandboxTs ? ` · marco ${sesionMarco ? "en otro proceso" : "en el mismo proceso"}` : ""}`);

console.log("Estructura");
if (sandboxTs) {
  ok(await ev("location.href") === "about:srcdoc" && await ev("self.origin") === "null", `dentro del marco: ${await ev("location.href")}, origen ${await ev("self.origin")}`);
  ok(await ev(`!!document.querySelector('meta[http-equiv="Content-Security-Policy"]')`), "la CSP del visor está puesta en el marco");
  ok(await ev(`document.body.classList.contains('harness-web')`), "el visor lo trata como página web (harness-web)");
}
ok(await ev("Reveal.getTotalSlides()") === 51, "51 diapositivas");
ok(await ev(`[...document.querySelectorAll('section[data-background-video]')].filter(s=>s.dataset.backgroundVideo.startsWith('data:video/mp4;base64,')).length`) === 47, "47 diapositivas con data-background-video data:");
ok(await ev(`[...document.querySelectorAll('.slide-background video source')].every(s=>s.getAttribute('src').startsWith('data:video/mp4;base64,'))`), "reveal.js no partió las data: URL por la coma");
ok(await ev("typeof RevealNotes") === "function", "notes.js (escapado) se ejecutó");
ok(await ev(`document.createElement('video').canPlayType('video/mp4; codecs="avc1.4d401f"')`) !== "", "el navegador declara H.264");

console.log("Arranque sin gesto del usuario");
await espera(1500);
const v0 = await ev(`(()=>{const v=Reveal.getCurrentSlide().slideBackgroundContentElement.querySelector('video');return v&&{t:v.currentTime,d:v.duration,paused:v.paused,ended:v.ended,r:v.playbackRate,e:v.error&&v.error.code}})()`);
ok(v0 && !v0.e && v0.t > 0 && (!v0.paused || v0.ended) && v0.r === 3, `el primer video arranca solo a 3x antes de cualquier clic (${JSON.stringify(v0)})`);
await captura("d00-arranque");

if (humo) {
  const [w, h] = ventana.split(",").map(Number);
  await clic(w / 2, h / 3); await espera(200);
  await tecla("ArrowRight", "ArrowRight", 39); await espera(1200);
  ok(await ev("Reveal.getIndices().h") === 1, "humo: clic y flecha derecha pasan a la diapositiva 2");
  await captura("humo-d02-flecha");
  const arena = await ev(`Reveal.getSlides().findIndex(s=>s.dataset.vivo==='arena')`);
  await ev(`Reveal.slide(${arena})`); await espera(2500);
  ok(await ev(`Reveal.getCurrentSlide().dataset.vivoMontado === "1"`), "humo: la pila de arena se monta");
  await captura("humo-arena");
  ok(csp.length === 0 && errores.length === 0, `humo: sin violaciones de CSP ni errores ${JSON.stringify(csp.concat(errores)).slice(0, 200)}`);
  ws.close(); proc.kill(); await espera(300); rmSync(perfil, { recursive: true, force: true });
  console.log(fallos.length ? `\n${fallos.length} FALLOS` : "\nTodo bien");
  process.exit(fallos.length ? 1 : 0);
}

console.log("Videos (las 51 diapositivas, en orden)");
const vivos = {};
let reproducidos = 0, a3x = 0;
const malos = [];
for (let h = 0; h < 51; h++) {
  await ev(`Reveal.slide(${h})`);
  const nombre = await ev("Reveal.getCurrentSlide().dataset.vivo || ''");
  if (nombre) { vivos[nombre] = h; continue; }
  let estado = null;
  for (let i = 0; i < 40; i++) {
    await espera(100);
    estado = await ev(`(()=>{const v=Reveal.getCurrentSlide().slideBackgroundContentElement.querySelector('video');
      return v && {t:v.currentTime, r:v.playbackRate, e:v.error&&v.error.code, rs:v.readyState, w:v.videoWidth, src:v.currentSrc.slice(0,5), paused:v.paused, d:v.duration}})()`);
    if (estado && (estado.t > 0.3 || estado.e || (estado.paused && estado.t > 0 && estado.t >= estado.d - 0.05))) break;
  }
  const bien = estado && !estado.e && estado.w > 0 && estado.t > 0 && estado.src === "data:";
  if (bien) reproducidos++; if (estado && estado.r === 3) a3x++;
  if (!bien || estado.r !== 3) malos.push({ h, ...estado });
  if (h === 0) await captura("d00-video");
}
ok(reproducidos === 47, `47 videos decodifican y avanzan (${reproducidos})`);
ok(a3x === 47, `47 videos a playbackRate 3 (${a3x})`);
if (malos.length) console.log("    ", JSON.stringify(malos));

// 3x de verdad: tiempo de video frente a tiempo de reloj, en un video largo
const largo = await ev(`(()=>{let m=-1,dm=0;Reveal.getSlides().forEach((s,i)=>{const v=s.slideBackgroundContentElement&&s.slideBackgroundContentElement.querySelector('video');if(v&&v.duration>dm){dm=v.duration;m=i}});return [m,dm]})()`);
await ev(`Reveal.slide(${largo[0]})`); await espera(300);
const m1 = await ev(`(()=>{const v=Reveal.getCurrentSlide().slideBackgroundContentElement.querySelector('video');return [v.currentTime, performance.now()]})()`);
await espera(1000);
const m2 = await ev(`(()=>{const v=Reveal.getCurrentSlide().slideBackgroundContentElement.querySelector('video');return [v.currentTime, performance.now()]})()`);
const razon = (m2[0] - m1[0]) / ((m2[1] - m1[1]) / 1000);
ok(razon > 2.4 && razon < 3.4, `avance medido ${razon.toFixed(2)}x en la diapositiva ${largo[0] + 1} (${largo[1].toFixed(1)} s de video)`);

console.log("Teclado");
// En el visor el teclado llega al marco cuando tiene el foco: como la persona, primero un clic en la diapositiva.
await clic(800, 300); await espera(200);
await ev(`Reveal.slide(${largo[0]})`); await espera(400);
await tecla(" ", "Space", 32); await espera(150);
ok(await ev(`Reveal.getCurrentSlide().slideBackgroundContentElement.querySelector('video').paused`) === true, "espacio pausa el video");
await tecla(" ", "Space", 32); await espera(300);
ok(await ev(`(()=>{const v=Reveal.getCurrentSlide().slideBackgroundContentElement.querySelector('video');return !v.paused && v.playbackRate===3})()`), "espacio lo reanuda a 3x");
await ev("Reveal.slide(1)"); await tecla("ArrowRight", "ArrowRight", 39); await espera(200);
ok(await ev("Reveal.getIndices().h") === 2, "flecha derecha avanza");
await tecla("ArrowLeft", "ArrowLeft", 37); await espera(200);
ok(await ev("Reveal.getIndices().h") === 1, "flecha izquierda retrocede");

console.log("Simulaciones en vivo");
ok(Object.keys(vivos).sort().join() === "arena,automatas,bosque,mandelbrot", `las cuatro presentes: ${JSON.stringify(vivos)}`);
const huella = `(()=>{const cs=[...Reveal.getCurrentSlide().querySelectorAll('canvas')];return cs.map(c=>{if(!c.width)return 0;
  const o=document.createElement('canvas');o.width=c.width;o.height=c.height;const g=o.getContext('2d');g.drawImage(c,0,0);  // vale para 2d y WebGL
  const d=g.getImageData(0,0,c.width,c.height).data;let s=0,n=0;for(let i=0;i<d.length;i+=4*97){s=(s*31+d[i]+d[i+1]*3+d[i+2]*7)%1000000007;if(d[i]+d[i+1]+d[i+2]>40)n++}return s+':'+n})})()`;
const centro = sel => ev(`(()=>{const r=Reveal.getCurrentSlide().querySelector(${JSON.stringify(sel)}).getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]})()`);
const botones = () => ev(`[...Reveal.getCurrentSlide().querySelectorAll('button')].map(b=>b.textContent.trim())`);
const pulsar = async texto => {
  const [x, y] = await ev(`(()=>{const b=[...Reveal.getCurrentSlide().querySelectorAll('button')].find(b=>b.textContent.trim()===${JSON.stringify(texto)});const r=b.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]})()`);
  await clic(x, y);
};
const rangoMover = async () => ev(`(()=>{const r=Reveal.getCurrentSlide().querySelector('input[type=range]');if(!r)return null;
  const v0=r.value;r.value=String(Number(r.min)+(Number(r.max)-Number(r.min))*0.8);r.dispatchEvent(new Event('input',{bubbles:true}));r.dispatchEvent(new Event('change',{bubbles:true}));return [v0,r.value]})()`);

for (const nombre of ["mandelbrot", "automatas", "arena", "bosque"]) {
  const h = vivos[nombre];
  await ev(`Reveal.slide(${h})`); await espera(1500);
  const montado = await ev(`Reveal.getCurrentSlide().dataset.vivoMontado === "1" && !/No se pudo/.test(Reveal.getCurrentSlide().textContent)`);
  const nCanvas = await ev(`Reveal.getCurrentSlide().querySelectorAll('canvas').length`);
  const f1 = await ev(huella); await espera(1200); const f2 = await ev(huella);
  const dibuja = f1.some(x => x && Number(String(x).split(":")[1]) > 0);
  console.log(`  [${nombre}] diapositiva ${h + 1}, ${nCanvas} lienzos, botones: ${JSON.stringify(await botones())}`);
  if (!montado || !dibuja) console.log("    texto:", (await ev("Reveal.getCurrentSlide().textContent")).slice(0, 200));
  ok(montado && nCanvas > 0 && dibuja, `${nombre}: se monta y dibuja`);
  await captura(`d${String(h + 1).padStart(2, "0")}-${nombre}`);

  if (nombre === "mandelbrot") {
    const [x, y] = await centro("canvas");
    const l0 = await ev(`Reveal.getCurrentSlide().querySelector('.mb-lectura')?.textContent || ''`);
    await cdp("Input.dispatchMouseEvent", { type: "mouseWheel", x, y, deltaX: 0, deltaY: -600 });
    await espera(400);
    await cdp("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
    await cdp("Input.dispatchMouseEvent", { type: "mouseMoved", x: x + 120, y: y + 40, button: "left", buttons: 1 });
    await cdp("Input.dispatchMouseEvent", { type: "mouseReleased", x: x + 120, y: y + 40, button: "left", clickCount: 1 });
    await espera(1500);
    const l1 = await ev(`Reveal.getCurrentSlide().querySelector('.mb-lectura')?.textContent || ''`);
    const f3 = await ev(huella);
    ok(JSON.stringify(f3) !== JSON.stringify(f2) || l1 !== l0, `mandelbrot: rueda y arrastre cambian la vista («${l0.slice(0, 40)}» → «${l1.slice(0, 40)}»)`);
    for (const b of (await botones()).slice(0, 3)) { await pulsar(b); await espera(500); }
    await captura(`d${String(h + 1).padStart(2, "0")}-${nombre}-zoom`);
  } else {
    ok(JSON.stringify(f1) !== JSON.stringify(f2) || nombre === "automatas", `${nombre}: se anima sola`);
    const bs = await botones();
    let cambios = 0;
    for (const b of bs) {
      const antes = await ev(huella);
      await pulsar(b); await espera(700);
      if (JSON.stringify(await ev(huella)) !== JSON.stringify(antes)) cambios++;
    }
    ok(bs.length > 0 && cambios > 0, `${nombre}: ${cambios}/${bs.length} botones cambian el dibujo`);
    const r = await rangoMover(); await espera(700);
    if (r) ok(r[0] !== r[1], `${nombre}: deslizador ${r[0]} → ${r[1]}`);
    await captura(`d${String(h + 1).padStart(2, "0")}-${nombre}-controles`);
  }
  // tras usar los controles, el teclado sigue siendo de reveal
  await tecla("ArrowRight", "ArrowRight", 39); await espera(250);
  ok(await ev("Reveal.getIndices().h") === h + 1, `${nombre}: tras los controles, la flecha sigue avanzando`);
}

console.log("Aislamiento");
const fuera = peticiones.filter(u => !/^(file:|data:|about:)/.test(u));
ok(fuera.length === 0, `ninguna petición fuera de file:/data:/about: (${peticiones.length} en total)${fuera.length ? " → " + fuera.join(", ") : ""}`);
ok(csp.length === 0, `sin violaciones de CSP${csp.length ? ": " + csp.slice(0, 3).join(" | ") : ""}`);
ok(errores.length === 0, `sin errores en consola${errores.length ? ": " + errores.slice(0, 5).join(" | ") : ""}`);
const mem = await ev("performance.memory ? Math.round(performance.memory.usedJSHeapSize/2**20) : null");
console.log(`  montón JS al final: ${mem} MiB`);

ws.close(); proc.kill(); await espera(300); rmSync(perfil, { recursive: true, force: true });
console.log(fallos.length ? `\n${fallos.length} FALLOS` : "\nTodo bien");
process.exit(fallos.length ? 1 : 0);
