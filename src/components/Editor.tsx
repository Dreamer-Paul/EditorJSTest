// components/Editor.tsx
'use client'

import { useEffect, useRef } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import Paragraph from '@editorjs/paragraph'

interface EditorProps {
  data: OutputData;
  onChange: (data: OutputData) => void;
  holder?: string;
}

const Editor: React.FC<EditorProps> = ({ data, onChange, holder = 'editorjs' }) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: {
          header: {
            class: Header,
            config: {
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 1
            }
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true
          },
          list: {
            class: List,
            inlineToolbar: true
          },
          code: Code
        },
        data: data,
        onChange: async () => {
          try {
            const outputData = await editor.save();
            onChange(outputData);
          } catch (e) {
            console.error('Save failed:', e);
          }
        },
        onReady: () => {
          console.log('Editor.js is ready to work!');
        },
        autofocus: true,
        placeholder: 'Let`s write something!'
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

  return <div id={holder} />;
};

export default Editor;
