import { useState, useEffect } from "react";

export const useModal = (initialConfig) => {
  /*el estado resolver no es usado por ninguna vista, sin embargo, está usando un
  * callback en el initial state, lo cual es un atajo para la reactividad síncrona,
  * la idea es establecer una función como estado inicial para evitar bugs
  * */
  const [resolver, setResolver] = useState(()=>()=>{});
  /*el estado loot sí es utilizado en vista, lo ideal es 
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
   * El principio es simple, esta función no se resolverá por si sola sino que lo hará por
   * demanda, es decir, para que esta función cumpla su cometido necesita de la 
   * participación de otra función, en este caso, la afunción "confirmM", y hasta entonces 
   * el scope donde se le invoque, no resibirá respuesta de ella.
   * Naturalmente, el retorno consiste en una promesa que al resolverse contendrá un booleano
   * @returns {Promise<boolean>} representa la eleccion del usuario true=>aceptar - false=>cancelar
   */
  function showM() {
    setLoot({...loot, isOpen: true});//abrimos el modal

    //extraemos la función resolve en un estado para manipularla externamente
    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  }

  /**
   * Encarada de resolver la promesa que represetna la elección del ususario
   * para ello recibe un booleano
   * @param {boolean} choice eleccion (true => Aceptar) - (false => Cancelar)
   */
  function confirmM(choice) {
    //resolvemos la promesa con la eleccion de ususario
    resolver(choice);
    //para evitarnos problemas removemos el resolve del estado
    //pero mantenemos el callback por si "resolver" llega 
    //a ser empleado nuevamente como función
    setResolver(() => ()=>{});
    setLoot({...loot, isOpen: false});//cerramos el modal
  }
  //la responsabilidad de implementar la función showM está a manos del compoentne donde se 
  //declare el hook, 
  //En cuanto al loot y el confirmM, estos serán responsabilidad del Componente Modal
  return [loot, showM, confirmM];
}
