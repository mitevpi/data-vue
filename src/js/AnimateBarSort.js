import { selectAll } from "d3-selection";

function SortByX(
  groupId,
  data,
  xScale,
  xKey,
  duration = 1000,
  delay = 150,
  selection
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
      return xScale(d[xKey]);
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
  SortByX(groupId, data, xScale, xKey, duration, delay, "rect");
}

export function SortLabels(
  groupId,
  data,
  xScale,
  xKey,
  duration = 1000,
  delay = 150
) {
  SortByX(groupId, data, xScale, xKey, duration, delay, "text");
}
export function SortAll(
  groupId,
  data,
  xScale,
  xKey,
  duration = 1000,
  delay = 150
) {
  SortByX(groupId, data, xScale, xKey, duration, delay, "rect");
  SortByX(groupId, data, xScale, xKey, duration, delay, "text");
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
