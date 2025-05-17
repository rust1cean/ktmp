import type { VerifyOtpParams, ResendParams } from "@supabase/supabase-js";

import { supabase } from "@/shared/api/supabase";

export const verifyOtp = async (params: VerifyOtpParams) => {
  const {
    data: { session, user },
    error,
  } = await supabase.auth.verifyOtp(params);

  return { error, session, user };
};

export const resendOtp = async (params: ResendParams) => {
  const { error } = await supabase.auth.resend(params);

  if (error) return error;
};

export const requestToChangePasswordByEmail = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) return error;
};

export const updatePassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({ password });

  if (error) return error;
};
