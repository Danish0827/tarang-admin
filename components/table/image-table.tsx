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
import Image, { StaticImageData } from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Copy, Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import CopyUrlButton from "../copy-url-button";
import { Input, Modal } from "antd";
import { useActionState, useEffect, useState } from "react";
import { handleImageAction } from "@/app/(dashboard)/(media)/allmedia/actions";
import ImageFormFields from "../shared/ImageFormFields";

interface categoryData {
    id: number;
    name: string;
    url: string;
    description: string;
    created_at: string;
}
const AllImageTable = ({ images }: any) => {
    const [modalType, setModalType] = useState<null | "view" | "edit" | "delete">(null);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const initialState = { success: false, message: "" };
    const [state, formAction] = useActionState(
        handleImageAction,
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
    console.log(selectedItem,"dshfisdyfiodshfyiahf");
    
    return (
        <>
            <Table className="table-auto border-spacing-0 border-separate">
                <TableHeader>
                    <TableRow className="border-0">
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 border-s rounded-tl-lg">
                            Title
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12">
                            Image Alt
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 text-base border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
                            URL
                        </TableHead>

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
                    {images && images.images?.map((item: any, index: number) => {
                        const isLastRow = index === images.length - 1;

                        return (
                            <TableRow key={index}>
                                <TableCell
                                    className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base first:border-s last:border-e ${isLastRow ? "rounded-bl-lg" : ""
                                        }`}
                                >
                                    <div className="flex items-center">
                                        {item.url &&
                                            <img
                                                src={item.url}
                                                alt={item.alt_text || ""}
                                                width={60}
                                                height={60}
                                                className="me-3 rounded-lg border h-16 w-16 object-contain shadow-2xs"
                                            />}
                                        <span className="text-base font-semibold text-neutral-500 dark:text-neutral-300 line-clamp-1">
                                            {item.caption ? item.caption : '-'}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell
                                    className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base first:border-s last:border-e ${isLastRow ? "" : ""
                                        }`}
                                >
                                    {item.alt_text ? item.alt_text : '-'}
                                </TableCell>

                                <TableCell
                                    className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                        }`}
                                >
                                    {/* {item.url.slice(0,20)} */}
                                    <div className="bg-primary w-fit mx-auto py-1 px-4 rounded-2xl flex justify-center items-center text-white">
                                        Copy Url
                                        <CopyUrlButton url={item.url} />
                                    </div>
                                </TableCell>



                                <TableCell
                                    className={`py-3.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-base text-center first:border-s last:border-e ${isLastRow ? "" : ""
                                        }`}
                                >
                                    {format(item.created_at, "PPP")}
                                </TableCell>

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
                                            setModalType("edit");
                                        }} size="icon" variant="ghost" className="rounded-[50%] text-green-600 bg-green-600/10">
                                            <Edit className="w-5 h-5" />
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
                            View Image
                        </h2>
                    </div>
                    <ImageFormFields singleImage={selectedItem} type='view' />
                    <div className="col-span-2 flex items-center justify-center gap-3 mt-6">
                        <Button
                            onClick={(e) => { e.preventDefault(); setModalType(null); setSelectedItem(null) }}
                            className="h-12 w-10/12 my-5 bg-primary hover:bg-primary/80 text-white text-base rounded-lg"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </Modal>


            {/* Edit Modal */}
            <Modal
                title={null}
                open={modalType === "edit"}
                onCancel={() => { setModalType(null); setSelectedItem(null) }}
                centered
                footer={null}
                width={1024}
            >
                <form action={formAction}>
                    <div>
                        <div className="grid gap-x-5">
                            <Input
                                type="hidden"
                                name="action"
                                value="update"
                            />
                            <Input
                                type="hidden"
                                name="id"
                                value={selectedItem?.id}
                            />
                            <Input
                                type="hidden"
                                name="caption"
                                value={selectedItem?.caption}
                            />
                        </div>
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-semibold text-neutral-800">
                                Update Image
                            </h2>
                        </div>
                        <ImageFormFields singleImage={selectedItem} type='edit' />
                        <div className="col-span-2 flex items-center justify-center gap-3 mt-6">
                            <Button
                                type="submit"
                                className="h-12 w-10/12 my-5 bg-yellow-500 hover:bg-yellow-600 text-white text-base rounded-lg"
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
            {/* Delete Modal */}
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
                        <Input
                            type="hidden"
                            name="file_key"
                            value={selectedItem?.file_key}
                        />
                    </div>
                    <div className="border-b pb-4 mb-4">
                        <h2 className="text-xl font-semibold text-neutral-800">
                            Confirm Delete
                        </h2>
                    </div>
                    <p className="text-center text-base">Are you sure you want to delete {selectedItem?.caption}?</p>
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

export default AllImageTable;
