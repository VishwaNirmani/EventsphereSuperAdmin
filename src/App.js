import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import Members from "./pages/Members";
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="clubs" element={<Clubs />} />
                <Route path="clubs/:clubId/events" element={<Events />} />
                <Route path="clubs/:clubId/members" element={<Members />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              background: '#d1fae5',
              color: '#065f46',
            },
          },
          error: {
            style: {
              background: '#fee2e2',
              color: '#991b1b',
            },
          },
        }}
      />
    </>
  );
}

export default App;
