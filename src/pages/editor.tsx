"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// 动态导入 Editor 组件以避免 SSR 问题
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const markdownExample = `
已知事件的概率 \( P \)，要求事件 \( A \) 的概率，通常需要结合具体的条件和背景信息。以下是一些常见的概率公式和方法，帮助解决此类问题：

---

## **1. 条件概率公式**
如果已知事件 \( B \) 的概率 \( P(B) \) 和事件 \( A \cap B \) 的概率 \( P(A \cap B) \)，可以通过条件概率公式求 \( P(A) \)：

$$
P(A|B) = \frac{P(A \cap B)}{P(B)} \quad \text{(前提：\( P(B) > 0 \))}
$$

由此可以推导出：
$$
P(A \cap B) = P(A|B) \cdot P(B)
$$

如果 \( P(A \cap B) \) 和 \( P(B) \) 已知，可以反推 \( P(A) \) 的相关信息。

---

## **2. 全概率公式**
当事件 \( A \) 的发生依赖于一组互斥且完备的事件 \( B_1, B_2, \dots, B_n \) 时，可以通过全概率公式计算 \( P(A) \)：

$$
P(A) = \sum_{i=1}^n P(A|B_i) \cdot P(B_i)
$$

这里，\( B_1, B_2, \dots, B_n \) 是样本空间的一个划分，即满足：
- \( B_i \cap B_j = \emptyset \)（互斥，\( i \neq j \)）
- \( \bigcup_{i=1}^n B_i = S \)（完备覆盖样本空间）

---

## **3. 贝叶斯公式**
如果已知 \( P(A|B) \)、\( P(B) \) 和 \( P(A) \)，可以通过贝叶斯公式计算 \( P(B|A) \)：

$$
P(B|A) = \frac{P(A|B) \cdot P(B)}{P(A)} \quad \text{(前提：\( P(A) > 0 \))}
$$

贝叶斯公式也可以反向使用，帮助推导 \( P(A) \) 的值。

---

## **4. 加法公式**
如果事件 \( A \) 和 \( B \) 不是互斥事件，可以通过加法公式计算 \( P(A \cup B) \)：

$$
P(A \cup B) = P(A) + P(B) - P(A \cap B)
$$

如果已知 \( P(A \cup B) \)、\( P(B) \) 和 \( P(A \cap B) \)，可以反推出 \( P(A) \)。

---

## **5. 特殊场景**
在某些具体问题中，可能需要结合背景条件。例如：
- 如果 \( A \) 和 \( B \) 是独立事件，则 \( P(A \cap B) = P(A) \cdot P(B) \)。
- 如果 \( A \) 和 \( B \) 是互斥事件，则 \( P(A \cap B) = 0 \)。

---

### **例子**
**问题**：一袋中有 3 个红球和 2 个白球，随机取出一个球，已知取到的是红球的概率 \( P(\text{红球}) = 3/5 \)。求取到红球的概率公式。

**解**：
这里 \( P(\text{红球}) = \frac{\text{红球数}}{\text{总球数}} = \frac{3}{5} \)。这是一个简单的古典概率问题，直接通过样本空间的定义计算。

---

如果有更具体的已知条件或问题背景，请提供更多信息，我可以进一步帮助推导公式或解答！
[1] https://m.read.qq.com/read/1025916006/10
[2] https://m.yunqi.qq.com/read/32164404/10
[3] https://m.yunqi.qq.com/read/23912400/7
[4] https://m.read.qq.com/read/1036699012/56
[5] https://fc41da95-abf1-4831-a223-f50e37620cae.file
[6] https://m.chuangshi.qq.com/read/32164466/12
[7] https://m.wbook.qq.com/read/1041913715/32
[8] https://m.xiaoshuo.qq.com/read/1025794048/8
[9] https://m.yunqi.qq.com/read/25916006/7
[10] https://m.chuangshi.qq.com/read/36702304/17
[11] https://m.read.qq.com/read/1027054080/4
[12] https://news.qq.com/rain/a/20221213A05DBN00
[13] https://m.yunqi.qq.com/read/36697971/13
[14] https://m.yunqi.qq.com/read/36698643/21
[15] https://news.qq.com/rain/a/20240506A01K8J00
[16] https://news.qq.com/rain/a/20241225A01ATE00
[17] https://file.finance.qq.com/finance/hs/pdf/2024/08/29/1221025223.PDF
[18] https://m.chuangshi.qq.com/read/36698008/8
[19] https://m.xiaoshuo.qq.com/read/1036698464/11
[20] https://file.finance.qq.com/finance/hs/pdf/2024/08/31/1221091577.PDF
[21] https://file.finance.qq.com/finance/hs/pdf/2024/05/09/1220009571.PDF
[22] https://file.finance.qq.com/finance/hs/pdf/2023/05/17/1216827484.PDF
`;

export default function Home() {
  const [editorData, setEditorData] = useState(null);

  const handleEditorChange = (data: any) => {
    setEditorData(data);
    console.log("Editor data:", data);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">EditorJS with Math</h1>
      <Editor markdown={markdownExample} onChange={handleEditorChange} />
    </main>
  );
}
