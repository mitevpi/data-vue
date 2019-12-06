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
  xScale.domain(
    data.map(d => {
      return d[xKey];
    })
  );

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
