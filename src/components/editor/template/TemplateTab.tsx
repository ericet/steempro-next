import React, {  } from "react";
import MarkdownViewer from "@/components/body/MarkdownViewer";
import { Card } from "@heroui/card";
import { useTranslation } from "@/utils/i18n";

interface Snippet {
  id: number;
  title: string;
  body: string;
}

const templateList = [
  {
    titleKey: "submit.template_markdown_basic_01",
    image: `![](https://cdn.steemitimages.com/DQmYdjFdAGVTHVF2kq5uh8RFYAPJdtY7vsJzVtn6ksYEtyw/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202023-05-18%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.19.17.png)`,
    content: `# Main Title

## 01. Sub Title
This is the most basic template for beginners using markdown for the first time. By simply editing the text between the check emojis, anyone can create great blog content as if using an editor.

Use an asterisk mark to provide emphasis, such as *italics* or **bold**.

Create lists with a dash:
- Item 01
- Item 02
- Item 03

~~~
Use back ticks
to create a block of code
~~~
`,
  },
  {
    titleKey: "submit.template_markdown_basic_02",
    image: `![](https://cdn.steemitimages.com/DQmXy3EoyX2coFDF8mH5mAfwq43LhQz3anHhpa9JkArPjVU/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202023-05-18%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.03.18.png)`,
    content: `<center>✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅</center>
<center><sup>✅Description✅</sup></center>

- Quotation : [✅LINK✅](✅https://steemit.com/✅)

---

✅ ➊ You can write comments or thoughts about the above photo here. ➋ Edit the content between the check emojis, and delete the check emojis at the beginning and end. ➌ The check emoji is marked for the purpose of letting users know which part needs to be corrected.✅

1. ✅Item 01✅
2. ✅Item 02✅
3. ✅Item 03✅
<br>
<br>
`,
  },
  {
    titleKey: "submit.template_photo_blog_01",
    image: `![](https://cdn.steemitimages.com/DQmU67mv7vkEKZBevteyMYpQRgSFdA8YS7cExLaCFc9QK2z/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202023-05-18%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.07.14.png)`,
    content: `<center><h2>✅Main Title✅</h2></center>

<div class="pull-left">
✅
https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
<center><sub>✅Description✅</sub></center>
<br>
</div>

<div class="pull-right">✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
<center><sub>✅Description✅</sub></center>
<br>
</div>

<br>
✅ ➊ You can write comments or thoughts about the above photo here. ➋ Edit the content between the check emojis, and delete the check emojis at the beginning and end. ➌ The check emoji is marked for the purpose of letting users know which part needs to be corrected.✅

<center>
https://cdn.steemitimages.com/DQmY8UA7YC68Lhh6cLFzdAESxuG8eaonPdPwKcVyEBieXK5/border_06.png
<q>✅Enter subtitle here✅</q>
https://cdn.steemitimages.com/DQmY8UA7YC68Lhh6cLFzdAESxuG8eaonPdPwKcVyEBieXK5/border_06.png
</center>

✅ ➊ You can write comments or thoughts about the above photo here. ➋ Edit the content between the check emojis, and delete the check emojis at the beginning and end. ➌ The check emoji is marked for the purpose of letting users know which part needs to be corrected.✅
<br>
<br>
`,
  },
  {
    titleKey: "submit.template_photo_blog_02",
    image: `![](https://cdn.steemitimages.com/DQmavWiNcRVVpmVFZv2KrrNGc212JnQyewgzzCYPnccUjAJ/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202023-05-18%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.08.02.png)`,
    content: `<div class="pull-left">
<div class="pull-left">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
<div class="pull-right">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
</div>
<div class="pull-right">
<div class="pull-left">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
<div class="pull-right">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
</div>

<br>
<br>
<div class="pull-left">
<div class="pull-left">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
<div class="pull-right">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
</div>
<div class="pull-right">
<div class="pull-left">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
<div class="pull-right">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
</div>

<br>
<br>
<div class="pull-left">
<div class="pull-left">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
<div class="pull-right">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
</div>
<div class="pull-right">
<div class="pull-left">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
<div class="pull-right">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
</div>

✅ ➊ You can write comments or thoughts about the above photo here. ➋ Edit the content between the check emojis, and delete the check emojis at the beginning and end. ➌ The check emoji is marked for the purpose of letting users know which part needs to be corrected.✅
<br>
<br>`,
  },
  {
    titleKey: "submit.template_photo_blog_03",
    image: `![](https://cdn.steemitimages.com/DQmUZ26QNmZGRWC1cVusKPEbwaUb68vN3165e1Wipxk3cXP/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202023-05-18%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.12.57.png)
        `,
    content: `---
<div class=pull-left>
<strong>✅01. SUB TITLE✅</strong>
</div>

---

<div class="text-justify">
<div class="pull-left">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
<div class="pull-right">
</div>
✅➊ You can use this template if you want to place a photo on the left side of the screen and write text on the right side. ➋ Edit the content between the check emojis, and delete the check emojis at the beginning and end. ➌ The check emoji is marked for the purpose of letting users know which part needs to be corrected.✅</div>

<br>
<br>


---

<div class=pull-left>
<strong>✅02. SUB TITLE✅</strong>
</div>

---

<div class="text-justify">
<div class="pull-left">
✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅
</div>
<div class="pull-right">
</div>
✅➊ You can use this template if you want to place a photo on the left side of the screen and write text on the right side. ➋ Edit the content between the check emojis, and delete the check emojis at the beginning and end. ➌ The check emoji is marked for the purpose of letting users know which part needs to be corrected.✅</div>
<br>
<br>`,
  },
  {
    titleKey: "submit.template_table_01",
    image: `![image.png](https://cdn.steemitimages.com/DQmXnAKxeT42seqzYNqRLWwtZ78jbAcEQqBu3tyd2Avyo3i/image.png)`,
    content: `|	✅Header1✅	|	✅Header1✅	|	✅Header1✅	|
|	------------	|	------------	|	------------	|
|    ✅Text✅     	|     ✅Text✅     	|     ✅Text✅     	|`,
  },
  {
    titleKey: "submit.template_table_02",
    image: `![image.png](https://cdn.steemitimages.com/DQmP48Ytssq1XN1a9Ab6UbSY8nvWHDTEjxLNaAuPMy13VY9/image.png)`,
    content: `| ✅Header1✅ | ✅Header2✅ | ✅Header3✅ | ✅Header4✅ | ✅Header5✅ |
|--|--:|--:|--:|--:|
✅Cell01✅ | ✅1112✅ | ✅1113✅ | ✅1114✅ | ✅1115✅ |
✅Cell02✅ | ✅1122✅ | ✅1123✅ | ✅1124✅ | ✅1125✅ |
✅Cell03✅ | ✅1132✅ | ✅1133✅ | ✅1134✅ | ✅1135✅ |
✅Cell04✅ | ✅1142✅ | ✅1143✅ | ✅1144✅ | ✅1145✅ |
✅Cell05✅ | ✅1152✅ | ✅1153✅ | ✅1154✅ | ✅1155✅ |`,
  },
  {
    titleKey: "submit.template_table_03",
    image: `![image.png](https://cdn.steemitimages.com/DQmdzz1iYUMZvp5m9qx51DEKmfim7VhbcYTzkk3Drc8atyb/image.png)`,
    content: `| ✅Header1✅ | ✅Header2✅| ✅Header3✅ |
|-|-|-|
| ✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅ | **✅Sub Title 01✅** | ✅Description✅      |
| ✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅ | **✅Sub Title 02✅**  | ✅Description✅ |
| ✅https://cdn.steemitimages.com/DQmdgm8o8njXdFpdDgF5kuTXjJuAhSg6uPfHgTZu3RkirBE/image%20preview.001.png✅ | **✅Sub Title 03✅**  | ✅Description✅ |
<br>
<br>`,
  },
];

interface Props {
  handleOnSelect?: (snippet: Snippet) => void;
}
function TemplateTab(props: Props) {
  const { t } = useTranslation();
  const { handleOnSelect } = props;

  return (
    <div className=" flex flex-col gap-4">
      {templateList?.map((template, index) => {
        return (
          <Card
            key={index}
            isPressable
            className=" cursor-pointe p-4 comment-card"
            onPress={() => {
              handleOnSelect &&
                handleOnSelect({
                  id: index,
                  title: t(template.titleKey),
                  body: template.content,
                });
            }}
          >
            <p className=" font-semibold">{t(template.titleKey)}</p>
            <MarkdownViewer text={`<center>${template.image}</center>`} className=" prose-img:max-fit" />
          </Card>
        );
      })}
    </div>
  );
}

export default TemplateTab;
