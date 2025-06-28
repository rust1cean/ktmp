import { createEvent, createStore } from "effector";
import type { User } from "@supabase/supabase-js";

export const userCreated = createEvent<User>();
export const userDropped = createEvent();

export const $user = createStore<User | null>(null)
  .on(userCreated, (_, newUser) => newUser)
  .on(userDropped, () => null);
