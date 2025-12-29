import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
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