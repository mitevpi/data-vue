import { computed } from "@vue/composition-api";

import { ArraysObjective } from "@mitevpi/algos";

export default function datasetMetrics(props) {
  const dataCount = computed(() => props.data.length);
  const dataMax = computed(() => ArraysObjective.max(props.data, props.yKey));
  const dataMin = computed(() => ArraysObjective.min(props.data, props.yKey));

  return {
    dataCount,
    dataMax,
    dataMin
  };
}
