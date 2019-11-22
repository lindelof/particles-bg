
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {};
}

function getColor(color, a) {
    let c;
    if (color) {
        c = hexToRgb(color);
        return `rgba(${c.r},${c.g},${c.b}, ${a})`;
    } else {
        return null;
    }
}


export { hexToRgb, getColor };