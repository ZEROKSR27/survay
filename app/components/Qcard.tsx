import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import { questions, options } from "./data";
import Button from "./button";

type myPROPS = {
    personality: string;
    setPersonality: React.Dispatch<React.SetStateAction<string>>;
    current: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

const Qcard = ({
    current,
    personality,
    setPersonality,
    setCurrent,
}: myPROPS) => {
    const [responses, setResponses] = useState<number[]>([]);
    const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        if (responses[current] !== undefined) {
            setSelected(responses[current]);
        } else {
            setSelected(null);
        }
    }, [current, responses]);

    const calculateTraits = (responsesArray: number[]) => {
        let E = 0,
            I = 0,
            S = 0,
            N = 0,
            T = 0,
            F = 0,
            J = 0,
            P = 0;

        responsesArray.forEach((value, index) => {
            const question = questions[index];
            const effect = question.effect.toUpperCase();
            const effect2 = question.effect2.toUpperCase();

            if (effect === "E") E += value;
            if (effect2 === "E") E += value;
            if (effect === "I") I += value;
            if (effect2 === "I") I += value;
            if (effect === "S") S += value;
            if (effect2 === "S") S += value;
            if (effect === "N") N += value;
            if (effect2 === "N") N += value;
            if (effect === "T") T += value;
            if (effect2 === "T") T += value;
            if (effect === "F") F += value;
            if (effect2 === "F") F += value;
            if (effect === "J") J += value;
            if (effect2 === "J") J += value;
            if (effect === "P") P += value;
            if (effect2 === "P") P += value;
        });

        return { E, I, S, N, T, F, J, P };
    };

    const GetPersonality = (traits: ReturnType<typeof calculateTraits>) => {
        const normalize = (num: number, dev: number) => (num / dev) * 100;

        const normalized = {
            E: normalize(traits.E, 11),
            I: normalize(traits.I, 11),
            S: normalize(traits.S, 14),
            N: normalize(traits.N, 16),
            T: normalize(traits.T, 16),
            F: normalize(traits.F, 36),
            J: normalize(traits.J, 18),
            P: normalize(traits.P, 21),
        };

        console.table(normalized); // Nice readable table of values

        const st_letter = normalized.E >= normalized.I ? "E" : "I";
        const nd_letter = normalized.S >= normalized.N ? "S" : "N";
        const rd_letter = normalized.T >= normalized.F ? "T" : "F";
        const th_letter = normalized.J >= normalized.P ? "J" : "P";

        const newPersonality = st_letter + nd_letter + rd_letter + th_letter;
        console.log("Final Personality:", newPersonality);
        setPersonality(newPersonality);
        return newPersonality;
    };

    const handleSubmit = () => {
        toast.success("تم إرسال الإجابات بنجاح! 🎉");
    };

    return (
        <>
            <div className="flex items-center gap-4">
                <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => {
                        if (current === 0) {
                            toast.error("هذا هو السؤال الاول");

                            return;
                        }
                        // Update responses with current selection
                        const newResponses = responses.slice(0, -1);
                        // newResponses[current] = selected;
                        setResponses(newResponses);

                        // Calculate traits and update personality
                        const traits = calculateTraits(responses);
                        GetPersonality(traits);

                        // Move to last question
                        setCurrent((prev) => prev - 1);
                        setSelected(null);
                        console.log(traits, "\n ", personality);
                    }}
                    className="w-11 h-11 bg-white/80 shadow-xl rounded-full flex justify-center items-center"
                >
                    <FiArrowRight className="text-rose-500 text-2xl rotate-180" />
                </motion.button>
                <div className="flex-1 h-3 bg-white/80 rounded-full relative overflow-hidden shadow-inner">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                            width: `${
                                ((current + 1) / questions.length) * 100
                            }%`,
                        }}
                        transition={{ duration: 0.4 }}
                    />
                </div>

                <span className="text-lg font-bold text-slate-800">
                    {current + 1}/{questions.length}
                </span>
            </div>

            {/* Question box */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/80 w-full  backdrop-blur-2xl border-2 border-white/40 p-8 rounded-[2rem] shadow-2xl space-y-8"
                >
                    <h2
                        dir="rtl"
                        className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed text-center"
                    >
                        {questions[current].text}
                    </h2>

                    <div className="space-y-4">
                        {options.map((option) => (
                            <motion.button
                                key={option.value}
                                className={`w-full px-6 py-4 text-slate-900  outline-[#ededed]
        text-xl font-bold
                                              bg-gradient-to-r  outline-[5px]
                                              flex items-center justify-end gap-3
                                              transition-transform duration-300
                                              ${
                                                  selected === option.value
                                                      ? `scale-[1.05] ${option.color} text-white `
                                                      : "opacity-60 hover:opacity-100"
                                              }
                                              ${
                                                  selected === null
                                                      ? " opacity-100"
                                                      : ""
                                              }`}
                                onClick={() => setSelected(option.value)}
                            >
                                <span className="text-2xl">{option.emoji}</span>
                                {option.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Next/Submit button */}
            <div className="w-full text-center">
                {current < questions.length - 1 ? (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-8 py-4  bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl font-black text-lg shadow-xl"
                        onClick={() => {
                            if (selected === null) {
                                toast.error(
                                    "يرجى اختيار أحد الخيارات قبل المتابعة"
                                );
                                return;
                            }

                            // Update responses with current selection
                            const newResponses = [...responses];
                            newResponses[current] = selected;
                            setResponses(newResponses);

                            // Calculate traits and update personality
                            const traits = calculateTraits(newResponses);
                            GetPersonality(traits);

                            // Move to next question
                            setCurrent((prev) => prev + 1);
                            setSelected(null);
                            console.log(traits, "\n ", personality);
                        }}
                    >
                        التالي
                        <FiArrowRight className="inline ml-3 text-xl" />
                    </motion.button>
                ) : (
                    <Button
                        text=" إرسال النتائج 🎉"
                        doThis={() => {
                            if (selected === null) {
                                toast.error(
                                    "يرجى اختيار أحد الخيارات قبل المتابعة"
                                );
                                return;
                            }

                            // Update responses with current selection
                            const newResponses = [...responses];
                            newResponses[current] = selected;
                            setResponses(newResponses);

                            // Calculate traits and update personality
                            const traits = calculateTraits(newResponses);
                            GetPersonality(traits);

                            // Move to next question
                            setCurrent((prev) => prev + 1);
                            setSelected(null);
                            console.log(traits, "\n ", personality);
                            handleSubmit();
                        }}
                    ></Button>
                )}
            </div>
        </>
    );
};

export default Qcard;
