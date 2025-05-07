import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBooks } from "../Features/BookSlice"; 
import { Table } from "reactstrap";
import moment from "moment";

const Books = () => {
  const books = useSelector((state) => state.books.books); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks()); 
  }, [dispatch]);

  return (
    <div className="booksContainer">
      <h1>Display Books</h1>
      <Table className="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
            <th>Book Details</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.email}</td>
              <td>
                <p>{moment(book.createdAt).fromNow()}</p>
                {book.bookMsg}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Books;