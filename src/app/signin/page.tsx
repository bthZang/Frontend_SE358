import Button from "@/components/Button/Button";
import { Metadata } from "next";

export default function Page() {
	return (
		<>
			<Button fill={false}>
				Sign in
			</Button>
			<Button fill={false}>
				Sign in
			</Button>
		</>
	);
}

export const metadata: Metadata = {
	title: "Sign in to ESMS",
	description: "Electronic Store Management System",
};