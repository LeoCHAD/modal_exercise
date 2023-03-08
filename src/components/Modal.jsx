import React from 'react'
/**
 * Modal sencillo que recibe como props el la configuración (loot),
 *  el titulo(title), el cuerpo del modal (children) y la función para responder
 * la confirmación (confirmM) 
 * @param {{loot: {[string]:any}, title: string, children: any, confirmM: (choice: boolean)=>void}} props 
 */
export const Modal = ({ loot, title, children, confirmM }) => {
  return (
    <>
      {loot.isOpen && (
        <div className="wrapper">
          <div className="card modal">
            <h2>{title}</h2>
            <p className="modal-body">{children}</p>
            <div>
              <button className="btn green" onClick={() => confirmM(true)}>
                ACEPTAR</button>
              <button className="btn red" onClick={() => confirmM(false)}>
                CANCELAR</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
