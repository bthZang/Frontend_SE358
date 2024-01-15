import { Label } from "flowbite-react";
import React from "react"
import FONT from "../../utils/fontFamily";
import Button from "../Button/Button";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import ControllerTextarea from "../ControllerTextarea/ControllerTextarea";

export default function CreateCustomerFormUI({  
    className,
    ...props
}: PropTypes) {


    return (
        <div
            className={` w-full bg-background-normal rounded-2xl p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold ${FONT.primary.className}`}
            >
                Add Customer
            </h1>
            <form>
                <div className=" grid grid-cols-1 gap-5 mt-5">
                    <ControllerTextInput
                        control=""
                        name="name"
                        title="Name"
                        rules={{ required: "Name is required" }}
                        register=""
                        placeholder="Enter Customer name..."
                        onValueChange={(d: any) => {
                           
                        }}
                        error=""
                    />
                    <ControllerTextInput
                        control=""
                        name="phone"
                        title="Phone"
                        rules={{ required: "Phone is required" }}
                        register=""
                        placeholder="Enter Customer phone..."
                        onValueChange={(d: any) => {
                            
                        }}
                        error=""
                    />
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="address" value="Address" />
                        </div>
                        <ControllerTextarea
                            id="address"
                            rows={4}
                            placeholder="Leave your address here..."
                            control=""
                            name="address"
                            title="Address"
                            rules={{ required: "Address is required" }}
                            register=""
                            onValueChange={(d: any) => {
                               
                            }}
                            error=""
                        />
                    </div>
                </div>
                <div className=" flex justify-between mt-12">
                    <Button btnType="secondary" onClick={() => close()}>
                        Back
                    </Button>
                    <Button type="submit">Create Customer</Button>
                </div>
            </form>
        </div>
    );
}

type PropTypes = React.ComponentPropsWithoutRef<"div"> & {
    
};