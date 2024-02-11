import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ setShowModal, patient, getPatients }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const [data, setData] = useState({
    requested: patient.requested,
    medication: patient.medication,
    dosage: 0,
    date: new Date(),
  });

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/patients/${patient.email}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      console.log(response.status)
      if (response.status === 200) {
        setShowModal(false)
      }
    } catch (err) {
      console.error(err);
    }
  };

  // change the column of the patient according to the attribute changed
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
          <h3>Prescribe medication for patient</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <>
          {data.requested === "yes" ? (
            <>
              <form className="form">
                <input
                  className="write-task"
                  required
                  maxLength={30}
                  placeholder="Medication for patient: "
                  name="medication"
                  value={data.medication}
                  onChange={handleChange}
                />
                <input
                  required
                  type="range"
                  min="0"
                  max="100"
                  name="dosage"
                  value={data.dosage}
                  onChange={handleChange}
                />
                <input className="edit" type="submit" onClick={editData} />
              </form>
            </>
          ) : (
            <p>This patient did not request medications.</p>
          )}
        </>
      </div>
    </div>
  );
};

export default Modal;
