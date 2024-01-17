"use client";

import Button from "@/components/Button/Button";
import { useSearchParams } from "next/navigation";
import { HiPlus } from "react-icons/hi";
import { useQuery } from "react-query";
import Category from "@/types/entity/Category";
import SEARCH_PARAMS from "@/constants/searchParams";
import viewCategoryList from "@/api/category/viewCategoryList.api";
import { useCreateCategoryModal } from "@/components/CreateCategoryForm/CreateCategoryFormModal";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import DataTable from "@/components/DataTable/DataTable";
import CategorySearch from "@/components/CategorySearch/CategorySearch";
import { useDeleteCategoryMutation } from "@/api/category/deleteCategory.api";
import { useUpdateCategoryModal } from "@/components/UpdateCategoryForm/UpdateCategoryFormModal";
import { usePermission } from "@/hooks/usePermission";

export default function Page() {
    const searchParams = useSearchParams();

    const categoryKeyword = searchParams.get(SEARCH_PARAMS.name) || "";

    const { openCreateCategoryModal } = useCreateCategoryModal();
    const { openClaimModal } = useClaimModal();
    const { openUpdateCategoryModal } = useUpdateCategoryModal();

    const { data, isLoading, refetch } = useQuery<Category[]>(
        ["categories", categoryKeyword],
        viewCategoryList,
        {
            retry: false,
        },
    );

    const deleteCategoryMutation = useDeleteCategoryMutation(refetch);

    const isAllowedCreate = usePermission("CATEGORY", ["CREATE"]);

    return (
        <>
            <div className=" w-full grid grid-cols-2">
                <CategorySearch className="" />
                <div className=" flex justify-end gap-8">
                    {isAllowedCreate ? (
                        <Button
                            size="md"
                            onClick={() => openCreateCategoryModal(refetch)}
                        >
                            <HiPlus className=" w-4 h-4 mr-2" />
                            New category
                        </Button>
                    ) : null}
                </div>
            </div>
            <DataTable
                data={data || []}
                entityType="CATEGORY"
                isLoading={isLoading}
                onDelete={(category) => {
                    openClaimModal(
                        <>
                            Do you want to delete category{" "}
                            <span>{category.name}</span>
                        </>,
                        (confirm) =>
                            confirm && deleteCategoryMutation.mutate(category),
                    );
                }}
                onEdit={(category) => {
                    openUpdateCategoryModal(category.id, refetch);
                }}
                pick={{
                    name: { title: "Name" },
                }}
            />
        </>
    );
}