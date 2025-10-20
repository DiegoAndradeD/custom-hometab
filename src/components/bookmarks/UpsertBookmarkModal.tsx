// Utils
import { z } from "zod";
// Hooks
import { useForm } from "react-hook-form";
// Stores
import useModalStore, { LayoutModal } from "../../stores/modal.store";
import useWidgetsStore from "../../stores/widgets.store";
// Components
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
// Utils
import { Validators } from "../../utils";

const bookmarkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z
    .string()
    .min(1, "URL is required")
    .refine(Validators.isValidUrl, "Invalid URL"),
});

type BookmarkFormValues = z.infer<typeof bookmarkSchema>;

const UpsertBookmarkModal = () => {
  const { toggleModal, isUpsertBookmarkModalOpen } = useModalStore();
  const { updateWidget, bookmarksWidget } = useWidgetsStore();

  const form = useForm<BookmarkFormValues>({
    defaultValues: {
      title: bookmarksWidget.selectedBookmark?.title ?? "",
      url: bookmarksWidget.selectedBookmark?.url ?? "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (data: BookmarkFormValues) => {
    const { selectedBookmark, items } = bookmarksWidget;

    const newItems = selectedBookmark
      ? items.map((item) =>
          item.url === selectedBookmark.url ? { ...item, ...data } : item
        )
      : [...items, data];

    updateWidget("bookmarksWidget", {
      items: newItems,
    });
    toggleModal(LayoutModal.UpsertBookmark);
  };

  return (
    <Dialog
      open={isUpsertBookmarkModalOpen}
      onOpenChange={() => toggleModal(LayoutModal.UpsertBookmark)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>{`${
                bookmarksWidget.selectedBookmark ? "Update" : "Create"
              } bookmark`}</DialogTitle>
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
                        className="!border-foreground/80"
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
                        className="!border-foreground/80"
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

export default UpsertBookmarkModal;
