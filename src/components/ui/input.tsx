import * as React from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

const inputVariants = cva(
  `file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30
  border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow]
  outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none
  disabled:cursor-not-allowed
  disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
  focus-visible:border-0 focus-visible:ring-transparent
  `,
  {
    variants: {
      variant: {
        default:
          "!bg-background border-none hover:!bg-background/90 text-foreground",
        underline:
          "border-0 !border-b-2 !border-background !rounded-none !bg-transparent focus-visible:!border-b-2",
        outline:
          "border border-foreground/80 !bg-transparent focus-visible:!border-foreground focus-visible:!border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const INPUT_VARIANT_OPTIONS: TInputVariant[] = ["default", "underline"];

export type TInputVariant = VariantProps<typeof inputVariants>["variant"];

interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isLoading?: boolean;
  classNames?: {
    wrapper?: string;
    input?: string;
    startContent?: string;
    endContent?: string;
    loader?: string;
  };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startContent,
      endContent,
      variant,
      isLoading,
      classNames,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn("relative flex items-center w-full", classNames?.wrapper)}
      >
        {startContent && (
          <div
            className={cn(
              "absolute left-3 flex items-center text-foreground",
              classNames?.startContent
            )}
          >
            {startContent}
          </div>
        )}
        <input
          data-testid={`${props.name}-input`}
          type={type}
          className={cn(
            inputVariants({ variant }),
            startContent && "pl-10",
            endContent && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {isLoading && (
          <div
            className={cn(
              "absolute right-8 flex items-center",
              classNames?.loader
            )}
          >
            <LoaderCircle className="animate-spin text-foreground" size={16} />
          </div>
        )}
        {endContent && !isLoading && (
          <div
            className={cn(
              "absolute right-3 flex items-center text-foreground",
              classNames?.endContent
            )}
          >
            {endContent}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
