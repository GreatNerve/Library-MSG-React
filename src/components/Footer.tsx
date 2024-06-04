import { Link } from "react-router-dom";

export default function  Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-blue-600 sm:justify-start dark:text-blue-300">
            <Link to="/" className="text-xl font-bold">
              Books
            </Link>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right dark:text-gray-400">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
