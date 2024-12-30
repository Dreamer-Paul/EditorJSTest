// app/editor/page.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import type { OutputData } from "@editorjs/editorjs";
import { markdownToEditorJS } from "./utils/markdownConverter";

// 动态导入 Editor 组件以避免 SSR 问题
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

export default function EditorPage() {
  const [editorData, setEditorData] = useState<OutputData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 示例 Markdown 内容
    const markdownContent = `
# Welcome to Editor.js

This is a paragraph with **bold** and *italic* text.

## Features
* Simple to use
* Supports markdown
* Real-time preview

\`\`\`javascript
console.log('Hello, Editor.js!');
\`\`\`

> This is a blockquote
    `;

    // 转换 Markdown 为 EditorJS 数据
    const convertedData = markdownToEditorJS(markdownContent);
    setEditorData(convertedData);
    setIsLoading(false);
  }, []);

  const handleEditorChange = (data: OutputData) => {
    setEditorData(data);
    // 可以在这里添加保存逻辑
    console.log("Editor data:", data);
  };

  if (isLoading) {
    return <div>Loading editor...</div>;
  }

  if (!editorData) {
    return <div>Error loading editor data</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editor.js Demo</h1>
      <div className="border rounded-lg p-4">
        <Editor
          data={editorData}
          onChange={handleEditorChange}
          holder="editor-container"
        />
      </div>
    </div>
  );
}
