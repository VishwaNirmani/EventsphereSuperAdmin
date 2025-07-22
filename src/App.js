import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import Members from "./pages/Members";
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="events" element={<Events />} />
          <Route path="members" element={<Members />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
