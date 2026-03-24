"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Tiptap from "@/app/(dashboard)/(components)/Tiptap";

interface Item {
  treatmentimage: string;
  treatmenttitle: string;
  treatmentbtnurl: string;
  treatmentcontent: string;
  treatmentreverse: boolean;
}

export default function TreatmentRepeater({ items, setItems, type }: any) {

  const data = items;

  const addItem = () => {
    const last = data[data.length - 1];
    if (!last?.treatmenttitle?.trim()) return;

    setItems([
      ...data,
      {
        treatmentimage: "",
        treatmenttitle: "",
        treatmentbtnurl: "",
        treatmentcontent: "",
        treatmentreverse: false
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
      {data.map((item: Item, index: number) => {
        const isLast = index === data.length - 1;
        const isFilled = item.treatmenttitle?.trim();

        return (
          <div key={index} className="border p-4 rounded-lg mb-4">

            <Input
              placeholder="Title"
              value={item.treatmenttitle}
              onChange={(e) =>
                handleChange(index, "treatmenttitle", e.target.value)
              }
            />

            <Input
              placeholder="Button URL"
              value={item.treatmentbtnurl}
              onChange={(e) =>
                handleChange(index, "treatmentbtnurl", e.target.value)
              }
            />

            {/* TIPTAP */}
            {/* <Tiptap
              content={item.treatmentcontent}
              onChange={(val) =>
                handleChange(index, "treatmentcontent", val)
              }
            /> */}

            {/* REVERSE */}
            <label className="flex gap-2 mt-2">
              <input
                type="checkbox"
                checked={item.treatmentreverse}
                onChange={(e) =>
                  handleChange(index, "treatmentreverse", e.target.checked)
                }
              />
              Reverse Layout
            </label>

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