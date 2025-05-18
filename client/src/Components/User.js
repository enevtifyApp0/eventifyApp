import React from "react";

const User = ({ userData }) => {
  const user = userData.userData;
  if (!userData) {
    return <div>No user data available</div>;
  }

  const picURL = userData.profilePic
    ? `http://localhost:3001/uploads/${userData.profilePic}`
    : require("../Images/user.png");

  return (
    <div className="user-container">
      <h1>User Profile</h1>
      <img src={picURL} alt="User" className="userImage" />
      <p>
        <strong>Name:</strong> {userData.name}
        <br />
        <strong>Email:</strong> {userData.email}
      </p>
    </div>
  );
};

export default User;
