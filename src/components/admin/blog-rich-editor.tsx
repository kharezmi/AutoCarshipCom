"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type BlogRichEditorHandle = {
  getHtml: () => string;
  isEmpty: () => boolean;
};

type Props = {
  /** Raw stored content (HTML or legacy Markdown) */
  initialContent: string;
  /** How to interpret initialContent before first edit */
  initialFormat: "html" | "markdown";
};

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "rounded-md p-2 text-slate-600 transition hover:bg-slate-100 hover:text-navy-900 disabled:opacity-40",
        active && "bg-navy-900 text-white hover:bg-navy-800 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

export const BlogRichEditor = forwardRef<BlogRichEditorHandle, Props>(
  function BlogRichEditor({ initialContent, initialFormat }, ref) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [hydrated, setHydrated] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const editor = useEditor(
      {
        immediatelyRender: false,
        extensions: [
          StarterKit.configure({
            heading: { levels: [2, 3] },
          }),
          Link.configure({
            openOnClick: false,
            autolink: true,
            HTMLAttributes: {
              class: "font-medium text-navy-800 underline decoration-amber-500 decoration-2 underline-offset-2",
            },
          }),
          Image.configure({
            inline: false,
            allowBase64: false,
            HTMLAttributes: {
              class: "my-6 max-h-[480px] w-auto max-w-full rounded-lg border border-slate-200 object-contain",
            },
          }),
          Placeholder.configure({
            placeholder:
              "Write your article… Use the toolbar for headings, lists, links, and images.",
          }),
        ],
        content: "<p></p>",
        editorProps: {
          attributes: {
            class:
              "tiptap-editor min-h-[320px] px-4 py-3 text-sm leading-relaxed text-slate-800 focus:outline-none",
          },
        },
      },
      []
    );

    useEffect(() => {
      if (!editor || hydrated) return;

      const load = async () => {
        if (initialFormat === "html") {
          editor.commands.setContent(initialContent?.trim() ? initialContent : "<p></p>");
          setHydrated(true);
          return;
        }
        try {
          const { parse } = await import("marked");
          const html = await parse(initialContent || "");
          editor.commands.setContent(
            typeof html === "string" && html.trim() ? html : "<p></p>"
          );
        } catch {
          editor.commands.setContent("<p></p>");
        }
        setHydrated(true);
      };

      void load();
    }, [editor, hydrated, initialContent, initialFormat]);

    useImperativeHandle(
      ref,
      () => ({
        getHtml: () => editor?.getHTML() ?? "",
        isEmpty: () => {
          const html = editor?.getHTML() ?? "";
          const text = editor?.getText().replace(/\u00a0/g, "").trim() ?? "";
          if (text.length > 0) return false;
          if (/<img[\s>]/i.test(html)) return false;
          const plain = html.replace(/<[^>]+>/g, "").trim();
          return plain.length === 0;
        },
      }),
      [editor]
    );

    const pickImage = useCallback(() => {
      setUploadError(null);
      fileRef.current?.click();
    }, []);

    const onFile = useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file || !editor) return;
        setUploadError(null);
        const fd = new FormData();
        fd.append("file", file);
        try {
          const res = await fetch("/api/admin/upload-image", {
            method: "POST",
            body: fd,
          });
          const data = (await res.json()) as { url?: string; error?: string };
          if (!res.ok) {
            setUploadError(data.error ?? "Upload failed.");
            return;
          }
          if (data.url) {
            editor.chain().focus().setImage({ src: data.url }).run();
          }
        } catch {
          setUploadError("Network error during upload.");
        }
      },
      [editor]
    );

    const setLink = useCallback(() => {
      if (!editor) return;
      const prev = editor.getAttributes("link").href as string | undefined;
      const url = window.prompt("Link URL", prev ?? "https://");
      if (url === null) return;
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }, [editor]);

    if (!editor) {
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
          Loading editor…
        </div>
      );
    }

    return (
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-100 bg-surface px-2 py-2">
          <ToolbarButton
            title="Bold"
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Italic"
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Underline"
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Strikethrough"
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 hidden h-6 w-px bg-slate-200 sm:inline" />
          <ToolbarButton
            title="Heading 2"
            active={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Heading 3"
            active={editor.isActive("heading", { level: 3 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 hidden h-6 w-px bg-slate-200 sm:inline" />
          <ToolbarButton
            title="Bullet list"
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Numbered list"
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Quote"
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 hidden h-6 w-px bg-slate-200 sm:inline" />
          <ToolbarButton title="Link" onClick={setLink}>
            <Link2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Insert image" onClick={pickImage}>
            <ImagePlus className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 hidden h-6 w-px bg-slate-200 sm:inline" />
          <ToolbarButton
            title="Undo"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Redo"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo2 className="h-4 w-4" />
          </ToolbarButton>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={onFile}
        />
        <EditorContent editor={editor} />
        {uploadError && (
          <p className="border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-700">
            {uploadError}
          </p>
        )}
      </div>
    );
  }
);
