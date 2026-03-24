import React, { Suspense } from 'react'
import DefaultCardComponent from '../../components/default-card-component'
import LoadingSkeleton from '@/components/loading-skeleton'
import AllBlogTable from '@/components/table/blog-table'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import CustomSelect from '@/components/shared/custom-select'
import SearchBox from '@/components/shared/search-box'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getContact } from './api'
import AllContactTable from '@/components/table/contact-table'

const page = async () => {
    const contact = await getContact()
    console.log(contact,"contactcontactcontact");
    
    if (!contact) return <>No Contact</>
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
                        <Link href="/blogpost">
                            <Plus className="w-5 h-5" />
                            Add New Blog
                        </Link>
                    </Button>
                </CardHeader>

                <CardContent className="card-body p-6">
                    <AllContactTable contact={contact} />
                </CardContent>
            </Card>
        </>
    )
}

export default page