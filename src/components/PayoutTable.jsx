import seven from '../assets/seven.png';
import SlotCounter from 'react-slot-counter';

const payouts = [
    { icons: "🍒", base: "1,000" },
    { icons: "🍒🍒", base: "2,500" },
    { icons: "🍒🍒🍒", base: "5,000" },
    { icons: "🍊🍇🍉", base: "2,500" },
    { icons: "🍊🍊🍊", base: "5,000" },
    { icons: "🍇🍇🍇", base: "12,500" },
    { icons: "🍉🍉🍉", base: "20,000" },
    { icons: "🍀🍀🍀", base: "40,000" },
    {
        icons:
            <div className='flex gap-2 items-center mt-1.5 pb-1'>
                <img src={seven} className='w-6 h-6' alt='seven' />
                <img src={seven} className='w-6 h-6' alt='seven' />
                <img src={seven} className='w-6 h-6' alt='seven' />
            </div>,
        base: "100,000",
    },
];

const PayoutTable = ({ multiplier }) => {

    const formatPayout = (base, multiplier) => {
        const numericValue = parseInt(base.replace(/,/g, ""), 10); // Remove commas, parse to int
        const result = numericValue * multiplier;
        return result.toLocaleString(); // Add commas back
    };

    return (
        <div className="w-2/3 rounded-lg p-1 max-2xl:w-full">
            <div className="flex flex-wrap justify-between">
                {payouts.map((item, idx) => (
                    <div
                        key={idx}
                        className="w-[30%] bg-blue-800 rounded-md p-2 m-1 flex flex-col items-center text-center"
                    >
                        <div className="text-3xl">
                            {item.icons}
                        </div>
                        <div className="text-orange-300 font-bold textsm mt-1 flex items-center">
                            🪙
                            <SlotCounter
                                key={formatPayout(item.base, multiplier)}
                                value={formatPayout(item.base, multiplier).toString()}
                                dummyCharacters={'0123456789'.split('')}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center text-center text-yellow-400 text-lg font-semibold bg-blue-800 rounded-md p-6 mt-1 w-[99%] mx-auto">
                <img src={seven} className="w-6 h-6" alt="" />
                <span className='ml-1.5 text-xl'>
                    Reward x2
                </span>
            </div>
        </div>
    );
};

export default PayoutTable;
