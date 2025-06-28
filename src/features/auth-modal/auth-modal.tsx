"use client";

import { useUnit } from "effector-react";

import { Dialog, DialogContent } from "@/shared/shadcn/shadcn-ui/dialog";
import { Tabs } from "@/shared/shadcn/shadcn-ui/tabs";
import {
  $currentTab,
  $isAuthModalOpened,
  closeAllAuthTabNames,
  ConfirmEmailTab,
  ForgotPasswordTab,
  openAuthTabName,
  replaceAuthTabName,
  ResetPasswordTab,
  SignInTab,
  SignUpTab,
  type AuthTabName,
} from "@/features/auth-modal/tabs";
import { $user } from "@/entities/auth";

export const openAuthModal = () => openAuthTabName("signIn");
export const openAuthModalTab = (tab: AuthTabName) => openAuthTabName(tab);
export const closeAuthModal = () => closeAllAuthTabNames();

export type AuthModalProps = {
  onNotifyUser: (msg: string) => void;
};

export function AuthModal({ onNotifyUser }: AuthModalProps) {
  const isOpened = useUnit($isAuthModalOpened);
  const currentTab = useUnit($currentTab);

  const defaultSuccessHandler = (msg: string) => {
    onNotifyUser(msg);
    closeAuthModal();
  };

  const defaultFailHandler = (reason: string) => {
    onNotifyUser(reason);
  };

  return (
    <Dialog open={isOpened} onOpenChange={closeAuthModal}>
      <DialogContent className="w-80 p-0 border-none bg-transparent">
        <Tabs value={currentTab} className="gap-4">
          <SignInTab
            onForgotPassword={() => openAuthTabName("forgotPassword")}
            onCreateAccount={() => replaceAuthTabName("signUp")}
            onSuccess={defaultSuccessHandler}
            onFail={defaultFailHandler}
          />
          <SignUpTab
            onSuccess={() => openAuthTabName("confirmEmail")}
            onFail={defaultFailHandler}
            onSignInToExistingAccount={() => replaceAuthTabName("signIn")}
          />
          <ConfirmEmailTab
            email={$user.getState()?.email as string}
            onSuccess={defaultSuccessHandler}
            onFail={defaultFailHandler}
          />
          <ForgotPasswordTab
            onSuccess={defaultSuccessHandler}
            onFail={defaultFailHandler}
          />
          <ResetPasswordTab
            onSuccess={defaultSuccessHandler}
            onFail={defaultFailHandler}
          />
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
