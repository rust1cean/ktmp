export type Profile = {
  id: string;
  name: string;
  avatarUrl?: string;
  role: ProfileRole;
};

export type ProfileId = Profile["id"];
export type ProfileRole = "user" | "author";
