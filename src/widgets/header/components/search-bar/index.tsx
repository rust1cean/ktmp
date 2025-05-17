import { Filter, Search } from "lucide-react";
import { Button } from "@/shared/shadcn-ui/button";
import { Input } from "@/shared/shadcn-ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/shared/shadcn-ui/dropdown-menu";
import { twMerge } from "tailwind-merge";

export function SearchBar({ className }: { className?: string }) {
  const formStyles = twMerge(className, "flex items-center gap-2");

  return (
    <form className={formStyles}>
      <DropdownMenu>
        <FiltersTrigger />
        <DropdownMenuContent align="start">
          <SortBy />
          <SelectAge />
          <SelectCategory />
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        className="text-center bg-background"
        type="text"
        aria-label="Search"
        placeholder="Search"
      />
      <Button variant="outline">
        <Search />
      </Button>
    </form>
  );
}

function FiltersTrigger() {
  return (
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        <Filter />
      </Button>
    </DropdownMenuTrigger>
  );
}

function SortBy() {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Sort By</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>English</DropdownMenuItem>
          <DropdownMenuItem>Greek</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function SelectAge() {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Select age</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>English</DropdownMenuItem>
          <DropdownMenuItem>Greek</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function SelectCategory() {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Categories</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>English</DropdownMenuItem>
          <DropdownMenuItem>Greek</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
