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
import Link from "next/link";
import { Modal } from "antd";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { handleContactAction } from "@/app/(dashboard)/(contactform)/contactdetails/actions";
import ImageFormFields from "../shared/ImageFormFields";

const AllContactTable = ({ contact }: any) => {
    const [modalType, setModalType] = useState<null | "view" | "edit" | "delete">(null);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const initialState = { success: false, message: "" };
    const [state, formAction] = useActionState(
        handleContactAction,
        initialState
    );

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
console.log(selectedItem,"selectedItem");

    return (
        <>
            <Table className="table-auto border-spacing-0 border-separate">
                <TableHeader>
                    <TableRow className="border-0">
                        <TableHead className="bg-neutral-100 lg:pl-10 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 border-s rounded-tl-lg">
                            Name
                        </TableHead>
                        {/* <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12">
                            Description
                        </TableHead> */}
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Phone
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Email
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Subject
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Date
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 border-e rounded-tr-lg text-center">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {contact?.contacts.map((item: any, index: number) => {
                        const isLastRow = index === contact.length - 1;
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
                                            {item.full_name
                                                ?.split(" ")
                                                .map((n: any) => n[0])
                                                .join("")
                                                .slice(0, 2)
                                                .toUpperCase()}
                                        </div>
                                        <span className="text-base font-semibold text-neutral-500 dark:text-neutral-300">
                                            {item.full_name}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell
                                    className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                        }`}
                                >
                                    {item.phone}
                                </TableCell>

                                <TableCell
                                    className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                        }`}
                                >
                                    {item.email}
                                </TableCell>
                                <TableCell
                                    className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                        }`}
                                >
                                    {item.phone}
                                </TableCell>


                                <TableCell
                                    className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                        }`}
                                >
                                    {format(item.created_at, "PPP")}
                                </TableCell>

                                {/* <TableCell
                                    className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base first:border-s last:border-e ${isLastRow ? "" : ""
                                        } text-center`}
                                >
                                    <Badge
                                        // variant={item.statusVariant}
                                        className={`rounded-[50rem] capitalize ${item.status == 'draft' ? 'bg-cyan-600' : item.status == 'pending' ? 'bg-yellow-500' : item.status == 'published' ? 'bg-green-500' : 'bg-primary'}`}
                                    >
                                        {item.subject}
                                    </Badge>
                                </TableCell> */}
                                <TableCell
                                    className={`py-4 px-4 border-b text-center first:border-s last:border-e border-neutral-200 dark:border-slate-600 ${isLastRow ? "rounded-br-lg" : ""
                                        }`}
                                >
                                    <div className="flex justify-center gap-2">
                                        <Button onClick={() => {
                                            setSelectedItem(item);
                                            setModalType("view");
                                        }} size="icon" variant="ghost" className="rounded-[50%] text-blue-500 bg-primary/10">
                                            <Eye className="w-5 h-5" />
                                        </Button>
                                        <Button onClick={() => {
                                            setSelectedItem(item);
                                            setModalType("delete");
                                        }} size="icon" variant="ghost" className="rounded-[50%] text-red-500 bg-red-500/10">
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
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
                <div>
                    <div className="border-b pb-4 mb-4">
                        <h2 className="text-xl font-semibold text-neutral-800">
                            View Details
                        </h2>
                    </div>
                     <div className="grid grid-cols-2 gap-4 text-sm">

                        <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                            <p className="text-neutral-500 text-xs mb-1">Name</p>
                            <p className="font-semibold text-neutral-900 dark:text-white">
                                {selectedItem?.full_name}
                            </p>
                        </div>

                        <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                            <p className="text-neutral-500 text-xs mb-1">Email</p>
                            <p className="font-semibold text-neutral-900 dark:text-white">
                                {selectedItem?.email}
                            </p>
                        </div>
                        <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                            <p className="text-neutral-500 text-xs mb-1">Phone</p>
                            <p className="font-semibold text-neutral-900 dark:text-white">
                                {selectedItem?.phone}
                            </p>
                        </div>

                        <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl">
                            <p className="text-neutral-500 text-xs mb-1">Subject</p>
                            <p className="font-semibold text-neutral-900 dark:text-white">
                                {selectedItem?.subject}
                            </p>
                        </div>

                        <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-xl col-span-2">
                            <p className="text-neutral-500 text-xs mb-1">Message</p>
                            <p className="font-semibold text-neutral-900 dark:text-white">
                                {selectedItem?.message}
                            </p>
                        </div>

                    </div>
                    <div className="col-span-2 flex items-center justify-center gap-3 mt-6">
                        <Button
                            onClick={(e) => { e.preventDefault(); setModalType(null); setSelectedItem(null) }}
                            className="h-12 w-5/12 my-5 bg-primary hover:bg-primary/80 text-white text-base rounded-lg"
                        >
                            Close
                        </Button>
                    </div>
                </div>
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
                    action={formAction}
                >
                    <div className="grid gap-x-5">
                        <Input
                            type="hidden"
                            name="action"
                            value="delete"
                        />
                        <Input
                            type="hidden"
                            name="id"
                            value={selectedItem?.id}
                        />
                    </div>
                    <div className="border-b pb-4 mb-4">
                        <h2 className="text-xl font-semibold text-neutral-800">
                            Confirm Delete
                        </h2>
                    </div>
                    <p className="text-center text-base">Are you sure you want to delete {selectedItem?.title}?</p>
                    <div className="col-span-2 flex items-center justify-center gap-3 mt-6">
                        <Button
                            type="submit"
                            className="h-10 w-32 bg-red-600 hover:bg-red-700 text-white text-base rounded-lg"
                        >
                            Delete
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AllContactTable;
