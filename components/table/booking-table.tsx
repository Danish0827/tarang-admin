'use client'
import { format } from "date-fns"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
const today = dayjs();
const maxDate = dayjs().add(3, "month");
import { Modal } from "antd";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { handleBookingAction } from "@/app/(dashboard)/(book)/booking/actions";

const Bookingtable = ({ booking }: any) => {
    const [modalType, setModalType] = useState<null | "view" | "edit" | "delete">(null);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [state, setState] = useState({
        success: false,
        message: ""
    });

    const formAction = async (formData: any
    ) => {
        const result = await handleBookingAction(formData);
        setState(result);
    };

    useEffect(() => {
        if (state?.message) {
            if (state.success) {
                toast.success(state.message);
                setModalType(null)
            } else {
                toast.error(state.message);
            }
        }
    }, [state]);
    const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
    ];
    const generateSlots = () => {
        const start = 9;
        const end = 19;
        let temp = [];

        for (let hour = start; hour < end; hour++) {
            temp.push({
                id: `${hour}-00`,
                label: `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`
            });
            // temp.push({
            //   id: `${hour}-30`,
            //   label: `${hour % 12 || 12}:30 ${hour < 12 ? "AM" : "PM"}`
            // });
        }
        return temp;
    };
    const [selectedDate, setSelectedDate] = useState<any>(dayjs());
    const [slots, setSlots] = useState<any>(generateSlots());
    const [selectedTime, setSelectedTime] = useState<any>(null);
    const [rescheduleNote, setRescheduleNote] = useState("");

    return (
        <>
            <Table className="table-auto border-spacing-0 border-separate">
                <TableHeader>
                    <TableRow className="border-0">
                        <TableHead className="bg-neutral-100 lg:pl-10 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 border-s rounded-tl-lg">
                            Patient Name
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Consultant Name
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12">
                            Amount
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Patient Phone
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Patient Email
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Booking Date
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Booking Time
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Booking Status
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 border-e rounded-tr-lg text-center">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {booking && booking.length > 0 ? (
                        booking?.map((item: any, index: number) => {
                            const isLastRow = index === booking.length - 1;
                            return (
                                <TableRow key={index}>
                                    <TableCell
                                        className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base first:border-s last:border-e ${isLastRow ? "rounded-bl-lg" : ""
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold ${colors[index % colors.length]
                                                    }`}
                                            >
                                                {item.user_name
                                                    ?.split(" ")
                                                    .map((n: any) => n[0])
                                                    .join("")
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </div>
                                            <span className="text-base font-semibold text-neutral-500 dark:text-neutral-300">
                                                {item.user_name}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell
                                        className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                            }`}
                                    >
                                        {item.consultant_name}
                                    </TableCell>

                                    <TableCell
                                        className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                            }`}
                                    >
                                        ₹{item.amount}
                                    </TableCell>
                                    <TableCell
                                        className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                            }`}
                                    >
                                        {item.user_phone}
                                    </TableCell>
                                    <TableCell
                                        className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                            }`}
                                    >
                                        {item.user_email}
                                    </TableCell>
                                    <TableCell
                                        className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                            }`}
                                    >
                                        {format(item.booking_date, "PPP")}
                                    </TableCell>


                                    <TableCell
                                        className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                            }`}
                                    >
                                        {item.booking_time}
                                    </TableCell>

                                    <TableCell
                                        className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base first:border-s last:border-e ${isLastRow ? "" : ""
                                            } text-center`}
                                    >
                                        <Badge
                                            className={`rounded-[50rem] capitalize ${item?.booking_status == 'CANCELLED' ? 'bg-red-600' : item?.booking_status == 'RESCHEDULED' ? 'bg-cyan-600' : item.booking_status == 'BOOKED' ? 'bg-green-600' : 'bg-yellow-500'}`}
                                        >
                                            {item?.booking_status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell
                                        className={`py-4 px-4 border-b text-center first:border-s last:border-e border-neutral-200 dark:border-slate-600 ${isLastRow ? "rounded-br-lg" : ""
                                            }`}
                                    >
                                        <div className="flex justify-center gap-2">
                                            <Button onClick={() => {
                                                setSelectedItem(item);
                                                setModalType("view");
                                                setSelectedDate(dayjs());
                                                setSelectedTime(null);
                                            }} size="icon" variant="ghost" className="rounded-[50%] text-blue-500 bg-primary/10">
                                                <Eye className="w-5 h-5" />
                                            </Button>
                                            {item?.booking_status !== "CANCELLED" &&
                                                <Button onClick={() => {
                                                    setSelectedItem(item);
                                                    setModalType("edit");
                                                    setSelectedDate(dayjs(item?.booking_date));
                                                    setSelectedTime(
                                                        slots.find((s: any) => s.label === item.booking_time)
                                                    );
                                                    setRescheduleNote(item.note);
                                                }} size="icon" variant="ghost" className="rounded-[50%] text-green-600 bg-green-600/10">
                                                    <Edit className="w-5 h-5" />
                                                </Button>}
                                            {item?.booking_status !== "CANCELLED" &&
                                                <Button onClick={() => {
                                                    setSelectedItem(item);
                                                    setModalType("delete");
                                                    setSelectedDate(dayjs());
                                                    setSelectedTime(null);
                                                }} size="icon" variant="ghost" className="rounded-[50%] text-red-500 bg-red-500/10">
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} className="py-16 border border-neutral-200 dark:border-slate-600 rounded-b-2xl">
                                <div className="flex flex-col items-center justify-center text-center gap-4 ">
                                    {/* Icon */}
                                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-slate-700">
                                        <svg
                                            className="w-8 h-8 text-neutral-400 dark:text-neutral-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M9 13h6m-6 4h6M7 3h10a2 2 0 012 2v14l-4-2-4 2-4-2-4 2V5a2 2 0 012-2z"
                                            />
                                        </svg>
                                    </div>
                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
                                        No bookings yet
                                    </h3>
                                    {/* Subtitle */}
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                        Looks like there are no recent bookings. Once users start booking, they will appear here.
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal
                title={null}
                open={modalType === "view"}
                onCancel={() => { setModalType(null); setSelectedItem(null) }}
                centered
                footer={null}
                width={1024}
            >
                <div className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 p-6 dark:border rounded-md">
                    <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4 mb-4">
                        <h2 className="text-xl font-semibold">
                            View Details
                        </h2>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 p-6 dark:border rounded-md">
                        {/* <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4 mb-4">
                            <h2 className="text-xl font-semibold">
                                View Details
                            </h2>
                        </div> */}

                        <div className="grid grid-cols-2 gap-4 text-sm">

                            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                                <p className="text-neutral-500 text-xs mb-1">Name</p>
                                <p className="font-semibold">{selectedItem?.user_name}</p>
                            </div>

                            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                                <p className="text-neutral-500 text-xs mb-1">Email</p>
                                <p className="font-semibold">{selectedItem?.user_email}</p>
                            </div>

                            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                                <p className="text-neutral-500 text-xs mb-1">Phone</p>
                                <p className="font-semibold">{selectedItem?.user_phone}</p>
                            </div>

                            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                                <p className="text-neutral-500 text-xs mb-1">Consultant</p>
                                <p className="font-semibold">{selectedItem?.consultant_name}</p>
                            </div>

                            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                                <p className="text-neutral-500 text-xs mb-1">Amount</p>
                                <p className="font-semibold">₹ {selectedItem?.amount}</p>
                            </div>

                            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                                <p className="text-neutral-500 text-xs mb-1">Booking Date</p>
                                <p className="font-semibold">
                                    {new Date(selectedItem?.booking_date).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                                <p className="text-neutral-500 text-xs mb-1">Booking Time</p>
                                <p className="font-semibold">{selectedItem?.booking_time}</p>
                            </div>
                            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                                <p className="text-neutral-500 text-xs mb-1">Reschedule Count</p>
                                <p className="font-semibold">
                                    {selectedItem?.reschedule_count === 0 ? '-' : selectedItem?.reschedule_count}
                                </p>
                            </div>

                            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                                <p className="text-neutral-500 text-xs mb-1">Payment Status</p>
                                <p className="font-semibold text-green-600">
                                    {selectedItem?.payment_status}
                                </p>
                            </div>

                            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                                <p className="text-neutral-500 text-xs mb-1">Booking Status</p>
                                <p className="font-semibold text-blue-600">
                                    {selectedItem?.booking_status}
                                </p>
                            </div>


                            <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl col-span-2">
                                <p className="text-neutral-500 text-xs mb-1">Message</p>
                                <p className="font-semibold">{selectedItem?.user_message ? selectedItem?.user_message : '-'}</p>
                            </div>
                            {selectedItem?.booking_status === "CANCELLED" &&
                                <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl col-span-2">
                                    <p className="text-neutral-500 text-xs mb-1">Cancel Reason</p>
                                    <p className="font-semibold">{selectedItem?.cancel_reason ? selectedItem?.cancel_reason : '-'}</p>
                                </div>}
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center gap-3 mt-6">
                        <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setModalType(null); setSelectedItem(null) }}
                            className="px-6 h-12 text-base bg-primary hover:bg-primary/80 text-white cursor-pointer rounded-lg"
                        >
                            Back
                        </button>
                        {selectedItem?.booking_status !== "CANCELLED" &&
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open("https://us05web.zoom.us/j/2678102586?pwd=ctHbbcJRIdY6plpe2hdCKyAa64l089.1", "_blank", "noopener,noreferrer");
                                }}
                                className="px-6 h-12 text-base rounded-lg bg-black text-white hover:bg-black/80 cursor-pointer"
                            >
                                Join Now
                            </button>}
                    </div>
                </div>
            </Modal>
            <Modal
                title={null}
                open={modalType === "edit"}
                onCancel={() => { setModalType(null); setSelectedItem(null) }}
                centered
                footer={null}
                width={1024}
            >
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        await formAction(formData);
                    }}
                >
                    <div className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 p-6 dark:border rounded-md">
                        <div className="hidden">
                            <Input type="hidden" name="action" value="edit" />
                            <Input type="hidden" name="id" value={selectedItem?.id} />
                            <Input type="hidden" name="newDate" value={selectedDate ? selectedDate.format("YYYY-MM-DD") : ""} />
                            <Input type="hidden" name="newTime" value={selectedTime?.label} />
                        </div>
                        <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4 mb-4">
                            <h2 className="text-xl font-semibold text-yellow-500 dark:text-neutral-200">
                                Reschedule Booking
                            </h2>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                            You are reschedule booking for{" "}
                            <span className="font-semibold text-neutral-900 dark:text-white">
                                {selectedItem?.user_name}
                            </span>.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                    minDate={today}
                                    maxDate={maxDate}
                                    value={selectedDate}
                                    onChange={(newValue) => {
                                        setSelectedDate(newValue);
                                        setSelectedTime(null);
                                    }} />
                            </LocalizationProvider>
                            <div className="lg:border-l lg:pl-8">
                                <div className="grid grid-cols-2 gap-2">
                                    {slots.map((slot: any) => (
                                        <div
                                            key={slot.id}
                                            onClick={() => setSelectedTime(slot)}
                                            className={`p-3 border rounded-lg  cursor-pointer ${selectedTime?.id === slot.id
                                                ? "bg-indigo-600 text-white"
                                                : "hover:bg-gray-100"
                                                }`}
                                        >
                                            {slot.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="text-xs text-neutral-500 mb-2 block">
                                Reschedule Reason <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                required
                                name="note"
                                value={rescheduleNote}
                                onChange={(e) => setRescheduleNote(e.target.value)}
                                placeholder="Enter reason for reschedule..."
                                className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-28 rounded-lg !shadow-none !ring-0"
                            />
                        </div>
                        <div className="col-span-2 flex items-center justify-center gap-3 mt-6">
                            <button
                                onClick={(e) => { e.preventDefault(); setModalType(null); setSelectedItem(null) }}
                                className="px-6 h-12 text-base bg-primary hover:bg-primary/80 text-white cursor-pointer rounded-lg"
                            >
                                Back
                            </button>

                            <button
                                type="submit"
                                className="px-6 h-12 text-base rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                            >
                                Reschedule Booking
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
            <Modal
                title={null}
                open={modalType === "delete"}
                onCancel={() => { setModalType(null); setSelectedItem(null) }}
                centered
                footer={null}
                width={520}
            >
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        await formAction(formData);
                    }}
                >
                    <div className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 p-6 dark:border rounded-md">
                        <div className="hidden">
                            <Input type="hidden" name="action" value="cancel" />
                            <Input type="hidden" name="id" value={selectedItem?.id} />
                        </div>
                        <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4 mb-4">
                            <h2 className="text-xl font-semibold text-red-600 dark:text-neutral-200">
                                Cancel Booking
                            </h2>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                            You are cancelling booking for{" "}
                            <span className="font-semibold text-neutral-900 dark:text-white">
                                {selectedItem?.user_name}
                            </span>.
                        </p>
                        <div className="mb-4">
                            <label className="text-xs text-neutral-500 mb-2 block">
                                Cancel Reason <span className="text-red-500">*</span>
                            </label>
                            <Textarea required placeholder="Enter reason for cancellation..." className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-28 rounded-lg !shadow-none !ring-0" name="cancelNote" />
                        </div>
                        <div className="col-span-2 flex items-center justify-center gap-3 mt-6">
                            <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); setModalType(null); setSelectedItem(null) }}
                                className="px-6 h-12 text-base bg-primary hover:bg-primary/80 text-white cursor-pointer rounded-lg"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="px-6 h-12 text-base rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                            >
                                Cancel Booking
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Bookingtable