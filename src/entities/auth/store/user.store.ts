import { createEvent, createStore } from "effector";
import type { User } from "@supabase/supabase-js";

export const $user = createStore<User | null>(null);
export const userCreated = createEvent<User>();
export const userDropped = createEvent();

$user.on(userCreated, (_, newUser) => newUser);
$user.on(userDropped, () => null);
