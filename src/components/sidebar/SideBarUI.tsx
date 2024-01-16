"use client";

import { Avatar, CustomFlowbiteTheme, Dropdown, Sidebar } from "flowbite-react";
import Image from "next/image";
import {
    HiBookmark,
    HiChartPie,
    HiChevronLeft,
    HiClipboardCheck,
    HiDocumentSearch,
    HiSave,
    HiShoppingBag,
    HiUserGroup,
} from "react-icons/hi";
import { PiTruckDuotone } from "react-icons/pi";
import { AiFillCustomerService } from "react-icons/ai";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { RiToolsLine } from "react-icons/ri";

import COOKIE_NAME from "@/constants/cookies";
import Staff from "@/types/entity/Staff";
import { deleteCookie, setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import LOGO from "../../assets/logo.png";
import FONT from "../../utils/fontFamily";

export default function SideBarUI({
    staffInfo,
    isCollapse: _isCollapse,
}: PropTypes) {
    const router = useRouter();
    const pathname = usePathname();
    const routeName = (pathname.split("/").at(1) || "") + "/";

    const [isCollapse, setIsCollapse] = useState(_isCollapse);

    useEffect(() => {
        setCookie(COOKIE_NAME.SIDE_BAR_COLLAPSE, isCollapse);
    }, [isCollapse]);

    return (
        <div className=" relative h-full">
            <Sidebar
                theme={sideBarTheme}
                collapsed={isCollapse}
                aria-label="Sidebar with multi-level dropdown example"
                className=" relative z-0"
            >
                <div className=" flex gap-2 pl-1 pt-2 mb-12">
                    <Image src={LOGO} width={30} height={30} alt="logo" />
                    <h1
                        className={` ml-3 text-2xl text-secondary-950 font-semibold ${FONT.inter.className}`}
                    >
                        ESMS
                    </h1>
                </div>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            theme={sideBarTheme?.item}
                            active={routeName === ROUTES.home}
                            href={ROUTES.home}
                            icon={HiChartPie}
                        >
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Collapse
                            theme={sideBarTheme?.collapse}
                            href={isCollapse ? ROUTES.product : ""}
                            open={
                                [ROUTES.category, ROUTES.product].includes(
                                    routeName,
                                ) && !isCollapse
                            }
                            icon={HiShoppingBag}
                            label="Product"
                        >
                            <Sidebar.Item
                                active={routeName === ROUTES.product}
                                theme={sideBarCollapsedItemTheme?.item}
                                href={ROUTES.product}
                                icon={HiDocumentSearch}
                            >
                                Product List
                            </Sidebar.Item>
                            <Sidebar.Item
                                active={routeName === ROUTES.category}
                                theme={sideBarCollapsedItemTheme?.item}
                                href={ROUTES.category}
                                icon={HiBookmark}
                            >
                                Category
                            </Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Item
                            active={routeName === ROUTES.supplier}
                            theme={sideBarCollapsedItemTheme?.item}
                            href={ROUTES.supplier}
                            icon={PiTruckDuotone}
                        >
                            Supplier
                        </Sidebar.Item>
                        <Sidebar.Item
                            active={routeName === ROUTES.customer}
                            theme={sideBarCollapsedItemTheme?.item}
                            href={ROUTES.customer}
                            icon={AiFillCustomerService}
                        >
                            Customer
                        </Sidebar.Item>
                        <Sidebar.Item
                            active={routeName === ROUTES.staff}
                            theme={sideBarCollapsedItemTheme?.item}
                            href={ROUTES.staff}
                            icon={HiUserGroup}
                        >
                            Staff
                        </Sidebar.Item>
                        <Sidebar.Collapse
                            theme={sideBarTheme?.collapse}
                            href={isCollapse ? ROUTES.import : ""}
                            open={
                                [ROUTES.category, ROUTES.import].includes(
                                    routeName,
                                ) && !isCollapse
                            }
                            icon={HiClipboardCheck}
                            label="Import"
                        >
                            <Sidebar.Item
                                active={routeName === ROUTES.import_bill}
                                theme={sideBarCollapsedItemTheme?.item}
                                href={ROUTES.import_bill}
                                icon={LiaFileInvoiceDollarSolid}
                            >
                                Invoices
                            </Sidebar.Item>
                            <Sidebar.Item
                                active={routeName === ROUTES.import}
                                theme={sideBarCollapsedItemTheme?.item}
                                href={ROUTES.import}
                                icon={HiSave}
                            >
                                Import goods
                            </Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Collapse
                            theme={sideBarTheme?.collapse}
                            href={isCollapse ? ROUTES.sale : ""}
                            open={
                                [ROUTES.sale_invoice, ROUTES.sale].includes(
                                    routeName,
                                ) && !isCollapse
                            }
                            icon={MdOutlineCurrencyExchange}
                            label="Export"
                        >
                            <Sidebar.Item
                                active={routeName === ROUTES.sale_invoice}
                                theme={sideBarCollapsedItemTheme?.item}
                                href={ROUTES.sale_invoice}
                                icon={LiaFileInvoiceDollarSolid}
                            >
                                Invoices
                            </Sidebar.Item>
                            <Sidebar.Item
                                active={routeName === ROUTES.sale}
                                theme={sideBarCollapsedItemTheme?.item}
                                href={ROUTES.sale}
                                icon={MdOutlineCurrencyExchange}
                            >
                                Export
                            </Sidebar.Item>
                        </Sidebar.Collapse>{" "}
                        <Sidebar.Collapse
                            theme={sideBarTheme?.collapse}
                            href={isCollapse ? ROUTES.warranty : ""}
                            open={
                                [
                                    ROUTES.warranty_invoice,
                                    ROUTES.warranty,
                                ].includes(routeName) && !isCollapse
                            }
                            icon={RiToolsLine}
                            label="Warranty"
                        >
                            <Sidebar.Item
                                active={routeName === ROUTES.warranty_invoice}
                                theme={sideBarCollapsedItemTheme?.item}
                                href={ROUTES.warranty_invoice}
                                icon={LiaFileInvoiceDollarSolid}
                            >
                                Invoices
                            </Sidebar.Item>
                            <Sidebar.Item
                                active={routeName === ROUTES.warranty}
                                theme={sideBarCollapsedItemTheme?.item}
                                href={ROUTES.warranty}
                                icon={RiToolsLine}
                            >
                                Warranty
                            </Sidebar.Item>
                        </Sidebar.Collapse>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
                <div className="absolute w-full left-0 bottom-5 bg-transparent">
                    {isCollapse ? (
                        <Avatar
                            className="p-2 flex rounded-lg hover:bg-background-hover cursor-pointer "
                            rounded
                            onClick={() => setIsCollapse(false)}
                            placeholderInitials={staffInfo.name
                                .split(" ")
                                .slice(-2)
                                .map((word) => word[0])
                                .join("")}
                        ></Avatar>
                    ) : (
                        <div className="mx-4 ">
                            <Dropdown
                                label={
                                    <Avatar
                                        className="p-2 flex rounded-lg hover:bg-background-hover cursor-pointer "
                                        rounded
                                        placeholderInitials={staffInfo.name
                                            .split(" ")
                                            .slice(-2)
                                            .map((word) => word[0])
                                            .join("")}
                                    >
                                        <div>
                                            <p className=" font-semibold text-start text-secondary-950 text-sm">
                                                {staffInfo.name}
                                            </p>
                                            <p className=" font-normal text-start text-secondary-600 text-sm">
                                                {staffInfo.email}
                                            </p>
                                        </div>
                                    </Avatar>
                                }
                                arrowIcon={false}
                                inline
                            >
                                <Dropdown.Header>
                                    <p className=" font-semibold text-start text-secondary-950 text-sm">
                                        {staffInfo.name}
                                    </p>
                                    <p className=" font-normal text-start text-secondary-600 text-sm">
                                        {staffInfo.email}
                                    </p>
                                </Dropdown.Header>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                                <Dropdown.Item>Settings</Dropdown.Item>
                                <Dropdown.Item>Earnings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    onClick={() => {
                                        localStorage.setItem("token", "");
                                        deleteCookie(COOKIE_NAME.ACCESS_TOKEN);
                                        router.push("/signin");
                                    }}
                                >
                                    Sign out
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    )}
                </div>
            </Sidebar>
            <button
                onClick={() => setIsCollapse(!isCollapse)}
                className=" absolute rounded-full border-secondary-300 border-2 p-1 top-16 right-0 translate-x-1/2 bg-background-normal hover:bg-background-hover active:bg-background-active"
            >
                <HiChevronLeft
                    className={` z-10 text-secondary-300 w-5 h-5 ${isCollapse ? " rotate-180" : ""
                        }`}
                />
            </button>
        </div>
    );
}

const ROUTES = {
    home: "/home",
    product: "/product",
    supplier: "/supplier",
    category: "/category",
    staff: "/staff",
    import_bill: "/import_bill",
    import: "/import",
    sale_invoice: "/sale-invoice",
    sale: "/sale",
    warranty_invoice: "/warranty-invoice",
    warranty: "/warranty",
    customer: "/customer",
};

const sideBarTheme: CustomFlowbiteTheme["sidebar"] = {
    root: {
        base: "h-full border-r-[1px] border-secondary-200",
        collapsed: {
            on: "w-16",
            off: "w-64",
        },
        inner: "h-full overflow-y-auto overflow-x-hidden rounded bg-background-normal py-4 px-3",
    },
    collapse: {
        button: "group flex w-full items-center rounded-lg p-2 text-sm font-normal text-secondary-900 transition duration-75 hover:bg-primary-100",
        icon: {
            base: "h-6 w-6 text-secondary-500 transition duration-75 group-hover:text-secondary-900",
            open: {
                off: "text-secondary-600",
                on: "text-secondary-900",
            },
        },
        label: {
            base: "ml-3 flex-1 whitespace-nowrap text-left",
            icon: {
                base: "h-6 w-6 text-secondary-500 transition ease-in-out delay-0",
                open: {
                    on: "rotate-180",
                    off: "",
                },
            },
        },
        list: "space-y-2 py-2",
    },
    cta: {
        base: "mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700",
        color: {
            blue: "bg-cyan-50 dark:bg-cyan-900",
            dark: "bg-dark-50 dark:bg-dark-900",
            failure: "bg-red-50 dark:bg-red-900",
            gray: "bg-alternative-50 dark:bg-alternative-900",
            green: "bg-green-50 dark:bg-green-900",
            light: "bg-light-50 dark:bg-light-900",
            red: "bg-red-50 dark:bg-red-900",
            purple: "bg-purple-50 dark:bg-purple-900",
            success: "bg-green-50 dark:bg-green-900",
            yellow: "bg-yellow-50 dark:bg-yellow-900",
            warning: "bg-yellow-50 dark:bg-yellow-900",
        },
    },
    item: {
        base: "flex items-center justify-center rounded-lg p-2 text-sm font-normal text-secondary-600 transition-all duration-200 hover:bg-primary-100 active:bg-primary-300 hover:text-secondary-950 hover:font-semibold ",
        active: " text-secondary-950 font-semibold bg-primary-200",
        collapsed: {
            insideCollapse: "group w-full pl-8 transition duration-200",
            noIcon: "font-bold",
        },
        content: {
            base: "px-3 flex-1 whitespace-nowrap",
        },
        icon: {
            base: "h-6 w-6 flex-shrink-0 text-secondary-600 transition duration-75 group-hover:text-secondary-950",
            active: "text-secondary-950",
        },
        label: "",
        listItem: "",
    },
    //@ts-ignore
    items: "",
    //@ts-ignore
    itemGroup:
        "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
    logo: {
        base: "mb-5 flex items-center pl-2.5",
        collapsed: {
            on: "hidden",
            off: "self-center whitespace-nowrap text-xl font-semibold dark:text-white",
        },
        img: "mr-3 h-6 sm:h-7",
    },
};

const sideBarCollapsedItemTheme: CustomFlowbiteTheme["sidebar"] = {
    item: {
        base: "flex items-center justify-center rounded-lg p-2 text-sm font-normal text-secondary-600 transition-all duration-200 hover:bg-primary-100 active:bg-primary-300 ",
        active: " text-primary-500 underline underline-offset-4 font-medium",
        collapsed: {
            insideCollapse: "group w-full pl-8 transition duration-200",
            noIcon: "font-bold",
        },
        content: {
            base: "px-3 flex-1 whitespace-nowrap",
        },
        icon: {
            base: "h-6 w-6 flex-shrink-0 text-secondary-600 transition duration-75 group-hover:text-secondary-950",
            active: "text-secondary-950",
        },
        label: "",
        listItem: "",
    },
};

type PropTypes = {
    isCollapse: boolean;
    staffInfo: Staff;
};
