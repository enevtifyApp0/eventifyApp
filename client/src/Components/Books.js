import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBooks } from "../Features/BookSlice";
import { Table, Button } from "reactstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const books = useSelector((state) => state.books.books);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/edit-book/${id}`);
  };

  const filteredBooks =
    user.userType === "admin"
      ? books
      : books.filter((book) => book.email === user.email);

  return (
    <div className="booksContainer p-4">
      <h1 className="mb-4 text-center text-xl font-bold">All Bookings</h1>

      <Table bordered hover responsive className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Email</th>
            <th>Event</th>
            <th>Tickets</th>
            <th>Total (OMR)</th>
            <th>Booked At</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book._id}>
              <td>{book.email}</td>
              <td>{book.eventTitle}</td>
              <td>{book.quantity}</td>
              <td>{book.totalAmount?.toFixed(2)}</td>
              <td>
                {moment(book.createdAt).format("YYYY-MM-DD")} (
                {moment(book.createdAt).fromNow()})
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Books;
