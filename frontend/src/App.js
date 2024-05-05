import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import Home from './components/Home';
import ViewBlog from './components/ViewBlog';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs/:id" element={<ViewBlog />} />
    </Routes>
    </Router>
  );
}

export default App;
