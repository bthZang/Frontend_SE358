import SideBar from "@/components/sidebar/Sidebar";
import API from "@/constants/apiEndpoint";
import COOKIE_NAME from "@/constants/cookies";
import SEARCH_PARAMS from "@/constants/searchParams";
import { ModalProvider } from "@/contexts/ModalContext";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import Staff from "@/types/entity/Staff";
import withQuery from "@/utils/withQuery";
import {
    EntityType,
    PermissionType,
    PermissionTypeList,
} from "@/types/entity/PermissionResponse";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: ReactNodeChildren) {
    const myHeaders = new Headers();
    const accessToken = cookies().get("accessToken")?.value || "";
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const redirectURI = headers().get(COOKIE_NAME.XURL) || "";

    const staffInfoResponse = await fetch(API.staff.getStaffProfile, {
        headers: myHeaders,
    });

    if (staffInfoResponse.status !== 200)
        redirect(
            withQuery("/signin", {
                [SEARCH_PARAMS.redirectUri]: redirectURI,
            }),
        );

    const staffInfo: Staff = await staffInfoResponse.json();

    return (
        <ModalProvider>
            <div className=" w-screen h-screen flex">
                <div className=" w-max z-50">
                    <SideBar staffInfo={staffInfo} />
                </div>
                <div className=" py-8 pl-10 pr-8 w-full h-screen flex flex-col bg-background-normal overflow-hidden">
                    {children}
                </div>
            </div>
        </ModalProvider>
    );
}
const PageEntityType = {
    category: { type: "CATEGORY", permissions: PermissionTypeList },
    supplier: { type: "SUPPLIER", permissions: PermissionTypeList },
    staff: { type: "STAFF", permissions: PermissionTypeList },
    import: { type: "IMPORT_BILL", permissions: ["CREATE"] },
    import_bill: { type: "IMPORT_BILL", permissions: PermissionTypeList },
    sale: { type: "SALE_BILL", permissions: ["CREATE"] },
}