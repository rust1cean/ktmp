import Link from "next/link";
import { useUnit } from "effector-react";
import { MenuIcon } from "lucide-react";

import { $isSignedIn, $isSignedOut, $session } from "@/entities/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/shadcn-ui/avatar";
import { Button } from "@/shared/shadcn-ui/button";
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
} from "@/shared/shadcn-ui/dropdown-menu";
import { signOutFx } from "@/entities/auth";
import { openAuthModal } from "@/features/auth-modal";

export type MenuProps = {
  onNotifyUser: (msg: string) => void;
};

export function Menu({ onNotifyUser }: MenuProps) {
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
            <User />
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

function User() {
  const userId = $session.getState()?.user.id;

  return (
    <Link href={`/profile/${userId}`}>
      <DropdownMenuItem>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <span>John</span>
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
