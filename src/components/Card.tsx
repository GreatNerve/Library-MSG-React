import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function Card({
  title , cover_i, ratings_average, author_name, first_publish_year, callfuntion, btnText
}: {
    cover_i: number;
    title: string;
    ratings_average: number;
    author_name: string;
    first_publish_year: number;
    callfuntion ?: (any) => void;
    btnText ?: string;
}) {
    return (
        <div
              key={cover_i}
              className="flex flex-col gap-2 p-4 bg-blue-800/20 rounded-lg"
            >
              <Avatar className="w-full h-auto min-h-48 rounded-none">
                <AvatarImage
                  src={`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`}
                  alt={title}
                  className="w-full h-full rounded-none aspect-auto"
                />
                <AvatarFallback className="w-full h-full rounded-none">
                  {title}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">{title}</h2>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>
                    {index + 1 <= ratings_average ? (
                      <FaStar className="text-yellow-400 ms-2" />
                    ) : (
                      <FaRegStar className="text-yellow-400 ms-2" />
                    )}
                  </span>
                ))}
                <span className="text-sm text-gray-200 ms-1">
                  ({Math.round(ratings_average * 100) / 100})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="flex-1 text-sm text-gray-200">
                  {author_name}
                </p>
                <p className="text-sm text-gray-200">
                  {first_publish_year}
                </p>
              </div>
              <Button className="w-full text-sm md:text-base font-semibold mt-auto bg-blue-800 text-white hover:bg-blue-800/80" onClick={() => {
                callfuntion && callfuntion({title, cover_i, ratings_average, author_name, first_publish_year});
              }}>
                {btnText ? btnText : "Add to Bookshelf"}
              </Button>
            </div>
    );
}