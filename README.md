## __Ejercicio de manejo de ventana Modal por promesas en React.js__

La idea es simple, el prop+osito del ejecicio es imitar el flujo de ejecucipon del método ``"window.confirm()"``, invocamos un modal con las opciones __Aceptar__ y __cancelar__, y el scope en donde le invocamos no continua ejecutandose hasta que el usuaripo tome una decición, para lograr esto empleamos ``promesas``.

~~~javascript
new Promise()
~~~

En el flujo de ejecución de un scope declarado como asícrnono ``async``, tiene la capacidad de ejecutarse de forma parcial cuando se encuentra con una promesa, para ello se emplea la palabra reservada ``await``, aprobechando este comportamiento necesitamos encontrar la forma de resolver la promesa por demanda ``on demand``, para ello se me ocurrión extraer el callback __resolve__ de la promesa en un estado y ejecutarlo desde un scope distinto, de esa forma la promesa se podrá resolver cuuando lo concideremos necesario.

~~~javascript
  function toResolve(){
    //some code...
    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  }
~~~

Luego de ello solo hace falta invocar el estado resolver en el scope que nos convenga, por supuesto que el estado ``resolver`` debe estar a disposición según se requiera:
La idea es establecer un dato __booleano__ que represente la elección del usuario, (``true`` => ``Aceptar``) - (``false``=> ``Cancelar``) y resolverlo

~~~javascript
  function resolvePromiseOnDemand(booleanResponse){
    //some code...
    resolver(booleanResponse);
  }
~~~

El enfoque que tomó el presente ejercicio fue usar un __Custom Hook__ para desacoplar esta lógica de cualquier componente, posiblemente esta estructura esté abierta a mejora, pero es un comienzo :)