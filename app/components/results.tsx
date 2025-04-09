import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { noa } from "../components/typeNoa";
import Button from "./button";

type Props = { personality: string; results: noa[] };

const Results = ({ personality, results }: Props) => {
    const persObj: noa = results.find(
        (item) =>
            item.name.trim().toLowerCase() === personality.trim().toLowerCase()
    ) ?? {
        id: 0,
        name: " ",
        CareersThatSuitYou: [],
        description: "sdfsfd",
        PotentialChallenges: [],
        powerP: [],
        show: "",
        TipsForMaintainingRelationships: [],
    };

    return (
        <div className="h-full w-full   flex flex-col justify-center items-center  ">
            <AnimatePresence mode="wait">
                <motion.div
                    className="w-[94%] h-full sm:w-[90%] lg:w-[80%]  gap-2 sm:gap-8  flex flex-col items-center pt-10 sm:pt-20 lg:pt-25 "
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -60 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl text-center w-fit p-0 sm:p-5 mb-10 text-amber-500 sm:shadow-lg rounded-lg font-bold ">
                        thank you for taking the survey✨
                    </h2>
                    <div className="flex flex-col gap-2 jcenter items-center mb-10">
                        <span>
                            <h3 className="text-2xl bg-gray-600 px-4 py-2 text-amber-100 rounded-2xl font-bold">
                                شخصيتك هي : {persObj.show}
                            </h3>
                        </span>
                    </div>

                    <div className="  border-r-8   border-amber-300 w-[90%] flex flex-col  items-end ">
                        <ul
                            dir="rtl"
                            className=" border-t-8 border-amber-300 p-3  flex justify-center items-center "
                        >
                            <li>{persObj.description}</li>
                        </ul>
                        <ul dir="rtl" className=" w-full border-t-4 p-3 ">
                            <h4 className=" text-2xl sm:text-3xl lg:text-4xl font-extrabold text-rose-500">
                                نقاط القوة
                            </h4>
                            {persObj.powerP.map((item, i) => (
                                <li
                                    className={`p-3 sm:pr-5 sm:pt-5  lg:pr-8 border-amber-200 ${
                                        i + 1 < persObj.powerP.length
                                            ? "border-b-[1px]"
                                            : "border-none"
                                    } `}
                                    key={i}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <ul dir="rtl" className=" w-full border-t-4 p-3 ">
                            <h4 className=" text-2xl sm:text-3xl lg:text-4xl font-extrabold text-rose-500">
                                التحديات المحتملة
                            </h4>
                            {persObj.PotentialChallenges.map((item, i) => (
                                <li
                                    className={`p-3 sm:pr-5 sm:pt-5  lg:pr-8 border-amber-200 ${
                                        i + 1 <
                                        persObj.PotentialChallenges.length
                                            ? "border-b-[1px]"
                                            : "border-none"
                                    } `}
                                    key={i}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <ul dir="rtl" className=" w-full border-t-4 p-3 ">
                            <h4 className=" text-2xl sm:text-3xl lg:text-4xl font-extrabold text-rose-500">
                                مهن تناسبك
                            </h4>
                            {persObj.CareersThatSuitYou.map((item, i) => (
                                <li
                                    className={`p-3 sm:pr-5 sm:pt-5  lg:pr-8 border-amber-200 ${
                                        i + 1 <
                                        persObj.CareersThatSuitYou.length
                                            ? "border-b-[1px]"
                                            : "border-none"
                                    } `}
                                    key={i}
                                >
                                    {i + 1}. {item}
                                </li>
                            ))}
                        </ul>

                        <ul dir="rtl" className=" w-full border-t-4 p-3 ">
                            <h4 className=" text-2xl sm:text-3xl lg:text-4xl font-extrabold text-rose-500">
                                نصائح للحفاظ على العلاقات
                            </h4>
                            {persObj.TipsForMaintainingRelationships.map(
                                (item, i) => (
                                    <li
                                        className={`p-3 sm:pr-5 sm:pt-5  lg:pr-8 border-amber-200 ${
                                            i + 1 <
                                            persObj
                                                .TipsForMaintainingRelationships
                                                .length
                                                ? "border-b-[1px]"
                                                : "border-none"
                                        } `}
                                        key={i}
                                    >
                                        {i + 1}. {item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className="flex w-full sm:w-1/2 items-center">
                        <Button
                            text="العودة إلى الصفحة الرئيسية"
                            rotate={true}
                        />
                        <Button text="التقدم" />
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Results;
