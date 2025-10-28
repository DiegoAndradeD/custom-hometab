// Utils
import z from "zod";
// Components
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
// Hooks
import { useForm } from "react-hook-form";
// Stores
import useWidgetsStore from "../stores/widgets.store";

const SearchBar = () => {
  const { searchBarWidget } = useWidgetsStore();

  const searchSchema = z.object({
    query: z.coerce.string().trim().min(1),
  });

  type searchDTO = z.infer<typeof searchSchema>;

  const form = useForm<searchDTO>({
    defaultValues: {
      query: "",
    },
    mode: "onSubmit",
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: searchDTO) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      data.query
    )}`;
    window.location.href = searchUrl;
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex !w-fit">
              <FormControl>
                <Input
                  {...field}
                  variant={searchBarWidget.variant}
                  className="md:w-[750px] md:h-14 rounded-4xl !text-lg !pl-6 font-bold"
                  placeholder="Search in Google or type an URL"
                  endContent={
                    <div className="bg-icon-background rounded-full p-2">
                      <Search className="text-white" />
                    </div>
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default SearchBar;
