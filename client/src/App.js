import Header from "./components/Header";
import Item from "./components/Item";
import Auth from "./components/Auth";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { symptomsList } from "./components/symptomsList";
import PatientList from "./components/PatientList";

const App = () => {
  // session cookies
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const role = cookies.Role;

  const [tasks, setTasks] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState(Array(132).fill(0));
  const [data, setData] = useState("");
  const [patients, setPatients] = useState(null);

  // updates the input array to the logistic regression API
  const handleCheckboxChange = (index) => {
    const updatedSymptoms = [...selectedSymptoms];
    updatedSymptoms[index] = updatedSymptoms[index] === 1 ? 0 : 1;
    setSelectedSymptoms(updatedSymptoms);
  };

  // submits the input array to the backend to get disease prediction
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Selected symptoms:", selectedSymptoms);
    try {
      const response = await fetch("http://localhost:8000/diseases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedSymptoms }),
      });
      const data = await response.json();
      setData(`Unfortunately, you may have ${data}`);
    } catch (err) {
      console.error(err);
    }
  };

  // runs when patient requests medication from doctors
  const handleRequest = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/requested", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, role, requested: "yes" }),
      });
      const data = response.json();
    } catch (err) {
      console.error(err);
    }
  };

  // gets todo items
  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      );
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  // gets all patients in database
  const getPatients = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/patients`
      );
      const json = await response.json();
      setPatients(json);
      console.log(patients);
    } catch (err) {
      console.error(err);
    }
  };

  // as long as the user is authorized, get all the patients
  useEffect(() => {
    if (authToken) {
      getPatients();
    }
  }, []);

  // Sorting tasks based on their dates
  const sortedPatients = patients?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <Header
            listName={userEmail}
            getData={getData}
            hide={role === "Patient"}
          />
          {role === "Doctor" ? (
            <>
              {/* {sortedTasks?.map((task) => (
                <Item key={task.id} task={task} getData={getData} />
              ))} */}
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
                          checked={selectedSymptoms[index] === 1}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <label htmlFor={symptom} style={{ marginLeft: "10px" }}>
                          {symptom}
                        </label>
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    style={{ width: "150px", height: "40px" }}
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleRequest}
                    style={{ width: "150px", height: "40px" }}
                  >
                    Request medication from a doctor
                  </button>
                </div>
              </form>
              <p>{data}</p>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default App;
