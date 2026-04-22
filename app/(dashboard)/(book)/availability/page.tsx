import React, { Suspense } from 'react'
import { getHistory } from '../booking/api'
import AdminAvailability from '@/components/table/AdminAvailability'

const page = async ({ searchParams }: { searchParams: { page?: string } }) => {
    const currentPage = parseInt(searchParams.page || "1") || 1;
    const booking = await getHistory(currentPage, 10)
    if (!booking) return <>No Contact</>
    return (
        <AdminAvailability />
    )
}

export default page