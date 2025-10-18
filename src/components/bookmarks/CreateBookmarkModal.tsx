import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Label } from "../ui/label";

const bookmarkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Invalid URL"),
});

type BookmarkFormValues = z.infer<typeof bookmarkSchema>;

const CreateBookmarkModal = () => {
  const { toggleModal, isCreateBookmarkModalOpen } = useModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookmarkFormValues>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const onSubmit = (data: BookmarkFormValues) => {
    console.log("Form data:", data);
    toggleModal(LayoutModal.CreateBookmark);
  };

  return (
    <Dialog
      open={isCreateBookmarkModalOpen}
      onOpenChange={() => toggleModal(LayoutModal.CreateBookmark)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create bookmark</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                className="!border-white/80 !border-1 !border-solid"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                {...register("url")}
                className="!border-white/80 !border-1 !border-solid"
              />
              {errors.url && (
                <span className="text-red-500 text-sm">
                  {errors.url.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateBookmarkModal;
