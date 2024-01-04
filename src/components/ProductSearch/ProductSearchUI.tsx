import {
    Button as ButtonFlowbite,
    CustomFlowbiteTheme,
    Dropdown,
    Spinner,
    TextInput as TextInputFlowbite,
} from "flowbite-react";
import { HiOutlineCheck } from "react-icons/hi";

import Category from "@/types/entity/Category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import SEARCH_PARAMS from "../../constants/searchParams";


export default function ProductSearchUI({
    onCategoryChange = () => {},
    onProductSearchChange = () => {},
    onCategoryDropdownClicked = () => {},
    onSearch = () => {},
    isCategoryLoading = false,
    isProductLoading = false,
    categories = [],
    ...props

}: PropTypes) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [category, setCategory] = useState<Category | undefined>();
    const productNameRef = useRef<HTMLInputElement>(null);

    useDeepCompareEffect(() => {
        onCategoryChange(category);
    }, [category]);
return (
        <div {...props}>
            <ButtonFlowbite.Group>
                <Dropdown
                    theme={dropdownTheme}
                    label={category?.name || "All"}
                    dismissOnClick={true}
                    onClick={onCategoryDropdownClicked}
                    size="sm"
                >
                    {isCategoryLoading ? (
                        <div className=" my-2 flex gap-2 justify-center items-center">
                            <Spinner size="sm" />
                            <p className=" text-sm text-secondary-900">
                                Loading...
                            </p>
                        </div>
                    ) : (
                        <>
                            {categories.map((category_) => (
                                <Dropdown.Item
                                    theme={dropdownTheme?.floating?.item}
                                    onClick={() => setCategory(category_)}
                                    key={category_.id}
                                    icon={
                                        category?.name === category_.name
                                            ? HiOutlineCheck
                                            : null
                                    }
                                >
                                    <p className=" w-full text-start">
                                        {category_.name}
                                    </p>
                                </Dropdown.Item>
                            ))}
                        </>
                    )}
                </Dropdown>
                <TextInputFlowbite
                    ref={productNameRef}
                    theme={textInputTheme}
                    defaultValue={
                        searchParams.get(SEARCH_PARAMS.productName) || ""
                    }
                    placeholder="Enter product name here..."
                    sizing="md"
                />
            </ButtonFlowbite.Group>
        </div>
    );
}

const dropdownTheme: CustomFlowbiteTheme["dropdown"] = {
   
};

const textInputTheme: CustomFlowbiteTheme["textInput"] = {
   
};

type PropTypes = React.ComponentPropsWithRef<"div"> & {
    onCategoryChange?: (category?: Category) => any;
    onProductSearchChange?: (keyword: string) => any;
    onSearch?: () => any;
    onCategoryDropdownClicked?: () => any;
    isCategoryLoading?: boolean;
    isProductLoading?: boolean;
    categories?: Category[];
};
