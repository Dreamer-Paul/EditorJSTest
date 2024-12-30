// import Editor from "@/component/editor";

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/component/editor'), { ssr: false });

const initialData = {
  blocks: [
    {
      type: 'paragraph',
      data: {
        text: '这是一个段落'
      }
    },
    {
      type: 'header',
      data: {
        text: '这是标题',
        level: 2
      }
    }
  ]
}

export default function PageEditor() {
  return (
    <Editor defaultValue={initialData} />
  );
}
