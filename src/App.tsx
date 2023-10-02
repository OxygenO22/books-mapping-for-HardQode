
import "./styles.css";
import { Book, BookInformation, Review, User } from "./lib/types";
import { getBooks, getUsers, getReviews } from "./lib/api";
import { useEffect, useState, FC } from "react";
import Card from "./Card";

const toBookInformation = (book: Book): BookInformation => {
  return {
    id: book.id,
    name: book.name || "Книга без названия",
    author: { name: book.authorName ? book.authorName : "Test Author", id: book.authorId },
    reviews: [
      {
        id: "test",
        text: book.text ? book.text : "test text",
        user: { id: "sdf", name: book.reviewerName ? book.reviewerName :  "Reviewer" },
      },
    ],
    description: book.description,
  };
};

const App: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
      setIsLoading(false);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      const fetchedReviews = await getReviews();
      setReviews(fetchedReviews);
      setIsLoading(false);
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);
  
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < users.length; j++) {
      for (let k = 0; k < reviews.length; k++) {
        for (let keyBook in books[i]) {
          for (let keyUser in users[j]) {
            for (let keyReview in reviews[k]) {
              if (books[i].authorId === users[j].id) {
                books[i].authorName = users[j].name;
              } else if (
                users[j].id === reviews[k].userId &&
                reviews[k].id === books[i].reviewIds[0]
              ) {
                books[i].reviewerName = users[j].name;
                books[i].text = reviews[k].text;
              } 
            }
          }
        }
      }
    }
  }

  return (
    <div>
      <h1>Мои книги:</h1>
      {isLoading && <div>Загрузка...</div>}
      {!isLoading &&
        books.map((b) => (
          <Card key={b.id} book={toBookInformation(b)} />
        ))}
    </div>
  );
};

export default App;
