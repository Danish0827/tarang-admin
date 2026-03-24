"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function TreatmentCardRepeater({ items, setItems, type }: any) {
const data = Array.isArray(items) ? items : [];
//   const data = items;

  const addItem = () => {
    const last = data[data.length - 1];
    if (!last?.treatmentcardtitle?.trim()) return;

    setItems([
      ...data,
      {
        treatmentcardimage: "",
        treatmentcardtitle: "",
        treatmentcardcontent: ""
      }
    ]);
  };

  const removeItem = (index: number) => {
    if (data.length === 1) return;
    setItems(data.filter((_: any, i: number) => i !== index));
  };

  const handleChange = (index: number, field: string, value: any) => {
    setItems((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div>
      {data.map((item: any, index: number) => {
        const isLast = index === data.length - 1;
        const isFilled = item.treatmentcardtitle?.trim();

        return (
          <div key={index} className="border p-4 rounded-lg mb-4">

            <Input
              placeholder="Card Title"
              value={item.treatmentcardtitle}
              onChange={(e) =>
                handleChange(index, "treatmentcardtitle", e.target.value)
              }
            />

            <Textarea
              placeholder="Card Content"
              value={item.treatmentcardcontent}
              onChange={(e) =>
                handleChange(index, "treatmentcardcontent", e.target.value)
              }
            />

            {/* DELETE */}
            {data.length > 1 && type !== "view" && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeItem(index)}
              >
                <Trash2 />
              </Button>
            )}

            {/* ADD */}
            {isLast && type !== "view" && (
              <div className="flex justify-center mt-2">
                <Button onClick={addItem} disabled={!isFilled}>
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