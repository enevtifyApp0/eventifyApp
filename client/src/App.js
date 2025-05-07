import "./App.css";
import Footer from "./Components/Footer.js";
import Header from "./Components/Header.js";
import Home from "./Components/Home.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "reactstrap"; // استيراد مكونات Reactstrap
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login.js";
import Profile from "./Components/Profile";
import Register from "./Components/Register.js";
import Events from "./Components/Events.js";
import UpdateUser from "./Components/UpdateUser.js";
import { useSelector } from "react-redux";
import AddEventForm from "./Components/AddEvent.js";

const App = () => {
  const email = useSelector((state) => state.users.user.email); // الحصول على البريد الإلكتروني من الحالة

  return (
    <Container fluid>
      <Router>
        <Row>
          {email && <Header />}
          {/* عرض الشريط العلوي إذا كان المستخدم مسجلاً الدخول */}
        </Row>

        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route path="/update" element={<UpdateUser />} />
            <Route path="/update/:email" element={<UpdateUser />} />
            <Route path="/addEvent" element={<AddEventForm />} />
          </Routes>
        </Row>

        <Row>
          {email && <Footer />}
          {/* عرض الشريط السفلي إذا كان المستخدم مسجلاً الدخول */}
        </Row>
      </Router>
    </Container>
  );
};

export default App;
