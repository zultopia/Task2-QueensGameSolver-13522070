const colors = [
    '#CD5C5C', '#FFC0CB', '#FF7F50', '#FFFACD', '#E6E6FA', '#2E8B57', '#AFEEEE', '#6495ED', '#BC8F8F', '#FFE4E1',
    '#F08080', '#FF69B4', '#FFFFE0', '#F0E68C', '#6A5ACD', '#6B8E23', '#B0C4DE', '#7B68EE', '#F0FFFF', '#D3D3D3',
    '#FA8072', '#DB7093', '#FFEFD5', '#D8BFD8', '#98FB98', '#808000', '#B0E0E6', '#FFEBCD', '#F5F5DC', '#778899',
    '#E9967A', '#FF6347', '#FFDAB9', '#DDA0DD', '#90EE90', '#66CDAA', '#87CEFA', '#F5DEB3', '#FFF0F5', '#2F4F4F',
    '#FFA07A', '#FFA500', '#EEE8AA', '#9370DB', '#3CB371', '#8FBC8F'
];

const charToColor = {};

const getColorForChar = (char) => {
    const lowerChar = char.toLowerCase(); 
    if (!charToColor[lowerChar]) {
        charToColor[lowerChar] = colors[Object.keys(charToColor).length % colors.length];
    }
    return charToColor[lowerChar];
};

export { getColorForChar };