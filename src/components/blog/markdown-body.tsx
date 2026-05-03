"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownBody({ markdown }: { markdown: string }) {
  return (
    <div className="blog-md text-slate-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-10 font-heading text-2xl font-bold text-navy-900 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 font-heading text-xl font-semibold text-navy-900">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mt-4 leading-relaxed text-slate-700">{children}</p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-navy-800 underline decoration-amber-500 decoration-2 underline-offset-2 hover:text-navy-900"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-700">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-navy-900">{children}</strong>
          ),
          hr: () => <hr className="my-10 border-slate-200" />,
          blockquote: ({ children }) => (
            <blockquote className="mt-4 border-l-4 border-amber-500 bg-amber-50/60 py-2 pl-4 pr-2 text-slate-700">
              {children}
            </blockquote>
          ),
          pre: ({ children }) => (
            <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm leading-relaxed text-slate-100">
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = /language-/.test(className ?? "");
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code
                className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-navy-900"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
