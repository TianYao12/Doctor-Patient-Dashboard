import TickIcon from "./TickIcon";
import { useState } from "react";
import Modal from "./PatientModal";

// PatientList(patient, getPatients) displays all patients
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
        <Modal
          setShowModal={setShowModal}
          patient={patient}
          getPatients={getPatients}
        />
      )}
    </li>
  );
};

export default PatientList;
