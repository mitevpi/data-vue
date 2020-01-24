import { selectAll } from "d3-selection";

function SortByX(
  groupId,
  selection,
  data,
  xScale,
  xKey,
  duration = 1000,
  delay = 150,
  centered = false
) {
  // console.log(data);
  selectAll(`#${groupId}`)
    .selectAll(selection)
    .data(data)
    .transition()
    .delay((d, i) => {
      return i * delay;
    })
    .duration(duration)
    .attr("x", d => {
      return centered
        ? xScale(d[xKey]) + xScale.bandwidth() / 2 - xScale.padding() * 100
        : xScale(d[xKey]);
    });
}

export function SortAll(
  groupId,
  data,
  xScale,
  xKey,
  duration = 1000,
  delay = 150
) {
  SortByX(groupId, "rect", data, xScale, xKey, duration, delay);
  SortByX(groupId, ".bar-label-top", data, xScale, xKey, duration, delay, true);
  SortByX(groupId, ".bar-label-bottom", data, xScale, xKey, duration, delay);
}

export function DummySortAll(groupId, data, xScale, xKey) {
  SortByX(groupId, "rect", data, xScale, xKey, 0, 0);
  SortByX(groupId, ".bar-label-top", data, xScale, xKey, 0, 0, true);
  SortByX(groupId, ".bar-label-bottom", data, xScale, xKey, 0, 0);
}

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
