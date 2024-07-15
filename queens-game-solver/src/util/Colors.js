const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFD5', '#FFD533', '#57FF33', '#5733FF', '#FF5733',
    '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFD5', '#FFD533', '#57FF33', '#5733FF', '#FF5733', '#33FF57',
    '#3357FF', '#FF33A1', '#A133FF', '#33FFD5', '#FFD533', '#57FF33', '#5733FF', '#FF5733', '#33FF57', '#3357FF',
    '#FF33A1', '#A133FF', '#33FFD5', '#FFD533', '#57FF33', '#5733FF', '#FF5733', '#33FF57', '#3357FF', '#FF33A1',
    '#A133FF', '#33FFD5', '#FFD533', '#57FF33', '#5733FF', '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF',
    '#33FFD5', '#FFD533', '#57FF33', '#5733FF', '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFD5',
    '#FFD533', '#57FF33', '#5733FF'
];

const charToColor = {};

const getColorForChar = (char) => {
    if (!charToColor[char]) {
        charToColor[char] = colors[Object.keys(charToColor).length % colors.length];
    }
    return charToColor[char];
};

export { getColorForChar };