import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// Локальный компонент по паттерну shadcn/ui на Radix, адаптирован к теме курса.
export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center rounded-control px-4 py-2 text-body font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
  { variants: { variant: {
    default: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "border border-control bg-card text-foreground hover:bg-muted",
  } }, defaultVariants: { variant: "default" } },
);
export function Button({ className, variant, asChild = false, ...props }:
  ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}
