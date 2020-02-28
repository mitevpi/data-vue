export class NetworkNodes {
  constructor(nodeSizeKey, nodeStrokeSizeKey, padding, bounds) {
    this.nodeSizeKey = nodeSizeKey;
    this.nodeStrokeSizeKey = nodeStrokeSizeKey;
    this.padding = padding;
    this.bounds = bounds;
  }

  ComputeTruePadding(node) {
    return this.ComputeSize(node) + this.padding;
  }

  ComputeProperty(dataset, key, alternative) {
    if (Object.prototype.hasOwnProperty.call(dataset, key)) return dataset[key];
    if (!Number.isNaN(key)) return +key;
    return alternative;
  }

  ComputeX(node, width) {
    const truePadding = this.ComputeTruePadding(node);
    return (
      truePadding +
      ((node.x - this.bounds.minX) * (width - 2 * truePadding)) /
        (this.bounds.maxX - this.bounds.minX)
    );
  }

  ComputeY(node, height) {
    const truePadding = this.ComputeTruePadding(node);
    return (
      truePadding +
      ((node.y - this.bounds.minY) * (height - 2 * truePadding)) /
        (this.bounds.maxY - this.bounds.minY)
    );
  }

  ComputeSize(node) {
    return this.ComputeProperty(node, this.nodeSizeKey, 20);
  }

  ComputeStrokeSize(node) {
    return this.ComputeProperty(node, this.nodeStrokeSizeKey, 0.5);
  }
}
