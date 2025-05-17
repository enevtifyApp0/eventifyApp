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
  const [userType, setuserType] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // جلب بيانات المستخدم عند تحميل الصفحة
  const getUser = async () => {
    try {
      const response = await axios.get(`${ENV.SERVER_URL}/getUser/${id}`);
      const user = response.data.user;
      //console.log(user);
      setUserName(user.name);
      setPwd(user.password);
      setProfilePic(user.profilePic);
      setConfirmPassword(user.password);
      setuserType(user.userType);
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log(user);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  // تغيير صورة الملف الشخصي
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  // تحديث بيانات المستخدم
  const handleUpdate = (event) => {
    event.preventDefault();
    const userData = {
      email: user.email, // Retrieve email from the Redux store
      name: userName, // Get the updated name from the state variable
      password: pwd, // Get the updated password from the state variable
      profilePic: profilePic,
      userType: userType,
    };
    console.log(userData);

    // Dispatch the updateUserProfile action to update the user profile in the Redux store
    dispatch(updateUserProfile(userData));
    alert("Profile Updated.");
    // Navigate back to the profile page after the update is completed
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
                onChange={(e) => setuserType(e.target.value)}
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
