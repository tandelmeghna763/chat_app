// import './App.css';
import ChatApp from './components/ChatApp.js';
import LoginPage from './components/LoginPage.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/chatapp" element={<ChatApp />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
