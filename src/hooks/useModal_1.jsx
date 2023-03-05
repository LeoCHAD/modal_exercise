import { useState, useEffect } from "react";

export const useModal = (initialConfig) => {
  /*el estado resolver no es usado por ninguna vista, aunque está usando un
  * callback en el initial state, lo cual es un atajo para la reactividad síncrona,
  * la idea es establecer una función como estado inicial para evitar bugs jeje
  * */
  const [resolver, setResolver] = useState(()=>()=>{});
  /*el estado loot sí es utilizado en vista :), lo ideal es 
  * establecer una interfaz para ello, el loot contiene todas las 
  * configuraciones que el modal requiera
  * entre ellas=> isOpen, type, animation, etc...
  * */
  const [loot, setLoot] = useState(initialConfig);
  
  useEffect(() => {
    return () => {
      //nos aseguramos que toda promesa pendiente sea resuelta al des-renderizar componente
      resolver(false);
    };
  }, []);

  /**
   * El principio es simple, esta función no se resolverá sino por demanda,
   * es decir, para que esta función cumpla su cometido necesita de la 
   * participación de otra función, en este caso "confirmM", y hasta entonces 
   * el scope donde se le invoque, no resibirá respuesta.
   * @returns 
   */
  function showM() {
    setLoot({...loot, isOpen: true});//abrimos el modal
    //retornamos una promesa que resolveremos de forma externa,
    //por ello establecimos un estado resolver para extraer el 'resolve'
    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  }

  /**
   * Esta función se encarga de resolver la promesa por lo que recibe un 
   * booleano que reperesenta la elección
   * (true => Aceptar) - (false => Cancelar)
   * @param resultado 
   */
  function confirmM(choice) {
    setLoot({...loot, isOpen: false});//cerramos el modal
    //resolvemos la promesa
    resolver(choice);
    //para evitarnos problemas rmovemos el resolve del estado
    //pero mantenemos el callback por si "resolver" llega 
    //a ser empleado nuevamente como función
    setResolver(() => ()=>{});
  }
  //la responsabilidad de implementar la función funciones showM están a manos del compoentne donde se 
  //declare el hook, tanto el loot como el confirmM son responsabilidad del Componente Modal
  return [loot, showM, confirmM];
}
