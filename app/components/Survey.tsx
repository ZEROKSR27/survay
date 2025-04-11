"use client";
import { useState } from "react";
import Welcome from "./welcome";
import Qcard from "./Qcard";

type SurveyProps = {
    setPersonality: React.Dispatch<React.SetStateAction<string>>;
    current: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export default function Survey({
    setPersonality,
    current,
    setCurrent,
}: SurveyProps) {
    const [walacem, setWelcome] = useState(true);

    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-[94%] sm:w-[90%] lg:w-[80%] gap-2 sm:gap-8 flex flex-col  justify-center">
                {walacem ? (
                    <div className=" w-full h-full flex justify-center items-center ">
                        <Welcome SetWelcome={setWelcome} />
                    </div>
                ) : (
                    <Qcard
                        setPersonality={setPersonality}
                        current={current}
                        setCurrent={setCurrent}
                    />
                )}
            </div>
        </div>
    );
}
