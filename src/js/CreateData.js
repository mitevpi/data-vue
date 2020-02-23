import { range } from "d3-array";
import { Numbers } from "@mitevpi/algos";

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
    nodes: range(50).map(i => ({
      x: null,
      y: null,
      size: Numbers.randomInt(5, 30)
    })),
    links: range(49).map(i => ({
      source: Math.floor(Math.sqrt(i)),
      target: i + 1
    }))
  };
}

export function NetworkData2() {
  return {
    nodes: [
      { x: null, y: null, size: 10 },
      { x: null, y: null, size: 15 },
      { x: null, y: null, size: 30 },
      { x: null, y: null, size: 50 }
    ],
    links: [{ source: 1, target: 0 }]
  };
}
