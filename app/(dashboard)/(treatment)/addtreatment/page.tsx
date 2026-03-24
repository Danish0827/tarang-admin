import AddTreatment from "@/components/table/add-treatment"
import { getSingleTreatment } from "./api"

const page = async ({ searchParams }: any) => {
  const dataParams = await searchParams
  const postslug = dataParams?.postslug
  const type = dataParams?.type
  const treatment = await getSingleTreatment(postslug)
  return (
    <AddTreatment singleData={treatment.treatment} type={type} />
  )
}

export default page
