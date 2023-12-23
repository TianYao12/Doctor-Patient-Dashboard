import Header from "./components/Header";
import Item from "./components/Item";
import { useState, useEffect } from "react";

const App = () => {
  const userEmail = "xtyao2015@gmail.com";
  const name = "Tian";

  // State to store the fetched tasks from the server
  const [tasks, setTasks] = useState(null); // stores tasks from server and written by user

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Sorting tasks based on their dates
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      <Header listName={name} getData={getData} />

      {sortedTasks?.map((task) => (
        <Item key={task.id} task={task} getData={getData} />
      ))}
    </div>
  );
};

export default App;
