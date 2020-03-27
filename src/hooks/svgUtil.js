import { computed } from "@vue/composition-api";

import { Strings, StringsLatin } from "@mitevpi/algos";

export default function svgUtil() {
  const groupId = StringsLatin.removeNonAlpha(Strings.createUniqueID());

  return {
    groupId
  };
}
