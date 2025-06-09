import { useState } from 'react';
import SlotCounter from 'react-slot-counter';

import item1 from '../assets/cherries.png';
import item2 from '../assets/orange.png';
import item3 from '../assets/plum.png';
import item4 from '../assets/watermelon.png';
import item5 from '../assets/clover.png';
import item6 from '../assets/seven.png';

const wrapImage = (src) => (
    <div className="w-64 h-64 flex justify-center items-center">
        <img src={src} alt="" className="w-full h-full object-contain" />
    </div>
);

const weightedItems = [
    { item: item1, weight: 0.40 }, // Cherries
    { item: item2, weight: 0.25 }, // Orange
    { item: item3, weight: 0.15 }, // Plum
    { item: item4, weight: 0.10 }, // Watermelon
    { item: item5, weight: 0.07 }, // clover
    { item: item6, weight: 0.03 }, // Seven
];

const SlotMachine = () => {
    const winChance = 0.2;
    const items = [item1, item2, item3, item4, item5, item6];
    const [isSpinning, setIsSpinning] = useState(false);
    const [autoAnimationStart, setAutoAnimationStart] = useState(false);

    const lostSpin = (items) => {
        console.log('lose');

        const availableItems = items.filter(item => item !== item1); // exclude cherries
        let result;

        do {
            const first = availableItems[Math.floor(Math.random() * availableItems.length)];
            const second = availableItems[Math.floor(Math.random() * availableItems.length)];
            const third = availableItems[Math.floor(Math.random() * availableItems.length)];
            const images = [first, second, third];

            const [a, b, c] = images;
            const allSame = a === b && b === c;
            if (!allSame) {
                result = images.map(img => ({
                    element: wrapImage(img),
                    image: img,
                    symbol: img.split('assets/')[1].split('.')[0],
                }));
            }
        } while (!result); 

        return result;
    };

    const winningSpin = (items) => {
        console.log('win');
        
    };

    const getRandomItems = () => {
        const isWin = Math.random() < winChance;
        let result;
        if (isWin) {
            result = winningSpin(items);
            return result;
        } else {
            result = lostSpin(items);
            return result;
        }
    };


    const [currentValues, setCurrentValues] = useState(() => getRandomItems());

    const spin = () => {
        if (isSpinning) return;
        setAutoAnimationStart(true);
        setIsSpinning(true);

        const newValues = getRandomItems();
        setCurrentValues(newValues);

        setTimeout(() => {
            setIsSpinning(false);
        }, 1000);

    };

    return (
        <div className='flex flex-col items-center'>
            <SlotCounter
                startValueOnce
                autoAnimationStart={autoAnimationStart}
                value={currentValues.map(v => v.element)}
                dummyCharacters={items.map(item => wrapImage(item))}
            // dummyCharacterCount={10} // random
            // speed={5} // random 
            />
            <button
                onClick={spin}
                className='bg-amber-400 text-white px-4 py-2 mt-4 rounded-lg'
                disabled={isSpinning}
            >
                {isSpinning ? 'Spinning...' : 'Spin'}
            </button>
        </div>
    );
};

export default SlotMachine;