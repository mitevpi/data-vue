# Network

## Props

<!-- @vuese:Network:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|width|-|`Number`|`false`|-|
|height|-|`Number`|`false`|-|
|graph|The array of data objects to visualize|`Object`|`false`|-|
|yKey|The name of the property in the dataset to define node scaling|`String`|`false`|-|
|xKey|The name of the property in the dataset to define node identity|`String`|`false`|-|
|nodeColor|(Optional) The color to apply on the nodes in the network|`String`|`false`|-|
|nodeColorHover|(Optional) The color to apply on the nodes in the network when hovered over|`String`|`false`|-|
|nodeStrokeSize|(Optional) The stroke width to apply on the nodes in the network|`Number`|`false`|-|
|nodeStrokeSizeHover|(Optional) The stroke width to apply on the nodes in the network when hovered over|`Number`|`false`|-|
|nodeStrokeColor|(Optional) The stroke color to apply on the nodes in the network|`Number`|`false`|-|
|lineSize|(Optional) The stroke width to apply to the links between nodes in the network|`Number`|`false`|-|
|lineColor|(Optional) The stroke color to apply to the links between nodes in the network|`String`|`false`|-|
|nodeLabels|(Optional) Whether or not to have labels on each node|`Boolean`|`false`|-|

<!-- @vuese:Network:props:end -->


## Computed

<!-- @vuese:Network:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|dataMax|`Number`|The maximum value in the core dataset.|No|
|dataMin|`Number`|The minimum value in the core dataset.|No|

<!-- @vuese:Network:computed:end -->


