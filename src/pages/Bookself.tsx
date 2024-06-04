import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Card from "@/components/Card";
import { FaSpinner } from "react-icons/fa";

export default function Bookself() {
  const { toast } = useToast();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const removeBook = useCallback((book) => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")!);
    const newBookshelf = bookshelf.filter(
      (item) => item.cover_i !== book.cover_i
    );
    localStorage.setItem("bookshelf", JSON.stringify(newBookshelf));
    setBooks(newBookshelf);
    toast({
      title: "Book removed from bookshelf",
      description: "The book has been removed from your bookshelf",
    });
  }, [toast]);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("bookshelf")) {
      setBooks(JSON.parse(localStorage.getItem("bookshelf")!));
      console.log(books);
    }
    setLoading(false);
  }, []);

  return (
    <div className="mt-8">
      <h1 className="text-4xl font-bold text-center">Bookshelf</h1>
      {!loading && books.length > 0 && (
        <section className="w-full grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-5">
          {books && books.map((book:any) => (
            <Card
              key={`${book.cover_i!}-${book.title.replace(/\s/g, "")!}`}
              {...book}
              // callfuntion={addTobookshelf}
              btnText="Remove from Bookshelf"
              callfuntion={() => removeBook(book)}
            />
          ))}
        </section>
      )}
      {!loading && books.length === 0 && (
        <div className="flex items-center justify-center w-full h-[400px]">
          <p className="text-2xl text-gray-200">No books found in your bookshelf</p>
        </div>
      )}
      {loading && (
        <div className="flex flex-col text-gray-200 items-center justify-center w-full h-[400px] ">
          <FaSpinner className="animate-spin text-4xl" />
          <span className="sr-only">Loading...</span>

          <span className="text-lg mt-2">
            Please wait while we fetch the data
          </span>
        </div>
      )}
    </div>
  );
}
