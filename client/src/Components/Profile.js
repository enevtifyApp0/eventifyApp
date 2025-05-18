import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { updateUserProfile } from "../Features/UserSlice";
import Location from "./Location";
import User from "./User";

const Profile = () => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState(user.name);
  const [pwd, setPwd] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("No file selected");
    } else {
      setProfilePic(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (pwd !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      email: user.email,
      name: userName,
      password: pwd,
      profilePic: profilePic,
    };

    dispatch(updateUserProfile(userData));
    alert("Profile Updated.");
    navigate("/profile");
  };

  const picURL = user.profilePic
    ? `http://localhost:3001/uploads/${user.profilePic}`
    : require("../Images/user.png");

  return (
    <Container fluid>
      <h2 className="text-center mb-4">Profile</h2>
      <Row className="justify-content-center">
        <Col md={3} className="text-center">
          <User userData={user} />
          <Location />
        </Col>

        <Col md={5}>
          <Form onSubmit={handleUpdate}>
            <FormGroup>
              <Label>Upload New Photo</Label>
              <Input type="file" onChange={handleFileChange} />
            </FormGroup>

            <hr />
            <h5>Update Profile</h5>

            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>

            <Button type="submit" color="primary" className="w-100 mt-3">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
