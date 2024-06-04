import { getBooks } from "@/api/api";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";

const getUseFullData = (book) => {
  const { title, cover_i, ratings_average, author_name, first_publish_year } =
    book;
  return {
    title,
    cover_i,
    ratings_average,
    author_name: author_name[0],
    first_publish_year,
  };
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController>();
  const { toast } = useToast()

  const addTobookshelf = useCallback((book) => {
    const bookData = book;
    if(localStorage.getItem("bookshelf")) {
      const bookshelf = JSON.parse(localStorage.getItem("bookshelf")!);
      if(bookshelf.find((item) => item.cover_i === book.cover_i)) {
        toast({
          variant: "destructive",
          title: "Book already in bookshelf",
          description: "The book you are trying to add is already in your bookshelf",
        })
        return 0;
      }
      bookshelf.push(bookData);
      localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
    } else {
      localStorage.setItem("bookshelf", JSON.stringify([bookData]));
    }
    toast({
      title: "Book added to bookshelf",
      description: "The book has been added to your bookshelf",
    })
    return 1;
  }
  , [toast]);
  

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (query === "") return;
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    setLoading(true);
    try {
      controllerRef.current = new AbortController();
      getBooks({ query: query.trim(), signal: controllerRef.current.signal, page, limit })
        .then((data) => {
          setBooks(data.docs);
          setCount(data.numFound);
          setLoading(false);
        })
        .catch((error) => {
          if (error.name === "AbortError") return;
          // console.log(error);
        });
    } catch (error: any) {
      if (error.name === "AbortError") return;
      // console.log(error);
    }
    return () => {
      controllerRef.current?.abort();
    };
  }, [query, page, limit]);

  return (
    <div>
      <div className="flex items-center justify-center mt-8">
        <div className="w-full max-w-lg border-2 text-lg text-black overflow-hidden rounded-lg flex gap-0 p-0 m-0">
          <Input
            type="text"
            placeholder="Search books..."
            value={query}
            className="border-gray-200 bg-gray-200 t w-full px-4 py-2 m-0 focus:outline-none text-lg border-0 rounded-e-none"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            variant={"ghost"}
            className="bg-gray-300 text-black px-4 rounded-l-none border-s-2 border-gray-200 hover:bg-gray-200/80 hover:text-black"
          >
            <span className="sr-only">Search</span>
            <FaSearch className="w-6 h-6 mx-2" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-end mt-4 text-white">
        <Select
          defaultValue={limit.toString()}
          onValueChange={(value) => setLimit(parseInt(value))}
        >
          <SelectTrigger className="max-w-24">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((item) => (
              <SelectItem key={item} value={`${item}`}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {query.trim()==="" && (
        <div className="flex items-center justify-center w-full h-[400px]">
          <p className="text-2xl text-gray-200">Please Search for a book</p>
        </div>
      )}
      { loading ? (
        <div className="flex flex-col text-gray-200 items-center justify-center w-full h-[400px] ">
          <FaSpinner className="animate-spin text-4xl" />
          <span className="sr-only">Loading...</span>

          <span className="text-lg mt-2">
            Please wait while we fetch the data
          </span>
        </div>
      ) : query.trim() !== "" && books && books?.length === 0 ? (
        <div className="flex items-center justify-center w-full h-[400px]">
          <p className="text-2xl text-gray-200">No books found</p>
        </div>
      ) : (
        <section className="w-full grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-5">
          {books && books.length>0 && books.map((book:any) => (
            <Card key={`${book.cover_i}-${book.title.replace(/\s/g, "")}`} {...getUseFullData(book)} callfuntion={addTobookshelf} />
          ))}
        </section>
      )}

      {count > limit && (
        <div className="flex items-center justify-center mt-4 flex-col">
          <Pagination>
            <PaginationContent className="flex items-center gap-4">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (page > 1) setPage((prev) => prev - 1);
                  }}
                  className={cn(
                    page === 1 ? "opacity-50 pointer-events-none" : ""
                  )}
                >
                  Previous
                </PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                <p className="text-gray-200 text-sm">
                  Showing {page} of {Math.ceil(count / limit)} pages
                </p>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (page <= Math.ceil(count / limit))
                      setPage((prev) => prev + 1);
                  }}
                  className={cn(
                    page === Math.ceil(count / limit)
                      ? "pointer-events-none opacity-50"
                      : ""
                  )}
                >
                  Next
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
