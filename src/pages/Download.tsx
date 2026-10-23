import { Download as DownloadIcon, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useProfile } from "@/hooks/usePortfolioData";

export default function Download() {
  const { data: profile, isLoading } = useProfile();
  const cvUrl = profile?.cv_url?.trim();

  return (
    <Layout>
      <main className="max-w-2xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
        <div className="text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">Beranda</Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">Download</span>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/15 flex items-center justify-center mb-4">
            <FileText size={28} className="text-primary" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-foreground mb-2">DOWNLOAD CV</h1>
          <div className="w-16 h-1 rounded-full mx-auto mb-4" style={{ background: "var(--gradient-purple)" }} />
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Unduh CV {profile?.name || "Muhammad Haikal"} untuk melihat ringkasan profil, pengalaman, dan keterampilan.
          </p>

          {isLoading ? (
            <p className="text-sm text-muted-foreground animate-pulse">Memuat data CV...</p>
          ) : cvUrl ? (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-primary-foreground transition-all hover:opacity-90"
              style={{ background: "var(--gradient-purple)" }}
            >
              <DownloadIcon size={16} /> Download CV
            </a>
          ) : (
            <p className="text-sm text-muted-foreground bg-secondary/60 border border-border rounded-xl px-4 py-3">
              Link CV belum tersedia. Silakan tambahkan melalui panel admin.
            </p>
          )}

          <Link to="/" className="inline-flex items-center gap-2 mt-6 text-sm text-primary hover:underline">
            <ArrowLeft size={14} /> Kembali ke beranda
          </Link>
        </div>
      </main>
    </Layout>
  );
}
