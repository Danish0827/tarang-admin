'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardBreadcrumb from '../layout/dashboard-breadcrumb';
import { Textarea } from '../ui/textarea';
import DefaultCardComponent from '@/app/(dashboard)/components/default-card-component';
import { Select } from 'antd';
import Tiptap from "@/app/(dashboard)/(components)/Tiptap";
import { UploadDropzone } from "@/lib/uploadthing";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import FAQRepeater from "./faq-repeater";
import { userVerify } from "@/lib/api";
import Image from "next/image";
import { handleBlogAction } from '@/app/(dashboard)/(blogs)/blogpost/actions';
interface FAQ {
    question: string;
    answer: string;
}
const AddBlog = ({ blogCategory, singleBlog, type }: any) => {
    const getFileKeyFromUrl = (url: string) => {
        if (!url) return "";

        const parts = url.split("/f/");
        return parts[1] || "";
    };
    const [content, setContent] = useState(singleBlog?.content || "");
    const [imageUrl, setImageUrl] = useState<string | null>(singleBlog?.featured_image || "");
    const imagefileKey = getFileKeyFromUrl(singleBlog?.featured_image);
    // console.log(imagefileKey);
    
    const [fileKey, setFileKey] = useState<string | null>(imagefileKey);

    const [categories, setCategories] = useState<number[]>(
        singleBlog?.categories?.map((c: any) => c.id) || []
    );

    const [faqs, setFaqs] = useState<FAQ[]>([
        { question: "", answer: "" }
    ]);

   useEffect(() => {
  let parsed: FAQ[] = [];

  try {
    parsed =
      typeof singleBlog?.faqs === "string"
        ? JSON.parse(singleBlog.faqs)
        : singleBlog?.faqs || [];
  } catch {
    parsed = [];
  }

  setFaqs(
    parsed.length > 0
      ? parsed
      : [{ question: "", answer: "" }]
  );
}, [singleBlog, type]);

    const [status, setStatus] = useState(singleBlog?.status || "published");
    const [user, setUser] = useState<any>(null);

    const options = blogCategory.map((item: any) => ({
        value: item.id,
        label: item.name,
    }));

    // ✅ USER FETCH FIX
    useEffect(() => {
        const getUser = async () => {
            const data = await userVerify(user);
            setUser(data);
        };
        getUser();
    }, []);

    // ✅ RESET FOR ADD
    useEffect(() => {
        if (type !== "edit") {
            setImageUrl(null);
            setFileKey(null);
            setCategories([]);
            setFaqs([]);
        }
    }, [type]);

    // ✅ ACTION
    // const [state, formAction] = useActionState(handleBlogAction, {
    //     success: false,
    //     message: ""
    // });
    const [state, setState] = useState({
            success: false,
            message: ""
        });
    
        const formAction = async (formData :any
        ) => {
            const result = await handleBlogAction(formData);
            setState(result);
        };
    

    useEffect(() => {
        if (state?.message) {
            if (state.success) {
                toast.success(state.message);

                setContent("");
                setImageUrl(null);
                setCategories([]);
                setFaqs([]);
                setStatus("published");

            } else {
                toast.error(state.message);
            }
        }
    }, [state]);
    console.log(singleBlog, "singleBlogsingleBlogsingleBlog");

    return (
        <>
            <DashboardBreadcrumb
                title={`${type === 'edit' ? 'Edit Blog' : 'Add Blog'}`}
                text="Blog"
            />

            <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        await formAction(formData);
                    }}
                >
                <Input type="hidden" name="action" value={type === 'edit' ? 'edit' : 'add'} />
                <Input type="hidden" name="id" value={singleBlog?.id || ""} />
                <Input type="hidden" name="category_ids" value={JSON.stringify(categories)} />
                <Input type="hidden" name="faqs" value={JSON.stringify(faqs)} />
                <Input type="hidden" name="content" value={content} />
                <Input type="hidden" name="featured_image" value={imageUrl || ""} />
                <Input type="hidden" name="status" value={status} />
                <DefaultCardComponent title="Meta Details">
                    <div className="grid md:grid-cols-2 gap-5">
                        <Textarea disabled={type === 'view'} className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-24 rounded-lg !shadow-none !ring-0" name="meta_title" defaultValue={singleBlog?.meta_title || ""} placeholder="Meta Title" />
                        <Textarea disabled={type === 'view'} className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-24 rounded-lg !shadow-none !ring-0" name="meta_description" defaultValue={singleBlog?.meta_description || ""} placeholder="Meta Description" />
                        <Input disabled={type === 'view'} className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" name="meta_keywords" defaultValue={singleBlog?.meta_keywords || ""} placeholder="Keywords" />
                        <Input disabled={type === 'view'} className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" name="canonical_url" defaultValue={singleBlog?.canonical_url || ""} placeholder="Canonical URL" />
                    </div>
                </DefaultCardComponent>
                <DefaultCardComponent title="Blog Data">
                    <div className="lg:grid md:grid-cols-2 2xl:grid-cols-3 gap-5">
                        <Input disabled={type === 'view'} className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" name="title" defaultValue={singleBlog?.title || ""} placeholder="Title" />
                        <Input disabled={type === 'view'} className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" name="slug" defaultValue={singleBlog?.slug || ""} placeholder="Slug" />
                        <Input disabled={type === 'view'} className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" name="author_name" defaultValue={singleBlog?.author_name || user?.user_name || ""} placeholder="Author" />
                        <Select
                            mode="multiple"
                            disabled={type === 'view'}
                            value={categories}
                            onChange={(val) => setCategories(val)}
                            options={options}
                            style={{ width: "100%", marginBottom: 20 }}
                            className="!border !bg-white dark:!bg-[#273141] placeholder:!text-gray-800 dark:placeholder:!text-gray-300 border-neutral-300 dark:!border-slate-500 !px-2 !items-center !dark:border-slate-500 !focus:border-primary !dark:focus:border-primary !focus-visible:border-primary !h-12 !rounded-lg !shadow-none !ring-0"
                        />
                        <Select
                            value={status}
                            disabled={type === 'view'}
                            onChange={(val) => setStatus(val)}
                            options={[
                                { value: "draft", label: "Draft" },
                                { value: "published", label: "Published" },
                            ]}
                            style={{ width: "100%", marginBottom: 20 }}
                            className="!border !bg-white dark:!bg-[#273141] placeholder:!text-gray-800 dark:placeholder:!text-gray-300 border-neutral-300 dark:!border-slate-500 !px-2 !items-center !dark:border-slate-500 !focus:border-primary !dark:focus:border-primary !focus-visible:border-primary !h-12 !rounded-lg !shadow-none !ring-0"
                        />
                    </div>
                    <div className={`lg:grid md:grid-cols-[50%_45%]  gap-5 items-center mb-5`}>
                        {!imageUrl && <UploadDropzone
                            endpoint="imageUploader"
                            disabled={type === 'view'}
                            onClientUploadComplete={(res) => {
                                setImageUrl(res[0].ufsUrl);
                                setFileKey(res[0].key);
                            }}
                        />}
                        {imageUrl && (
                            <div className="mb-0 border-2 border-blue-400 rounded-3xl">
                                <div className="relative h-60 w-full  rounded-3xl">
                                    <Image
                                        src={imageUrl}
                                        alt="Uploaded"
                                        width={600}
                                        height={600}
                                        className="h-60 w-full overflow-hidden rounded-3xl object-cover"
                                    />
                                    <button
                                        onClick={async (e) => {
                                            e.preventDefault()
                                            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/${fileKey}`, {
                                                method: "DELETE",
                                                headers: { "Content-Type": "application/json" }
                                            });

                                            setImageUrl(null);
                                            setFileKey(null);
                                        }}
                                        className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-sm rounded cursor-pointer duration-500 hover:scale-105"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="space-y-4">
                            <Input className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-12 rounded-lg !shadow-none !ring-0" disabled={type === 'view'} name="featured_image_alt" defaultValue={singleBlog?.featured_image_alt || ""} placeholder="Image Alt" />
                            <Textarea className="border border-neutral-300 px-5 dark:border-slate-500 focus:border-primary dark:focus:border-primary focus-visible:border-primary h-28 rounded-lg !shadow-none !ring-0" disabled={type === 'view'} name="short_description" defaultValue={singleBlog?.short_description || ""} placeholder="Short Description" />
                        </div>
                    </div>
                    <div className="mb-5">
                    <Tiptap
                        content={singleBlog?.content || ""}
                        onChange={(value) => {
                            setContent(value);
                            console.log("Editor Content:", value); // 🔥 yaha log karo
                        }}
                        // type={type}
                    />
                    </div>
                     </DefaultCardComponent>
                <DefaultCardComponent title="FAQs">
                    <FAQRepeater faqs={faqs} setFaqs={setFaqs} type={type} />
                </DefaultCardComponent>
                <Button type="submit">
                    {type === "edit" ? "Update Blog" : "Add Blog"}
                </Button>
            </form>
        </>
    );
};

export default AddBlog;