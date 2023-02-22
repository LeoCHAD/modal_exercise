import "./App.css";
import { useModal } from "./hooks/useModal";
import { Modal } from "./components/Modal";
import { useState } from "react";

function App() {
  const [lootModal, showModal, confirmModal] = useModal({ isOpen: false });
  const [choice, setChoice] = useState('nada');

  const handleClick = async () => {
    const modalResponse = await showModal();
    console.log(modalResponse);
    if (modalResponse) {
      setChoice('Aceptar los términos :)')
      //codigo si el usuario elige aceptar...
    } else {
      setChoice('Cancelar los términos :(');
      //codigo si el usuario elige cancelar...
    }
  };

  return (
    <>
      <Modal loot={lootModal} confirmM={confirmModal} title="Aviso">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, in enim, accusamus sunt provident exercitationem ad qui, assumenda ipsam voluptatibus iusto vitae cum harum nam adipisci vel optio placeat earum! Voluptates, praesentium. Explicabo aperiam molestiae alias dolorem minus cumque quo voluptate iure officiis rem inventore asperiores praesentium tempora modi fugiat consectetur illo adipisci aspernatur, dicta enim, ipsam repudiandae qui magni at? Magnam, officiis ex hic voluptatem quae soluta tempora consequatur rem eligendi. Consectetur mollitia deserunt, recusandae quas cum accusantium reiciendis nostrum dolorum tempora architecto aliquid veritatis distinctio, rerum expedita. Itaque fugit fuga, assumenda error cum veritatis delectus consequuntur sint porro?.... Está por aceptar los términos
      </Modal>
      <div className="App">
        <h1 className="title">Modal demostración</h1>
        <div className="card">
          <button onClick={() => handleClick()}>Abrir modal</button>
        </div>
        <p>Ha elegido: {choice}</p>
      </div>
    </>
  );
}

export default App;
