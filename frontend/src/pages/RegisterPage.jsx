import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '' // 1. Đã sửa lỗi cảnh báo React
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Thêm kiểm tra mật khẩu khớp nhau ở frontend cho chắc chắn
    if (formData.password !== formData.confirmPassword) {
        return alert("Mật khẩu xác nhận không khớp!");
    }

    setLoading(true);
    try {
      // 2. Kiểm tra kỹ URL này có khớp với Backend bạn đã viết không
      await axios.post('http://localhost:5555/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (error) {
      console.error(error); // In ra console để xem chi tiết lỗi
      alert(error.response?.data?.message || 'Lỗi đăng ký (Có thể do Backend chưa bật hoặc sai URL)');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Đăng ký</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Họ tên</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Đăng ký'}
              </button>
            </form>
            <p className="text-center mt-3">
              Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}