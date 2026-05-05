import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import { useProfile } from "@/hooks/usePortfolioData";

export default function MobileHeader() {
  const { data: profile } = useProfile();

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b border-border px-4 py-3 flex items-center justify-between"
      style={{ background: "hsl(var(--background))" }}>
      <Link to="/">
        <span className="text-2xl font-black text-primary tracking-tight">MH.</span>
      </Link>
      <div className="flex items-center gap-2">
        {profile?.cv_url && (
          <a
            href={profile.cv_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/20 hover:bg-primary/30 text-primary transition-all"
          >
            <Download size={15} />
          </a>
        )}
      </div>
    </header>
  );
}
