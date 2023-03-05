import { useState, useEffect } from "react";

export const useModal = (initialConfig) => {
  /*el estado resolver no es usado por ninguna vista, aunque está usando un
  * callback en el initial state, lo cual es un atajo para la reactividad síncrona,
  * la idea es establecer una función como estado inicial para evitar bugs jeje
  * */
  const [controller, setController] = useState(null);
  /*el estado loot sí es utilizado en vista :), lo ideal es 
  * establecer una interfaz para ello, el loot contiene todas las 
  * configuraciones que el modal requiera
  * entre ellas=> isOpen, type, animation, etc...
  * */
  const [loot, setLoot] = useState(initialConfig);
  
  useEffect(() => {
    return () => {
      //nos aseguramos que toda promesa pendiente sea resuelta al des-renderizar componente
      if(controller) controller.abort(false);
    };
  }, []);

  /**
   * El principio es simple, esta función no se resolverá sino por demanda,
   * es decir, para que esta función cumpla su cometido necesita de la 
   * participación de otra función, en este caso "confirmM", y hasta entonces 
   * el scope donde se le invoque, no resibirá respuesta.
   * @returns {boolean} booleano: true=>Aceptar :: false=>Cancelar
   */
  function showM() {
    setLoot({...loot, isOpen: true});//abrimos el modal
    //retornamos una promesa que resolveremos de forma externa, con el controlador
    //por ello establecimos un estado controller y establecemos el evento escucha
    return new Promise((resolve) => {
      const controllerNew = new AbortController()
      controllerNew.signal.addEventListener('abort', (evnt)=>{
        resolve(evnt.target.reason)
      })
      setController(() => controllerNew);

    });
  }

  /**
   * Esta función se encarga de disparar el evento 'abort' el cual contendrá el 
   * booleano que reperesenta la elección
   * (true => Aceptar) - (false => Cancelar)
   * @param {boolean} choice eleccion
   */
  function confirmM(choice) {
    setLoot({...loot, isOpen: false});//cerramos el modal
    //resolvemos la promesa
    if(controller) controller.abort(choice);
  }
  //la responsabilidad de implementar la función funciones showM están a manos del compoentne donde se 
  //declare el hook, tanto el loot como el confirmM son responsabilidad del Componente Modal
  return [loot, showM, confirmM];
}
