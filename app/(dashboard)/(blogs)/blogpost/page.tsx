import AddBlog from '@/components/table/add-blog'
import { getBlogCategory } from '../blogcategory/api';
import { getSingleBlog } from './api';

const page = async ({ searchParams }:any) => {
 const dataParams = await searchParams
  const postslug = dataParams?.postslug
  const type = dataParams?.type

  // console.log("Slug:", postslug)
  // console.log("Type:", type)
  const blogCategory = await getBlogCategory();
  const singleBlog = await getSingleBlog(postslug)
  return (
    <AddBlog blogCategory={blogCategory} singleBlog={singleBlog} type={type}/>
  )
}

export default page