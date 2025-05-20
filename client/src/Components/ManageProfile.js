import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import axios from "axios";
import * as ENV from "../config";
import { updateUserProfile } from "../Features/UserSlice";
import User from "./User";

const ManageProfile = () => {
  const [user, setUser] = useState({});
  const id = useParams().id;

  // Create state variables
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userType, setUserType] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get(`${ENV.SERVER_URL}/getUser/${id}`);
      const user = response.data.user;
      setUserName(user.name);
      setPwd(user.password);
      setProfilePic(user.profilePic);
      setConfirmPassword(user.password);
      setUserType(user.userType);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const userData = {
      email: user.email,
      name: userName,
      password: pwd,
      profilePic: profilePic,
      userType: userType,
    };

    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    await dispatch(updateUserProfile(formData));
    alert("Profile Updated.");
    navigate("/manage");
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <User userData={user} />
        </Col>
        <Col md={9}>
          <h2 className="text-center mb-4">Manage Profile</h2>
          <Form onSubmit={handleUpdate}>
            <FormGroup>
              <Label for="profilePic">Upload Photo</Label>
              <Input
                type="file"
                name="profilePic"
                onChange={handleFileChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="usertype">User Type</Label>
              <select
                id="usertype"
                name="usertype"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </FormGroup>

            <Button color="primary" className="w-100 mt-3" type="submit">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageProfile;
