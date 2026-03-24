import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import BlogCategoryData from "./blog-category-data";
import { getBlogCategory } from "@/app/(dashboard)/(blogs)/blogcategory/api";


const BlogCategory = async () => {
    const blogCategory = await getBlogCategory();
    return (
        <div className="w-full overflow-x-auto">
            <Table className="table-auto border-spacing-0 border-separate">
                <TableHeader>
                    <TableRow className="border-0">
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 dark:border-slate-600 overflow-hidden px-4 h-12 border-s rounded-tl-lg">
                            Sr. No
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 dark:border-slate-600 overflow-hidden px-4 h-12">
                            Title
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 dark:border-slate-600 overflow-hidden px-4 h-12">
                            Slug
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 dark:border-slate-600 overflow-hidden px-4 h-12">
                            Created Date
                        </TableHead>
                        <TableHead className="bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 dark:border-slate-600 overflow-hidden px-4 h-12 border-e rounded-tr-lg text-center">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                {/* Table Body */}
                <BlogCategoryData blogCategory={blogCategory} />
            </Table>
        </div>
    );
};

export default BlogCategory;

