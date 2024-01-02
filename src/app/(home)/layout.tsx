import SideBar from "@/components/sidebar/Sidebar";
import API from "@/constants/apiEndpoint";
import COOKIE_NAME from "@/constants/cookies";
import SEARCH_PARAMS from "@/constants/searchParams";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import Staff from "@/types/entity/Staff";
import withQuery from "@/utils/withQuery";

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
        <div className=" w-screen h-screen grid grid-cols-12">
            <div className=" col-span-2 "></div>
            <div className=" col-span-2 ">
                <SideBar />
            </div>
            <div className=" col-span-10 ">{children}</div>
        </div>
    );
}