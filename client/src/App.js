import "./App.css";
import Footer from "./Components/Footer.js";
import Header from "./Components/Header.js";
import Home from "./Components/Home.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login.js";
import Profile from "./Components/Profile";
import Register from "./Components/Register.js";
import Events from "./Components/Events.js";
import UpdateUser from "./Components/UpdateUser.js";
import { useSelector } from "react-redux";
import AddEventForm from "./Components/AddEvent.js";
import Books from "./Components/Books.js";
import Manage from "./Components/Manage.js";
import ManageProfile from "./Components/ManageProfile.js";

const App = () => {
  const email = useSelector((state) => state.users.user.email); // Get email from status

  return (
    <Container fluid>
      <Router>
        <Row>
          {email && <Header />}
          {/* Show Header if user is logged in */}
        </Row>

        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/events" element={<Events />}></Route>
            <Route path="/update" element={<UpdateUser />}></Route>
            <Route path="/update/:email" element={<UpdateUser />}></Route>
            <Route path="/addEvent" element={<AddEventForm />}></Route>
            <Route path="/books" element={<Books />}></Route>
            <Route path="/manage" element={<Manage />}></Route>
            <Route
              path="/manageProfile/:id"
              element={<ManageProfile />}
            ></Route>
          </Routes>
        </Row>

        <Row>
          {email && <Footer />}
          {/* Show footer if user is logged in */}
        </Row>
      </Router>
    </Container>
  );
};

export default App;
