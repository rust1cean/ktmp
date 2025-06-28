import type { Tables } from "@/shared/data/supabase";
import type { Profile } from "../types";

export const profileDtoToProfileModel = (
  dto: Tables<"user_profile_view">
): Profile => ({
  id: dto.id!,
  name: dto.name!,
  avatarUrl: dto.image_path || undefined,
  role: dto.role ?? "user",
});
