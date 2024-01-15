import useLoading from "@/hooks/useLoading";
import apiInstance from "../apiInstance";
import { useMutation } from "react-query";
import Category from "@/types/entity/Category";
import toast from "react-hot-toast";

export default async function deleteCategoryAPI(category?: Category) {
    if (!category?.id) throw new Error("Invalid category");

    const response = await apiInstance.delete(`/category/${category.id}`);

    return response.data;
}

export function useDeleteCategoryMutation(refetch: () => any) {
    const { openLoading, closeLoading } = useLoading();

    const deleteMutation = useMutation(deleteCategoryAPI, {
        onMutate: () => {
            openLoading("Deleting category...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (res, data) => {
            refetch();
            closeLoading();
        },
        onError: (error: any, data) => {
            closeLoading();
        },
    });

    return deleteMutation;
}
