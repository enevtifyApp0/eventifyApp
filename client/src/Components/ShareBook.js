import {
  Button,
  Col,
  Container,
  Row,
  Input,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { savePost } from "../Features/BookSlice"; 

const ShareBooks = () => {
  const [bookMsg, setBookMsg] = useState(""); 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.users.user.email);

  const handlePost = async () => {
    // Validate that bookMsg is not empty
    if (!bookMsg.trim()) {
      alert("Book message is required."); 
      return; // Exit the function early if validation fails
    }
    const bookData = {
      bookMsg: bookMsg, 
      email: email,
    };
    dispatch(saveBook(bookData)); // Dispatch the savePost thunk from the Books Slice.
    setBookMsg(""); // Clear the text area after posting
  };

  return (
    <div>
      <h1> Book Now </h1> {/* تعديل العنوان */}
      <Row>
        <Col>
          <Input
            id="share"
            name="share"
            placeholder="pick your events..."
            type="textarea"
            value={bookMsg} 
            onChange={(e) => setBookMsg(e.target.value)} 
          />
          <Button onClick={handlePost}> Book</Button> 
        </Col>
      </Row>
    </div>
  );
};

export default ShareBooks;