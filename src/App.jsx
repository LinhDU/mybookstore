import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookDetail from "./components/BookDetail";

function App() {
  return (
    <Router>
      {/* Thêm một div bọc ngoài cùng với className để style */}
      <div className="app-wrapper">
        <MyNavbar />
        
        {/* Thẻ main chứa nội dung thay đổi giữa các trang */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;