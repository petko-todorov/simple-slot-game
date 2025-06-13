import { useEffect, useState } from 'react';
import seven from '../assets/seven.png';
import SlotCounter from 'react-slot-counter';

const payouts = [
    { icons: "🍒", base: "1,000", id: 0 },
    { icons: "🍒🍒", base: "2,500", id: 1 },
    { icons: "🍒🍒🍒", base: "5,000", id: 2 },
    { icons: "🍊🍇🍉", base: "2,500", id: 3 },
    { icons: "🍊🍊🍊", base: "5,000", id: 4 },
    { icons: "🍇🍇🍇", base: "12,500", id: 5 },
    { icons: "🍉🍉🍉", base: "20,000", id: 6 },
    { icons: "🍀🍀🍀", base: "40,000", id: 7 },
    {
        icons:
            <div className='flex gap-2 items-center mt-1.5 pb-1'>
                <img src={seven} className='w-6 h-6' alt='seven' />
                <img src={seven} className='w-6 h-6' alt='seven' />
                <img src={seven} className='w-6 h-6' alt='seven' />
            </div>,
        base: "100,000",
        id: 8
    },
];

const PayoutTable = ({ multiplier, winId }) => {
    const [activeWinId, setActiveWinId] = useState(null);

    useEffect(() => {
        if (winId !== null) {
            const timeout = setTimeout(() => {
                setActiveWinId(winId);
            }, 1000);
            return () => clearTimeout(timeout);
        } else {
            setActiveWinId(null);
        }
    }, [winId]);

    const formatPayout = (base, multiplier) => {
        const numericValue = parseInt(base.replace(/,/g, ""), 10);
        const result = numericValue * multiplier;
        return result.toLocaleString();
    };

    return (
        <div className="w-2/3 rounded-lg p-1 max-2xl:w-full">
            <div className="flex flex-wrap justify-between">
                {payouts.map((item, idx) => (
                    <div
                        key={idx}
                        className={`w-[30%] rounded-md p-2 m-1 flex flex-col items-center text-center ${item.id === activeWinId
                            ? 'bg-amber-200'
                            : 'bg-blue-800'
                            }`}
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

            <div className={`flex justify-center items-center text-center text-yellow-400 text-lg font-semibold rounded-md p-6 mt-1 w-[99%] mx-auto ${[9, 10, 11, 12, 13, 14].includes(activeWinId)
                ? 'bg-amber-200'
                : 'bg-blue-800'}
            `}
            >
                <img src={seven} className="w-6 h-6" alt="" />
                <span className='ml-1.5 text-xl'>
                    Reward x2
                </span>
            </div>
        </div>
    );
};

export default PayoutTable;
