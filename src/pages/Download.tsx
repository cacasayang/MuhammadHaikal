import { Download as DownloadIcon, FileText } from "lucide-react";

export default function Download() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <section className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-card">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <FileText size={26} aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-black">Download CV</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          CV belum tersedia untuk diunduh. Admin dapat menambahkan tautan CV dari panel admin.
        </p>
        <a
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <DownloadIcon size={16} aria-hidden="true" />
          Kembali ke Beranda
        </a>
      </section>
    </main>
  );
}
