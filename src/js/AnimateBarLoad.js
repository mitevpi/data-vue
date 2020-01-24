import { selectAll } from "d3-selection";
import { transition } from "d3-transition";

function Grow(
  groupId,
  selection,
  data,
  yScale,
  yKey,
  svgHeight,
  duration = 1000,
  delay = 150,
  padding = 0
) {
  selectAll(`#${groupId}`)
    .selectAll(selection)
    .data(data)
    .transition()
    .delay((d, i) => {
      return i * delay;
    })
    .duration(duration)
    .attr("y", d => {
      return yScale(d[yKey]) - padding;
    })
    .attr("height", d => {
      return svgHeight - yScale(d[yKey]);
    });
}
export function GrowAll(
  groupId,
  data,
  yScale,
  yKey,
  svgHeight,
  duration = 1000,
  delay = 150
) {
  Grow(groupId, "rect", data, yScale, yKey, svgHeight, duration, delay);
  Grow(groupId, ".bar-label-top", data, yScale, yKey, svgHeight, duration, delay, 5);
}
