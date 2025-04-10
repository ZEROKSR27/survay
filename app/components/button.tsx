"use client";
import { useEffect, useState } from "react";

type Props = {
    doThis?: () => void;
    rotate?: boolean;
    text: string;
};

let doesUseMouse = false;

const Button = ({ doThis = () => null, rotate = false, text }: Props) => {
    const [touched, setTouched] = useState(false);
    // لما يضغط المستخدم (موبايل)، نفعل التفاعل
    const handleTouchStart = () => setTouched(true);
    const handleTouchEnd = () => setTouched(false);

    const activeClass = touched ? "translate-x-0" : "-translate-x-full";
    const reverseClass = touched ? "translate-x-full" : "translate-x-0";

    useEffect(() => {
        doesUseMouse = window.matchMedia("(pointer: coarse)").matches;
    }, []);
    return (
        <button
            onClick={() => {
                if (doesUseMouse) {
                    setTimeout(() => {
                        doThis();
                    }, 600);
                    return;
                }

                doThis();
            }}
            onTouchStart={() => {
                handleTouchStart();
                setTimeout(() => {
                    handleTouchEnd();
                }, 300);
            }}
            className="relative w-full h-full inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-amber-400 rounded-full shadow-md group"
        >
            <span
                className={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 ${activeClass} bg-amber-400 group-hover:translate-x-0 ease`}
            >
                <svg
                    className={`w-6 h-6 ${rotate && "rotate-180"} `}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                </svg>
            </span>

            <span
                className={`absolute flex items-center justify-center w-full h-full text-amber-300 transition-all duration-300 transform ${reverseClass} group-hover:translate-x-full ease`}
            >
                {text}
            </span>

            <span className="relative invisible">{text}</span>
        </button>
    );
};

export default Button;
