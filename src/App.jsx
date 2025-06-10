// import { useState } from 'react'
// import SlotMachine from './components/SlotMachine'
// import SpinButton from './components/SpinButton'

// function App() {

//     return (
//         <>
//             <div className="h-screen flex flex-col items-center justify-center">
//                 <h1 className='text-6xl font-bold text-center text-amber-400'>
//                     Test
//                 </h1>

//                 <SlotMachine />

//             </div>
//         </>
//     )
// }

// export default App;


import { useState } from 'react'
import SlotMachine from './components/SlotMachine'
import SpinButton from './components/SpinButton'

function App() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [autoAnimationStart, setAutoAnimationStart] = useState(false);
    const [triggerSpin, setTriggerSpin] = useState(0);

    const handleSpin = () => {
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
            <div className="h-screen flex flex-col items-center justify-center">
                <h1 className='text-6xl font-bold text-center text-amber-400'>
                    Test
                </h1>

                <SlotMachine
                    isSpinning={isSpinning}
                    autoAnimationStart={autoAnimationStart}
                    triggerSpin={triggerSpin}
                />

                <SpinButton
                    handleSpin={handleSpin}
                    isSpinning={isSpinning}
                />
            </div>
        </>
    )
}

export default App;