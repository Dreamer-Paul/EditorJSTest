"use client";

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import MarkdownIt from "markdown-it";
import mk from "markdown-it-katex";

// MathTool 组件
class MathTool {
  static get toolbox() {
    return {
      title: "Math",
      icon: '<svg width="17" height="15" viewBox="0 0 336 276"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29z"/></svg>',
    };
  }

  constructor({ data }: { data: any }) {
    this.data = data || {};
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("math-block");

    try {
      katex.render(this.data.formula || "", container, {
        throwOnError: false,
        displayMode: true,
      });
    } catch (error) {
      console.error("Math rendering error:", error);
      container.textContent = this.data.formula || "";
    }

    return container;
  }

  save(blockContent: HTMLElement) {
    return {
      formula: blockContent.textContent,
    };
  }
}

// Markdown 解析器类
class MarkdownParser {
  md: MarkdownIt;

  constructor() {
    this.md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
    });
    this.md.use(mk);
  }

  processMathFormulas(text: string) {
    // 处理行内公式
    text = text.replace(/\\\((.*?)\\\)/g, (match, formula) => {
      try {
        return katex.renderToString(formula, { displayMode: false });
      } catch (error) {
        console.error("Inline math rendering error:", error);
        return match;
      }
    });

    // 处理块级公式
    text = text.replace(/\$(.*?)\$/g, (match, formula) => {
      try {
        return katex.renderToString(formula, { displayMode: true });
      } catch (error) {
        console.error("Block math rendering error:", error);
        return match;
      }
    });

    return text;
  }

  convertNodeToBlock(node: Element) {
    switch (node.tagName.toLowerCase()) {
      case "h1":
      case "h2":
      case "h3":
        return {
          type: "header",
          data: {
            text: node.textContent,
            level: parseInt(node.tagName[1]),
          },
        };

      case "p":
        return {
          type: "paragraph",
          data: {
            text: node.innerHTML,
          },
        };

      case "hr":
        return {
          type: "delimiter",
          data: {},
        };

      default:
        return null;
    }
  }

  parseMarkdown(markdown: string) {
    try {
      const html = this.md.render(markdown);
      const processedHtml = this.processMathFormulas(html);

      const parser = new DOMParser();
      const doc = parser.parseFromString(processedHtml, "text/html");

      const blocks: any[] = [];
      doc.body.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const block = this.convertNodeToBlock(node as Element);
          if (block) blocks.push(block);
        }
      });

      return { blocks };
    } catch (error) {
      console.error("Markdown parsing error:", error);
      return {
        blocks: [
          {
            type: "paragraph",
            data: { text: markdown },
          },
        ],
      };
    }
  }
}

interface EditorProps {
  markdown: string;
  onChange?: (data: any) => void;
}

const Editor = ({ markdown, onChange }: EditorProps) => {
  const editorRef = useRef<EditorJS | null>(null);
  const parser = new MarkdownParser();

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          math: MathTool,
        },
        data: parser.parseMarkdown(markdown),
        onChange: async () => {
          const data = await editorRef.current?.save();
          onChange?.(data);
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return <div id="editorjs" className="prose max-w-none" />;
};

export default Editor;
