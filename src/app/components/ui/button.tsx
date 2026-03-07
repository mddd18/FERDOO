import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  /* Rasmga mos asosiy uslub: transition, yumaloq burchaklar va tracking-tight */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/20 shadow-sm",
  {
    variants: {
      variant: {
        /* Rasmdagi asosiy yashil tugma uslubi */
        default: "bg-[#d0e7d2] text-[#2d5a27] hover:bg-[#c2dec4] hover:shadow-md",
        /* Shaffof (glassmorphism) uslubdagi tugma */
        outline:
          "border-none bg-white/60 backdrop-blur-md text-[#2d5a27] hover:bg-white/80 hover:shadow-md",
        /* To'q rangli (aktiv) tugma uchun */
        secondary:
          "bg-[#4a6d3a] text-white hover:bg-[#3d5a30] hover:shadow-md",
        destructive:
          "bg-[#f8d7da] text-[#721c24] hover:bg-[#f5c6cb]",
        ghost:
          "hover:bg-[#d0e7d2]/30 text-[#2d5a27]",
        link: "text-[#4a6d3a] underline-offset-4 hover:underline",
      },
      size: {
        /* Rasmda tugmalar biroz kattaroq va balandroq */
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 rounded-full px-8 text-base",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
