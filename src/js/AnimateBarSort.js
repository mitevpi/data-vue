/**
 * @return {string}
 */
export function ToggleSortByX(sortType, data, yKey) {
  switch (sortType) {
    case "descending":
      data.sort((a, b) => {
        return a[yKey] - b[yKey];
      });
      return "ascending";
    case "ascending":
      data.sort((a, b) => {
        return b[yKey] - a[yKey];
      });
      return "descending";
    default:
      data.sort((a, b) => {
        return a[yKey] - b[yKey];
      });
      return "ascending";
  }
}
