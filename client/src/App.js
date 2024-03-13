import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main";
import Chat from "./Chat";

// App() contains routes for the frontend (not used yet)
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
