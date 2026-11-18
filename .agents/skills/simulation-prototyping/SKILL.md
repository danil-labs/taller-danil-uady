---
name: simulation-prototyping
description: Construye prototipos y simulaciones explicativas con un modelo explícito, parámetros, unidades, límites y comprobaciones. Úsala cuando pidan «simula qué pasa si», «prototipa este mecanismo» o explorar un sistema con controles interactivos. Separa el modelo de la presentación, usa Anatomy para explicación física y remotion-video para una animación o vídeo solicitado. Una animación no acredita validez científica.
---

# Prototipos con modelo comprobable

## Entradas

Pregunta, variables, unidades, supuestos, datos autorizados, rango de parámetros
y salida deseada. Pregunta solo lo que impida definir el modelo; un supuesto no
confirmado se muestra como supuesto, no como comportamiento medido.

## Pasos

1. Define qué predice el modelo y qué omite. Distingue simulación exploratoria,
   reproducción de datos observados e ilustración conceptual. Conserva las fuentes.
2. Escribe el modelo separado de la UI, con entradas y salidas explícitas; usa una
   semilla fija cuando haya aleatoriedad. Tanto métricas como dibujo consumen ese
   mismo resultado, sin cifras decorativas ni un segundo modelo en la animación.
3. Comprueba unidades, casos límite, parámetros inválidos y propiedades relevantes:
   conservación, monotonía o comparación con un caso conocido, según el sistema.
   Compara pasos de integración cuando corresponda. No impongas propiedades falsas
   ni declares validación científica por pasar un ejemplo de juguete.
4. Elige la presentación: Anatomy para mecanismo explicativo; controles y gráficos
   para explorar parámetros; Remotion para una secuencia temporal o vídeo. Consulta
   las skills asignadas y la guía web vigente antes de escribir UI de navegador.
5. Deja los archivos en la carpeta de prototipo asignada, con instrucciones de
   ejecución, parámetros iniciales, casos comprobados, limitaciones y datos de
   salida. No escribe sobre figuras finales ni archivos de producto.
6. Comprueba lo que realmente puedas ejecutar. Si el entorno bloquea navegador o
   render, conserva el modelo y reporta esa verificación pendiente; no elude el
   bloqueo con otro ejecutable o un perfil del usuario.

## Salida

Prototipo reproducible, modelo y datos/supuestos identificados. Para documentos,
entrega a figuras una vista estática o datos exportables con su contexto. El vídeo
es una salida opcional; no reemplaza el modelo ni la imagen del documento.

## Ejemplo

«Simula cómo cambia una cola cuando llegan más trabajos de los que salen»:
modelo de llegadas/servicio, unidades y semilla explícitas, controles de carga y
comparación con un caso sin llegadas. No se atribuye el modelo a tráfico real
de Danil sin mediciones que lo respalden.

## Se activa con

- «Simula qué pasa si duplicamos las llegadas a la cola».
- «Prototipa este mecanismo con controles para sus parámetros».
- «Explícame este sistema mediante una simulación interactiva».

No se activa con «haz un gráfico de estas mediciones» (scientific-visualization)
ni «corrige la API del producto» (orchestrator de desarrollo).
