"use client";

import Button from "./button";

const SpecialButton = () => {
    return (
        <div className="flex w-full sm:w-1/2 items-center my-5">
            <Button
                text="إعادة الاختبار"
                rotate={true}
                doThis={() => {
                    window.location.reload();
                }}
            />
        </div>
    );
};

export default SpecialButton;
