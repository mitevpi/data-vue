import { computed } from "@vue/composition-api";

import { Strings, StringsLatin } from "@mitevpi/algos";

export function createGroupId() {
  return StringsLatin.removeNonAlpha(Strings.createUniqueID());
}

export function goldenHeight(width) {
  return computed(() => width.value / 1.61803398875);
}
