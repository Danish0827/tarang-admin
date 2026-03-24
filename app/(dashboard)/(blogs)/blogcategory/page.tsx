import React, { Suspense } from 'react'
import DefaultCardComponent from '../../components/default-card-component'
import LoadingSkeleton from '@/components/loading-skeleton'
import { Input } from '@/components/ui/input'
import BlogCategory from '@/components/table/blog-category'
import { Button } from '@/components/ui/button'
import { handleBlogCategoryAction } from './actions'
import BlogCategoryFields from '@/components/shared/BlogCategoryFields'

const page = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <BlogCategoryFields setModalType={null} type='add' selectedItem={null} />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <DefaultCardComponent title="All Categories">
            {/* <Suspense fallback={<LoadingSkeleton />}> */}
            <BlogCategory />
            {/* </Suspense> */}
          </DefaultCardComponent>
        </div>
      </div>
    </>
  )
}

export default page