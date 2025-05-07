import { Button, Col, Container, Row, Input, Form, Label } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../Features/UserSlice";

const UpdateUser = () => {
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState(user.password || "");
  const [confirmPassword, setConfirmPassword] = useState(user.password || "");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      name: userName,
      email,
      password,
      profilePic,
    };

    dispatch(updateUserProfile(userData));
    alert("Profile updated.");
    navigate("/profile");
  };

  return (
    <Container className="mt-5">
      <h1>Update Profile</h1>
      <Form onSubmit={handleUpdate}>
        <Row>
          <Col md={6}>
            <Label>Name</Label>
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Label>Email</Label>
            <Input type="email" value={email} readOnly />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Label>Upload Profile Picture</Label>
            <Input type="file" onChange={handleFileChange} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Button type="submit" color="primary">
              Update Profile
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UpdateUser;
