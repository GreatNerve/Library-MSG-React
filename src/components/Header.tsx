import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-white dark:bg-black/75 sticky top-0 z-50 shadow-sm dark:shadow-none  backdrop-blur-sm">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link to={"/"} className="block text-blue-600 dark:text-blue-300">
              <span className="text-2xl font-semibold">Books</span>
            </Link>
          </div>

          <div className="flex items-center gap-12 font-bold">
            <nav aria-label="Global" className="block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to={"/"}
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to={"/bookshelf"}
                  >
                    Bookshelf
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
