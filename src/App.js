import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import SingleUser from "./components/SingleUser/SingleUser";
import Edit from "./components/Edit/Edit";
import "./App.css";
import { BrowserRouter as Router,Routes, Route, Link, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route exact path="/" element={<h1>Welcome Page</h1>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/error" element={<Error />} />
          <Route exact path="/user/:userId" element={<SingleUser />} />
          <Route exact path="/edit/:userId" element={<Edit />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
