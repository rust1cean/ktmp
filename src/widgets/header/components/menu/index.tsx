import Link from "next/link";
import { useUnit } from "effector-react";
import { MenuIcon } from "lucide-react";

import { $isSignedIn, $isSignedOut } from "@/entities/auth";
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

export type MenuProps = {
  profile: Profile | null;
  onNotifyUser: (msg: string) => void;
};

export function Menu({ profile, onNotifyUser }: MenuProps) {
  const isSignedIn = useUnit($isSignedIn);
  const isSignedOut = useUnit($isSignedOut);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isSignedIn && (
          <>
            <User profile={profile} />
            <DropdownMenuSeparator />
          </>
        )}
        {isSignedOut && <LoginButton />}
        <SelectLanguage />
        {isSignedIn && <LogoutButton onNotifyUser={onNotifyUser} />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function User({ profile }: { profile: Profile | null }) {
  return (
    <Link href={`/profile/${profile?.id ?? ""}`}>
      <DropdownMenuItem>
        <Avatar className="flex items-center justify-center">
          {profile ? (
            <>
              <AvatarImage
                src={profile?.avatarUrl}
                alt="Avatar"
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
        <span>{capitalizeFirstLetter(profile?.name ?? "User")}</span>
      </DropdownMenuItem>
    </Link>
  );
}

export function SelectLanguage() {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Select language</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>English</DropdownMenuItem>
          <DropdownMenuItem>Greek</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function LoginButton() {
  return (
    <DropdownMenuItem onClick={() => openAuthModal()}>Sign in</DropdownMenuItem>
  );
}

function LogoutButton({
  onNotifyUser,
}: {
  onNotifyUser: (messsage: string) => void;
}) {
  const handleLogout = async () => {
    await signOutFx();
    onNotifyUser("Signed out");
  };

  return <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>;
}
