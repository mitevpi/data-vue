import { selectAll } from "d3-selection";
import { transition } from "d3-transition";

export function Grow(
  groupId,
  data,
  yScale,
  yKey,
  svgHeight,
  duration = 1000,
  delay = 150
) {
  selectAll(`#${groupId}`)
    .selectAll("rect")
    .data(data)
    .transition()
    .delay((d, i) => {
      return i * delay;
    })
    .duration(duration)
    .attr("y", d => {
      return yScale(d[yKey]);
    })
    .attr("height", d => {
      return svgHeight - yScale(d[yKey]);
    });
}

export function SortByX(
  groupId,
  data,
  xScale,
  xKey,
  duration = 1000,
  delay = 150
) {
  selectAll(`#${groupId}`)
    .selectAll("rect")
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
