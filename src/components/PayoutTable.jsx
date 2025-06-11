import seven from '../assets/seven.png';

const payouts = [
    { icons: "🍒", amount: "1,000" },
    { icons: "🍒🍒", amount: "2,500" },
    { icons: "🍒🍒🍒", amount: "5,000" },
    { icons: "🍊🍇🍉", amount: "2,500" },
    { icons: "🍊🍊🍊", amount: "5,000" },
    { icons: "🍇🍇🍇", amount: "12,500" },
    { icons: "🍉🍉🍉", amount: "20,000" },
    { icons: "🍀🍀🍀", amount: "40,000" },
    {
        icons:
            <div className='flex gap-2 items-center mt-1.5 pb-1'>
                <img src={seven} className='w-6 h-6' alt='seven' />
                <img src={seven} className='w-6 h-6' alt='seven' />
                <img src={seven} className='w-6 h-6' alt='seven' />
            </div>,
        amount: "120,000",
    },
];

const PayoutTable = () => {
    return (
        <div className="w-2/3 rounded-lg p-1 max-2xl:w-full mb-2">
            <div className="flex flex-wrap justify-between">
                {payouts.map((item, idx) => (
                    <div
                        key={idx}
                        className="w-[30%] bg-blue-800 rounded-md p-2 m-1 flex flex-col items-center text-center"
                    >
                        <div className="text-3xl">
                            {item.icons}
                        </div>
                        <div className="text-orange-300 font-bold text-sm mt-1">
                            {item.amount} 🪙
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center text-center text-yellow-400 text-lg font-semibold bg-blue-800 rounded-md p-6 mt-1 w-[99%] mx-auto">
                <img src={seven} className="w-6 h-6" alt="" /> Награда x2
            </div>
        </div>
    );
};

export default PayoutTable;
