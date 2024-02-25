import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main";
// import Prognosis from "./prognosis";

// App() contains routes for the frontend (not used yet)
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/prognosis" element={<Prognosis />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
