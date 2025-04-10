import React from "react";
import { motion } from "framer-motion";
import Button from "./button";

type Props = {
    SetWelcome: React.Dispatch<React.SetStateAction<boolean>>;
};

const Welcome = ({ SetWelcome }: Props) => {
    return (
        <div>
            <motion.div
                dir="rtl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.6 }}
                className="flex flex-col items-center justify-center gap-8 text-xl sm:text-3xl font-bold text-center text-gray-700"
            >
                <h2 className="text-3xl p-4">✨ Welcome</h2>
                <h3 className="mb-8">
                    مرحبًا بك في اختبار تحليل الشخصية المتقدم. نحن سعداء
                    بانضمامك إلى هذا التحليل العميق لشخصيتك.
                </h3>
                <h3 className="text-rose-600 text-center"> تنبيه مهم ⚠ </h3>
                <h4>
                    للحصول على نتائج صحيحة ونصائح مفيدة، يوصى بالإجابة بأكبر قدر
                    من المصداقية والحقيقة
                </h4>
                <motion.div>
                    <Button doThis={() => SetWelcome(false)} text="أنا مستعد" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Welcome;
