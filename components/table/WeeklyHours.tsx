import { useState } from "react";

const days = ["S", "M", "T", "W", "T", "F", "S"];

export default function WeeklyHours({ initialData }) {
  const [availability, setAvailability] = useState(initialData);

  const addSlot = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), { start: "", end: "" }],
    }));
  };

  const removeSlot = (day, index) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const updateTime = (day, index, field, value) => {
    const updated = [...availability[day]];
    updated[index][field] = value;

    setAvailability((prev) => ({
      ...prev,
      [day]: updated,
    }));
  };

  return (
    <div className="bg-[#ECF5FF] p-6 rounded-xl w-full max-w-xl">
      <h2 className="text-lg font-semibold mb-1">Weekly hours</h2>
      <p className="text-sm text-gray-500 mb-4">
        Set when you are typically available for meetings
      </p>

      {days.map((d, index) => (
        <div key={index} className="flex items-start gap-4 mb-4">
          
          {/* Day Circle */}
          <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-semibold">
            {d}
          </div>

          {/* Slots */}
          <div className="flex-1 space-y-2">
            { availability ? (availability[index + 1] || []).map((slot, i) => (
              <div key={i} className="flex items-center gap-2">
                
                <input
                  type="time"
                  value={slot.start}
                  onChange={(e) =>
                    updateTime(index + 1, i, "start", e.target.value)
                  }
                  className="border rounded-md px-2 py-1"
                />

                <span>-</span>

                <input
                  type="time"
                  value={slot.end}
                  onChange={(e) =>
                    updateTime(index + 1, i, "end", e.target.value)
                  }
                  className="border rounded-md px-2 py-1"
                />

                {/* Remove */}
                <button
                  onClick={() => removeSlot(index + 1, i)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            )): <p>Unavailable</p>}
          </div>

          {/* Add Button */}
          <button
            onClick={() => addSlot(index + 1)}
            className="text-blue-600 text-xl"
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}