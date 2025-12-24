import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    // Thẻ div này là quan trọng nhất để chia 2 cột
    <div className="admin-layout-wrapper">
      <AdminSidebar />
      <main className="admin-main-content">
        <header className="admin-topbar">
          
        </header>
        <div className="admin-page-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;