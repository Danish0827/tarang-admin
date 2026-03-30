"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CustomSelect from "@/components/shared/custom-select";

const PageSelect = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", value);

    router.push(`?${params.toString()}`);
  };

  const options = Array.from({ length: totalPages }, (_, i) =>
    String(i + 1)
  );

  return (
    <CustomSelect
      placeholder={String(currentPage)}
      options={options}
      onValueChange={handleChange}
    />
  );
};

export default PageSelect;