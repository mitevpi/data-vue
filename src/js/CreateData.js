import { Numbers } from "@mitevpi/algos";

const spaceTypes = ["Office", "Meeting", "Support", "Creative", "Circulation"];

// const times = x => f => {
//   if (x > 0) {
//     f();
//     times(x - 1)(f);
//   }
// };

/**
 * Get a filled array of the corresponding size
 * @param {Number} size The amount of numbers in the array.
 * @returns {Number[]} A filled array the length of the specified size.
 */
export function Range(size) {
  return [...Array(size).keys()];
}

export function PackData() {
  const r = () => Math.random();
  return Range(200).map(i => {
    const randomNumber = Math.floor(r() * spaceTypes.length);
    return {
      r: r() * 14 * r() * 2 * r() * 2,
      id: i,
      spaceType: spaceTypes[randomNumber]
    };
  });
}

export function NetworkData() {
  return {
    nodes: Range(50).map(i => ({
      x: null,
      y: null,
      size: Numbers.randomInt(5, 30)
    })),
    links: Range(49).map(i => ({
      source: Math.floor(Math.sqrt(i)),
      target: i + 1
    }))
  };
}