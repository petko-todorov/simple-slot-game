import plus from "../assets/plus.png";
import minus from "../assets/minus.png";

const BetControls = ({ bet, setBet, setMultiplier }) => {
    const betAmounts = [500, 1000, 2000, 5000, 10000];
    const multipliers = [1, 2, 4, 10, 20];

    const decreaseBet = () => {
        const currentIndex = betAmounts.indexOf(bet);
        if (currentIndex === 0) {
            return;
        }

        const newIndex = currentIndex - 1;
        setBet(betAmounts[newIndex]);
        setMultiplier(multipliers[newIndex]);
    };

    const increaseBet = () => {
        const currentIndex = betAmounts.indexOf(bet);
        if (currentIndex === betAmounts.length - 1) {
            return;
        }

        const newIndex = currentIndex + 1;
        setBet(betAmounts[newIndex]);
        setMultiplier(multipliers[newIndex]);
    };

    return (
        <>
            <div className="flex justify-between w-3/5 h-14 bg-slate-800 rounded-lg p-0.5">
                <button
                    className="bg-zinc-300 text-sky-500 text-2xl w-1/6 rounded-lg cursor-pointer disabled:opacity-50"
                    onClick={decreaseBet}
                    disabled={bet === 500}
                >
                    <img src={minus} className="w-1/4 mx-auto" alt="" />
                </button>

                <span className="text-white text-2xl w-1/6 rounded-lg flex justify-center items-center">
                    {bet}
                </span>

                <button
                    className="bg-zinc-300 text-sky-500 text-2xl w-1/6 rounded-lg cursor-pointer disabled:opacity-50"
                    onClick={increaseBet}
                    disabled={bet === 10000}
                >
                    <img src={plus} className="w-1/4 mx-auto" alt="" />
                </button>
            </div>
        </>
    );
};

export default BetControls;
