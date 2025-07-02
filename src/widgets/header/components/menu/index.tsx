import Link from "next/link";
import { useUnit } from "effector-react";
import { MenuIcon } from "lucide-react";

import { $isSignedIn } from "@/entities/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/shadcn/shadcn-ui/avatar";
import { Button } from "@/shared/shadcn/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/shadcn/shadcn-ui/dropdown-menu";
import { signOutFx } from "@/entities/auth";
import { openAuthModal } from "@/features/auth-modal";
import type { Profile } from "@/entities/profile";
import { Loader } from "@/shared/shadcn/shadcn-ui/loader";
import { capitalizeFirstLetter } from "@/shared/format-string";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export type MenuProps = {
  profile: Profile | null;
  onNotifyUser: (msg: string) => void;
};

export function Menu({ profile, onNotifyUser }: MenuProps) {
  const isSignedIn = useUnit($isSignedIn);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isSignedIn ? (
          <>
            <User profile={profile} />
            <DropdownMenuSeparator />
          </>
        ) : (
          <LoginButton />
        )}
        <SelectLanguage />
        {isSignedIn && <LogoutButton onNotifyUser={onNotifyUser} />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function User({ profile }: { profile: Profile | null }) {
  const t = useTranslations("Base");

  return (
    <Link href={`/profile/${profile?.id ?? ""}`}>
      <DropdownMenuItem>
        <Avatar className="flex items-center justify-center">
          {profile ? (
            <>
              <AvatarImage
                src={profile?.avatarUrl}
                alt={t("avatar")}
                className="object-cover"
              />
              <AvatarFallback>
                {profile.name.at(0)?.toUpperCase()}
              </AvatarFallback>
            </>
          ) : (
            <Loader />
          )}
        </Avatar>
        <span>{capitalizeFirstLetter(profile?.name ?? t("user"))}</span>
      </DropdownMenuItem>
    </Link>
  );
}

const languageVariants = [
  { label: "English", value: "en" },
  { label: "Greek", value: "el" },
];
export function SelectLanguage() {
  const t = useTranslations("Base");
  const router = useRouter();

  function handleSelect(newLocale: string) {
    router.replace(`/${newLocale}`);
    router.refresh();
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{t("select_language")}</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {languageVariants.map(({ label, value }) => (
            <DropdownMenuItem key={value} onSelect={() => handleSelect(value)}>
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function LoginButton() {
  const t = useTranslations("Base");

  return (
    <DropdownMenuItem onClick={() => openAuthModal()}>
      {t("sign_in")}
    </DropdownMenuItem>
  );
}

function LogoutButton({
  onNotifyUser,
}: {
  onNotifyUser: (messsage: string) => void;
}) {
  const t = useTranslations("Base");

  const handleLogout = async () => {
    await signOutFx();
    onNotifyUser(t("signed_out"));
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>{t("sign_out")}</DropdownMenuItem>
  );
}
