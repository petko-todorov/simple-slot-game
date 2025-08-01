const SpinButton = ({ handleSpin, isSpinning }) => {
    return (
        <button
            onClick={handleSpin}
            className={`${
                isSpinning ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            } bg-amber-600 text-black font-bold text-lg w-1/3 py-5 rounded-lg`}
            disabled={isSpinning}
        >
            {isSpinning ? "Spinning..." : "Spin"}
        </button>
    );
};

export default SpinButton;
