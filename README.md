## __Ejercicio de manejo de ventana Modal por promesas en React.js con javascript__

La idea es simple, el propósito del ejercicio es imitar el flujo de ejecución del método ``"window.confirm()"``, invocamos un modal con las opciones __Aceptar__ y __cancelar__, y el scope en donde le invocamos no continua ejecutándose hasta que el usuario tome una decisión, para lograr esto empleamos ``promesas``.

~~~javascript
new Promise()
~~~
El flujo de ejecución de un scope declarado como asícrnono ``async``, tiene la capacidad de ejecutarse de forma parcial cuando se encuentra con una promesa, para ello se emplea la palabra reservada ``await``, aprobechando este comportamiento necesitamos encontrar la forma de resolver o rejectar la promesa por demanda ``on demand``.

<hr>

### __Segunda solución__
Investigando un poco más conocí la api __AbortController__ la cual es utilizada frecuentemente para abortar peticiones http con la api __Fecth__, pero en esencia se trata de un disparador de evento bastante representativo, es decir, una señar de abortar `abort`, esto significa que podemos escuchar este evento dentro de la promesa y resolver a voluntad el dato que nos traiga dicho evento en su propiedad `data`, pero primero necesitamos disponer del controlador dentro y fuera de la promesa, para ello la alojaremos en un estado:

~~~javascript
const [controller, setController] = useState(null);
~~~
El controlador será establecido en la promesa, y además añadiremos el evento escucha a la propiedad ``signal`` del controller, la idea es resolver el contenido de la propiedad target.reason del evento la cual será el booleano necesario para la respuesta:
~~~javascript
  function toResolve(){
    //some code...
    return new Promise((resolve) => {
      const controller = new AbortController();
      setController(() => controller);
      controler.signal.addEventListener('abort',(event)=>{
        resolve(event.target.reason)
      })
    });
  }
~~~
Finalmente invocamos el estado ``controller`` en el scope que nos convenga y lanzamos el evento con la función __abort()__ de la api AborController, y como parametro inyectamos el __booleano__ que represente la elección del usuario, (``true`` => ``Aceptar``) - (``false``=> ``Cancelar``).

~~~javascript
  function resolvePromiseOnDemand(booleanResponse){
    //some code...
    if(controller){
      controller.abort(booleanResponse);
    }
  }
~~~
El enfoque que tomó esta segunda solución fue usar un __Custom Hook__ para desacoplar esta lógica del componente, posiblemente esta estructura esté abierta a mejora, seguimos aprendiendo :)
<hr>

### __Primera solución__
Se me ocurrión extraer el callback __resolve__ de la promesa en un estado y ejecutarlo desde un scope distinto, de esa forma la promesa se podrá resolver cuando lo consideremos necesario:

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
    resolver(booleanResponse)
  }
~~~

El enfoque que tomó el presente ejercicio fue usar un __Custom Hook__ para desacoplar esta lógica de cualquier componente, posiblemente esta estructura esté abierta a mejora, pero es un comienzo :)
`
## __instalación__
Este pequeño proyecto fue creado con __vite__ y para la instalación de la dependencias se empleó __pnpm__ razón por la cual hemos de ejecutar el siguiente comando para ello.
~~~bash
pnpm install
~~~
### __ejecución__
para ejecutar tenemos los comandos que nos brinda vite. Para levantar un servidor de desarrollo:
~~~bash
pnpm dev
~~~
o
~~~bash
npm run dev
~~~
para constrcción de la versión de desarrollo use:
~~~bash
npm run build
~~~
o
~~~bash
pnpm build
~~~
