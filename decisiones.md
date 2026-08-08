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
