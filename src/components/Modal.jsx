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
