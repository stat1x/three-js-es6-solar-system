class MathUtility {
    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}

export default MathUtility;