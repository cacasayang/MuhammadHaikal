import { Link, useLocation } from "react-router-dom";
import { Home, User, Briefcase, Code, BarChart2, Mail, Download, Linkedin, Github, Instagram, FolderDown } from "lucide-react";
import { useProfile } from "@/hooks/usePortfolioData";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Beranda", icon: Home },
  { path: "/tentang-saya", label: "Tentang Saya", icon: User },
  { path: "/pengalaman", label: "Pengalaman", icon: Briefcase },
  { path: "/project", label: "Project", icon: Code },
  { path: "/keterampilan", label: "Keterampilan", icon: BarChart2 },
  { path: "/kontak", label: "Kontak", icon: Mail },
];

export default function Sidebar() {
  const location = useLocation();
  const { data: profile } = useProfile();

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[168px] gradient-sidebar border-r border-border z-50">
      {/* Logo */}
      <div className="p-6 pb-4">
        <Link to="/" className="block">
          <span className="text-3xl font-black text-primary tracking-tight">MH.</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                active
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon size={16} className={active ? "text-primary" : ""} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-border space-y-3">
        {/* Download files link */}
        <Link
          to="/download"
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-secondary/60 hover:bg-secondary text-foreground text-sm font-medium transition-all duration-200 w-full border border-border/50"
        >
          <FolderDown size={15} className="text-primary" />
          <span className="text-xs font-semibold">Download Files</span>
        </Link>

        {profile?.cv_url && (
          <a
            href={profile.cv_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-sm font-medium transition-all duration-200 w-full"
          >
            <Download size={15} />
            <div>
              <div className="text-xs font-semibold">Download CV</div>
              <div className="text-xs text-muted-foreground leading-tight">Muhammad Haikal</div>
            </div>
          </a>
        )}

        <div>
          <p className="text-xs text-muted-foreground mb-2 px-1">Follow Me</p>
          <div className="flex gap-2 px-1">
            {profile?.linkedin_url && profile.linkedin_url !== '#' && (
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-secondary hover:bg-[hsl(210,90%,50%)/20] text-muted-foreground hover:text-blue-accent transition-all">
                <Linkedin size={15} />
              </a>
            )}
            {profile?.github_url && profile.github_url !== '#' && (
              <a href={profile.github_url} target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-all">
                <Github size={15} />
              </a>
            )}
            {profile?.instagram_url && profile.instagram_url !== '#' && (
              <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-secondary hover:bg-pink-500/20 text-muted-foreground hover:text-pink-400 transition-all">
                <Instagram size={15} />
              </a>
            )}
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground px-1">© 2025 Muhammad Haikal<br />All rights reserved.</p>
      </div>
    </aside>
  );
}
