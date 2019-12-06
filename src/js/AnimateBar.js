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
