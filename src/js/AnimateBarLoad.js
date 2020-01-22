import { selectAll } from "d3-selection";
import { transition } from "d3-transition";

function Grow(
  groupId,
  data,
  yScale,
  yKey,
  svgHeight,
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
    .attr("y", d => {
      return yScale(d[yKey]);
    })
    .attr("height", d => {
      return svgHeight - yScale(d[yKey]);
    });
}

export function GrowBars(
  groupId,
  data,
  yScale,
  yKey,
  svgHeight,
  duration = 1000,
  delay = 150
) {
  Grow(groupId, data, yScale, yKey, svgHeight, duration, delay, "rect");
}

export function GrowLabels(
  groupId,
  data,
  yScale,
  yKey,
  svgHeight,
  duration = 1000,
  delay = 150
) {
  Grow(groupId, data, yScale, yKey, svgHeight, duration, delay, "text");
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
  GrowBars(groupId, data, yScale, yKey, svgHeight, duration, delay);
  GrowLabels(groupId, data, yScale, yKey, svgHeight, duration, delay);
}
