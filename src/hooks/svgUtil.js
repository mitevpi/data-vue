import { computed } from "@vue/composition-api";

import { Strings, StringsLatin } from "@mitevpi/algos";

export default function svgUtil(width) {
  const groupId = StringsLatin.removeNonAlpha(Strings.createUniqueID());
  const svgHeight = computed(() => width / 1.61803398875);

  return {
    groupId,
    svgHeight
  };
}
