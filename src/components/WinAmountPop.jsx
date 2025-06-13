import { motion, AnimatePresence } from "framer-motion";

const WinAmountPop = ({ wonAmount, showPopup }) => {
    const formattedAmount = new Intl.NumberFormat('fr-FR').format(wonAmount);

    return (
        <AnimatePresence>
            {showPopup && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 5, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] font-bold pointer-events-none text-black z-[1000]"
                >
                    {formattedAmount}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WinAmountPop;
