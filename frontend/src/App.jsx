import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import MyNavbar from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import BookDetail from "./components/BookDetail";
import AllProducts from "./components/AllProducts";

import AdminLayout from "./admin/AdminLayout";

import AdminBooks from "./admin/AdminBooks";
import BookForm from "./admin/BookForm";
import AdminFeatured from "./admin/AdminFeatured";

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
    <Router>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} /> 
          <Route path="products" element={<AllProducts />} /> 
          <Route path="book/:id" element={<BookDetail />} />  
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="featured-config" element={<AdminFeatured />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="books/add" element={<BookForm />} />
          <Route path="books/edit/:id" element={<BookForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;