import { createEffect } from "effector";

import {
  verifyOtp,
  resendOtp,
  requestToChangePasswordByEmail,
  updatePassword,
} from "@/shared/data/auth/api";
import { sessionCreated } from "@/entities/auth/store";

export const confirmEmailFx = createEffect(
  async ({ email, token }: { email: string; token: string }) => {
    const res = await verifyOtp({
      type: "signup",
      email,
      token,
    });

    if (res.session) sessionCreated(res.session);

    return res;
  }
);

export const resendOtpFx = createEffect(
  async ({ email }: { email: string }) => {
    const error = await resendOtp({
      email,
      type: "signup",
    });

    if (error) {
      return error;
    }
  }
);

export const requestToChangePasswordByEmailFx = createEffect(
  async ({ email }: { email: string }) => {
    const error = await requestToChangePasswordByEmail(email);

    if (error) {
      return error;
    }
  }
);

export const updatePasswordFx = createEffect(
  ({ password }: { password: string }) => {
    const error = updatePassword(password);

    if (error) {
      return error;
    }
  }
);
