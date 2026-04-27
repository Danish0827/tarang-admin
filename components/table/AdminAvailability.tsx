"use client";

import React, { useEffect, useState } from "react";
import {
    Calendar,
    Modal,
    Switch,
    Button,
    TimePicker,
    Card,
    Space,
    Typography,
    Select,
} from "antd";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import axios from "axios";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { CardHeader } from "../ui/card";

const { Title, Text } = Typography;

const USER_ID = "fb5c2438-8431-48df-b6e1-74da228192e1";

const AdminAvailability = () => {
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);
    const [slots, setSlots] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    // 📅 Fetch available dates
    useEffect(() => {
        fetchDates();
    }, []);

    const fetchDates = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await axios.get("https://backend.drtarangkrishna.com/api/available/dates", {
                params: {
                    user_id: USER_ID,
                    start: dayjs().format("YYYY-MM-DD"),
                    end: dayjs().add(3, "month").format("YYYY-MM-DD"),
                },
            });

            setAvailableDates(res.data.data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load dates");
        } finally {
            setLoading(false);
        }
    };

    const today = dayjs();
    dayjs.extend(updateLocale);

    dayjs.updateLocale("en", {
        weekdaysMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    });
    const maxDate = dayjs().add(3, "month");
    const nextMonth = () => {
        const next = value.add(1, "month");
        if (next.isBefore(maxDate, "month") || next.isSame(maxDate, "month")) {
            setValue(next);
        }
    };

    const prevMonth = () => {
        const prev = value.subtract(1, "month");
        if (prev.isAfter(today, "month") || prev.isSame(today, "month")) {
            setValue(prev);
        }
    };
    const generateTimeOptions = () => {
        const times = [];
        let start = dayjs().startOf("day").hour(7);
        let end = dayjs().startOf("day").hour(22);

        while (start.isBefore(end)) {
            times.push(start.format("hh:mm A")); // ✅ AM/PM
            start = start.add(60, "minute");
        }

        return times;
    };

    const timeOptions = generateTimeOptions();
    // 🎨 Calendar cell UI (Calendly style)
    const dateCellRender = (value: any) => {
        const d = value.format("YYYY-MM-DD");

        const isAvail = availableDates.includes(d);

        const isSelected =
            selectedDate &&
            selectedDate.format("YYYY-MM-DD") === d;

        let bg = "#fff2f0"; // ❌ off (red)
        let border = "#ffccc7";
        let color = "#999";

        // ✅ available
        if (isAvail) {
            bg = "#e6f4ff";
            border = "#91caff";
            color = "#1677ff";
        }

        // 🔥 selected (highest priority)
        if (isSelected) {
            bg = "#d9d7f8";
            border = "#4f46e5";
            color = "#fff";
        }
        const isToday = value.isSame(dayjs(), "day");

        if (isToday) {
            bg = "#ecfdf5";        // your custom color
            border = "#86efac";
            color = "#16a34a";
        }

        return (
            <div
                style={{
                    height: '100%',
                    width: "100%",
                    margin: "auto",
                    borderRadius: 12,
                    background: bg,
                    border: `1px solid ${border}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 500,
                    fontSize: '17px',
                }}
            >
                {value.date()}
            </div>
        );
    };

    // 📅 Click date → load data
    const onSelect = async (value: any) => {
        setSelectedDate(value);
        setIsModalOpen(true);

        const res = await axios.get(
            "https://backend.drtarangkrishna.com/api/available/day-detail",
            {
                params: {
                    user_id: USER_ID,
                    date: value.format("YYYY-MM-DD"),
                },
            }
        );

        setIsAvailable(res.data.is_available);
        console.log(res.data.is_available,"res.data.is_available");
        

        if (res.data.slots?.length) {
            setSlots(
                res.data.slots.map((s: any) => ({
                    start: dayjs(s.start_time, "HH:mm").format("hh:mm A"),
                    end: dayjs(s.end_time, "HH:mm").format("hh:mm A"),
                }))
            );
        } else {
            setSlots([{ start: null, end: null }]);
        }
    };

    // ➕ Add slot
    const addSlot = () => {
        setSlots([...slots, { start: null, end: null }]);
    };

    // ❌ Remove slot
    const removeSlot = (index: number) => {
        const updated = [...slots];
        updated.splice(index, 1);
        setSlots(updated);
    };

    // ⏱ Update slot
    const updateSlot = (index: number, field: string, value: any) => {
        const updated = [...slots];
        updated[index][field] = value;
        setSlots(updated);
    };

    // 💾 Save
    const handleSave = async () => {
        const cleanSlots = slots
            .filter((s) => s.start && s.end)
            .map((s) => ({
                start: dayjs(s.start, "hh:mm A").format("HH:mm"),
                end: dayjs(s.end, "hh:mm A").format("HH:mm"),
            }));

        await axios.post("https://backend.drtarangkrishna.com/api/available/override", {
            user_id: USER_ID,
            date: selectedDate.format("YYYY-MM-DD"),
            is_available: isAvailable,
            slots: isAvailable ? cleanSlots : [],
        });

        setIsModalOpen(false);
        fetchDates();
    };

    console.log(slots, "slotsslotsslotsslots");

    const [value, setValue] = useState(dayjs());

    return (
        <>{loading ? (
            <div className="flex items-center justify-center min-h-[300px]">
                <div className="flex flex-col items-center gap-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg px-8 py-6">

                    {/* Spinner */}
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                    {/* Text */}
                    <p className="text-gray-700 font-medium">
                        Fetching available dates...
                    </p>

                    {/* Subtext */}
                    <span className="text-sm text-gray-500">
                        Please wait a moment
                    </span>

                </div>
            </div>
        ) :
            <div
                className="select-none"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    // padding: "40px 20px",
                    // background: "#f9fafb",
                    // minHeight: "100vh",
                }}
            >
                <Card className="card h-full border-0 overflow-hidden ">
                    <CardHeader className="border-b border-neutral-200 dark:border-slate-600 px-6 flex items-center flex-wrap gap-3 justify-between mb-10">
                        <Title level={4}>Set Availability</Title>
                        <div className="md:flex justify-between gap-5 items-center">
                            <ChevronLeft
                                size={35}
                                onClick={prevMonth}
                                style={{
                                    cursor: value.isSame(dayjs(), "month") ? "not-allowed" : "pointer",
                                    opacity: value.isSame(dayjs(), "month") ? 0.3 : 1,
                                }}
                            />
                            <span style={{ fontWeight: 600, fontSize: 16 }}>
                                {value.format("MMMM YYYY")}
                            </span>

                            <ChevronRight
                                size={35}
                                onClick={nextMonth}
                                style={{
                                    cursor: value.isSame(dayjs().add(3, "month"), "month") ? "not-allowed" : "pointer",
                                    opacity: value.isSame(dayjs().add(3, "month"), "month") ? 0.3 : 1,
                                }}
                            />
                        </div>
                    </CardHeader>
                    <Calendar
                        fullscreen={true}
                        value={value}
                        onPanelChange={(val) => setValue(val)}
                        onSelect={onSelect}
                        cellRender={(current, info) =>
                            info.type === "date"
                                ? dateCellRender(current)
                                : info.originNode
                        }
                        headerRender={() => null}
                        disabledDate={(current) =>
                            current &&
                            (current < today.startOf("day") ||
                                current > maxDate.endOf("day"))
                        }
                    />
                </Card>

                <Modal
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    centered
                    width={560}
                >
                    {/* <div className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"> */}
                        {/* Header */}
                        <div className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 p-6 dark:border rounded-md">
                        <div className="border-b flex items-center gap-3 border-neutral-200 dark:border-neutral-700 pb-2 mb-6">
                            <Title level={4}>
                                {selectedDate?.format("DD MMM YYYY")} 
                            </Title>
                            <div className="mb-1">
                            <Switch checked={isAvailable} size="default" onChange={setIsAvailable} />
                        </div>
                        </div>

                        <Space direction="vertical" style={{ width: "100%" }}></Space>
                        
                        {/* Body */}
                        <div className="px-3 pb-6">
                            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                                <Text strong>Time Slots</Text>
                                {isAvailable ? (
                                    <>
                                        {slots.map((slot, i) => (
                                            <Card
                                                key={i}
                                                size="small"
                                                style={{
                                                    borderRadius: 14,
                                                    background: "#fafafa",
                                                }}
                                                bodyStyle={{ padding: 12 }}
                                            >
                                                <Space
                                                    style={{
                                                        width: "100%",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <Space>
                                                        <Select
                                                            style={{ width: 120 }}
                                                            placeholder="Start"
                                                            value={slot.start || undefined}
                                                            onChange={(val) =>
                                                                updateSlot(i, "start", val)
                                                            }
                                                            options={timeOptions.map((t) => ({
                                                                label: t,
                                                                value: t,
                                                            }))}
                                                        />

                                                        <Text type="secondary">to</Text>

                                                        <Select
                                                            style={{ width: 120 }}
                                                            placeholder="End"
                                                            value={slot.end || undefined}
                                                            onChange={(val) =>
                                                                updateSlot(i, "end", val)
                                                            }
                                                            options={timeOptions.map((t) => ({
                                                                label: t,
                                                                value: t,
                                                            }))}
                                                        />
                                                    </Space>

                                                    <Button
                                                        danger
                                                        type="text"
                                                        onClick={() => removeSlot(i)}
                                                        icon={<Trash2 size={16} />}
                                                    />
                                                </Space>
                                            </Card>
                                        ))}

                                        <Button
                                            type="dashed"
                                            onClick={addSlot}
                                            block
                                            style={{
                                                height: 42,
                                                borderRadius: 12,
                                            }}
                                            icon={<Plus size={16} />}
                                        >
                                            Add Time Slot
                                        </Button>
                                    </>
                                ) : (
                                    <div className="text-center py-6 text-neutral-400">
                                        Not available for this day
                                    </div>
                                )}
                            </Space>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 flex justify-end gap-3">

                            <Button
                                onClick={() => setIsModalOpen(false)}
                                style={{ height: 40, borderRadius: 10 }}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="primary"
                                onClick={handleSave}
                                style={{
                                    height: 40,
                                    borderRadius: 10,
                                    paddingInline: 20,
                                }}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        }</>

    );
};

export default AdminAvailability;