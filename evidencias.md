# Evidencias — TP1

## 1. Push directo a main rechazado
![push rechazado](push-rechazado.png)
GitHub rechaza el push directo a `main` con el error "protected branch hook declined", 
confirmando que la protección de rama funciona incluso para el administrador del repositorio.

## 2. Aviso de conflicto en el PR
![aviso conflicto](aviso-conflicto.png)
El Pull Request de la rama `feature/titulo-b` no se puede mergear automáticamente porque 
modifica la misma línea que ya fue mergeada desde `feature/titulo-a`.

## 3. Marcadores del conflicto
![marcadores conflicto](marcadores-conflicto.png)
Vista del editor de resolución de conflictos de GitHub, mostrando los marcadores 
`<<<<<<<`, `=======` y `>>>>>>>` que delimitan las dos versiones en disputa antes de resolver.

## 4. Release v1.0.0 publicada
![release publicada](release-v1.png)
Página de la release `v1.0.0`, publicada sobre el tag del mismo nombre, con las notas 
describiendo qué incluye esta versión.
