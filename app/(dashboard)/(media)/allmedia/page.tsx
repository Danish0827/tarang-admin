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

const page = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) {
        redirect("/auth/login");
    }
    let user: any;
    user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
    const images = await getImages(user.user_id);
    if (!images) return <>No Images</>;
    return (
        <>
            <Card className="card h-full !p-0 !block border-0 overflow-hidden mb-6">
                <CardHeader className="border-b border-neutral-200 dark:border-slate-600 !py-4 px-6 flex items-center flex-wrap gap-3 justify-between">
                    <div className="flex items-center flex-wrap gap-3">
                        <span className="text-base font-medium text-neutral-500 dark:text-neutral-300 mb-0">Show</span>
                        <CustomSelect
                            placeholder="1"
                            options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                        />
                        <SearchBox />
                        <CustomSelect
                            placeholder="Status"
                            options={["Status", "Active", "Inactive"]}
                        />
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