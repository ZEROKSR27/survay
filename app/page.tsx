"use client";
import { useState, useEffect } from "react";
import Survey from "./components/Survey";
import Results from "./components/results";
import { noa } from "./components/typeNoa";

export default function Home() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/characters.json");
                if (!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();
                setResults(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const [personality, setPersonality] = useState("");
    const [current, setCurrent] = useState(0);
    const [results, setResults] = useState<noa[]>([]);

    return (
        <main className="w-full bg-[url('/bg.png')] bg-cover bg-center h-screen ">
            {current < 100 ? (
                <Survey
                    setPersonality={setPersonality}
                    current={current}
                    setCurrent={setCurrent}
                />
            ) : (
                <Results personality={personality} results={results} />
            )}
        </main>
    );
}
