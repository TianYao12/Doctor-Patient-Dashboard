import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import Modal from "./Modal";

const Item = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);
  
  const deleteItem = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
      method: "DELETE",
    });
    getData();
  };

  return (
    <li className="items-container">
      <div className="individual-item">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>
      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          Edit
        </button>
        <button className="delete" onClick={deleteItem}>
          Delete
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"Edit"}
          setShowModal={setShowModal}
          task={task}
          getData={getData}
        />
      )}
    </li>
  );
};

export default Item;
