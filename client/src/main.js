import Header from "./components/Header";
import Auth from "./components/Auth";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { symptomsList } from "./components/symptomsList";
import PatientList from "./components/PatientList";
// import { useHistory } from "react-router-dom";

const Main = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null); // session cookies
  const authToken = cookies.AuthToken; // authentication token
  const userEmail = cookies.Email; // user email
  const role = cookies.Role; // user role (doctor or patient)
  const [medications, setMedications] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState(Array(132).fill(0)); // symtpom array
  const [data, setData] = useState(""); // stores disease prognosis of patient
  const [patients, setPatients] = useState(null); // stores all patients for doctor users to display

  // const history = useHistory();

  // handleCheckboxChange(index) updates the input array to be in the required format to 
  // send to the deployed logistic regression API
  // basically, if the value of the index is 1, make it 0; otherwise make it 1
  const handleCheckboxChange = (index) => {
    const updatedSymptoms = [...selectedSymptoms];
    updatedSymptoms[index] = updatedSymptoms[index] === 1 ? 0 : 1;
    setSelectedSymptoms(updatedSymptoms);
  };

  // handleSubmit(event) submits the input array to the backend to get disease prediction
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Selected symptoms:", selectedSymptoms);
    try {
      // POST request to backend with selected symptoms array
      const response = await fetch("http://localhost:8000/diseases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedSymptoms }),
      });
      const data = await response.json(); // get response disease diagnosis
      setData(`Unfortunately, you may have ${data}`); // put disease in state variable
    } catch (err) {
      console.error(err);
    }
  };

  // handleRequest(event) requests medication from doctors as a patient
  const handleRequest = async (event) => {
    event.preventDefault();
    try {
      await fetch("http://localhost:8000/requested", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, role, requested: "yes" }),
      });      
    } catch (err) {
      console.error(err);
    }
  };

  // getPatient() is called as a patient user and get patient medications from database
  const getPatient = async () => {
    try {
      // GET request to backend with user email
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/patient/${userEmail}`
      );
      const json = await response.json();
      setMedications(json[0]);
    } catch (err) {
      console.error(err);
    }
  };

  // getPatients() is called as a doctor user and gets all patients in database
  const getPatients = async () => {
    try {
      // GET request to endpoint to get patients
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/patients`
      );
      const json = await response.json(); 
      setPatients(json); // store all patients in state variable
    } catch (err) {
      console.error(err);
    }
  };

  // if user is doctor and authenticated, get all the patients to display
  useEffect(() => {
    if (authToken) {
      getPatients();
    }
  }, []);
  // if the user is a patient and authenticated, get patient data
  useEffect(()=> {
    if (role != "Doctor") {
      getPatient();
    }
  }, [])

  // Sorting patients based on their dates
  const sortedPatients = patients?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth />} {/* If not authenticated, render authentication component */}
      {/* If authenticated, render */}
      {authToken && (
        <>
          <Header
            email={userEmail}
            user_type={role === "Patient"}
          />
          {/* If user is doctor, display all patients */}
          {role === "Doctor" ? (
            <>
              {patients?.map((patient) => (
                <>
                  <PatientList
                    key={patient.id}
                    patient={patient}
                    getPatients={getPatients}
                  />
                </>
              ))}
            </>
          ) : null}
          {/* If user is patient, display checkboxes for symptoms */}
          {role !== "Doctor" ? (
            <>
              <form onSubmit={handleSubmit}>
                <div className="bottom">
                  <h2>Select Symptoms:</h2>
                  <div className="symptom-wrapper">
                    {symptomsList.map((symptom, index) => (
                      <div key={symptom}>
                        <input
                          type="checkbox"
                          id={symptom}
                          // should've probably made this 0, but it works right now and so I'm not gonna change it
                          checked={selectedSymptoms[index] === 1} 
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <label htmlFor={symptom} style={{ marginLeft: "10px" }}>
                          {symptom}
                        </label>
                      </div>
                    ))}
                  </div>

                  <h2>Previous Medication</h2>
                  {/* Display previous medications of patient */}
                  <p>{medications? medications.medication != "no medication" ? medications.medication: "No previous prescriptions" : null}</p>
                  <p>{medications? medications.medication != "no medication" ? <p>{`Dosage: ${medications.dosage}`}</p>: "" : null}</p>
                  <p>{medications? medications.medication != "no medication" ? <p>{`Date: ${medications.date}`}</p>: "" : null}</p>
                  <button
                    type="submit"
                    className="button"
                  >
                    Submit
                  </button>
                  {/* As patient user, request medication from doctors */}
                  <button
                    onClick={handleRequest}
                    className="button"
                  >
                    Request medication from a doctor
                  </button>
                </div>
              </form>
              <h2 style={{marginTop:"20px"}}>{data}</h2>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Main;
