import Beranda from "./pages/Beranda";
import TentangSaya from "./pages/TentangSaya";
import Pengalaman from "./pages/Pengalaman";
import Project from "./pages/Project";
import Keterampilan from "./pages/Keterampilan";
import Kontak from "./pages/Kontak";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

export const routers = [
  { path: "/", name: "home", element: <Beranda /> },
  { path: "/tentang-saya", name: "tentang-saya", element: <TentangSaya /> },
  { path: "/pengalaman", name: "pengalaman", element: <Pengalaman /> },
  { path: "/project", name: "project", element: <Project /> },
  { path: "/keterampilan", name: "keterampilan", element: <Keterampilan /> },
  { path: "/kontak", name: "kontak", element: <Kontak /> },
  { path: "/admin/login", name: "admin-login", element: <AdminLogin /> },
  { path: "/admin", name: "admin", element: <AdminDashboard /> },
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  { path: "*", name: "404", element: <NotFound /> },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
