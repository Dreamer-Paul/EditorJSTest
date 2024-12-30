export function parseMarkdown(markdown) {
  // 简单的解析示例
  return {
    blocks: markdown.split("\n").map((line) => {
      if (line.startsWith("#")) {
        return {
          type: "header",
          data: {
            text: line.substring(1).trim(),
            level: 1,
          },
        };
      }
      return {
        type: "paragraph",
        data: {
          text: line,
        },
      };
    }),
  };
}
