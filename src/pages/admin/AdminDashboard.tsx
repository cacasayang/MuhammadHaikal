import { useState, useEffect, ReactNode, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LogOut, User, Briefcase, Code, BarChart2, GraduationCap, Star, Activity,
  Plus, Trash2, Save, Edit2, X, Eye, Download, ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  useProfile, useUpdateProfile,
  useExperiences, useUpsertExperience, useDeleteExperience,
  useProjects, useUpsertProject, useDeleteProject,
  useSkillsTechnical, useUpsertSkillTechnical, useDeleteSkillTechnical,
  useSkillsSoft, useUpsertSkillSoft, useDeleteSkillSoft,
  useEducation, useUpsertEducation, useDeleteEducation,
  useAboutTraits, useUpsertAboutTrait, useDeleteAboutTrait,
  useStats, useUpsertStat, useDeleteStat,
} from "@/hooks/usePortfolioData";

type Tab = "profile" | "experience" | "projects" | "skills" | "education" | "traits" | "stats";

const TABS: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "profile",    label: "Profil",       Icon: User },
  { id: "experience", label: "Pengalaman",   Icon: Briefcase },
  { id: "projects",   label: "Project",      Icon: Code },
  { id: "skills",     label: "Skill",        Icon: BarChart2 },
  { id: "education",  label: "Pendidikan",   Icon: GraduationCap },
  { id: "traits",     label: "Karakter",     Icon: Star },
  { id: "stats",      label: "Statistik",    Icon: Activity },
];

/* ── shared input class ───────────────────────────────────── */
const inputCls =
  "w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground " +
  "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all";

/* ── tiny helpers ─────────────────────────────────────────── */
function Card({ children }: { children: ReactNode }) {
  return <div className="bg-card border border-border rounded-2xl overflow-hidden">{children}</div>;
}
function CardHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-4 py-3.5 border-b border-border">
      <p className="text-sm font-bold text-foreground">{title}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-foreground mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
function SaveCancel({
  onSave, onCancel, saving, label = "Simpan"
}: { onSave: () => void; onCancel: () => void; saving?: boolean; label?: string }) {
  return (
    <div className="flex gap-2 pt-1">
      <button onClick={onSave} disabled={saving}
        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold text-primary-foreground disabled:opacity-60 transition-all hover:opacity-90"
        style={{ background: "var(--gradient-purple)" }}>
        <Save size={13} /> {saving ? "Menyimpan..." : label}
      </button>
      <button onClick={onCancel}
        className="flex-1 py-3 rounded-xl text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-all">
        Batal
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [authed, setAuthed] = useState(false);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/admin/login");
      else setAuthed(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) navigate("/admin/login");
      else setAuthed(true);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  // scroll active tab into view
  useEffect(() => {
    const bar = tabBarRef.current;
    if (!bar) return;
    const active = bar.querySelector(`[data-tab="${activeTab}"]`) as HTMLElement | null;
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeTab]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (!authed) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-2">
        <p className="text-2xl font-black text-primary">MH.</p>
        <p className="text-sm text-muted-foreground animate-pulse">Memverifikasi...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ─── TOP HEADER ────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-black text-primary">MH.</span>
            <span className="text-sm font-semibold text-foreground">Admin</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Link to="/" target="_blank"
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground transition-all"
              title="Lihat Portfolio">
              <Eye size={16} />
            </Link>
            <Link to="/download" target="_blank"
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground transition-all"
              title="Download Files">
              <Download size={16} />
            </Link>
            <button onClick={handleLogout}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-destructive/20 hover:bg-destructive/30 text-destructive transition-all"
              title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* ─── TAB BAR ─────────────────────────────────────────── */}
        <div
          ref={tabBarRef}
          className="flex gap-1.5 px-3 pb-3 overflow-x-auto no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {TABS.map(({ id, label, Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                data-tab={id}
                onClick={() => setActiveTab(id)}
                className={[
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-200",
                  active
                    ? "text-primary-foreground shadow-sm"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                ].join(" ")}
                style={active ? { background: "var(--gradient-purple)" } : {}}
              >
                <Icon size={13} />
                {label}
              </button>
            );
          })}
        </div>
      </header>

      {/* ─── PAGE CONTENT ─────────────────────────────────────── */}
      <main className="flex-1 px-3 py-4 overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {activeTab === "profile"    && <ProfileEditor    toast={toast} />}
            {activeTab === "experience" && <ExperienceEditor toast={toast} />}
            {activeTab === "projects"   && <ProjectEditor    toast={toast} />}
            {activeTab === "skills"     && <SkillsEditor     toast={toast} />}
            {activeTab === "education"  && <EducationEditor  toast={toast} />}
            {activeTab === "traits"     && <TraitsEditor     toast={toast} />}
            {activeTab === "stats"      && <StatsEditor      toast={toast} />}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PROFILE EDITOR
══════════════════════════════════════════════════════════ */
function ProfileEditor({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const { data: profile } = useProfile();
  const update = useUpdateProfile();
  const [form, setForm] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (profile && !ready) {
      setForm({
        name: profile.name || "", title: profile.title || "",
        bio: profile.bio || "", photo_url: profile.photo_url || "",
        location: profile.location || "", phone: profile.phone || "",
        email: profile.email || "", whatsapp_number: profile.whatsapp_number || "",
        linkedin_url: profile.linkedin_url || "", github_url: profile.github_url || "",
        instagram_url: profile.instagram_url || "", cv_url: profile.cv_url || "",
        tagline: profile.tagline || "", tagline_sub: profile.tagline_sub || "",
      });
      setReady(true);
    }
  }, [profile, ready]);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    try { await update.mutateAsync(form); toast({ title: "Profil disimpan!" }); }
    catch (e: unknown) { toast({ title: "Gagal", description: (e as Error).message, variant: "destructive" }); }
  };

  const groups = [
    {
      title: "Informasi Dasar",
      fields: [
        { k: "name", label: "Nama Lengkap" },
        { k: "title", label: "Jabatan / Jurusan" },
        { k: "bio", label: "Bio", textarea: true },
        { k: "photo_url", label: "URL Foto Profil" },
        { k: "tagline", label: "Tagline" },
        { k: "tagline_sub", label: "Sub-tagline" },
      ]
    },
    {
      title: "Kontak",
      fields: [
        { k: "location", label: "Lokasi" },
        { k: "phone", label: "No. Telepon" },
        { k: "email", label: "Email" },
        { k: "whatsapp_number", label: "WhatsApp (62xxx...)" },
      ]
    },
    {
      title: "Media Sosial & CV",
      fields: [
        { k: "linkedin_url", label: "LinkedIn URL" },
        { k: "github_url", label: "GitHub URL" },
        { k: "instagram_url", label: "Instagram URL" },
        { k: "cv_url", label: "Link Download CV" },
      ]
    },
  ];

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      {/* Photo preview */}
      {form.photo_url && (
        <Card>
          <div className="p-4 flex items-center gap-3">
            <img src={form.photo_url} alt="foto" className="w-16 h-16 rounded-2xl object-cover object-top border border-border" />
            <div>
              <p className="text-sm font-bold text-foreground">{form.name}</p>
              <p className="text-xs text-muted-foreground">{form.title}</p>
            </div>
          </div>
        </Card>
      )}

      {groups.map(g => (
        <Card key={g.title}>
          <CardHeader title={g.title} />
          <div className="p-4 space-y-3">
            {g.fields.map(({ k, label, textarea }) => (
              <Field key={k} label={label}>
                {textarea
                  ? <textarea rows={3} value={form[k] || ""} onChange={set(k)} className={inputCls + " resize-none"} />
                  : <input value={form[k] || ""} onChange={set(k)} className={inputCls} />
                }
              </Field>
            ))}
          </div>
        </Card>
      ))}

      <button onClick={save} disabled={update.isPending}
        className="w-full py-3.5 rounded-2xl font-bold text-sm text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-60 transition-all hover:opacity-90"
        style={{ background: "var(--gradient-purple)" }}>
        <Save size={15} /> {update.isPending ? "Menyimpan..." : "Simpan Semua Perubahan"}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   EXPERIENCE EDITOR
══════════════════════════════════════════════════════════ */
function ExperienceEditor({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const { data: list = [] } = useExperiences();
  const upsert = useUpsertExperience();
  const del = useDeleteExperience();
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  const blank = () => ({ period: "", title: "", company: "", category: "", tasks: [] as string[], task_count: 0, sort_order: list.length + 1 });

  const save = async () => {
    try { await upsert.mutateAsync(editing!); toast({ title: "Disimpan!" }); setEditing(null); }
    catch (e: unknown) { toast({ title: "Gagal", description: (e as Error).message, variant: "destructive" }); }
  };

  const tasks = (editing?.tasks as string[]) ?? [];
  const setTasks = (t: string[]) => setEditing(e => ({ ...e!, tasks: t, task_count: t.length }));

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      <ListHeader title="Pengalaman Kerja" count={list.length} onAdd={() => setEditing(blank())} />

      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <Card>
              <CardHeader title={editing.id ? "Edit Pengalaman" : "Tambah Pengalaman"} />
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Periode"><input value={String(editing.period || "")} onChange={e => setEditing({ ...editing, period: e.target.value })} className={inputCls} placeholder="2023–2024" /></Field>
                  <Field label="Urutan"><input type="number" value={Number(editing.sort_order)} onChange={e => setEditing({ ...editing, sort_order: +e.target.value })} className={inputCls} /></Field>
                  <Field label="Jabatan"><input value={String(editing.title || "")} onChange={e => setEditing({ ...editing, title: e.target.value })} className={inputCls} /></Field>
                  <Field label="Perusahaan"><input value={String(editing.company || "")} onChange={e => setEditing({ ...editing, company: e.target.value })} className={inputCls} /></Field>
                </div>
                <Field label="Kategori">
                  <input value={String(editing.category || "")} onChange={e => setEditing({ ...editing, category: e.target.value })} className={inputCls} placeholder="Administrasi, dll" />
                </Field>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-foreground">Tugas</label>
                    <button onClick={() => setTasks([...tasks, ""])} className="text-xs text-primary flex items-center gap-1"><Plus size={11} />Tambah</button>
                  </div>
                  <div className="space-y-2">
                    {tasks.map((t, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={t} onChange={e => { const n = [...tasks]; n[i] = e.target.value; setTasks(n); }} className={inputCls + " flex-1"} placeholder={`Tugas ${i + 1}`} />
                        <button onClick={() => setTasks(tasks.filter((_, j) => j !== i))} className="p-2.5 rounded-xl bg-destructive/20 text-destructive shrink-0"><X size={13} /></button>
                      </div>
                    ))}
                  </div>
                </div>
                <SaveCancel onSave={save} onCancel={() => setEditing(null)} saving={upsert.isPending} />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {list.map(exp => (
          <Card key={exp.id}>
            <div className="p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                <Briefcase size={15} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{exp.period}</span>
                <p className="text-sm font-bold text-foreground mt-1 truncate">{exp.title}</p>
                <p className="text-xs text-muted-foreground truncate">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.tasks?.length || 0} tugas</p>
              </div>
              <ItemActions onEdit={() => setEditing({ ...exp })} onDelete={async () => { if (confirm("Hapus?")) { await del.mutateAsync(exp.id); toast({ title: "Dihapus!" }); } }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PROJECT EDITOR
══════════════════════════════════════════════════════════ */
function ProjectEditor({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const { data: list = [] } = useProjects();
  const upsert = useUpsertProject();
  const del = useDeleteProject();
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  const save = async () => {
    try { await upsert.mutateAsync(editing!); toast({ title: "Disimpan!" }); setEditing(null); }
    catch (e: unknown) { toast({ title: "Gagal", description: (e as Error).message, variant: "destructive" }); }
  };

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      <ListHeader title="Portfolio Project" count={list.length} onAdd={() => setEditing({ title: "", description: "", url: "", image_url: "", is_featured: true, sort_order: list.length + 1 })} />

      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <Card>
              <CardHeader title={editing.id ? "Edit Project" : "Tambah Project"} />
              <div className="p-4 space-y-3">
                <Field label="Nama Project"><input value={String(editing.title || "")} onChange={e => setEditing({ ...editing, title: e.target.value })} className={inputCls} /></Field>
                <Field label="Deskripsi"><textarea rows={3} value={String(editing.description || "")} onChange={e => setEditing({ ...editing, description: e.target.value })} className={inputCls + " resize-none"} /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="URL Project"><input value={String(editing.url || "")} onChange={e => setEditing({ ...editing, url: e.target.value })} className={inputCls} /></Field>
                  <Field label="Urutan"><input type="number" value={Number(editing.sort_order)} onChange={e => setEditing({ ...editing, sort_order: +e.target.value })} className={inputCls} /></Field>
                </div>
                <Field label="URL Gambar">
                  <input value={String(editing.image_url || "")} onChange={e => setEditing({ ...editing, image_url: e.target.value })} className={inputCls} />
                </Field>
                {editing.image_url && (
                  <img src={editing.image_url as string} alt="preview" className="w-full h-32 object-cover rounded-xl border border-border" />
                )}
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" checked={!!editing.is_featured} onChange={e => setEditing({ ...editing, is_featured: e.target.checked })} className="accent-primary" />
                  Tampilkan sebagai Featured
                </label>
                <SaveCancel onSave={save} onCancel={() => setEditing(null)} saving={upsert.isPending} />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {list.map(p => (
          <Card key={p.id}>
            {p.image_url && <img src={p.image_url} alt={p.title} className="w-full h-32 object-cover" />}
            <div className="p-3">
              <p className="text-sm font-bold text-foreground">{p.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{p.description}</p>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary mt-1 hover:underline truncate">
                  <ChevronRight size={11} /> {p.url}
                </a>
              )}
              <div className="flex gap-2 mt-3">
                <button onClick={() => setEditing({ ...p })} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary/15 text-primary text-xs font-semibold hover:bg-primary/25 transition-all">
                  <Edit2 size={11} /> Edit
                </button>
                <button onClick={async () => { if (confirm("Hapus?")) { await del.mutateAsync(p.id); toast({ title: "Dihapus!" }); } }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-destructive/15 text-destructive text-xs font-semibold hover:bg-destructive/25 transition-all">
                  <Trash2 size={11} /> Hapus
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SKILLS EDITOR
══════════════════════════════════════════════════════════ */
function SkillsEditor({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const { data: tech = [] } = useSkillsTechnical();
  const { data: soft = [] } = useSkillsSoft();
  const uT = useUpsertSkillTechnical(); const dT = useDeleteSkillTechnical();
  const uS = useUpsertSkillSoft();      const dS = useDeleteSkillSoft();
  const [editT, setEditT] = useState<Record<string, unknown> | null>(null);
  const [editS, setEditS] = useState<Record<string, unknown> | null>(null);

  const saveT = async () => { try { await uT.mutateAsync(editT!); toast({ title: "Disimpan!" }); setEditT(null); } catch (e: unknown) { toast({ title: "Gagal", variant: "destructive", description: (e as Error).message }); } };
  const saveS = async () => { try { await uS.mutateAsync(editS!); toast({ title: "Disimpan!" }); setEditS(null); } catch (e: unknown) { toast({ title: "Gagal", variant: "destructive", description: (e as Error).message }); } };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Technical */}
      <Card>
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
          <div>
            <p className="text-sm font-bold text-foreground">Keterampilan Teknis</p>
            <p className="text-xs text-muted-foreground">{tech.length} skill</p>
          </div>
          <button onClick={() => setEditT({ name: "", percentage: 80, sort_order: tech.length + 1 })}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-purple)" }}>
            <Plus size={11} /> Tambah
          </button>
        </div>
        <div className="p-4 space-y-3">
          <AnimatePresence>
            {editT && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="bg-secondary/40 rounded-xl p-3 border border-border space-y-3 mb-1">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Nama Skill"><input value={String(editT.name || "")} onChange={e => setEditT({ ...editT, name: e.target.value })} className={inputCls} /></Field>
                    <Field label="% (0-100)"><input type="number" min={0} max={100} value={Number(editT.percentage || 80)} onChange={e => setEditT({ ...editT, percentage: +e.target.value })} className={inputCls} /></Field>
                  </div>
                  <SaveCancel onSave={saveT} onCancel={() => setEditT(null)} saving={uT.isPending} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {tech.map(s => (
            <div key={s.id} className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-foreground truncate">{s.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">{s.percentage}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full progress-bar" style={{ width: `${s.percentage}%` }} />
                </div>
              </div>
              <ItemActions onEdit={() => setEditT({ ...s })} onDelete={async () => { if (confirm("Hapus?")) { await dT.mutateAsync(s.id); toast({ title: "Dihapus!" }); } }} />
            </div>
          ))}
        </div>
      </Card>

      {/* Soft */}
      <Card>
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
          <div>
            <p className="text-sm font-bold text-foreground">Keterampilan Non Teknis</p>
            <p className="text-xs text-muted-foreground">{soft.length} skill</p>
          </div>
          <button onClick={() => setEditS({ name: "", sort_order: soft.length + 1 })}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-purple)" }}>
            <Plus size={11} /> Tambah
          </button>
        </div>
        <div className="p-4 space-y-3">
          <AnimatePresence>
            {editS && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="bg-secondary/40 rounded-xl p-3 border border-border space-y-3 mb-1">
                  <Field label="Nama Skill"><input value={String(editS.name || "")} onChange={e => setEditS({ ...editS, name: e.target.value })} className={inputCls} /></Field>
                  <SaveCancel onSave={saveS} onCancel={() => setEditS(null)} saving={uS.isPending} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex flex-wrap gap-2">
            {soft.map(s => (
              <div key={s.id} className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-secondary border border-border rounded-xl text-xs text-foreground">
                <span>{s.name}</span>
                <button onClick={() => setEditS({ ...s })} className="p-1 rounded-md bg-primary/15 text-primary hover:bg-primary/25"><Edit2 size={9} /></button>
                <button onClick={async () => { if (confirm("Hapus?")) { await dS.mutateAsync(s.id); toast({ title: "Dihapus!" }); } }} className="p-1 rounded-md bg-destructive/15 text-destructive hover:bg-destructive/25"><Trash2 size={9} /></button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   EDUCATION EDITOR
══════════════════════════════════════════════════════════ */
function EducationEditor({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const { data: list = [] } = useEducation();
  const upsert = useUpsertEducation();
  const del = useDeleteEducation();
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  const save = async () => {
    try { await upsert.mutateAsync(editing!); toast({ title: "Disimpan!" }); setEditing(null); }
    catch (e: unknown) { toast({ title: "Gagal", description: (e as Error).message, variant: "destructive" }); }
  };

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      <ListHeader title="Riwayat Pendidikan" count={list.length} onAdd={() => setEditing({ school: "", major: "", period: "", sort_order: list.length + 1 })} />
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <Card>
              <CardHeader title={editing.id ? "Edit Pendidikan" : "Tambah Pendidikan"} />
              <div className="p-4 space-y-3">
                <Field label="Nama Sekolah"><input value={String(editing.school || "")} onChange={e => setEditing({ ...editing, school: e.target.value })} className={inputCls} /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Jurusan"><input value={String(editing.major || "")} onChange={e => setEditing({ ...editing, major: e.target.value })} className={inputCls} /></Field>
                  <Field label="Periode"><input value={String(editing.period || "")} onChange={e => setEditing({ ...editing, period: e.target.value })} className={inputCls} /></Field>
                </div>
                <SaveCancel onSave={save} onCancel={() => setEditing(null)} saving={upsert.isPending} />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="space-y-2">
        {list.map(edu => (
          <Card key={edu.id}>
            <div className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <GraduationCap size={15} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{edu.school}</p>
                <p className="text-xs text-muted-foreground truncate">{edu.major}</p>
                <p className="text-xs text-primary">{edu.period}</p>
              </div>
              <ItemActions onEdit={() => setEditing({ ...edu })} onDelete={async () => { if (confirm("Hapus?")) { await del.mutateAsync(edu.id); toast({ title: "Dihapus!" }); } }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TRAITS EDITOR
══════════════════════════════════════════════════════════ */
function TraitsEditor({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const { data: list = [] } = useAboutTraits();
  const upsert = useUpsertAboutTrait();
  const del = useDeleteAboutTrait();
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  const save = async () => {
    try { await upsert.mutateAsync(editing!); toast({ title: "Disimpan!" }); setEditing(null); }
    catch (e: unknown) { toast({ title: "Gagal", description: (e as Error).message, variant: "destructive" }); }
  };

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      <ListHeader title="Karakter / Sifat" count={list.length} onAdd={() => setEditing({ icon: "Star", title: "", description: "", color: "blue", sort_order: list.length + 1 })} />
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <Card>
              <CardHeader title={editing.id ? "Edit Karakter" : "Tambah Karakter"} />
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Judul"><input value={String(editing.title || "")} onChange={e => setEditing({ ...editing, title: e.target.value })} className={inputCls} /></Field>
                  <Field label="Warna">
                    <select value={String(editing.color || "blue")} onChange={e => setEditing({ ...editing, color: e.target.value })} className={inputCls}>
                      {["blue","purple","green","orange","red","teal","pink","yellow"].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Deskripsi"><input value={String(editing.description || "")} onChange={e => setEditing({ ...editing, description: e.target.value })} className={inputCls} /></Field>
                <SaveCancel onSave={save} onCancel={() => setEditing(null)} saving={upsert.isPending} />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {list.map(t => (
          <Card key={t.id}>
            <div className="p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <span className="text-sm font-black text-primary">{t.title?.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{t.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{t.description}</p>
              </div>
              <ItemActions onEdit={() => setEditing({ ...t })} onDelete={async () => { if (confirm("Hapus?")) { await del.mutateAsync(t.id); toast({ title: "Dihapus!" }); } }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STATS EDITOR
══════════════════════════════════════════════════════════ */
function StatsEditor({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const { data: list = [] } = useStats();
  const upsert = useUpsertStat();
  const del = useDeleteStat();
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const icons = ["Briefcase","Calendar","Target","Star","Shield","Rocket","Users","BarChart2","Zap","Award","TrendingUp"];

  const save = async () => {
    try { await upsert.mutateAsync(editing!); toast({ title: "Disimpan!" }); setEditing(null); }
    catch (e: unknown) { toast({ title: "Gagal", description: (e as Error).message, variant: "destructive" }); }
  };

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      <ListHeader title="Statistik & Pencapaian" count={list.length} onAdd={() => setEditing({ icon: "Star", value: "", label: "", sort_order: list.length + 1 })} />
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <Card>
              <CardHeader title={editing.id ? "Edit Statistik" : "Tambah Statistik"} />
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Icon">
                    <select value={String(editing.icon || "Star")} onChange={e => setEditing({ ...editing, icon: e.target.value })} className={inputCls}>
                      {icons.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  </Field>
                  <Field label="Nilai (cth: 4+)"><input value={String(editing.value || "")} onChange={e => setEditing({ ...editing, value: e.target.value })} className={inputCls} /></Field>
                </div>
                <Field label="Label"><input value={String(editing.label || "")} onChange={e => setEditing({ ...editing, label: e.target.value })} className={inputCls} /></Field>
                <SaveCancel onSave={save} onCancel={() => setEditing(null)} saving={upsert.isPending} />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-2 gap-2">
        {list.map(s => (
          <Card key={s.id}>
            <div className="p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <Activity size={15} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-black text-foreground leading-none">{s.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{s.label}</p>
              </div>
              <ItemActions onEdit={() => setEditing({ ...s })} onDelete={async () => { if (confirm("Hapus?")) { await del.mutateAsync(s.id); toast({ title: "Dihapus!" }); } }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MICRO COMPONENTS
══════════════════════════════════════════════════════════ */
function ListHeader({ title, count, onAdd }: { title: string; count: number; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-base font-black text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{count} terdaftar</p>
      </div>
      <button onClick={onAdd}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground"
        style={{ background: "var(--gradient-purple)" }}>
        <Plus size={14} /> Tambah
      </button>
    </div>
  );
}

function ItemActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex gap-1.5 shrink-0">
      <button onClick={onEdit} className="p-2 rounded-xl bg-primary/15 text-primary hover:bg-primary/25 transition-all"><Edit2 size={13} /></button>
      <button onClick={onDelete} className="p-2 rounded-xl bg-destructive/15 text-destructive hover:bg-destructive/25 transition-all"><Trash2 size={13} /></button>
    </div>
  );
}
