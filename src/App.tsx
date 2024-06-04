import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Bookself from "./pages/Bookself";
import Layout from './layouts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/bookshelf" element={<Bookself />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
