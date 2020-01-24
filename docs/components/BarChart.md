# BarChart

Animated, reactive bar chart

## Props

<!-- @vuese:BarChart:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|Title of the chart|`String`|`false`|-|
|xKey|The name of the property in the dataset to use for the X axis|`String`|`false`|-|
|yKey|The name of the property in the dataset to use for the Y axis|`String`|`false`|-|
|data|The array of data objects to visualize|`Array`|`false`|-|
|animation|(Optional) What kind of animation to apply to the chart|`String`|`false`|-|
|barColor|(Optional) The default color to apply on the bars|`String`|`false`|-|
|hoverColor|(Optional) The color to apply on the bars when hovered over|`String`|`false`|-|
|topLabels|(Optional) Whether or not to have labels at the top of each bar|`Boolean`|`false`|-|
|bottomLabels|(Optional) Whether or not to have labels at the bottom of each bar|`Boolean`|`false`|-|

<!-- @vuese:BarChart:props:end -->


## Methods

<!-- @vuese:BarChart:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|AddResizeListener|Add a listener to update and redraw the chart after X seconds of a resize event.|-|

<!-- @vuese:BarChart:methods:end -->


## Computed

<!-- @vuese:BarChart:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|groupId|`String`|A unique ID for the `svg`/`g` container for this chart.|No|
|dataMax|`Number`|The maximum value in the core dataset.|No|
|dataMin|`Number`|The minimum value in the core dataset.|No|
|xScale|`Function`|The D3 scale function for the X axis (based on the X key).|No|
|yScale|`Function`|The D3 scale function for the Y axis (based on the Y key).|No|
|svgHeight|`Number`|The computed height of the SVG container, based on the overall width.|No|
|sortTransition|`String`|Whether or not to activate the sort transition animation (if active on render, it will conflict with the "grow" animation.|No|

<!-- @vuese:BarChart:computed:end -->


## Data

<!-- @vuese:BarChart:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|svgWidth|`Number`|The width of the SVG element, determined by the width of the parent div.|0|
|redrawToggle|`Boolean`|Whether or not to redraw the bar chart and re-run the animation (based on resize event).|true|

<!-- @vuese:BarChart:data:end -->


