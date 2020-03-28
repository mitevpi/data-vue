import { computed } from "@vue/composition-api";
import { Numbers } from "@mitevpi/algos";

export function scale(width, count) {
  return computed(() => {
    const finalWidth = width.value / count.value - 5;
    return finalWidth > 0 ? finalWidth : 0;
  });
}

export function scaleYLinear(val, min, max, height) {
  return Numbers.normalizeToRange(val, min > 0 ? 0 : min, max, height, 0);
}

export function scaleXLinear(val, max, length) {
  return Numbers.normalizeToRange(val, 0, max, 0, length);
}
