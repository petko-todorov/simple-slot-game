import { useState } from 'react';
import SlotCounter from 'react-slot-counter';
import item1 from '../assets/asd/bell.png';
import item2 from '../assets/asd/cherries.png';
import item3 from '../assets/asd/orange.png';
import item4 from '../assets/asd/plum.png';
import item5 from '../assets/asd/watermelon.png';

const wrapImage = (src) => (
    <div className="w-64 h-64 flex justify-center items-center">
        <img src={src} alt="" className="w-full h-full object-contain" />
    </div>
);

const SlotMachine = () => {
    const items = [item1, item2, item3, item4, item5];
    const [isSpinning, setIsSpinning] = useState(false);
    const [autoAnimationStart, setAutoAnimationStart] = useState(false);

    const getRandomItems = () => {
        const newItems = Array.from({ length: 3 }, () => {
            const randomIndex = Math.floor(Math.random() * items.length);
            return {
                element: wrapImage(items[randomIndex]),
                image: items[randomIndex],
            };
        });

        return newItems;
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