import React, { cloneElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FONT from "../../utils/fontFamily";
import Button from "../Button/Button";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";

export default function CreateCategoryFormUI({
    className,
    ...props
}: PropTypes) {

    return (
        <div
            className={`w-full bg-background-normal rounded-2xl p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold ${FONT.primary.className}`}
            >
                Add category
            </h1>
            <form>
                <ControllerTextInput
                    control=""
                    name="name"
                    title="Name"
                    rules={{ required: "Name is required" }}
                    register=""
                    placeholder="BOYALINK"
                    onValueChange={(d: any) => {
                        
                    }}
                    error= " "
                />

                <div className="flex justify-between mt-8">
                    <Button
                        btnType="secondary"
                        onClick={() => close()}
                    >
                        Back
                    </Button>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </div>
    );
}

type PropTypes = React.ComponentPropsWithoutRef<"div"> & {
};