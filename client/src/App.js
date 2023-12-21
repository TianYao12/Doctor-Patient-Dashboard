import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const userEmail = "xtyao2015@gmail.com";
  const [tasks, setTasks] = useState(null);
  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => getData, []);
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <div className="app">
      <ListHeader listName={"skills"} />
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task}/>
      ))}
    </div>
  );
};

export default App;
