import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Filter, Search } from "lucide-react";

import { Form } from "@/shared/shadcn/shadcn-ui/form";
import { FormField } from "@/shared/shadcn/shadcn-ui/form-field";
import { Button } from "@/shared/shadcn/shadcn-ui/button";
import { Input } from "@/shared/shadcn/shadcn-ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/shared/shadcn/shadcn-ui/dropdown-menu";
import { POST_CATEGORIES } from "@/shared/data/post/api";
import { capitalizeFirstLetter } from "@/shared/format-string";

export const searchBarFormSchema = z.object({
  query: z.string().min(3),
});

export type SearchBarFilters = z.infer<typeof searchBarFormSchema>;

export type SearchBarProps = {
  onSubmit: (formData: SearchBarFilters) => Promise<void>;
  searchFilters?: SearchBarFilters;
  className?: string;
};

export function SearchBar({
  onSubmit,
  searchFilters,
  className,
}: SearchBarProps) {
  const searchBarForm = useForm<SearchBarFilters>({
    resolver: zodResolver(searchBarFormSchema),
    defaultValues: { query: searchFilters?.query ?? "" },
  });

  return (
    <Form {...searchBarForm}>
      <form
        className={twMerge(className, "flex items-center gap-2")}
        onSubmit={searchBarForm.handleSubmit(onSubmit)}
      >
        <DropdownMenu>
          <FiltersTrigger />
          <DropdownMenuContent align="start">
            <SortBy />
            <SelectAge />
            <SelectCategory />
          </DropdownMenuContent>
        </DropdownMenu>
        <FormField
          name="query"
          className="w-full"
          showMessage={false}
          render={({ field }) => (
            <Input
              className="text-center bg-background"
              type="text"
              aria-label="Search"
              placeholder="Search"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />
        <Button type="submit" variant="outline">
          <Search />
        </Button>
      </form>
    </Form>
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
          <DropdownMenuItem>Date added</DropdownMenuItem>
          <DropdownMenuItem>Rating</DropdownMenuItem>
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
          <DropdownMenuItem>0-6</DropdownMenuItem>
          <DropdownMenuItem>7-14</DropdownMenuItem>
          <DropdownMenuItem>14-18</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function SelectCategory() {
  const Categories = () =>
    POST_CATEGORIES.map((category) => (
      <DropdownMenuItem key={category}>
        {capitalizeFirstLetter(category.replaceAll("_", " "))}
      </DropdownMenuItem>
    ));

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Categories</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <Categories />
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
