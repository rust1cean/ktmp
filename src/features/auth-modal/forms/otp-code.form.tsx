"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";

import { PendingButton } from "@/shared/shadcn/shadcn-ui/button";
import { Form } from "@/shared/shadcn/shadcn-ui/form";
import { OtpCodeField, otpCodeFieldSchema } from "@/features/auth-modal/fields";
import { useTranslations } from "next-intl";

export const otpFormSchema = z.object({
  otpCode: otpCodeFieldSchema,
});

export type OtpCodeFormData = z.infer<typeof otpFormSchema>;

export type OtpCodeFormProps = {
  onSubmit: (credentials: OtpCodeFormData) => Promise<void>;
  onResend: () => Promise<void>;
};

export function OtpCodeForm({ onSubmit, onResend }: OtpCodeFormProps) {
  const t = useTranslations("Base");

  const otpCodeForm = useForm<OtpCodeFormData>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: { otpCode: "" },
  });

  return (
    <Form {...otpCodeForm}>
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <OtpCodeField />
        <div className="flex flex-col gap-2">
          <PendingButton
            type="submit"
            text={t("confirm")}
            onClick={otpCodeForm.handleSubmit(onSubmit)}
          />
          <ResendButton onResend={onResend} />
        </div>
      </form>
    </Form>
  );
}

function ResendButton({ onResend }: { onResend: () => Promise<void> }) {
  const t = useTranslations("Base");

  const formatText = useCallback(
    (secs: number) => t("until_resend", { secs }),
    [t]
  );

  const [isResendDisabled, setResendDisabled] = useState(false);
  const [remaining, setRemaining] = useState(60);
  const [resendText, setResendText] = useState(formatText(remaining));
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemaining((prevSecs) => {
        if (prevSecs > 0) {
          const newRemaining = prevSecs - 1;
          setResendText(formatText(newRemaining));

          return newRemaining;
        } else {
          clearInterval(timerId);
          setResendDisabled(false);
          setResendText(t("resend_otp_code"));

          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [formatText, t]);

  const handleClick = async () => {
    await onResend().then(() => setVisible(false));
  };

  return (
    isVisible && (
      <PendingButton
        variant="secondary"
        text={resendText}
        disabled={isResendDisabled}
        onClick={handleClick}
      />
    )
  );
}
