import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main";

// App() contains routes for the frontend (not used yet)
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}
