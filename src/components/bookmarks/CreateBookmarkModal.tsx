import { z } from "zod";
import { useForm } from "react-hook-form";

import useModalStore, { LayoutModal } from "../../stores/modal.store";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import useWidgetsStore from "../../stores/widgets.store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Validators } from "../../utils";

const bookmarkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z
    .string()
    .min(1, "URL is required")
    .refine(Validators.isValidUrl, "Invalid URL"),
});

type BookmarkFormValues = z.infer<typeof bookmarkSchema>;

const CreateBookmarkModal = () => {
  const { toggleModal, isCreateBookmarkModalOpen } = useModalStore();
  const { updateWidget, bookmarksWidget } = useWidgetsStore();

  const form = useForm<BookmarkFormValues>({
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: BookmarkFormValues) => {
    updateWidget("bookmarksWidget", {
      items: [...bookmarksWidget.items, data],
    });
    toggleModal(LayoutModal.CreateBookmark);
  };

  console.log(errors);

  return (
    <Dialog
      open={isCreateBookmarkModalOpen}
      onOpenChange={() => toggleModal(LayoutModal.CreateBookmark)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>Create bookmark</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bookmark title"
                        {...field}
                        variant={"outline"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bookmark URL"
                        {...field}
                        variant={"outline"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" className="border border-foreground">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBookmarkModal;
