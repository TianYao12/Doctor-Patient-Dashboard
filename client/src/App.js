import Header from "./components/Header";
import Item from "./components/Item";
import Auth from "./components/Auth";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const role = cookies.Role;
  const [tasks, setTasks] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState(Array(132).fill(0));
  const [data, setData] = useState("");

  const handleCheckboxChange = (index) => {
    const updatedSymptoms = [...selectedSymptoms];
    updatedSymptoms[index] = updatedSymptoms[index] === 1 ? 0 : 1;
    setSelectedSymptoms(updatedSymptoms);
  };

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
      setData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const symptomsList = [
    "Itching",
    "Skin Rash",
    "Nodal Skin Eruptions",
    "Continuous Sneezing",
    "Shivering",
    "Chills",
    "Joint Pain",
    "Stomach Pain",
    "Acidity",
    "Ulcers on Tongue",
    "Muscle Wasting",
    "Vomiting",
    "Burning Micturition",
    "Spotting Urination",
    "Fatigue",
    "Weight Gain",
    "Anxiety",
    "Cold Hands and Feets",
    "Mood Swings",
    "Weight Loss",
    "Restlessness",
    "Lethargy",
    "Patches in Throat",
    "Irregular Sugar Level",
    "Cough",
    "High Fever",
    "Sunken Eyes",
    "Breathlessness",
    "Sweating",
    "Dehydration",
    "Indigestion",
    "Headache",
    "Yellowish Skin",
    "Dark Urine",
    "Nausea",
    "Loss of Appetite",
    "Pain Behind the Eyes",
    "Back Pain",
    "Constipation",
    "Abdominal Pain",
    "Diarrhoea",
    "Mild Fever",
    "Yellow Urine",
    "Yellowing of Eyes",
    "Acute Liver Failure",
    "Fluid Overload",
    "Swelling of Stomach",
    "Swelled Lymph Nodes",
    "Malaise",
    "Blurred and Distorted Vision",
    "Phlegm",
    "Throat Irritation",
    "Redness of Eyes",
    "Sinus Pressure",
    "Runny Nose",
    "Congestion",
    "Chest Pain",
    "Weakness in Limbs",
    "Fast Heart Rate",
    "Pain During Bowel Movements",
    "Pain in Anal Region",
    "Bloody Stool",
    "Irritation in Anus",
    "Neck Pain",
    "Dizziness",
    "Cramps",
    "Bruising",
    "Obesity",
    "Swollen Legs",
    "Swollen Blood Vessels",
    "Puffy Face and Eyes",
    "Enlarged Thyroid",
    "Brittle Nails",
    "Swollen Extremeties",
    "Excessive Hunger",
    "Extra Marital Contacts",
    "Drying and Tingling Lips",
    "Slurred Speech",
    "Knee Pain",
    "Hip Joint Pain",
    "Muscle Weakness",
    "Stiff Neck",
    "Swelling Joints",
    "Movement Stiffness",
    "Spinning Movements",
    "Loss of Balance",
    "Unsteadiness",
    "Weakness of One Body Side",
    "Loss of Smell",
    "Bladder Discomfort",
    "Foul Smell of Urine",
    "Continuous Feel of Urine",
    "Passage of Gases",
    "Internal Itching",
    "Toxic Look (Typhos)",
    "Depression",
    "Irritability",
    "Muscle Pain",
    "Altered Sensorium",
    "Red Spots Over Body",
    "Belly Pain",
    "Abnormal Menstruation",
    "Dischromic Patches",
    "Watering from Eyes",
    "Increased Appetite",
    "Polyuria",
    "Family History",
    "Mucoid Sputum",
    "Rusty Sputum",
    "Lack of Concentration",
    "Visual Disturbances",
    "Receiving Blood Transfusion",
    "Receiving Unsterile Injections",
    "Coma",
    "Stomach Bleeding",
    "Distention of Abdomen",
    "History of Alcohol Consumption",
    "Fluid Overload.1",
    "Blood in Sputum",
    "Prominent Veins on Calf",
    "Palpitations",
    "Painful Walking",
    "Pus Filled Pimples",
    "Blackheads",
    "Scurring",
    "Skin Peeling",
    "Silver Like Dusting",
    "Small Dents in Nails",
    "Inflammatory Nails",
    "Blister",
    "Red Sore Around Nose",
    "Yellow Crust Ooze",
  ];

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

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  // Sorting tasks based on their dates
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <p>{role}</p>

          <Header
            listName={userEmail}
            getData={getData}
            hide={role === "Patient"}
          />
          {role === "Doctor" ? (
            <>
              {sortedTasks?.map((task) => (
                <Item key={task.id} task={task} getData={getData} />
              ))}
            </>
          ) : null}
          {role !== "Doctor" ? (
            <>
              (
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
                        <label htmlFor={symptom}>{symptom}</label>
                      </div>
                    ))}
                  </div>
                  <button type="submit">Submit</button>
                </div>
              </form>
              )
            </>
          ) : null}
          <p>{data}</p>
        </>
      )}
    </div>
  );
};

export default App;
