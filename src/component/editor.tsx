// components/Editor.tsx
import { useEffect, useRef } from 'react';
import EditorJS, { ToolConstructable } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';

// import '@editorjs/editorjs/dist/editor.js.css'

interface EditorProps {
  onChange?: (data: any) => void;
  defaultValue?: any;
}

const Editor = ({ onChange, defaultValue }: EditorProps) => {
  const editorRef = useRef<EditorJS>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!holderRef.current) return;

    console.log("test");

    // 初始化编辑器
    const editor = new EditorJS({
      holder: holderRef.current,
      tools: {
        header: {
          class: Header as unknown as ToolConstructable,
          config: {
            placeholder: '输入标题',
            levels: [1, 2, 3],
            defaultLevel: 1
          }
        },
        list: {
          class: List as unknown as ToolConstructable,
          inlineToolbar: true
        },
        paragraph: {
          class: Paragraph as unknown as ToolConstructable,
          inlineToolbar: true,
        },
      },
      data: defaultValue,
      onChange: async () => {
        console.log("tests");
        // const data = await editor.save();
        // onChange?.(data);
      },
      placeholder: '开始写作...'
    });

    editorRef.current = editor;

    // 清理函数
    return () => {
      console.log(typeof editorRef.current);
      // editorRef.current?.destroy();
    };
  }, []);

  return <div ref={holderRef} className="prose max-w-full" />;
};

export default Editor;
