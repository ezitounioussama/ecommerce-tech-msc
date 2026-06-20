"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { IconPhoto, IconTrash, IconUpload, IconLoader2 } from "@tabler/icons-react";
import { useFileUpload, formatBytes } from "@/hooks/use-file-upload";
import { uploadProductImage } from "@/services/products";
import { cn } from "@/lib/utils";

interface ProductImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export function ProductImageUpload({ value, onChange }: ProductImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const [{ files, isDragging, errors }, { openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/jpeg,image/png,image/webp,image/avif",
      multiple: true,
      maxFiles: 5,
      maxSize: 10 * 1024 * 1024,
    });

  const handleAdd = useCallback(
    async (newFiles: FileList | File[]) => {
      setUploading(true);
      try {
        const results = await Promise.allSettled(
          Array.from(newFiles).map((f) => uploadProductImage(f)),
        );
        const newUrls = results
          .filter((r) => r.status === "fulfilled")
          .map((r) => (r as PromiseFulfilledResult<string>).value);

        if (newUrls.length > 0) {
          onChange([...value, ...newUrls].slice(0, 5));
        }
      } finally {
        setUploading(false);
      }
    },
    [value, onChange],
  );

  const handleRemove = useCallback(
    (index: number) => {
      const next = value.filter((_, i) => i !== index);
      onChange(next);
    },
    [value, onChange],
  );

  const limitReached = value.length >= 5;

  return (
    <div className="flex flex-col gap-3">
      {errors.length > 0 && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errors.map((e, i) => <p key={i}>{e}</p>)}
        </div>
      )}

      <div className="grid grid-cols-5 gap-2">
        {value.map((url, i) => (
          <div key={url} className="group relative aspect-square overflow-hidden rounded-lg border bg-card">
            <Image
              src={url}
              alt={`Image ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 100px"
            />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <IconTrash className="h-3 w-3 text-destructive" />
            </button>
          </div>
        ))}

        {uploading && (
          <div className="flex aspect-square items-center justify-center rounded-lg border bg-card">
            <IconLoader2 className="h-5 w-5 animate-spin text-accent-blue" />
          </div>
        )}

        {!limitReached && !uploading && (
          <button
            type="button"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/jpeg,image/png,image/webp,image/avif";
              input.multiple = true;
              input.onchange = async (e) => {
                const files = (e.target as HTMLInputElement).files;
                if (files?.length) await handleAdd(files);
              };
              input.click();
            }}
            className={cn(
              "flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-muted-foreground transition-colors hover:border-accent-blue hover:text-accent-blue",
            )}
          >
            <IconUpload className="h-5 w-5" />
            <span className="text-[10px] leading-tight text-center px-1">Upload</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <IconPhoto className="h-3.5 w-3.5" />
        <span>
          {value.length}/5 images &middot; JPG, PNG, WEBP, AVIF &middot; max 10 MB each
        </span>
      </div>
    </div>
  );
}
