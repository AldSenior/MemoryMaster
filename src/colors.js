export const colors = [];
function random_rgba() {
    let o = Math.round,
        r = Math.random,
        s = 255;
    return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," + r().toFixed(1) + ")";
}
for (let i = 0; i < 24; i++) {
    colors.push(random_rgba());
}
