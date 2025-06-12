import { useEffect, useState } from 'react';
import SlotCounter from 'react-slot-counter';

import item1 from '../assets/cherries.png';
import item2 from '../assets/orange.png';
import item3 from '../assets/grapes.png';
import item4 from '../assets/watermelon.png';
import item5 from '../assets/clover.png';
import item6 from '../assets/seven.png';

const wrapImage = (src) => (
    <div className="w-56 h-56 flex justify-center items-center">
        <img src={src} alt="" className="w-full h-full object-contain" />
    </div>
);

const weightedItems = [
    { item: item1, weight: 0.40 }, // Cherries
    { item: item2, weight: 0.25 }, // Orange
    { item: item3, weight: 0.15 }, // Grapes
    { item: item4, weight: 0.10 }, // Watermelon
    { item: item5, weight: 0.07 }, // clover
    { item: item6, weight: 0.03 }, // Seven
];

const SlotMachine = ({
    autoAnimationStart,
    triggerSpin,
    setWonAmount,
    multiplier,
    setBalance
}) => {
    const winChance = 0.9;
    const items = [item1, item2, item3, item4, item5, item6];
    const [isWon, setIsWon] = useState(false);

    const lostSpin = (items) => {
        setIsWon(false);
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

    const winningSpin = () => {
        setIsWon(true);
        const getWeightedRandomItem = (weightedList) => {
            const rand = Math.random();
            let sum = 0;
            for (const { item, weight } of weightedList) {
                sum += weight;
                if (rand <= sum) return item;
            }
            return weightedList[weightedList.length - 1].item;
        };

        const wrap = (img) => ({
            element: wrapImage(img),
            image: img,
            symbol: img.split('assets/')[1].split('.')[0],
        });

        const cherries = weightedItems[0].item;
        const orange = weightedItems[1].item;
        const grapes = weightedItems[2].item;
        const watermelon = weightedItems[3].item;
        const clover = weightedItems[4].item;
        const seven = weightedItems[5].item;

        const winPatterns = [
            // Single cherry - 25%
            {
                pattern: () => [cherries, getWeightedRandomItem(weightedItems.slice(1)), getWeightedRandomItem(weightedItems.slice(1))],
                weight: 25,
                baseWin: 1000
            },

            // Two cherries - 12.5%
            {
                pattern: () => [cherries, cherries, getWeightedRandomItem(weightedItems.slice(1))],
                weight: 12.5,
                baseWin: 2500
            },

            // Mixed fruits (any 3 different fruits) - 12.5%
            {
                pattern: () => {
                    const fruits = [orange, grapes, watermelon];
                    return [...fruits].sort(() => Math.random() - 0.5);
                },
                weight: 12.5,
                baseWin: 2500
            },

            // Three cherries - 8%
            {
                pattern: [cherries, cherries, cherries],
                weight: 8,
                baseWin: 5000
            },

            // Three oranges - 8%
            {
                pattern: [orange, orange, orange],
                weight: 8,
                baseWin: 5000
            },

            // Two cherries + seven - 8%
            {
                pattern: () => [cherries, cherries, seven],
                weight: 8,
                baseWin: 5000
            },

            // Two oranges + seven - 6%
            {
                pattern: () => [orange, orange, seven],
                weight: 6,
                baseWin: 10000
            },

            // Three grapes - 6%
            {
                pattern: [grapes, grapes, grapes],
                weight: 6,
                baseWin: 12500
            },

            // Three watermelons - 4%
            {
                pattern: [watermelon, watermelon, watermelon],
                weight: 4,
                baseWin: 20000
            },

            // Two grapes + seven - 2.4%
            {
                pattern: () => [grapes, grapes, seven],
                weight: 3.5,
                baseWin: 25000
            },

            // Three clovers - 2%
            {
                pattern: [clover, clover, clover],
                weight: 2,
                baseWin: 40000
            },

            // Two watermelons + seven - 2%
            {
                pattern: () => [watermelon, watermelon, seven],
                weight: 2,
                baseWin: 40000
            },

            // Three clovers - 1.5%
            {
                pattern: () => [clover, clover, seven],
                weight: 1.5,
                baseWin: 80000
            },

            // Three sevens (jackpot) - 1%
            {
                pattern: [seven, seven, seven],
                weight: 1,
                baseWin: 100000
            }
        ];

        const totalWeight = winPatterns.reduce((sum, { weight }) => sum + weight, 0);

        let random = Math.random() * totalWeight;
        let selectedPattern;

        for (const patternObj of winPatterns) {
            if (random < patternObj.weight) {
                selectedPattern = typeof patternObj.pattern === 'function' ?
                    patternObj.pattern() :
                    patternObj.pattern;

                setWonAmount(patternObj.baseWin * multiplier);
                setBalance(prev => prev + patternObj.baseWin * multiplier);
                break;
            }
            random -= patternObj.weight;
        };

        if (!selectedPattern) {
            selectedPattern = [cherries, getWeightedRandomItem(weightedItems.slice(1)), getWeightedRandomItem(weightedItems.slice(1))];
        }

        selectedPattern = selectedPattern.sort(() => Math.random() - 0.5);

        return selectedPattern.map(wrap);
    };

    const getRandomItems = () => {
        const isWin = Math.random() < winChance;
        return isWin ? winningSpin(items) : lostSpin(items);
    };

    const [currentValues, setCurrentValues] = useState([]);

    useEffect(() => {
        const getRandomImage = () => items[Math.floor(Math.random() * items.length)];
        const placeholders = Array.from({ length: 3 }, () => {
            const img = getRandomImage();
            return {
                element: wrapImage(img),
                image: img,
                symbol: img.split('assets/')[1].split('.')[0],
            };
        });

        setCurrentValues(placeholders);
    }, []);


    useEffect(() => {
        if (triggerSpin > 0) {
            const newValues = getRandomItems();
            setCurrentValues(newValues);
        }
    }, [triggerSpin]);

    return (
        <div className='flex flex-col items-center'>
            <SlotCounter
                startValueOnce
                autoAnimationStart={autoAnimationStart}
                value={currentValues.map(v => v.element)}
                dummyCharacters={items.map(item => wrapImage(item))}
            // TODO speed={} 
            />
        </div>
    );
};

export default SlotMachine;