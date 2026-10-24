




## Enlaces del TP7

**Paquetes públicos** (se bajan con `docker pull` sin credenciales, etiquetados con el commit sobre el que va `v7.0.0`):
- ghcr.io/pedrogiussano2102407/ingsoft3-tp01-backend:sha-47327f08e08abd6cc4fdb4f1e3995bba335e9f26
- ghcr.io/pedrogiussano2102407/ingsoft3-tp01-frontend:sha-47327f08e08abd6cc4fdb4f1e3995bba335e9f26

**Corrida con la integración en VERDE y la e2e en ROJO:**
- Commit que rompió la app: `9f61714839e0445e9d7eb56637f9bc617070e2ca` (PR #34: el botón «Submit» pasa a «Enviar» en `tp2-invento/client/pages/edit/category.tsx`; no toca `e2e/`)
- Corrida: https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/40037895128
- Los dos reportes están como artefactos al pie de esa corrida: `playwright-report-integracion` (verde) y `playwright-report-e2e` (rojo, con captura y traza del fallo)

**Corrida completa en verde, hasta PROD:**
- El arreglo (PR #35, revierte el botón): https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/40081577354
- La corrida final, de la que sale `v7.0.0`: https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/40082541305

**Entornos** (corren en mi máquina, vivos hasta la defensa):
- QA: http://localhost:3000 (API: http://localhost:3001)
- PROD: http://localhost:3010 (API: http://localhost:3011)

**Release:** https://github.com/Pedrogiussano2102407/ingsoft3-tp01/releases/tag/v7.0.0


*************************************************************************************************************************************


## Enlaces de este TP (TP6)

**Paquetes públicos** (se bajan con `docker pull` sin credenciales, etiquetados con el commit de un merge):
- ghcr.io/pedrogiussano2102407/ingsoft3-tp01-backend:sha-bf6d855b6598fdab0e33bebcddf04d9dd83933bb
- ghcr.io/pedrogiussano2102407/ingsoft3-tp01-frontend:sha-bf6d855b6598fdab0e33bebcddf04d9dd83933bb

**Cadena de la Tarea 1:**
- Job del PR, con «Entrar al registry» salteado: https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/39135109921/job/117697930522
- Pasos de la corrida de `main`, con «Construir y publicar» último: https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/39135450273/job/117698928173

**Entornos** (corren en mi máquina, vivos hasta la defensa):
- QA: http://localhost:3000 (API: http://localhost:3001)
- PROD: http://localhost:3010 (API: http://localhost:3011)

**Corridas:**
- Deploy automático a QA: https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/39712913360/job/119608563642
- Rechazo con motivo escrito: https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/39891229230/attempts/2
- Aprobación y deploy a PROD, commit A (intento 2): https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/39773269184/attempts/2
- Deploy del commit B a PROD (PR #31): https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/39891229230
- Rollback de B a A (intento 3): https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/39773269184/attempts/3

**Commits:** A = `d0a9fa8c410edb1f3ff7a5215847a88bb24e2c50` (el que está en PROD y al que apunta el tag) · B = `e6740828917b5563a88586570aea0b13b96ea470`

**Release:** https://github.com/Pedrogiussano2102407/ingsoft3-tp01/releases/tag/v6.0.0

# Decisiones — TP1

## 1. Por qué Git no pudo resolver el conflicto solo

Git resuelve automáticamente los merges cuando los cambios tocan partes distintas del archivo, 
comparando cada rama contra su ancestro común. En este caso, las ramas `feature/titulo-a` y 
`feature/titulo-b` partieron del mismo commit de `main` y modificaron **la misma línea** 
(la primera línea del README) con contenido distinto. Git no tiene forma de saber cuál de las 
dos versiones es la "correcta" — no es una decisión técnica, es una decisión de contenido — 
así que me delegó la resolución marcando el archivo con los conflictos.

Para que nunca hubiera aparecido, alguna de las dos ramas tendría que haber partido de la otra 
ya mergeada (integración más frecuente), o los cambios tendrían que haber tocado líneas distintas 
del archivo.

## 2. Qué problemas encontré y cómo los solucioné

- Al intentar probar el push rechazado, usé `README.md` en el comando pero el archivo real seguía 
  llamándose así; me confundí porque GitHub muestra el nombre traducido ("LÉAME") en la interfaz 
  web. Con `dir` en la terminal confirmé el nombre real del archivo y corregí el comando.Ahi tuve que borrar el archivo
  "LEAME".


## 3. Declaración de uso de IA

Usé Claude como guía paso a paso para entender y ejecutar el flujo de Git/GitHub del TP: 
interpretar la guía, decidir qué comando correr en cada paso, y entender los mensajes de error 
que me iban apareciendo (por ejemplo el error de protected branch, o el archivo `LEAME.md` mal 
creado por accidente). No generó código ni contenido del repositorio por mí: cada comando lo 
ejecuté yo mismo en mi terminal, y cada decisión de merge/resolución de conflicto la tomé 
revisando lo que aparecía en pantalla. Verifiqué cada paso comparando la salida real de mi 
terminal y de GitHub contra lo que la guía y la IA indicaban antes de seguir.A su vez use la IA
para que me ayude a armar estas respuestas y que queden un poco mas "tecnicas" de lo que yo habria
respondido,de todas formas yo le mande lo que queria poner y la IA me lo formulo mejor.


*********************************************************************************************************************************************


## TP2 — Contenedores

### 1. Qué app elegí y por qué

Elegí invento(como no tenia app estuve consultandole a la IA que me recomiende apps que este en algun repo de github) (github.com/creme332/invento), un sistema de gestión de inventario en stack MERN
(React/Next.js + Node/Express + MongoDB), con JavaScript puro en el backend y TypeScript en el
frontend.

Contra los criterios de la guía:
- Ejecutable hoy: la levanté completa en local (frontend, backend y base) antes de comprometerme.
- Comandos de build conocidos: backend arranca con node ./bin/www (sin compilación); frontend
  compila con npm run build y arranca con npm start (Next.js).
- Conexión a la base parametrizable: vía MONGO_STRING en server/.env, sin tocar código.
- Lógica testeable: revisé los controllers y conté 11 reglas de negocio reales entre
  itemController.js y categoryController.js (validaciones de formato, unicidad de nombre de
  categoría, restricción de no borrar una categoría con items asociados, autorización por
  ADMIN_KEY, manejo de recursos inexistentes), muy por encima de las 4-6 que pide la guía para
  llegar cómodo a los 8 tests del TP5.
- Tamaño reducido: dos entidades (items y categorías), sin dependencias exóticas.

### 2. Decisiones de contenerización

- Imágenes base: node:20-alpine para backend y frontend (liviana), mongo:7 para la base.
- Backend: Dockerfile multi-stage con una etapa deps (npm ci --omit=dev, excluye nodemon)
  y una etapa final que solo copia node_modules y el código fuente. Sin paso de compilación,
  porque es JavaScript puro.
- Frontend: Dockerfile multi-stage con una etapa builder (instala todas las dependencias y
  corre npm run build) y una etapa final que copia node_modules, .next y package.json
  desde el builder. A diferencia del backend, acá el node_modules final no está podado (sigue
  incluyendo TypeScript, ESLint, etc.) — quedó identificado como mejora posible (npm prune
  --production o el modo output: 'standalone' de Next.js), no implementada por simplicidad.
- Qué persiste y qué no: solo los datos de MongoDB persisten, en el volumen nombrado
  mongo_data montado en /data/db. Los contenedores de backend y frontend son completamente
  descartables — no guardan estado propio.
- Comunicación entre servicios: el backend se conecta a la base por nombre de servicio
  (mongo:27017, resuelto por el DNS interno de Docker Compose), no por IP ni localhost.
- Orden de arranque: mongo → backend → frontend, encadenado con depends_on más
  condition: service_healthy en cada paso, no solo depends_on a secas (que solo espera a que el
  contenedor exista, no a que esté listo para recibir conexiones).

### 3. Problemas encontrados y cómo los resolví

- Healthcheck contra una ruta inexistente: definí el healthcheck del backend apuntando a /
  (que no existe en las rutas de la app, devuelve 404). Como wget --spider interpreta un 404 como
  fallo, el backend nunca pasaba a healthy, y el frontend, que depende de esa condición, nunca
  llegaba a arrancar. Lo detecté viendo el log repetido de "GET / 404" y el mensaje dependency
  failed to start: container invento-backend is unhealthy. Solución: apuntar el healthcheck a
  /categories, una ruta real que responde 200.
- docker run --env-file no interpreta comillas: mi .env tenía el valor de MONGO_STRING
  entre comillas (funciona con dotenv/node populatedb, que sí las remueve), pero al pasarlo con
  docker run --env-file las comillas quedaban como parte literal del valor, y Mongo rechazaba la
  cadena de conexión (Invalid scheme). Solución: sacar las comillas del .env.
- Bug real de la app, el frontend no llamaba a mi backend: probé la persistencia de datos
  (down/up y down -v) y el dashboard mostraba siempre los mismos datos, sin importar lo que
  hiciera con mi base local. Revisando el Network tab del navegador confirmé que el frontend estaba
  pidiendo datos a https://invento-backend.onrender.com (la demo pública en vivo del autor
  original), no a mi contenedor. La causa: en pages/_app.tsx, el código decide la URL del backend
  según process.env.NODE_ENV === "development", pero como seteo NODE_ENV=production en la
  imagen final (buena práctica de Docker), esa misma variable activaba la rama que apunta al backend
  remoto del autor. Solución: cambié esa línea para usar una variable propia
  (NEXT_PUBLIC_BACKEND_URL, con http://localhost:3001 como fallback) y agregué
  ENV NEXT_PUBLIC_BACKEND_URL=http://localhost:3001 en el Dockerfile antes del RUN npm run
  build, ya que en Next.js las variables NEXT_PUBLIC_* quedan horneadas en el bundle del
  navegador en tiempo de build y no se pueden inyectar después en runtime.


### 4. Uso de IA

Usé Claude como guía paso a paso para todo el proceso: interpretar la guía y decidir qué tareas
correspondían a cada punto, redactar los Dockerfiles y el docker-compose.yml a partir de la
estructura real de mi proyecto, y sobre todo para diagnosticar los tres problemas listados arriba
(leyendo mensajes de error de la terminal y del navegador conmigo). No generó el hallazgo del bug de
BACKEND_URL por su cuenta: lo detectamos juntos comparando el comportamiento esperado contra lo
que realmente mostraba el dashboard, y confirmé la causa yo mismo revisando el código fuente
(pages/_app.tsx) y el Network tab del navegador antes de aplicar el fix. Cada comando lo ejecuté
yo en mi propia terminal, verificando la salida real contra lo que se esperaba antes de seguir.


****************************************************************************************************************************************************


## TP3 — Planificación y trazabilidad

### 1. Duración del sprint y por qué

Elegí sprints de 1 semana. La cursada entrega y defiende un TP por semana (llevamos 4 semanas de
TPs hasta ahora), así que un sprint semanal es el que mejor calza con el ritmo real de trabajo:
cada sprint coincide con el ciclo de entrega/defensa de un práctico, en vez de inventar una
duración arbitraria que no tenga relación con mi calendario real.

### 2. Límite de trabajo en progreso y por qué

Elegí 2. Trabajo solo en este TP, y la regla de arranque que da la guía es personas + 1: 1 persona
más el "más uno" que sirve de válvula para cuando algo queda esperando (una revisión, una
respuesta) y necesito avanzar en otra cosa mientras tanto. Si lo subiera a un número más alto,
dejaría de cumplir su función: podría acumular tareas empezadas y no terminadas sin que la
herramienta me avise, que es exactamente el inventario de trabajo a medias que el límite existe
para evitar.

### 3. Diagnóstico de la historia mal escrita

La historia del ejercicio es: "Como desarrollador quiero crear la tabla usuarios para guardar los
datos." Está mal escrita porque es una tarea disfrazada de historia, no una historia real: crear
una tabla no es algo que un usuario "quiera" en el sentido de valor observable, es un paso técnico
interno. Además el "para" no es un beneficio real: "guardar los datos" es circular, es lo que hace
cualquier tabla por definición, no explica qué valor le llega a alguien. No tiene criterios de
aceptación verificables más allá de "la tabla existe", así que tampoco cumple con ser Testeable.

Cómo la reescribiría: subiéndola un nivel a una historia con beneficio real, por ejemplo "Como
usuario quiero poder registrarme con mi email y contraseña para poder acceder a mis datos
guardados en el sistema", con sus criterios de aceptación (ej: "el registro rechaza emails
duplicados", "la contraseña se guarda hasteada, no en texto plano"). "Crear la tabla usuarios"
pasa a ser una tarea técnica dentro de esa historia, no la historia en sí.

### 4. Problemas encontrados y cómo los resolví

- El mayor problema fue de infraestructura, no de Git en sí: al cambiar de rama con `git switch`
  o `git checkout`, la terminal se colgaba preguntando repetidamente si reintentar borrar
  carpetas de `tp2-invento`, sin poder escribir nada más. Probé pausar OneDrive (mi carpeta de
  trabajo está dentro de Documentos, sincronizada) sin éxito. Lo resolví borrando la carpeta
  conflictiva a mano con `Remove-Item -Recurse -Force` antes del cambio de rama, dejando que Git
  la reconstruyera entera desde el remoto con `git pull` una vez posicionado en la rama correcta
  — sin perder nada, porque el contenido ya estaba respaldado en GitHub desde el merge del TP2.
- Al revisar la guía con más cuidado noté que mis dos tareas de la historia no coincidían
  exactamente con las que pide reproducir ("escribir el workflow" y "publicar el reporte de
  tests como artefacto"): había creado una segunda tarea distinta (agregar badge al README).
  La renombré para alinearla con la guía en vez de dejar una tarea propia.

### 5. Declaración de uso de IA

Usé Claude como guía paso a paso durante todo el TP: para interpretar qué pedía cada sección de
la guía, decidir el orden de los pasos, y redactar los comandos de `gh` y el contenido de los
issues a partir de lo que la guía especificaba textualmente. También me ayudó a diagnosticar el
problema de bloqueo de archivos al cambiar de rama, proponiendo alternativas hasta encontrar una
que funcionara. No tomó decisiones de fondo por mí: la duración del sprint, el límite de trabajo
en progreso, y el diagnóstico de la historia mal escrita los pensé y escribí yo, verificando cada
paso contra la salida real de mi terminal y de GitHub antes de seguir.


******************************************************************************************************************************************************************

## TP4 — CI: Pipelines as Code

### 1. Estructura del pipeline

Tengo dos jobs en paralelo, build-backend y build-frontend, uno por cada Dockerfile del TP2.
Los separé porque son cosas independientes: si se rompe el frontend no tiene sentido esperar
a que termine el backend para enterarme. Al no tener un needs entre ellos, corren en paralelo
solos y cada uno en su propio runner, así que llega más rápido el aviso si algo falla.

### 2. Qué cachea y qué pasa si desaparece

Cachea las capas de Docker de cada imagen con cache-from/cache-to type=gha, mode=max. Cada
job tiene su propio scope (backend y frontend) porque si no lo pongo, los dos jobs comparten
el mismo cache por default y se pisan entre sí — vi eso mencionado en la guía y por suerte lo
configuré bien desde el principio. En mi caso se reutilizan las capas de instalar dependencias
(package.json, npm ci) cuando no cambié nada ahí. Si el cache desaparece, el pipeline anda
igual, solo que más lento porque arranca de cero.

### 3. Por qué usa mi Dockerfile y no compila por su cuenta

Porque el Dockerfile ya es como se construye mi app de verdad, es lo mismo que después se
despliega. Si el pipeline compilara por su lado con comandos sueltos, tendría dos formas
distintas de construir que en algún momento van a decir cosas distintas: el pipeline puede
decir que todo anda bien y la imagen real fallar igual. Usando el mismo Dockerfile me aseguro
de que se prueba exactamente lo que se usa después.

### 4. Problemas que tuve y cómo los resolví

- De nuevo se me trabó la terminal al cambiar de rama por lo de OneDrive (mismo problema que
  en el TP3). Lo resolví igual: borré la carpeta a mano con Remove-Item -Recurse -Force y
  dejé que git la reconstruyera con pull.
- Cuando fui a configurar el gate, no me aparecían build-backend ni build-frontend en el
  buscador de checks. Era porque GitHub solo muestra los que corrieron en la última semana:
  primero tenía que correr el pipeline una vez, y recién ahí configurar el gate.
- Para romper el build a propósito tuve que pensar bien qué romper, porque mi app es
  JavaScript puro sin compilación: escribir código roto no iba a hacer fallar el docker
  build. Rompí una dependencia en cambio, agregando un paquete que no existe al package.json
  del backend, y ahí sí falló el npm ci.
- Para ver el "Update branch" en acción tuve que tener dos PRs abiertos a la vez: mergeé
  el que arreglaba el build, y el otro pasó solo a decir que estaba desactualizado, con los
  checks en verde pero el merge igual bloqueado hasta actualizarlo.

### 5. Uso de IA

Usé Claude para ir entendiendo la guía paso a paso, decidir el orden correcto (por ejemplo
mergear el workflow real antes de intentar romper el build, para no probar contra el
placeholder del TP3), y para pensar juntos por qué mi stack necesitaba romper una dependencia
y no el código. También me ayudó a resolver de nuevo el problema de la terminal trabada. Las
decisiones de fondo (por qué esos jobs, qué cachea, por qué el Dockerfile) las pensé y escribí
yo, comprobando cada paso contra lo que realmente pasaba en mi terminal y en GitHub.




---



****************************************************************************************************************************************************


## TP5 — Testing y calidad

### 1. Qué lógica elegí testear y por qué esa

En el backend testeé los controladores de items y categorías, porque ahí están las reglas que más
duelen si fallan: la clave de admin para borrar, no borrar una categoría que tiene items, qué pasa
si el recurso no existe y que no se cree nada con datos inválidos. En el frontend testeé la lógica
pura de `client/common`: `categoryApi.ts` (cómo se llama a la API y cómo reacciona ante errores),
`stock.ts` (`stockLevel`, que decide el aviso de stock) y `utils.tsx`. Elegí cosas sin DOM ni red
porque se testean rápido y, si algo falla, se sabe enseguida dónde está el problema.

### 2. Umbral de cobertura y por qué ese número

- **Backend (jest): 65 % de líneas.** Antes de agregar el último test medía 70,54 % de líneas,
  90,9 % de ramas y 45 % de funciones. Puse 65 porque queda por debajo de lo que mido: si la
  cobertura baja me frena, pero no es un número inalcanzable. Después del test de `category_detail`
  (ver el punto 6) mido 71,31 % de líneas, 95,45 % de ramas y 45 % de funciones, o sea que el umbral
  queda 6,3 puntos abajo. El umbral es solo de líneas, pero la rama la reporto igual. Para subirlo
  tendría que testear lo que falta de `itemController.js` (63,93 % de líneas y 30 % de funciones).
- **Frontend (vitest 2.1.9): 90 % de líneas y 90 % de ramas.** Lo había puesto en 80 %, pero con ese
  número una función nueva sin tests no frenaba el build, así que lo subí a 90 %. Hoy mide 100 % en
  todo `common`.
- Cobertura publicada y reporte descargable (backend y frontend): https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/38962997202

### 3. Qué dejé afuera de la cuenta y por qué

- **Backend** (`jest.config.js`): saco con exclusiones, no con una lista de lo que entra, así un
  archivo nuevo entra solo en la cuenta. Excluí `bin/` (arranque del servidor), `app.js` (arranque
  y cableado de Express), `routes/` (solo une una URL con un controlador), `populatedb.js` (script
  para cargar datos de prueba, no es parte de la app) y los propios tests. Lo excluí después de
  comprobar que ahí no queda lógica de negocio: las reglas viven en los controladores, que sí se miden.
- Los modelos **no** los excluí: `models/category.js` mide 100 % y `models/item.js` tiene 0 % de
  funciones porque nadie llama al virtual `url` (línea 30). Prefiero dejar ese hueco a la vista.
- **Frontend** (`vitest.config.mts`): entra `common/**/*.{ts,tsx}`; salen los tests y `common/types.ts`,
  que solo tiene tipos y no genera código ejecutable.

### 4. Por qué un coverage alto no garantiza calidad

Con mi propio código: un test que llame a `category_detail` con una categoría que existe y no tenga
ningún `expect` ejecutaría la línea del `res.json(...)` y la cobertura subiría, pero no comprobaría
que se responde con la categoría correcta. La cobertura mide qué líneas se ejecutaron, no si alguien
verificó el resultado. Por eso mis tests miran valores y llamadas concretas (`toHaveBeenCalledWith`)
y no solo que el código corra. Además mi umbral del backend es solo de líneas, que es la métrica más
fácil de cumplir: una línea puede correr por un solo camino y contar como cubierta.

### 5. Tests con mock

- **Backend:** en `categoryController.test.js` reemplazo los modelos de Mongoose con `jest.mock`, así
  ningún test toca la base. El test de borrado exitoso verifica la interacción: `findByIdAndRemove` se
  llama una sola vez y con `"cat1"`. Un stub solo devolvería datos; acá el assert mira cómo se usó la
  dependencia, por eso es un mock.
- **Frontend:** en `categoryApi.test.ts` el `fetch` entra por parámetro como `fetchFalso` (`vi.fn()`).
  Los tests verifican que se llamó una vez y con qué argumentos, y que ante una entrada inválida no
  se sale a la red.
- **Refactor para poder mockear:** en el backend no hizo falta cambiar el código de producción, porque
  `jest.mock` reemplaza el módulo del modelo completo. En el frontend la función que llama a la API
  recibe `fetch` como parámetro en vez de usarlo directo, y eso permite pasarle un doble desde el test
  sin levantar ningún servidor.

### 6. El ejercicio de la rama sin cubrir

1. **Qué línea es:** `tp2-invento/server/controllers/categoryController.js`, línea 25,
   `if (category === null)`. El reporte marcaba sin recorrer el camino falso: que la categoría exista
   y se responda con `res.json(category)`.
2. **Qué entrada la recorrería:** que `Category.findById(...).exec()` devuelva un objeto, por ejemplo
   `{ _id: "cat1", name: "Herramientas" }`.
3. **Qué decidí:** agregué el test `categoria existente: responde con el json y no redirige`. Es la
   respuesta normal de la función y ningún test la verificaba: lo único que cubría era el redirect
   cuando la categoría no existe. Son pocas líneas y verifica la interacción (`res.json` con esa
   categoría y `res.redirect` sin llamar). Con ese test, `categoryController.js` pasó de 73,21 % a
   75 % de líneas y de 91,66 % a 100 % de ramas, y la rama de la línea 25 dejó de figurar sin
   recorrer. Dejé a propósito sin cubrir la otra que encontré (`itemController.js`, línea 144,
   `if (req.body.image)`): es un campo opcional y su camino verdadero solo asigna un valor. Es la
   única rama que queda sin recorrer en el backend.

### 7. Mi Pull Request bloqueado

- **Secuencia completa (PR #22):** agregué `client/common/stock.ts` (`stockLevel`) sin tests y el job
  `build-frontend` se puso en rojo en el paso «Correr los tests del frontend con coverage». El código
  compilaba y los 11 tests pasaban: frenó la cobertura.
  - Corrida roja: https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/38441500878
  - En el log: `ERROR: Coverage for lines (79.45%) does not meet global threshold (90%)`.
  - Frenó por **líneas**, con vitest 2.1.9: `stock.ts` tenía 0 % de líneas y, como se ve en el log,
    sus ramas figuraban en 100 %, porque esa versión no cuenta como ramas sin cubrir las de una
    función que ningún test ejecuta. Por eso el umbral de líneas es el que corta.
  - Lo arreglé con `common/stock.test.ts`: un `it.each` con un caso por camino y por borde (0, 1, 4,
    5, 19, 20 y los estados `Loaned`/`Reserved`). Pasé a 22 tests y 100 % en todo.
  - PR mergeado con squash: https://github.com/Pedrogiussano2102407/ingsoft3-tp01/pull/22
- **Freno vigente:** https://github.com/Pedrogiussano2102407/ingsoft3-tp01/pull/23 queda abierto y en
  rojo hasta la defensa. Agrega `common/descuento.ts` sin tests: `build-frontend` falla por líneas
  (80,21 % contra 90 %; las ramas quedan en 95,23 %, todavía arriba del umbral) y `build-backend`
  pasa. Con el check requerido en rojo, el merge está bloqueado.

### 8. Mi stack: qué usé para cada cosa

Mi app no es la de la cátedra (.NET): es Node/Express con jest en el backend y Next.js con
TypeScript y vitest en el frontend. Lo que usé en cada punto de la tabla de la guía:

- **Dónde viven los tests:** al lado del código (`*.test.js` en el backend, `*.test.ts` en el frontend).
- **Parametrizado:** `it.each` de vitest en el frontend (`stock.test.ts`).
- **Doble (mock):** `jest.fn()` y `jest.mock` en el backend (reemplazo los modelos de Mongoose) y
  `vi.fn()` en el frontend (`fetchFalso`).
- **Medir la cobertura:** `jest --coverage` en el backend y `vitest run --coverage` (proveedor v8) en
  el frontend.
- **Umbral que rompe el build:** `coverageThreshold` de jest (`global: { lines: 65 }`) y
  `coverage.thresholds` de vitest (líneas 90 y ramas 90). Si no se cumple, el comando termina con
  código de error y el job se pone en rojo.
- **Qué entra en la cuenta:** `collectCoverageFrom` con exclusiones en jest y `include`/`exclude` de
  `coverage` en vitest (detalle en el punto 3).
- **Reporte legible:** reporters `lcov` y `json-summary` en jest, y `text`, `html`, `lcov` y
  `json-summary` en vitest. El pipeline publica el resumen en el run y sube los reportes como
  artefactos descargables, de los dos lados.
- **Herramientas de test en el Dockerfile:** agregué una etapa `test` en cada Dockerfile que instala
  también las dependencias de desarrollo (jest y vitest); la etapa final de producción sigue sin
  ellas.

### 9. Problemas que tuve y cómo los resolví

- Al escribir los tests encontré bugs reales de `await`/`return` en `category_detail`,
  `item_delete_post`, `category_create_post` e `item_create_post` y los corregí.
- Con el umbral del frontend en 80 %, una función sin tests no frenaba el build; lo subí a 90 %.
- La tabla de cobertura de jest se me copiaba sin los nombres de archivo, así que saqué los números
  por archivo y las ramas sin recorrer directo del JSON de cobertura (`coverage-summary.json` y
  `coverage-final.json`).
- Pegando comandos en la terminal se me coló un `>` del prompt y PowerShell creó un archivo suelto
  (`erver`) con la salida de un comando. Lo borré antes de commitear para que no se colara en un PR.
- Al correr `git grep` la terminal quedó trabada en el paginador de Git; salí con `q` y después usé
  `--no-pager`.

### 10. Uso de IA

Usé Claude como guía paso a paso: para interpretar la guía, ordenar los pasos (rojo, tests, verde,
merge, y recién después el PR que queda abierto), armar el test de `stockLevel` y el de
`category_detail`, y leer los reportes de cobertura. También me ayudó a redactar el borrador de esta
sección, que después revisé y ajusté. Cada comando lo corrí yo en mi terminal y verifiqué la salida
real (la suite local, los reportes de cobertura y las corridas en Actions) antes de seguir. Puedo
explicar qué verifica cada assert. Lo que NO está cubierto: el camino verdadero de
`if (req.body.image)` en `itemController.js`, el virtual `url` de `models/item.js` y los tramos sin
tests de `itemController.js`; por eso el backend queda cerca del 71 % de líneas y no más arriba.


---

## TP6 — Entrega continua

### 1. Por qué se publica solo con verde
Hay tres eslabones encadenados. Nada entra a `main` sin los checks en verde (branch protection), solo `main` publica imágenes, y publicar es el último paso del job que testea. Así, una imagen en el registry significa «esto pasó la verificación». Si se publicara igual, el registry dejaría de significar eso y podría tener imágenes que nunca se probaron. Lo que la cadena no garantiza: un `docker push` hecho a mano entra igual, y un digest en lugar de un tag sería una referencia más fuerte.

### 2. Continuous Delivery vs Continuous Deployment
Implementé **Delivery**: QA se despliega solo tras el merge y PROD necesita una aprobación humana. Para llegar a Deployment me faltaría confianza automática: más tests, observabilidad y rollback automático.

### 3. El diseño de la cadena
`deploy-qa` usa `needs` para esperar a los dos builds y `if` para correr solo en un push a `main`. `deploy-prod` depende de `deploy-qa` y corre en el environment `production`, que exige aprobación. `ADMIN_KEY` vive en el environment de cada entorno con valores distintos, y el de PROD solo lo ve un job que ya pasó la aprobación. El deploy usa `github.sha`, o sea el commit verificado y no la punta de la rama. Lo comprobé con el rollback: re-ejecuté el deploy de la corrida de A mientras `main` ya estaba en B, y PROD volvió a las imágenes `sha-d0a9fa8`. El workflow no tiene un bloque `concurrency`, así que nada ordena dos corridas seguidas: cada una despliega su propio commit.

### 4. Qué miro antes de aprobar
Antes de aprobar el paso a PROD reviso tres cosas: que el smoke de QA pasó y que la corrida es de este commit (la etiqueta `sha-…` de las imágenes de QA coincide), que en QA puedo crear una categoría y borrarla con la `ADMIN_KEY` de QA, y que los checks del PR eran verdes y el cambio es el que quería promover. Lo que el aprobador no puede ver: errores que solo aparecen con carga o con datos reales, y cómo se comporta la versión nueva con usuarios. Para decidir mejor me faltaría observabilidad (métricas y logs) en vez de depender de una prueba manual.

Rechacé una corrida de `deploy-prod` en el gate de `production` con este motivo: «Rechazado: el cambio de esta corrida es solo un comentario de prueba (e674082). No hay motivo para promoverlo, y PROD tiene que seguir en d0a9fa8, el commit de la release». Esa corrida quedó rechazada, no desplegó nada y PROD siguió en el commit A. El rechazo está en: https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/39891229230/attempts/2

### 5. La letra chica de mi «free tier»
No uso Render ni una base en la nube: el entorno corre en mi máquina con un runner propio y un `docker compose` por entorno. El costo real es que el runner y Docker Desktop tienen que estar encendidos; si no, los deploys quedan en espera. Tampoco hay una URL pública: QA y PROD son `localhost` y se navegan en vivo desde mi máquina. Un runner propio en un repo público es un riesgo, porque un PR ajeno podría ejecutar código en mi equipo. Por eso el runner no corre como servicio ni como administrador, y está activada la aprobación para colaboradores externos.

### 6. Qué garantía gano frente a Render
Render reconstruiría la imagen desde el repo, y esa imagen podría no ser la que pasó el CI. Mis `compose` bajan la **imagen ya verificada**, por su etiqueta de commit, así que QA y PROD corren exactamente lo que probó el pipeline.

### 7. Qué prueba el smoke test y qué no
Prueba que un pedido atraviesa front, proxy, backend y Mongo y que responde `200`. Reintenta porque el arranque de los contenedores no es instantáneo. No dice **qué versión** corre: eso se verifica en la etiqueta de la imagen con `docker ps`.

### Qué quedó por variable y qué quedó dentro de la imagen
La dirección del backend (`BACKEND_URL`) **no** está dentro de la imagen del front: se lee del entorno al arrancar, en la ruta proxy de Next.js (`pages/api/[[...path]].ts`). Por eso la misma imagen sirve en QA y en PROD y cada una habla con su API. Por entorno también cambian los puertos, el nombre del proyecto de compose, la base de datos y la `ADMIN_KEY`. Dentro de la imagen queda el código y el build de cada servicio. Separar así la configuración del artefacto es lo que permite promover la misma imagen de un entorno a otro.

### Entornos: el fallback local
Elegí el plan local documentado: un runner propio en mi máquina y un `docker compose` por entorno, cada uno con su Mongo y su volumen (`invento_qa` e `invento_prod`). El deploy lo dispara el pipeline, no un `docker compose up` manual. Descarté Atlas y Render porque la base es un contenedor desde el TP2.

### 8. Patrón de deployment para una producción real y plan de rollback
**Patrón elegido: blue-green.** Mantendría dos entornos completos de producción (uno sirve el tráfico y el otro recibe la versión nueva) y cambiaría el tráfico de uno al otro una vez verificado. Lo elijo porque el rollback es instantáneo (se vuelve a apuntar al entorno anterior) y porque hoy mi `up -d` recrea los contenedores y produce un corte corto, que blue-green evita. Además ya tengo la mitad armada: QA y PROD son dos entornos completos que corren la misma imagen. El costo es mantener el doble de infraestructura mientras dura el cambio. No elijo canary porque necesita un balanceador que reparta un porcentaje del tráfico y métricas para decidir si la versión nueva funciona, y hoy no tengo ninguna de las dos. Lo que me falta para ejecutarlo: el balanceador que cambie el tráfico y observabilidad (métricas y logs) para decidir. Un límite que blue-green no resuelve: las dos versiones comparten la misma base, así que un cambio de esquema tendría que ser compatible hacia atrás.

**Plan de rollback actual (probado una vez de verdad).** Con PROD en el commit B (`e674082`), volví al commit A (`d0a9fa8`):
1. Decido volver atrás y registro la hora (`$t0`).
2. Re-ejecuto solo el job `deploy-prod` de la corrida de A, que usa las imágenes ya verificadas de ese commit.
3. El job queda en espera de aprobación y lo apruebo.
4. El job baja las imágenes, recrea los contenedores y corre el smoke con reintentos.
5. Verifico con `docker ps` que los contenedores `prod-...` vuelven a `sha-d0a9fa8`.

Tiempos medidos (hora local): el deploy del rollback tardó **1 min 1 s** (inicio 23:55:58, fin 23:56:59). Desde que decidí volver atrás hasta que PROD respondió pasaron **2 min 55 s** (23:54:04 a 23:56:59), de los cuales **1 min 25 s** fueron esperar mi propia aprobación y **29 s** pasaron entre aprobar y que arrancara el job. El rastro es el intento 3 de la corrida: https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/runs/39773269184/attempts/3

Esto ejercita la métrica DORA **tiempo de recuperación** (*time to restore service*). Dos límites: el rollback de código **no deshace los datos** de PROD, porque el volumen de Mongo no se toca (para eso haría falta un backup o migraciones reversibles), y el smoke no dice qué versión corre, por eso lo verifiqué en la etiqueta de la imagen.

### 9. Problemas encontrados y cómo los resolví
- En el runner de Windows, `bash` es el lanzador de WSL y fallaba con `HCS_E_CONNECTION_TIMEOUT`; pasé los pasos del deploy a PowerShell.
- El front tenía la URL del backend dentro de la imagen; la pasé a una variable que se lee al arrancar.
- Un bloque pegado dos veces duplicó el job `deploy-qa`; desde entonces reviso `git diff` antes de cada commit.
- Usar el mismo puerto en QA y PROD hacía que chocaran; les puse puertos y nombre de proyecto de compose distintos.
- Atlas y Render no encajaban con una base que es un contenedor, así que elegí el plan local.

### Declaración de uso de IA
Usé Claude como guía para interpretar la consigna, armar el workflow de deploy, los `compose` y el proxy, y diagnosticar errores. Cómo lo verifiqué: ejecuté cada paso en mi máquina, revisé el `git diff` antes de cada commit, comprobé con `docker ps` la etiqueta de las imágenes en cada entorno, y probé el rechazo, la aprobación y el rollback en Actions. Puedo explicar qué pasa entre el merge y PROD: el merge dispara el CI; si los dos builds pasan, publican las imágenes con el commit; `deploy-qa` las baja y las levanta en mi runner y corre el smoke; `deploy-prod` espera mi aprobación y recién entonces hace lo mismo con `compose.prod.yml`.







---

## TP7 — Contenedores en el pipeline + integración y e2e

### 1. Build once, deploy many
La imagen se construye una sola vez, en `build-backend` y `build-frontend`, y se publica con el commit como etiqueta (`sha-<commit>`) solo cuando el cambio entra a `main`. QA y PROD no construyen nada: bajan esa imagen y la ejecutan, con el mismo `IMAGE_TAG` (`github.sha`) en los dos deploys. En mi plan local los `compose` ya usaban `image:` desde el TP6, así que no tuve el problema del proveedor que reconstruye. Lo que evita igual es que cada entorno arme su propia imagen con `build:` en mi máquina. Un ejemplo de mi proyecto: mi Dockerfile parte de `node:20-alpine`, una etiqueta que se mueve. Si PROD reconstruyera una semana después podría traer otra base y comportarse distinto que QA con el mismo código. Con una sola imagen, lo que probó QA es la misma imagen que corre en PROD.

### 2. Estrategia de etiquetas
- `sha-<commit>` en el registry identifica qué commit produjo cada imagen. Se lee en `docker ps`, en el log del deploy y en el paquete. Es la que uso para promover, porque es exacta.
- `v7.0.0` en git es el nombre de una versión que sabemos que anduvo en PROD. Sirve para nombrar y encontrar, y va sobre el commit que *Deployments* dice que está en PROD, no sobre el último de `main`.
- Mi pipeline **no publica `latest`**: es un puntero que se mueve, y con él no podría saber qué corre ni a qué volver.
- Límite: un `sha-<commit>` se puede volver a publicar si re-ejecuto la corrida de ese commit. Lo que no se mueve es el digest (`@sha256:…`), que no usé.
- No uso Render: los `compose` reciben la etiqueta por variable en cada deploy, así que no hay una imagen vieja configurada en ningún lado.

### 3. De la release a la imagen, en un paso
`git rev-list -n1 v7.0.0` da el commit, y la imagen es `sha-<ese commit>`, en los dos paquetes. Para volver a ella re-ejecuto el job `deploy-prod` de la corrida de ese commit, como hice en el rollback del TP6.

### 4. Cómo compruebo que un entorno ejecuta la imagen
Desde afuera, con el repo público: en *Actions*, el paso «Desplegar QA con la imagen de este commit» muestra el `docker compose pull` y el `IMAGE_TAG` de esa corrida, y *Deployments* muestra el commit de cada entorno. En mi máquina, `docker ps` muestra la etiqueta de cada contenedor. El smoke test solo pregunta si responde con 200: no dice qué versión corre ni si la app funciona. En la corrida roja el smoke dio verde con el botón roto.

### 5. Qué pruebas elegí y qué dejé afuera
**Integración** (`api.spec.js`, contra la api de QA, sin navegador y sin dobles):
1. Alta, lectura y baja: crea una categoría con nombre único, la encuentra en `/categories`, la borra con la clave y comprueba que ya no está.
2. Nombre de 2 caracteres: la api contesta 400 y el total de categorías no cambia.
3. Nombre repetido (la elegí yo): la api contesta 403 y queda una sola. Es una regla que decide una consulta a la base, y solo una prueba contra la base real la ve. Si se rompe, le escribe a quien toque la creación de categorías en el backend.

**e2e** (`ui.spec.js`, Playwright con Chromium, contra el front de QA):
1. Crear una categoría desde el formulario, verla en la lista, borrarla desde la tabla y comprobar que la fila ya no está.
2. Un nombre de 2 caracteres: el usuario ve «Name must have at least 3 characters» y no se crea nada.
3. Borrar desde la tabla (la elegí yo): el navegador pide la clave con un cuadro nativo, la manda a la api y la fila desaparece. La elegí porque cruza ese cuadro, la clave de admin, la api y la base, y es el único camino que las pruebas unitarias del TP5 no ven.

Lo que **no** puse: en integración no repito cada validación ni pruebo los ítems; en e2e no repito las reglas de la api, que ya cubre la integración, ni recorro todo el CRUD de ítems ni los gráficos. Esas partes no tienen prueba de integración ni e2e. La lógica pura del cliente la cubren los unitarios del TP5. Es la forma de la pirámide: muchas pruebas rápidas abajo y pocas de punta a punta arriba.

Cada prueba que crea datos usa un nombre con la hora adentro, porque QA es uno solo y lo comparten todas las corridas. Después de cada prueba, un `afterEach` borra lo que quedó y comprueba que no queda nada.

### 6. Integración y e2e: el par verde/rojo, y el gate
En la corrida roja (commit `9f61714`, el texto del botón «Submit» pasó a «Enviar») la cadena dio: builds en verde, smoke en verde, **integración en verde**, **e2e en rojo** y `deploy-prod` sin arrancar. Eso dice quién falló: la api y la base respondían bien, porque la integración les habla directo, así que lo roto estaba entre el usuario y la api, o sea el front. No hizo falta leer código: el log de la e2e decía que esperaba un botón llamado «Submit». Si hubiera roto la api, la integración habría salido roja y la e2e ni habría corrido, porque depende de ella. El diff de ese commit toca `category.tsx` y no toca `e2e/`.

El gate es la cadena de `needs`: `integracion` espera a `deploy-qa`, `e2e` a `integracion` y `deploy-prod` a `e2e`. En ese tramo no hay `continue-on-error`, ni `|| true`, ni `if: always()` en `deploy-prod`. El reporte de cada suite se sube como artefacto aun cuando la prueba falla.

### 7. Por qué mi integración es la amplia
Le pega a la api de QA ya desplegada, y no a una base temporal levantada dentro del job. Gana que prueba lo que realmente se desplegó: la imagen publicada, las variables, el secret y la base real. Pierde velocidad, depende de que QA esté arriba, y comparte estado con otras corridas, por eso los nombres únicos y la limpieza. Un fallo puede ser del entorno y no del código.

### 8. Tiempos de espera y pruebas flaky
No uso un free tier: todo corre local. Lo equivalente al cold start es el arranque de los contenedores después de recrearlos: el smoke de `deploy-qa` reintenta hasta 30 veces cada 5 segundos antes de que corran las pruebas, y cada prueba de Playwright tiene 30 segundos. Dejé `retries: 0` a propósito. Un test *flaky* es el que a veces pasa y a veces falla sin que cambie el código, y un reintento automático lo esconde. Prefiero que un rojo se vea como rojo. El costo es que la e2e roja tardó unos 2 minutos, porque cada prueba agotó sus 30 segundos esperando el botón.

### 9. Cómo logré que la misma imagen del front sirva en QA y PROD
La dirección del backend la lee el proxy del front (`pages/api/[[...path]].ts`) de la variable `BACKEND_URL` al arrancar, y no se compila en la imagen. Lo que cambia por entorno lo configura cada `compose`: puertos, nombre del proyecto, base de datos y `ADMIN_KEY`. Lo que queda dentro de la imagen es el código compilado.

### 10. Límite conocido de mi cadena
QA es uno solo. Si mergeo dos cambios seguidos, el `deploy-qa` del segundo recrea los contenedores mientras la e2e del primero todavía corre, y esa e2e termina probando en parte la imagen del segundo. Lo reconocería mirando en *Actions* a qué hora corrió cada `deploy-qa` y con `docker ps` qué etiqueta tiene QA. Qué haría: rechazar con motivo la corrida del primero y quedarme con la del segundo, sin re-ejecutar sus jobs de prueba. Y la regla que sigo es un merge por vez, esperando a que termine la cadena. Mi workflow no tiene un bloque `concurrency`, así que nada lo impide por sí solo. Lo que haría un equipo real es un entorno por corrida.

### 11. Problemas encontrados y cómo los resolví
- `npm run test:ci` no corre en PowerShell, porque `${COVERAGE_DIR:-coverage}` es sintaxis de `sh` y PowerShell no la expande. En CI sí funciona, porque corre dentro de la imagen. Comprobé la cobertura en mi máquina con `npx vitest run --coverage --coverage.reportsDirectory=coverage`.
- Vitest levanta por defecto cualquier archivo `*.spec.js`, y habría intentado correr las pruebas de Playwright y roto el CI del TP5. Lo resolví excluyendo `e2e/**` en `vitest.config.mts`.
- Instalar Playwright en el `package.json` del cliente habría cambiado el `package-lock.json` y entrado a la imagen. Lo puse en un paquete aparte dentro de `e2e/` y agregué `e2e` al `.dockerignore`, así la imagen quedó igual.
- El runner propio puede estar apagado y los jobs quedarían esperando. Antes de cada merge compruebo que esté `online` y que los seis contenedores estén arriba.
- La `ADMIN_KEY` es un secret del environment `qa`, así que los jobs de pruebas declaran `environment: qa`. En mi máquina la cargo con un cuadro de entrada que no muestra lo que escribo.
- Al releer la consigna vi que mis primeras pruebas no comprobaban la limpieza y que la e2e de creación no borraba lo que creaba. Lo corregí antes de poner el tag.

### 12. Declaración de uso de IA
Usé Claude para interpretar la consigna, escribir las dos suites de Playwright, armar los jobs `integracion` y `e2e` del workflow y diagnosticar errores. También redactó el borrador de este texto a partir de lo que hicimos, y lo leí y ajusté para poder defenderlo. Cómo lo verifiqué: corrí cada suite en mi máquina contra QA (3 de 3 y 3 de 3), comprobé en *Actions* que la cadena se ejecuta en el orden esperado, provoqué la rotura en el código de la aplicación y no en las pruebas, y confirmé con `docker ps` la etiqueta de las imágenes en cada entorno. Puedo explicar qué pasa entre el merge y PROD: los builds publican las imágenes con el commit, `deploy-qa` las baja y corre el smoke, `integracion` y `e2e` prueban QA, y solo si las dos pasan `deploy-prod` espera mi aprobación y despliega la misma imagen.