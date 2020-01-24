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

export function SortBars(
  groupId,
  data,
  xScale,
  xKey,
  duration = 1000,
  delay = 150
) {
  SortByX(groupId, "rect", data, xScale, xKey, duration, delay);
}

export function SortLabels(
  groupId,
  data,
  xScale,
  xKey,
  duration = 1000,
  delay = 150
) {
  SortByX(groupId, "text", data, xScale, xKey, duration, delay, true);
}
export function SortAll(
  groupId,
  data,
  xScale,
  xKey,
  duration = 1000,
  delay = 150
) {
  SortBars(groupId, data, xScale, xKey, duration, delay);
  SortLabels(groupId, data, xScale, xKey, duration, delay);
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
