import AddStudent from './components/AddStudent';
import Header from './components/headerScript';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AllStudents from './components/AllStudents';

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/add" exact element={<AddStudent />} />
        </Routes>
        
        <Routes>
          <Route path="/" exact element={<AllStudents />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
