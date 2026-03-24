"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQ[]>>;
  type?: string;
}

export default function FAQRepeater({ faqs, setFaqs, type }: Props) {

  // ✅ ALWAYS SAFE
  // const data = faqs.length
  //   ? faqs
  //   : [{ question:'' , answer: '' }];
  const data = faqs; // ONLY THIS
  console.log(data,"datadatadata");
  

  const addFaq = () => {
    const last = data[data.length - 1];

    if (!last.question.trim() || !last.answer.trim()) return;

    setFaqs([...data, { question: "", answer: "" }]);
  };

  // ✅ REMOVE
  const removeFaq = (index: number) => {
    if (data.length === 1) return;

    setFaqs(data.filter((_, i) => i !== index));
  };

  // ✅ CHANGE
  const handleChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setFaqs((prev) =>
      prev.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      )
    );
  };

  // ✅ FILTER EMPTY (backend ke liye)
  const filtered = data.filter(
    (f) => f.question.trim() && f.answer.trim()
  );

  return (
    <div>
      {/* 🔥 hidden input */}
      <Input
        type="hidden"
        name="faqs"
        value={JSON.stringify(filtered)}
      />

      {data.map((faq, index) => {
        const isLast = index === data.length - 1;
        const isFilled =
          faq.question.trim() && faq.answer.trim();

        return (
          <div key={index} className="border p-4 rounded-lg mb-4">

            {/* QUESTION */}
            <div className="mb-4">
              {/* <Label>Question</Label> */}
              <Textarea
                disabled={type === "view"}
                value={faq.question || ""}
                onChange={(e) =>
                  handleChange(index, "question", e.target.value)
                }
                placeholder="Enter Question"
                className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-28 rounded-lg !shadow-none !ring-0"
              />
            </div>

            {/* ANSWER */}
            <div className="mb-4">
              {/* <Label>Answer</Label> */}
              <Textarea
                disabled={type === "view"}
                value={faq.answer}
                onChange={(e) =>
                  handleChange(index, "answer", e.target.value)
                }
                placeholder="Enter Answer"
                className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-28 rounded-lg !shadow-none !ring-0"
              />
            </div>

            {/* DELETE */}
            {data.length > 1 && type !== "view" && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeFaq(index)}
              >
                <Trash2 />
              </Button>
            )}

            {/* ADD */}
            {isLast && type !== "view" && (
              <div className="flex justify-center mt-2">
                <Button
                  type="button"
                  onClick={addFaq}
                  disabled={!isFilled}
                >
                  + Add New
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}