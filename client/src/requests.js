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
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/patients`);
    const json = await response.json();
    setPatients(json); // store all patients in state variable
  } catch (err) {
    console.error(err);
  }
};

export {
  handleCheckboxChange,
  handleSubmit,
  handleRequest,
  getPatient,
  getPatients,
};
