import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import FavoritesPage from "./components/FavoritesPage";
import { FavoritesProvider } from "./components/FavoritesContext";

import MyNavbar from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import BookDetail from "./components/BookDetail";
import AllProducts from "./components/AllProducts";

import AdminLayout from "./admin/AdminLayout";
import AdminBooks from "./admin/AdminBooks";
import BookForm from "./admin/BookForm";
import AdminFeatured from "./admin/AdminFeatured";

import SearchResult from "./pages/SearchResult";
import CategoryPage from "./pages/CategoryPage";

const UserLayout = () => {
  return (
    <>
      <MyNavbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<AllProducts />} />
            <Route path="book/:id" element={<BookDetail />} />
            <Route path="search" element={<SearchResult />} />
            <Route path="category/:category" element={<CategoryPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="featured-config" element={<AdminFeatured />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="books/add" element={<BookForm />} />
            <Route path="books/edit/:id" element={<BookForm />} />
          </Route>
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
