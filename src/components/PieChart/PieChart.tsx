"use client";

import { viewWeekCategory } from "@/api/statistic/category";
import FONT from "@/utils/fontFamily";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "react-query";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    interaction: {
        intersect: false,
    },
    cutout: "75%",
    borderWidth: 0,
    plugins: {
        legend: {
            position: "bottom" as const,
            align: "center" as const,
            labels: {
                pointStyle: "circle" as const,
                usePointStyle: true,
                font: {
                    size: 14,
                    weight: "normal",
                },
            },
        },
        title: {
            display: false,
            text: "",
        },
    },
    scales: {},
};

const font = FONT.primary;

export default function CategoryPieChart({ title }: { title: string }) {
    const { data: categories } = useQuery(
        ["statistic-categories"],
        viewWeekCategory,
    );

    console.log({ categories });

    const now = new Date();

    const labels =
        categories
            ?.map((value) => {
                return value.name;
            })
            .reverse() || [];

    const data = {
        labels,
        datasets: [
            {
                label: "Revenue",
                data: categories
                    ?.slice(0, 4)
                    .map((value) => value.revenue || 0),
                borderColor: "#FFCB1B",
                backgroundColor: ["#FFCB1B", "#FFCB1B", "#FFCB1B", "#FFCB1B"],
                hoverOffset: 8,
            },
        ],
    };

    return (
        <>
            <div className=" w-full flex justify">
                <p className={` font-semibold text-lg ${font.className}`}>
                    {title}
                </p>
                <div></div>
            </div>
            <div className=" relative mt-10 px-8 my-5">
                <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3">
                    <p className=" text-secondary-950 font-semibold text-3xl text-center">
                        {`${(
                            (categories?.reduce(
                                (total, value) => total + (value.revenue || 0),
                                0,
                            ) || 0) / 1_000_000
                        ).toFixed(1)}m`}
                    </p>
                    <p className=" text-secondary-400 text-center">
                        total revenue
                    </p>
                </div>
                {
                    //@ts-ignore
                    <Doughnut options={options} data={data} />
                }
            </div>
        </>
    );
}