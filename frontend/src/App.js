import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import Home from './components/Home';
import ViewBlog from './components/ViewBlog';
import AddBlog from './components/AddBlog';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs/:id" element={<ViewBlog />} />
      <Route path="/add" element={<AddBlog />} />
    </Routes>
    </Router>
  );
}

export default App;
