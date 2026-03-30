import { Card, CardContent, CardHeader } from '@/components/ui/card'
import CustomSelect from '@/components/shared/custom-select'
import SearchBox from '@/components/shared/search-box'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import jwt from "jsonwebtoken";
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import AllImageTable from '@/components/table/image-table'
import { getImages } from './api'
import { useUser } from '@/lib/user-context'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PageSelect from '@/components/table/PageSelect'

const page = async ({ searchParams }: { searchParams: { page?: string } }) => {
    const currentPage = parseInt(searchParams.page || "1");
    const images = await getImages(currentPage, 10);
    // console.log(images, "imagesimagesimagesimagesimagesimagesimagesimagesimagesimages");
    if (!images) return <>No Images</>;
    return (
        <>
            <Card className="card h-full !p-0 !block border-0 overflow-hidden mb-6">
                <CardHeader className="border-b border-neutral-200 dark:border-slate-600 !py-4 px-6 flex items-center flex-wrap gap-3 justify-between">
                    <div className="flex items-center flex-wrap gap-3">
                        <span className="text-base font-medium text-neutral-500 dark:text-neutral-300 mb-0">Show</span>
                        <PageSelect
                            currentPage={currentPage}
                            totalPages={images.totalPages}
                        />
                        {/* <SearchBox />
                        <CustomSelect
                            placeholder="Status"
                            options={["Status", "Active", "Inactive"]}
                        /> */}
                    </div>
                    <Button className={cn(`w-auto h-11`)} asChild>
                        <Link href="/upload">
                            <Plus className="w-5 h-5" />
                            Add New Media
                        </Link>
                    </Button>
                </CardHeader>

                <CardContent className="card-body p-6">
                    <AllImageTable images={images} />
                </CardContent>
            </Card>
        </>
    )
}

export default page