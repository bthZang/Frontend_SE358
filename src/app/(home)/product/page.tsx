"use client";

import { HiPlus } from "react-icons/hi";

import viewProductList from "@/api/product/viewProductList.api";
import Button from "@/components/Button/Button";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import { useCreateProductModal } from "@/components/CreateProductForm/CreateProductFormModal";
import DataTable from "@/components/DataTable/DataTable";
import ProductSearch from "@/components/ProductSearch/ProductSearch";
import { useUpdateProductModal } from "@/components/UpdateProductForm/UpdateProductFormModal";
import SEARCH_PARAMS from "@/constants/searchParams";
import ProductPreview from "@/types/entity/ProductPreview";
import FORMATTER from "@/utils/formatter";
import {useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

export default function Page() {
    const searchParams = useSearchParams();

    const category = searchParams.get(SEARCH_PARAMS.categoryName) || "";
    const productKeyword = searchParams.get(SEARCH_PARAMS.productName) || "";
    const price = searchParams.get(SEARCH_PARAMS.price) || "";

    const { openCreateProductModal } = useCreateProductModal();
    const { openUpdateProductModal } = useUpdateProductModal();
    const { openClaimModal } = useClaimModal();

    const { data, isLoading, refetch } = useQuery<ProductPreview[]>(
        ["products", productKeyword, category, price],
        viewProductList,
        {
            retry: false,
        },
    );


    return (
        <div className="w-full h-full flex flex-col">
            <div className=" w-full grid grid-cols-2">
                <ProductSearch className="" />
                <div className=" flex justify-end gap-8">
                    <CategoryFilter className="" />
                    <Button
                        size="sm"
                        onClick={() => openCreateProductModal(refetch)}
                    >
                        <HiPlus className=" w-4 h-4 mr-2" />
                        Add product
                    </Button>
                </div>
            </div>
            <div className=" flex gap-5 mt-5">
            </div>
            <DataTable
                data={data || []}
                isLoading={isLoading}
                className="-mr-8 pr-8 mt-4"
                onDelete={(product) => {
                }}
                onEdit={(product) => {
                    openUpdateProductModal(product.id, refetch);
                }}
                pick={{
                    name: { title: "Name" },
                    category: { title: "Category" },
                    price: {
                        title: "Price",
                        className: " font-normal text-secondary-500",
                        mapper: FORMATTER.toCurrency,
                    },
                    quantity: {
                        title: "Quantity",
                        mapper: (value: number) => value || "0",
                    },
                    warrantyPeriod: {
                        title: "Warranty period",
                        mapper: (value: number) => `${value} months`,
                    },
                }}
            />
        </div>
    );
}