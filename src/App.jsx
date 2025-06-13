import { useState } from 'react'
import SlotMachine from './components/SlotMachine'
import SpinButton from './components/SpinButton'
import BalanceDisplay from './components/BalanceDisplay';
import BetControls from './components/BetControls';
import PayoutTable from './components/PayoutTable';
import WinAmountPop from './components/WinAmountPop';

function App() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [autoAnimationStart, setAutoAnimationStart] = useState(false);
    const [triggerSpin, setTriggerSpin] = useState(0);
    const [bet, setBet] = useState(500);
    const [multiplier, setMultiplier] = useState(1);
    const [wonAmount, setWonAmount] = useState(0);
    const [balance, setBalance] = useState(600000);
    const [winId, setWinId] = useState();
    const [showPopup, setShowPopup] = useState(false);

    const handleSpin = () => {
        setWinId(null);

        if (balance < bet) return;
        if (isSpinning) return;

        setAutoAnimationStart(true);
        setIsSpinning(true);

        setTriggerSpin(prev => prev + 1);

        setTimeout(() => {
            setIsSpinning(false);
        }, 1000);
    };

    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center gap-1 w-1/2 mx-auto select-none">
                <h1 className='text-6xl font-bold text-center text-amber-400'>
                    Test
                </h1>
                <h1>{wonAmount}</h1>

                <SlotMachine
                    isSpinning={isSpinning}
                    autoAnimationStart={autoAnimationStart}
                    triggerSpin={triggerSpin}
                    setWonAmount={setWonAmount}
                    multiplier={multiplier}
                    setBalance={setBalance}
                    bet={bet}
                    setWinId={setWinId}
                    setShowPopup={setShowPopup}
                />

                <PayoutTable
                    multiplier={multiplier}
                    winId={winId}
                />

                <BetControls
                    bet={bet}
                    setBet={setBet}
                    setMultiplier={setMultiplier}
                />

                <SpinButton
                    handleSpin={handleSpin}
                    isSpinning={isSpinning}
                />

                <BalanceDisplay
                    balance={balance}
                />

               {wonAmount > 0 && (
                    <WinAmountPop
                        wonAmount={wonAmount}
                        showPopup={showPopup}
                    />
               )}
            </div>
        </>
    )
}

export default App;