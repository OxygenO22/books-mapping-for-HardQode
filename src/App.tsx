
import './App.css';
import { Book, BookInformation } from "./lib/types";
import { getBooks, getUsers, getReviews } from "./lib/api";
import { useEffect, useState, FC } from "react";
import Card from "./Card";

const toBookInformation = (book: Book): BookInformation => {
  return {
    id: book.id,
    name: book.name || "Книга без названия",
    author: { name: "Test Author", id: "id" },
    reviews: [
      { id: "test", text: "test text", user: { id: "sdf", name: "Reviewer" } },
    ],
    description: book.description,
  };
};

const App: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
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
  
  return (
    <div>
      <h1>Мои книги:</h1>
      {isLoading && <div>Загрузка...</div>}
      {!isLoading &&
        books.map((b) => <Card key={b.id} book={toBookInformation(b)} />)}
    </div>
  );
};

export default App;
