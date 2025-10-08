import z from "zod";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";

const SearchBar = () => {
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
            <FormItem>
              <FormControl>
                <Input {...field} className="md:w-[400px] md:h-14 rounded-xl" />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default SearchBar;
