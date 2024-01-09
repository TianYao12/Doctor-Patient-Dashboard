import TickIcon from "./TickIcon";
import { useState } from "react";
import PatientModel from "./PatientModal";

const PatientList = ({ patient, getPatients }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <li className="items-container">
      <div className="individual-item">
        <TickIcon />
        <p className="task-title">{patient.email}</p>
      </div>
      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          Prescribe
        </button>
      </div>
      {showModal && (
        <PatientModel
          setShowModal={setShowModal}
          patient={patient}
          getPatients={getPatients}
        />
      )}
    </li>
  );
};

export default PatientList;
