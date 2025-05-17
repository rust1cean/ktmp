import { z } from "zod";

import { FormField } from "@/shared/shadcn-ui/form-field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/shadcn-ui/input-otp";
import { FormControl, FormItem } from "@/shared/shadcn-ui/form";

export const OTP_CODE_LENGTH: number = 6;
export const otpCodeFieldSchema = z
  .string()
  .length(OTP_CODE_LENGTH, `OTP-code must contain ${OTP_CODE_LENGTH} digits`);

export function OtpCodeField() {
  return (
    <FormField
      name="otpCode"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <InputOTP maxLength={OTP_CODE_LENGTH} {...field}>
              <InputOTPGroup className="w-full">
                {Array.from({ length: OTP_CODE_LENGTH }, (_, i) => (
                  <InputOTPSlot className="w-full" key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
