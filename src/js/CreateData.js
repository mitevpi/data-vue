import { range } from "d3-array";

const spaceTypes = ["Office", "Meeting", "Support", "Creative", "Circulation"];

export function PackData() {
  const r = () => Math.random();
  return range(200).map(i => {
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
    nodes: range(50).map(i => ({ index: i, x: null, y: null })),
    links: range(49).map(i => ({
      source: Math.floor(Math.sqrt(i)),
      target: i + 1
    }))
  };
}
