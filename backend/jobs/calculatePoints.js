const calculatePoints = () => {
    let points = 1; // Default point per click
    if (Math.random() < 0.5) points += 9;  // 50% chance for extra 10 points
    const wonPrize = Math.random() < 0.25; // 25% chance to win a prize
    return { points, wonPrize };
};

module.exports = calculatePoints;