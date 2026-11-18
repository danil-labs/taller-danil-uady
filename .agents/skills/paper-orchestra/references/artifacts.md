# Entregas y trazabilidad

El árbol siguiente es genérico para encargos nuevos. En el ejemplo existente del
kit se conservan `paper/main.typ`, `paper/referencias.bib` y `paper/figuras/`;
no se crean una segunda bibliografía ni un principal en la raíz. El registro
editorial va en `trabajo/`. El reparto concreto está en `roles.md`.

Trabaja en la carpeta de documento autorizada, en una subcarpeta nueva cuando
no se haya acordado modificar archivos existentes. Los insumos se leen desde su
ubicación o se copian de forma explícita; nunca se borran para reiniciar una ronda.

```text
documento/
  main.typ o main.tex
  secciones/                 un escritor por archivo
  figuras/                   recursos estáticos y sus scripts/datos autorizados
  prototipos/                modelos, simulaciones y vídeos si se solicitan
  refs.bib                   solo si existen referencias
  trabajo/
    encargo.md
    esquema.md
    fuentes.md
    figuras.md
    afirmaciones.md
    revision.md
```

No hace falta un servicio, una base de datos ni un objeto de framework. Los
archivos son el estado del trabajo y permiten reanudarlo tras una interrupción.
Los nombres de secciones y carpetas se adaptan al idioma del documento.

## Qué recibe cada función

Antes de comenzar, recibe objetivo, formato, entradas concretas, archivos que
puede escribir y criterio de cierre. Al entregar, informa archivos producidos,
fuentes usadas, verificaciones realizadas y bloqueos. Un archivo inexistente,
vacío o con marcadores pendientes no cuenta como entrega final.

La coordinación revisa las entregas antes de usarlas: secciones del esquema
identificables; cada figura existente y con pie; cada cita con identidad y apoyo
registrados; afirmaciones y cifras con fuente. Cuando algo falla, devuelve el
hallazgo a su escritor. No toma una respuesta verbal por archivo entregado.

## Registro de afirmaciones

`trabajo/afirmaciones.md` contiene una tabla con:

| ID | Afirmación o cifra | Tipo | Fuente y ubicación | Uso en el documento | Estado |
|---|---|---|---|---|---|

Tipos: observación, cálculo, antecedente, inferencia, hipótesis o recomendación.
El estado dice verificada, pendiente o descartada. Los cálculos registran fórmula
y entradas. Una hipótesis puede permanecer en el texto si está presentada como
hipótesis; una cifra pendiente no se presenta como resultado observado.

## Revisión y reanudación

`trabajo/revision.md` fija la versión revisada (commit, copia o hashes), enumera
hallazgos y separa tres estados: verificación factual, compilación y revisión
visual. Para cada comprobación registra qué se hizo, resultado y limitaciones.
No se declara inspección visual cuando solo existe un PDF que no se abrió.

Antes de reanudar, comprueba si cambiaron datos, bibliografía, plantilla o texto.
Conserva las entregas vigentes y repite lo invalidado; no mezcla una figura antigua
con cifras nuevas ni una revisión anterior con un borrador posterior sin indicarlo.

## Cierre

Entrega fuentes editables, localización del PDF y estado real de las tres
verificaciones. Conserva como pendientes los requisitos de autoría, aprobación
humana y envío editorial. Un PDF compilado con marcadores o afirmaciones
experimentales sin respaldo se entrega como borrador, no como paper terminado.
