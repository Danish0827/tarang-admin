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
import { getAllTreatments } from '../addtreatment/api'
import AllTreatmentTable from '@/components/table/treatment-table'
import PageSelect from '@/components/table/PageSelect'

const page = async ({ searchParams }: { searchParams: { page?: string } }) => {
    const currentPage = parseInt(searchParams.page || "1") || 1;

    const treatment = await getAllTreatments(currentPage, 10)
    if (!treatment) return <>No Blog</>
    return (
        <>
            <Card className="card h-full !p-0 !block border-0 overflow-hidden mb-6">
                <CardHeader className="border-b border-neutral-200 dark:border-slate-600 !py-4 px-6 flex items-center flex-wrap gap-3 justify-between">
                    <div className="flex items-center flex-wrap gap-3">
                        <span className="text-base font-medium text-neutral-500 dark:text-neutral-300 mb-0">Show</span>
                        <PageSelect 
                        currentPage={currentPage}   
                        totalPages={treatment.totalPages} 
                        />
                        {/* <SearchBox />
                        <CustomSelect
                            placeholder="Status"
                            options={["Status", "Active", "Inactive"]}
                        /> */}
                    </div>
                    <Button className={cn(`w-auto h-11`)} asChild>
                        <Link href="/addtreatment">
                            <Plus className="w-5 h-5" />
                            Add New Treatment
                        </Link>
                    </Button>
                </CardHeader>

                <CardContent className="card-body p-6">
                    <AllTreatmentTable treatment={treatment.treatment} />
                </CardContent>
            </Card>
        </>
    )
}

export default page