"use client";
import { setCookie } from "cookies-next";
import Image from "next/image";
import LOGO from "@/assets/logo.png"

import Button from "@/components/Button/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import Link from "@/components/Typography/Link";
import API from "@/constants/apiEndpoint";
import { publicFetcher } from "@/hooks/usePublicRoute";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowRight, HiMail } from "react-icons/hi";

import ControllerTextInput from "@/components/ControllerInput/ControllerTextInput";
import SEARCH_PARAMS from "@/constants/searchParams";
import { Yesteryear } from "next/font/google";

const yesteryear = Yesteryear({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export default function SignIn() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        setError,
        clearErrors,
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        const email = data.username;
        const password = data.password;

        setIsLoading(true);
        const res = await publicFetcher(API.authentication.signIn, "POST", {
            email,
            password,
        });

        if (res.status === 200) {
            const token = await res.json();
            setCookie("accessToken", token.access_token);
            setCookie("refreshToken", token.refresh_token);
            router.push(
                decodeURI(searchParams.get(SEARCH_PARAMS.redirectUri) || "/"),
            );
        } else {
            setValue("username", "");
            setValue("password", "");
            setError("root", { message: "Email or password is invalid" });
        }
        setIsLoading(false);
    };

    return (
        <div
            className=" h-screen grid place-items-center"
            style={{
                background:
                    "linear-gradient(106deg, rgba(236, 227, 206, 0.21) 12.98%, #739072 71.82%, #4F6F52 100%)",
            }}
        >
            <div className=" w-max min-w-[550px] rounded-3xl bg-white grid place-items-center">
                <div className=" w-full px-20 py-16">
                    <div className="relative w-fit mx-auto">
                        <Image
                            className="absolute top-0 -left-10"
                            src={LOGO}
                            width={30}
                            height={30}
                            alt="logo"
                        />
                        <h1 className=" mb-14 text-3xl text-center font-semibold text-secondary-900">
                            Electronic Store
                        </h1>
                        <p
                            className={`absolute right-16 top-5 translate-x-full text-4xl ${yesteryear.className}`}
                            style={{
                                background:
                                    "linear-gradient(90deg, #16B6FA 0%, #DC02FF 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Management
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ControllerTextInput
                            control={control}
                            name="username"
                            title="Email"
                            rules={{
                                required: "Email is required",
                                validate: (value: any) => {
                                    const regex =
                                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                                    if (!regex.test(value)) {
                                        return "You must type email here";
                                    }
                                },
                            }}
                            icon={HiMail}
                            register={register}
                            placeholder="yourmail@gmail.com"
                            onValueChange={(d: any) => {
                                clearErrors("username");
                            }}
                            error={errors.username}
                        />
                        <ControllerTextInput
                            control={control}
                            type="password"
                            name="password"
                            title="Password"
                            rules={{ required: "Password is required" }}
                            register={register}
                            placeholder="Enter your password"
                            onValueChange={(d: any) => {
                                clearErrors("password");
                            }}
                            error={errors.password}
                        />
                        {errors.root && (
                            <p className="mt-3 text-sm text-center text-error-500">
                                {errors.root.message}
                            </p>
                        )}
                        <div className=" w-full flex justify-between items-center mt-5">
                            <CheckBox id="remember me">Remember me</CheckBox>
                            <Link>Forgot password</Link>
                        </div>
                        <Button
                            type="submit"
                            className=" mt-8 w-full"
                            isLoading={isLoading}
                        >
                            <p className=" mr-2">Go to Store</p>{" "}
                            <HiArrowRight />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

type FormValues = {
    username: string;
    password: string;
};
