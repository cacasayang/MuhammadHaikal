import { Link, useLocation } from "react-router-dom";
import { Home, User, Briefcase, Code, BarChart2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Beranda", icon: Home },
  { path: "/tentang-saya", label: "Tentang Saya", icon: User },
  { path: "/pengalaman", label: "Pengalaman", icon: Briefcase },
  { path: "/project", label: "Project", icon: Code },
  { path: "/kontak", label: "Kontak", icon: Mail },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border"
      style={{ background: "hsl(var(--background))" }}>
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-all duration-200 min-w-[52px]",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg transition-all",
                active ? "bg-primary/15" : ""
              )}>
                <Icon size={18} />
              </div>
              <span className="text-[9px] font-medium leading-tight text-center">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
