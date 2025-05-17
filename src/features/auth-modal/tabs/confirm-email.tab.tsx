import { OtpCodeForm, type OtpCodeFormData } from "@/features/auth-modal/forms";
import { confirmEmailFx, resendOtpFx } from "@/entities/auth";
import { Tab } from "@/features/auth-modal/tabs";

export type ConfirmEmailTabProps = {
  email: string;
  onSuccess: (msg: string) => void;
  onFail: (reason: string) => void;
};

export function ConfirmEmailTab({
  email,
  onSuccess,
  onFail,
}: ConfirmEmailTabProps) {
  const handleSubmit = async ({ otpCode }: OtpCodeFormData) => {
    const { error } = await confirmEmailFx({ email, token: otpCode });

    if (error) onFail(error.message);
    else onSuccess("E-mail confirmed");
  };

  const handleResend = async () => {
    const error = await resendOtpFx({ email });

    if (error) onFail(error.message);
  };

  return (
    <Tab
      name="confirmEmail"
      title="Verify your e-mail"
      description="We’ve sent a one-time code to your email. Please enter it below to verify your account"
    >
      <OtpCodeForm onSubmit={handleSubmit} onResend={handleResend} />
    </Tab>
  );
}
