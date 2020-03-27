import { computed } from "@vue/composition-api";

import { ArraysObjective } from "@mitevpi/algos";

export default function datasetMetrics(data, yKey) {
  const dataCount = computed(() => data.length);
  const dataMax = computed(() => ArraysObjective.max(data, yKey));
  const dataMin = computed(() => ArraysObjective.min(data, yKey));

  return {
    dataCount,
    dataMax,
    dataMin
  };
}
