"use client";
import { useActionState, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { handleBlogCategoryAction } from "@/app/(dashboard)/(blogs)/blogcategory/actions";
import DefaultCardComponent from "@/app/(dashboard)/components/default-card-component";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

interface categoryData {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
}
type ModalType = "delete" | "view" | "edit" | null;

interface Props {
    type: string;
    selectedItem: categoryData | null;
    setModalType?: ((value: "view" | "edit" | "delete" | null) => void) | null;
}
export default function BlogCategoryFields({
    type,
    selectedItem,
    setModalType,
}: Props) {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [slugEdited, setSlugEdited] = useState(false);

    useEffect(() => {
        if (selectedItem) {
            setTitle(selectedItem.name || "");
            setSlug(selectedItem.slug || "");
            setDescription(selectedItem.description || "");
        }
    }, [selectedItem]);
    const generateSlug = (value: string) => {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);

        if (!slugEdited) {
            setSlug(generateSlug(value));
        }
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlug(e.target.value);
        setSlugEdited(true);
    };
    const [state, setState] = useState({
        success: false,
        message: ""
    });

    const formAction = async (formData: any) => {
        const result = await handleBlogCategoryAction(formData);
        setState(result);
    };

    useEffect(() => {
        if (state?.message) {
            if (state.success) {
                toast.success(state.message);
                setModalType?.(null)
                setTitle("");
                setSlug("");
                setDescription("");
            } else {
                toast.error(state.message);
            }
        }
    }, [state]);
    return (
        <>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    await formAction(formData);
                }}
            >
                <DefaultCardComponent title={`${type} Category`}>
                    <div className="grid gap-x-5">
                        <Input
                            type="hidden"
                            name="action"
                            value={type}
                        />
                        <Input
                            type="hidden"
                            name="id"
                            value={selectedItem?.id}
                        />
                        <div className="mb-5">
                            <Label className="text-sm font-semibold mb-2 block">
                                Title <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleTitleChange}
                                className="border px-5 h-12 rounded-lg"
                            />
                        </div>
                        <div className="mb-5">
                            <Label className="text-sm font-semibold mb-2 block">
                                Slug <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                type="text"
                                name="slug"
                                value={slug}
                                onChange={handleSlugChange}
                                className="border px-5 h-12 rounded-lg"
                            />
                        </div>
                        <div className="mb-5">
                            <Label className="text-sm font-semibold mb-2 block">
                                Description
                            </Label>
                            <Textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border px-5 h-24 rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center gap-3">
                        <Button
                            type="submit"
                            className="h-12 w-40 bg-neutral-900 hover:bg-neutral-700 capitalize text-white text-base rounded-lg"
                        >
                            {type}
                        </Button>
                    </div>
                </DefaultCardComponent>
            </form>
        </>
    );
}
