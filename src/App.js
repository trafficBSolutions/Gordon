import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Home, NotFound, Churches, Pastors, Contact, Blewer  } from "./pages";
import Dashboard from "./pages/admin/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pastor-resources" element={<Pastors />} />
        <Route path="/churches" element={<Churches />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blewer" element={<Blewer />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
