import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { registerUser } from "../Features/UserSlice.js";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Col,
  Label,
  Container,
  Row,
  FormGroup,
  Input,
  Form,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addUser, deleteUser, updateUser } from "../Features/UserSlice";
import logo from "../Images/logo2.png";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchemaValidation) });

  const userList = useSelector((state) => state.users.value);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data", data); // You can handle the form submission here
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      dispatch(registerUser(userData));
      alert("User added.");
      navigate("/login"); //redirect to login component
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (email) => {
    dispatch(deleteUser(email));
    alert("User deleted.");
  };

  return (
    <div className="login-container">
      <Container>
        <img src={logo} alt="Eventify Logo" className="logo" />
        <h2 className="title">Register</h2> {/* Added title */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="form-group">
            <Col md={12}>
              <Label for="name" className="label">
                Name
              </Label>
              <input
                type="text"
                name="name"
                {...register("name", {
                  onChange: (e) => setname(e.target.value),
                })}
                className="input"
              ></input>
              {name}
            </Col>
            <p className="error">{errors.name?.message}</p>
          </Row>

          <Row className="form-group">
            <Col md={12}>
              <Label for="email" className="label">
                Email
              </Label>
              <input
                type="email"
                name="email"
                {...register("email", {
                  onChange: (e) => setemail(e.target.value),
                })}
                className="input"
              ></input>
              {email}
            </Col>
            <p className="error">{errors.email?.message}</p>
          </Row>

          <Row className="form-group">
            <Col md={12}>
              <Label for="password" className="label">
                password
              </Label>
              <input
                type="password"
                name="password"
                {...register("password", {
                  onChange: (e) => setpassword(e.target.value),
                })}
                className="input"
              ></input>
            </Col>
            <p className="error">{errors.password?.message}</p>
          </Row>

          <Row className="form-group">
            <Col md={12}>
              <Label for="confirmPassword" className="label">
                Confirm Password
              </Label>
              <input
                type="password"
                name="confirmpassword"
                {...register("confirmPassword", {
                  onChange: (e) => setconfirmPassword(e.target.value),
                })}
                className="input"
              ></input>
            </Col>
            <p className="error">{errors.confirmPassword?.message}</p>
          </Row>
          <Row>
            <Col md={12}>
              <Button color="primary" className="button">
                Register
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <p className="smalltext">
                Already have an account? <Link to="/login">Login here.</Link>
              </p>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
