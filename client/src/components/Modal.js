import { useState } from "react";

const Modal = ({ mode, setShowModal, task, getData }) => {
  const editMode = mode === "Edit" ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : "xtyao2015@gmail.com",
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (response.status === 200) {
        console.log("WORKED");
        setShowModal(false);
        getData();
      } else console.log(response.status);
    } catch (err) {
      console.error(err);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>{mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form className="form">
          <input
            className="write-task"
            required
            maxLength={30}
            placeholder="Please write your task"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <input
            required
            type="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
