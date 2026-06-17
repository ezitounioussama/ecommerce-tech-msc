import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[120px] w-full rounded-lg border border-input bg-input/30 px-3 py-2 text-sm text-foreground shadow-xs transition-all outline-none placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
