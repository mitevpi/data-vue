# CirclePack

## Props

<!-- @vuese:CirclePack:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|xKey|The name of the property in the dataset to use for defining "identity"|`String`|`false`|-|
|yKey|The name of the property in the dataset to use for defining scalar amounts|`String`|`false`|-|
|width|The desired width of the visualization|`Number`|`false`|-|
|height|The desired height of the visualization|`Number`|`false`|-|
|nodes|The array of data poitns to visualize|`Array`|`false`|-|

<!-- @vuese:CirclePack:props:end -->


## Methods

<!-- @vuese:CirclePack:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|CreateSimulation|Create the force simulation which will animate the component.|-|
|AddNodes|Add the nodes as svg circle elements to the DOM.|-|
|Simulate|Initiate the simulation animation.|-|
|Reconfigure|Randomize the positions of the circles on the screen.|-|

<!-- @vuese:CirclePack:methods:end -->


## Computed

<!-- @vuese:CirclePack:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|dataMax|`Number`|The maximum value in the core dataset.|No|
|dataMin|`Number`|The minimum value in the core dataset.|No|
|groupId|`String`|The unique identifier for the group of svg child elements created by this component.|No|

<!-- @vuese:CirclePack:computed:end -->


