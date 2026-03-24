"use client";

import { Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function CopyUrlButton({ url }: { url: string }) {

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("URL copied!");
  };

  return (
    <button
      onClick={copyUrl}
      className="cursor-pointer ml-2 p-1 hover:bg-neutral-200 hover:text-black dark:hover:bg-slate-700 rounded"
    >
      <Copy size={16} />
    </button>
  );
}