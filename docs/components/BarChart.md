# BarChart

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

<!-- @vuese:BarChart:props:end -->


## Methods

<!-- @vuese:BarChart:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|AnimateLoad|Run the animation which "grows" the bar chart from the default 0 values.|-|
|AddResizeListener|Add a listener to udpate and redraw the chart after X seconds of a resize event.|-|

<!-- @vuese:BarChart:methods:end -->


