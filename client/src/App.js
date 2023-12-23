import Header from "./components/Header";
import Item from "./components/Item";
import Auth from "./components/Auth";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  // State to store the fetched tasks from the server
  const [tasks, setTasks] = useState(null); // stores tasks from server and written by user

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
          <Header listName={"To-do list"} getData={getData} />
          <p>Hello {userEmail}</p>
          {sortedTasks?.map((task) => (
            <Item key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
