import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventForm from "./EventForm";
import ShowData from "./ShowData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventForm />} />
        <Route path="/show-data" element={<ShowData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;