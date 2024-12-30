// utils/markdownConverter.ts
import { marked } from "marked";

interface EditorJSBlock {
  type: string;
  data: {
    text?: string;
    level?: number;
    items?: string[];
    style?: string;
    code?: string;
    language?: string;
    caption?: string;
    alignment?: string;
    url?: string;
    [key: string]: any;
  };
}

interface EditorJSData {
  blocks: EditorJSBlock[];
  version?: string;
  time?: number;
}

export function markdownToEditorJS(markdown: string): EditorJSData {
  if (!markdown) {
    return {
      blocks: [
        {
          type: "paragraph",
          data: {
            text: "",
          },
        },
      ],
    };
  }

  try {
    const blocks: EditorJSBlock[] = [];
    const tokens = marked.lexer(markdown);

    const processInlineContent = (text: string): string => {
      // 处理加粗
      text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
      // 处理斜体
      text = text.replace(/\*(.*?)\*/g, "<i>$1</i>");
      // 处理行内代码
      text = text.replace(/`(.*?)`/g, "<code>$1</code>");
      // 处理链接
      text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
      return text;
    };

    tokens.forEach((token: marked.Token) => {
      switch (token.type) {
        case "heading":
          blocks.push({
            type: "header",
            data: {
              text: processInlineContent(token.text),
              level: token.depth,
            },
          });
          break;

        case "paragraph":
          blocks.push({
            type: "paragraph",
            data: {
              text: processInlineContent(token.text),
            },
          });
          break;

        case "list":
          const listItems = (token as marked.Tokens.List).items.map((item) =>
            processInlineContent(item.text)
          );
          blocks.push({
            type: "list",
            data: {
              style: (token as marked.Tokens.List).ordered
                ? "ordered"
                : "unordered",
              items: listItems,
            },
          });
          break;

        case "code":
          blocks.push({
            type: "code",
            data: {
              code: (token as marked.Tokens.Code).text,
              language: (token as marked.Tokens.Code).lang || "plaintext",
            },
          });
          break;

        case "blockquote":
          blocks.push({
            type: "quote",
            data: {
              text: processInlineContent(
                (token as marked.Tokens.Blockquote).text
              ),
              caption: "",
              alignment: "left",
            },
          });
          break;

        case "space":
          blocks.push({
            type: "paragraph",
            data: {
              text: "",
            },
          });
          break;
      }
    });

    return {
      blocks,
      version: "2.28.2",
      time: Date.now(),
    };
  } catch (error) {
    console.error("Error converting markdown:", error);
    return {
      blocks: [
        {
          type: "paragraph",
          data: {
            text: "Error converting markdown content.",
          },
        },
      ],
    };
  }
}
