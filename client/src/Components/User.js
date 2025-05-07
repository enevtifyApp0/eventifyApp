import { useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state.users.user);

  // تحقق مما إذا كان للمستخدم صورة بروفايل
  const picURL = user.profilePic
    ? `http://localhost:3001/uploads/${user.profilePic}`
    : require("../Images/user.png");

  return (
    <div className="user-container">
      <h1>User Profile</h1>
      <img src={picURL} alt="User" className="userImage" />
      <p>
        <strong>Name:</strong> {user.name}
        <br />
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default User;
