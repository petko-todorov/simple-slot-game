const BalanceDisplay = ({ balance }) => {
    const formattedBalance = new Intl.NumberFormat("fr-FR").format(balance);

    return (
        <div className="text-2xl font-bold text-white">
            Balance: 🪙 {formattedBalance}
        </div>
    );
};

export default BalanceDisplay;
