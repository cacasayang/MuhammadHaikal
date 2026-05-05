import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Profile
export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profile").select("*").maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (updates: Record<string, unknown>) => {
      const { data: existing } = await supabase.from("profile").select("id").maybeSingle();
      if (existing) {
        const { data, error } = await supabase.from("profile").update(updates).eq("id", existing.id).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from("profile").insert(updates).select().single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
};

// Experiences
export const useExperiences = () =>
  useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data, error } = await supabase.from("experiences").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useUpsertExperience = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (exp: Record<string, unknown>) => {
      if (exp.id) {
        const { id, ...rest } = exp;
        const { data, error } = await supabase.from("experiences").update(rest).eq("id", id as string).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from("experiences").insert(exp).select().single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["experiences"] }),
  });
};

export const useDeleteExperience = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("experiences").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["experiences"] }),
  });
};

// Projects
export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useUpsertProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (proj: Record<string, unknown>) => {
      if (proj.id) {
        const { id, ...rest } = proj;
        const { data, error } = await supabase.from("projects").update(rest).eq("id", id as string).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from("projects").insert(proj).select().single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
};

// Technical Skills
export const useSkillsTechnical = () =>
  useQuery({
    queryKey: ["skills_technical"],
    queryFn: async () => {
      const { data, error } = await supabase.from("skills_technical").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useUpsertSkillTechnical = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (skill: Record<string, unknown>) => {
      if (skill.id) {
        const { id, ...rest } = skill;
        const { data, error } = await supabase.from("skills_technical").update(rest).eq("id", id as string).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from("skills_technical").insert(skill).select().single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["skills_technical"] }),
  });
};

export const useDeleteSkillTechnical = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("skills_technical").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["skills_technical"] }),
  });
};

// Soft Skills
export const useSkillsSoft = () =>
  useQuery({
    queryKey: ["skills_soft"],
    queryFn: async () => {
      const { data, error } = await supabase.from("skills_soft").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useUpsertSkillSoft = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (skill: Record<string, unknown>) => {
      if (skill.id) {
        const { id, ...rest } = skill;
        const { data, error } = await supabase.from("skills_soft").update(rest).eq("id", id as string).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from("skills_soft").insert(skill).select().single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["skills_soft"] }),
  });
};

export const useDeleteSkillSoft = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("skills_soft").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["skills_soft"] }),
  });
};

// Education
export const useEducation = () =>
  useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const { data, error } = await supabase.from("education").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useUpsertEducation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (edu: Record<string, unknown>) => {
      if (edu.id) {
        const { id, ...rest } = edu;
        const { data, error } = await supabase.from("education").update(rest).eq("id", id as string).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from("education").insert(edu).select().single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["education"] }),
  });
};

export const useDeleteEducation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("education").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["education"] }),
  });
};

// About Traits
export const useAboutTraits = () =>
  useQuery({
    queryKey: ["about_traits"],
    queryFn: async () => {
      const { data, error } = await supabase.from("about_traits").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useUpsertAboutTrait = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (trait: Record<string, unknown>) => {
      if (trait.id) {
        const { id, ...rest } = trait;
        const { data, error } = await supabase.from("about_traits").update(rest).eq("id", id as string).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from("about_traits").insert(trait).select().single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["about_traits"] }),
  });
};

export const useDeleteAboutTrait = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("about_traits").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["about_traits"] }),
  });
};

// Stats
export const useStats = () =>
  useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data, error } = await supabase.from("stats").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useUpsertStat = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (stat: Record<string, unknown>) => {
      if (stat.id) {
        const { id, ...rest } = stat;
        const { data, error } = await supabase.from("stats").update(rest).eq("id", id as string).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from("stats").insert(stat).select().single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["stats"] }),
  });
};

export const useDeleteStat = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("stats").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["stats"] }),
  });
};
