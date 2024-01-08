import Avatar from "@/components/Avatar/Avatar";

export default async function Page({ params: { id } }: PropTypes) {
        return (
            <Avatar
                className="p-3 -mx-3 flex justify-start items-start rounded-lg hover:bg-background-hover cursor-pointer "
                rounded
                
            >
                <div>
                    <p className=" font-semibold text-start text-secondary-950 text-sm">
                       
                    </p>
                    <p className=" font-normal text-start text-secondary-600 text-sm">
                       
                    </p>
                    <p className=" font-normal text-start text-secondary-600 text-sm">
                       
                    </p>
                    <p className=" font-normal text-start text-secondary-600 text-sm">
                       
                    </p>
                </div>
            </Avatar>
        );
        return null;
    }


type PropTypes = {
    params: { id: string };
};