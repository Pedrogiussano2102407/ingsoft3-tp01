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
