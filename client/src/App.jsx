import NavBar from "./components/Navbar";
import './App.css';
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientPage from "./pages/Clients";
import ClientDocs from "./pages/ClientDocs";
import ClientCards from "./pages/ClientCards";


function App() {
  return (
    <div>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/clients' element={<ClientPage/>} />
        <Route path="/clients/:id" element={<ClientDocs/>} />
        <Route path="/cards/:id" element={<ClientCards/>} />
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
