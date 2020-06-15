/**
 * Chance Power
 * 50%    1
 * 25%    2
 * 12.5%  3
 * ...
 */
export const randomPower = () => Math.floor(Math.log2(1 / Math.random()) + 1)
