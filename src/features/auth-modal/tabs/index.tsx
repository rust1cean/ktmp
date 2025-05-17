import { createEvent, createStore } from "effector";
import { useUnit } from "effector-react";
import { Undo2 } from "lucide-react";

import { Button } from "@/shared/shadcn-ui/button";
import { Card, CardHeader, CardContent } from "@/shared/shadcn-ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { DialogDescription, DialogTitle } from "@/shared/shadcn-ui/dialog";

export { SignInTab } from "./sign-in.tab";
export { SignUpTab } from "./sign-up.tab";
export { ConfirmEmailTab } from "./confirm-email.tab";
export { ForgotPasswordTab } from "./forgot-password.tab";
export { ResetPasswordTab } from "./reset-password.tab";

export type TabProps = {
  name: AuthTabName;
  title: string | null;
  description?: string;
  children: React.ReactNode;
};

export function Tab({ name, title, description, children }: TabProps) {
  const [tabsDepth, onTabClose] = useUnit([
    $tabsOpened,
    closeCurrentAuthTabName,
  ]);

  return (
    <TabsContent value={name} className="flex flex-col gap-4">
      <Card>
        <CardHeader className="gap-4">
          <DialogTitle className="flex items-center gap-2">
            {tabsDepth > 1 && (
              <Button variant="secondary" size="icon" onClick={onTabClose}>
                <Undo2 />
              </Button>
            )}
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">{children}</CardContent>
      </Card>
    </TabsContent>
  );
}

export type AuthTabName =
  | "signIn"
  | "signUp"
  | "confirmEmail"
  | "forgotPassword"
  | "resetPassword";

export const openAuthTabName = createEvent<AuthTabName>();
export const replaceAuthTabName = createEvent<AuthTabName>();
export const closeCurrentAuthTabName = createEvent();
export const closeAllAuthTabNames = createEvent();

export const $tabsHistory = createStore<AuthTabName[]>([]);
export const $currentTab = $tabsHistory.map((tabs) => tabs.at(-1), {
  skipVoid: false,
});
export const $isAuthModalOpened = $tabsHistory.map((tabs) => tabs.length > 0);
export const $tabsOpened = $tabsHistory.map((tabs) => tabs.length);

$tabsHistory.on(openAuthTabName, (tabs, tab) => [...tabs, tab]);
$tabsHistory.on(replaceAuthTabName, (tabs, tab) => [...tabs.slice(0, -1), tab]);
$tabsHistory.on(closeCurrentAuthTabName, (tabs) =>
  tabs.length > 1 ? tabs.slice(0, -1) : tabs
);
$tabsHistory.on(closeAllAuthTabNames, () => []);
