# Verificación de la integración

Verificación sobre la copia del taller, 2026-11-18:

- `create-agent --strict` y `handler validate --strict`: seis agentes válidos,
  cero errores y advertencias. Los cuatro avisos informativos son requisitos
  anteriores de Python, Typst y consultas bibliográficas; no son permisos concedidos.
- Las trece skills incorporadas pasan `agentskills validate`.
- Los 42 scripts Python de las skills científicas pasan análisis sintáctico;
  no se ejecutaron sus proveedores ni búsquedas.
- La plantilla modular de esta skill compila con Typst 0.15.1: salida 0 y PDF
  temporal fuera del repositorio, sin inspección visual. No se modificó el paper
  del taller ni se afirma haberlo compilado en esta entrega.
- Revisión independiente de propietarios, rutas, límites y licencias: aprobada
  tras corregir la ruta bibliográfica, el fallback de caché, el traspaso de
  figuras y los avisos de licencia de componentes terceros.

Validar declaraciones o compilar una plantilla no demuestra una ejecución
completa de los seis agentes ni la aplicación de sus permisos por un proveedor.
No se ejecutaron simulaciones largas, render Remotion ni generación de diapositivas
por incorporar instrucciones. Esas comprobaciones corresponden al encargo concreto.
