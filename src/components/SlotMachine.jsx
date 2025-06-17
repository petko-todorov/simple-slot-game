import { useEffect, useState } from "react";
import SlotCounter from "react-slot-counter";

import item1 from "../assets/cherries.png";
import item2 from "../assets/orange.png";
import item3 from "../assets/grapes.png";
import item4 from "../assets/watermelon.png";
import item5 from "../assets/clover.png";
import item6 from "../assets/seven.png";

import Confetti from "react-confetti";

const wrapImage = (src) => (
    <div className="w-48 h-48 flex justify-center items-center border-6 border-amber-300 p-6">
        <img src={src} alt="" className="w-full h-full object-contain" />
    </div>
);

const weightedItems = [
    { item: item1, weight: 0.4 }, // Cherries
    { item: item2, weight: 0.25 }, // Orange
    { item: item3, weight: 0.15 }, // Grapes
    { item: item4, weight: 0.1 }, // Watermelon
    { item: item5, weight: 0.07 }, // clover
    { item: item6, weight: 0.03 }, // Seven
];

const SlotMachine = ({
    autoAnimationStart,
    triggerSpin,
    setWonAmount,
    multiplier,
    setBalance,
    bet,
    setWinId,
    setShowPopup,
    setWasWin,
}) => {
    const winChance = 0.2;
    const items = [item1, item2, item3, item4, item5, item6];
    const [showConfetti, setShowConfetti] = useState(false);

    const lostSpin = (items) => {
        const availableItems = items.filter((item) => item !== item1); // exclude cherries
        let result;

        do {
            const first =
                availableItems[
                    Math.floor(Math.random() * availableItems.length)
                ];
            const second =
                availableItems[
                    Math.floor(Math.random() * availableItems.length)
                ];
            const third =
                availableItems[
                    Math.floor(Math.random() * availableItems.length)
                ];
            const images = [first, second, third];

            const [a, b, c] = images;
            const allSame = a === b && b === c;
            if (!allSame) {
                result = images.map((img) => ({
                    element: wrapImage(img),
                    image: img,
                    symbol: img.split("assets/")[1].split(".")[0],
                }));
            }
        } while (!result);

        setBalance((prev) => prev - bet);
        setWonAmount(0);
        setWasWin(false);
        return result;
    };

    const winningSpin = () => {
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
            symbol: img.split("assets/")[1].split(".")[0],
        });

        const cherries = weightedItems[0].item;
        const orange = weightedItems[1].item;
        const grapes = weightedItems[2].item;
        const watermelon = weightedItems[3].item;
        const clover = weightedItems[4].item;
        const seven = weightedItems[5].item;

        const winPatterns = [
            {
                id: 0,
                pattern: () => {
                    const filteredItems = weightedItems
                        .slice(1)
                        .filter((item) => item.item !== seven);
                    return [
                        cherries,
                        getWeightedRandomItem(filteredItems),
                        getWeightedRandomItem(filteredItems),
                    ];
                },
                weight: 20,
                baseWin: 1000,
            },

            {
                id: 14,
                pattern: () => [
                    cherries,
                    seven,
                    getWeightedRandomItem(weightedItems.slice(1)),
                ],
                weight: 13,
                baseWin: 2000,
            },

            {
                id: 1,
                pattern: () => [
                    cherries,
                    cherries,
                    getWeightedRandomItem(weightedItems.slice(1)),
                ],
                weight: 10,
                baseWin: 2500,
            },

            {
                id: 3,
                pattern: [orange, grapes, watermelon],
                weight: 10,
                baseWin: 2500,
            },

            {
                id: 2,
                pattern: [cherries, cherries, cherries],
                weight: 7,
                baseWin: 5000,
            },

            {
                id: 4,
                pattern: [orange, orange, orange],
                weight: 7,
                baseWin: 5000,
            },

            {
                id: 9,
                pattern: () => [cherries, cherries, seven],
                weight: 7,
                baseWin: 5000,
            },

            {
                id: 10,
                pattern: () => [orange, orange, seven],
                weight: 6,
                baseWin: 10000,
            },

            {
                id: 5,
                pattern: [grapes, grapes, grapes],
                weight: 6,
                baseWin: 12500,
            },

            {
                id: 6,
                pattern: [watermelon, watermelon, watermelon],
                weight: 4,
                baseWin: 20000,
            },

            {
                id: 11,
                pattern: () => [grapes, grapes, seven],
                weight: 3.5,
                baseWin: 25000,
            },

            {
                id: 7,
                pattern: [clover, clover, clover],
                weight: 2,
                baseWin: 40000,
            },

            {
                id: 12,
                pattern: () => [watermelon, watermelon, seven],
                weight: 2,
                baseWin: 40000,
            },

            {
                id: 13,
                pattern: () => [clover, clover, seven],
                weight: 1.5,
                baseWin: 80000,
            },

            {
                id: 8,
                pattern: [seven, seven, seven],
                weight: 1,
                baseWin: 100000,
            },
        ];

        const totalWeight = winPatterns.reduce(
            (sum, { weight }) => sum + weight,
            0
        );

        let random = Math.random() * totalWeight;
        let selectedPattern;

        for (const patternObj of winPatterns) {
            if (random < patternObj.weight) {
                selectedPattern =
                    typeof patternObj.pattern === "function"
                        ? patternObj.pattern()
                        : patternObj.pattern;

                setWonAmount(patternObj.baseWin * multiplier);
                setTimeout(() => setShowPopup(true), 800);
                setTimeout(() => setShowPopup(false), 2500);
                setBalance((prev) => prev + patternObj.baseWin * multiplier);
                setWinId(patternObj.id);
                setWasWin(true);

                if (patternObj.id === 8) {
                    setShowConfetti(true);
                    setTimeout(() => {
                        setShowConfetti(false);
                    }, 8500);
                }

                break;
            }
            random -= patternObj.weight;
        }

        if (!selectedPattern) {
            selectedPattern = [
                cherries,
                getWeightedRandomItem(weightedItems.slice(1)),
                getWeightedRandomItem(weightedItems.slice(1)),
            ];
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
        const getRandomImage = () =>
            items[Math.floor(Math.random() * items.length)];
        const placeholders = Array.from({ length: 3 }, () => {
            const img = getRandomImage();
            return {
                element: wrapImage(img),
                image: img,
                symbol: img.split("assets/")[1].split(".")[0],
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
        <div className="flex flex-col items-center">
            <SlotCounter
                startValueOnce
                autoAnimationStart={autoAnimationStart}
                value={currentValues.map((v) => v.element)}
                dummyCharacters={items.map((item) => wrapImage(item))}
            />

            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={2000}
                    recycle={false}
                />
            )}
        </div>
    );
};

export default SlotMachine;
