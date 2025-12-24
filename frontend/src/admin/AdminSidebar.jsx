import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, Home } from "lucide-react";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar-fixed">
      <div className="sidebar-brand">
        <h2 className="admin-logo">NEVERLAND</h2>
        <p className="admin-status">Hệ thống quản trị</p>
      </div>

      <nav className="admin-menu">
        {/*<NavLink to="/admin" end className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
          <LayoutDashboard size={20} /> <span>Dashboard</span>
        </NavLink>*/}
        <NavLink to="/admin/books" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
          <BookOpen size={20} /> <span>Quản lý sách</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/" className="admin-link return-home">
          <Home size={20} /> <span>Về trang chủ</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default AdminSidebar;