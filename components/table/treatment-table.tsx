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
import { handleBlogAction } from "@/app/(dashboard)/(blogs)/blogpost/actions";
import { Input } from "../ui/input";
import { handleTreatmentAction } from "@/app/(dashboard)/(treatment)/addtreatment/actions";

const AllTreatmentTable = ({ treatment }: any) => {
    const [modalType, setModalType] = useState<null | "view" | "edit" | "delete">(null);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    // const initialState = { success: false, message: "" };
    // const [state, formAction] = useActionState(
    //     handleTreatmentAction,
    //     initialState
    // );
    const [state, setState] = useState({
        success: false,
        message: ""
    });

    const formAction = async (formData: any) => {
        const result = await handleTreatmentAction(formData);
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
    console.log(treatment, "Dsadsadsadsadsadsadsad");

    return (
        <>
            <Table className="table-auto border-spacing-0 border-separate">
                <TableHeader>
                    <TableRow className="border-0">
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 border-s rounded-tl-lg">
                            Title
                        </TableHead>
                        {/* <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12">
                            Description
                        </TableHead> */}
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Slug
                        </TableHead>
                        {/* <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Author
                        </TableHead> */}
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Published
                        </TableHead>
                        {/* <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            Status
                        </TableHead> */}
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 border-e rounded-tr-lg text-center">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {treatment?.map((item: any, index: number) => {
                        const isLastRow = index === treatment.length - 1;

                        return (
                            <TableRow key={index}>
                                <TableCell
                                    className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base first:border-s last:border-e ${isLastRow ? "rounded-bl-lg" : ""
                                        }`}
                                >
                                    <div className="flex items-center">
                                        {item?.image ?
                                            <img
                                                src={item?.image}
                                                alt={item?.title || ""}
                                                width={40}
                                                height={40}
                                                className="me-3 h-8 w-12 shrink-0 rounded-sm"
                                            /> :
                                            <div className="me-3 h-8 w-12 shrink-0 rounded-sm flex justify-center items-center border text-gray-500 text-sm">NA</div>}
                                        <span className="text-base font-semibold text-neutral-500 dark:text-neutral-300">
                                            {item.title.length > 35
                                                ? item.title.slice(0, 35) + "..."
                                                : item.title}
                                        </span>
                                    </div>
                                </TableCell>

                                {/* <TableCell
                                    className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base first:border-s last:border-e ${isLastRow ? "" : ""
                                        }`}
                                >
                                    {item.short_description}
                                </TableCell> */}

                                <TableCell
                                    className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                        }`}
                                >
                                    {item.slug.length > 30
                                        ? item.slug.slice(0, 30) + "..."
                                        : item.slug}
                                </TableCell>
                                {/* <TableCell
                                    className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                        }`}
                                >
                                    {item.author_name}
                                </TableCell> */}


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
                                        variant={item.statusVariant}
                                        className={`rounded-[50rem] capitalize ${item.status == 'draft' ? 'bg-cyan-600' : item.status == 'pending' ? 'bg-yellow-500' : item.status == 'published' ? 'bg-green-500' : 'bg-primary'}`}
                                    >
                                        {item.status}
                                    </Badge>
                                </TableCell> */}
                                <TableCell
                                    className={`py-4 px-4 border-b text-center first:border-s last:border-e border-neutral-200 dark:border-slate-600 ${isLastRow ? "rounded-br-lg" : ""
                                        }`}
                                >
                                    <div className="flex justify-center gap-2">
                                        <Link href={`/addtreatment?postslug=${item.slug}&type=view`}>
                                            <Button size="icon" variant="ghost" className="rounded-[50%] text-blue-500 bg-primary/10">
                                                <Eye className="w-5 h-5" />
                                            </Button>
                                        </Link>
                                        <Link href={`/addtreatment?postslug=${item.slug}&type=edit`}>
                                            <Button size="icon" variant="ghost" className="rounded-[50%] text-green-600 bg-green-600/10">
                                                <Edit className="w-5 h-5" />
                                            </Button>
                                        </Link>
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
                        <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4 mb-4">
                            <h2 className="text-xl font-semibold">
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
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AllTreatmentTable;
