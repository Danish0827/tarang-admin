'use client'
import { useActionState, useEffect, useState } from "react";
import { Modal } from "antd";
import { TableBody, TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { handleBlogCategoryAction } from "@/app/(dashboard)/(blogs)/blogcategory/actions";
import DefaultCardComponent from "@/app/(dashboard)/components/default-card-component";
import BlogCategoryFields from "../shared/BlogCategoryFields";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

interface categoryData {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
}
const BlogCategoryData = ({
    blogCategory,
}: {
    blogCategory: categoryData[];
}) => {
    const [modalType, setModalType] = useState<null | "view" | "edit" | "delete">(null);
    const [selectedItem, setSelectedItem] = useState<categoryData | null>(null);
    const initialState = { success: false, message: "" };
     const [state, formAction] = useActionState(
        handleBlogCategoryAction,
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

//    console.log(blogCategory,"blogCategoryblogCategoryblogCategoryblogCategory");
   
    return (
        <>
            <TableBody>
                {blogCategory?.map((product, index) => {
                    const isLastRow = index === blogCategory.length - 1;

                    return (
                        <TableRow key={index}>
                            <TableCell className={`py-3 px-4 border-b border-neutral-200 dark:border-slate-600 first:border-s last:border-e ${isLastRow ? "rounded-bl-lg" : ""
                                }`}>{index + 1}</TableCell>

                            {/* Price Column */}
                            <TableCell
                                className={`py-3 px-4 border-b border-neutral-200 dark:border-slate-600 first:border-s last:border-e ${isLastRow ? "" : ""
                                    }`}
                            >
                                {product.name}
                            </TableCell>

                            {/* Discount Column */}
                            <TableCell
                                className={`py-3 px-4 border-b border-neutral-200 dark:border-slate-600 first:border-s last:border-e ${isLastRow ? "" : ""
                                    }`}
                            >
                                {product.slug}
                            </TableCell>

                            {/* Sold Column */}
                            <TableCell
                                className={`py-3 px-4 border-b border-neutral-200 dark:border-slate-600 first:border-s last:border-e ${isLastRow ? "" : ""
                                    }`}
                            >
                                {new Date(product.created_at).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </TableCell>

                            {/* Total Orders Column */}
                            <TableCell
                                className={`py-4 px-4 border-b text-center first:border-s last:border-e border-neutral-200 dark:border-slate-600 ${isLastRow ? "rounded-br-lg" : ""
                                    }`}
                            >
                                <div className="flex justify-center gap-2">
                                    <Button onClick={() => {
                                        setSelectedItem(product);
                                        setModalType("view");
                                    }} size="icon" variant="ghost" className="rounded-[50%] text-blue-500 bg-primary/10">
                                        <Eye className="w-5 h-5" />
                                    </Button>
                                    <Button onClick={() => {
                                        setSelectedItem(product);
                                        setModalType("edit");
                                    }} size="icon" variant="ghost" className="rounded-[50%] text-green-600 bg-green-600/10">
                                        <Edit className="w-5 h-5" />
                                    </Button>
                                    <Button onClick={() => {
                                        setSelectedItem(product);
                                        setModalType("delete");
                                    }} size="icon" variant="ghost" className="rounded-[50%] text-red-500 bg-red-500/10">
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </TableCell>
                            {/* View Modal */}

                        </TableRow>
                    );
                })}

            </TableBody>
            <Modal
                title={null}
                open={modalType === "view"}
                onCancel={() => setModalType(null)}
                centered
                footer={null}
                width={520}
            >
                <div className="space-y-5">
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold text-neutral-800">
                            Category Details
                        </h2>
                    </div>
                    <div className="space-y-3">
                        <div className="flex gap-2 items-start bg-neutral-50 rounded-lg px-4 py-3">
                            <span className="text-sm text-neutral-700 font-medium">
                                Category Name :
                            </span>
                            <span className="text-sm font-semibold text-neutral-800">
                                {selectedItem?.name}
                            </span>
                        </div>

                        <div className="flex gap-2 items-start bg-neutral-50 rounded-lg px-4 py-3">
                            <span className="text-sm text-neutral-700 font-medium">
                               Category Slug :
                            </span>
                            <span className="text-sm font-semibold text-neutral-800">
                                {selectedItem?.slug}
                            </span>
                        </div>
                        <div className="flex gap-2 items-start bg-neutral-50 rounded-lg px-4 py-3">
                            <span className="text-sm inline-block text-neutral-700 font-medium">
                                Description :
                            </span>
                            <span className="text-sm font-semibold text-neutral-800">
                                {selectedItem?.description || "-"}
                            </span>
                        </div>
                    </div>
                    <div className="border-t pt-4 flex justify-end">
                        <button
                            onClick={() => setModalType(null)}
                            className="px-5 cursor-pointer py-2 rounded-lg bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-medium transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>


            {/* Edit Modal */}
            <Modal
                title={null}
                open={modalType === "edit"}
                onCancel={() => setModalType(null)}
                centered
                footer={null}
                width={520}
                className="no-padding-modal"
            >
                <BlogCategoryFields setModalType={setModalType} type='update' selectedItem={selectedItem} />
            </Modal>

            {/* Delete Modal */}
            <Modal
                title={null}
                open={modalType === "delete"}
                onCancel={() => setModalType(null)}
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
                    <p className="text-center text-base">Are you sure you want to delete {selectedItem?.name}?</p>
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
    )
}

export default BlogCategoryData