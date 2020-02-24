import { Numbers } from "@mitevpi/algos";

/**
 * Get a filled array of the corresponding size
 * @param {Number} size The amount of numbers in the array.
 * @returns {Number[]} A filled array the length of the specified size.
 */
export function Range(size) {
  return [...Array(size).keys()];
}
export function NetworkData() {
  return {
    nodes: Range(50).map(i => ({
      x: null,
      size: Numbers.randomInt(5, 30)
    })),
    links: Range(49).map(i => ({
      source: Math.floor(Math.sqrt(i)),
      target: i + 1
    }))
  };
}
