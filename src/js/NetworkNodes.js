export class NetworkNodes {
  constructor(nodeSizeKey, padding, bounds) {
    this.nodeSizeKey = nodeSizeKey;
    this.padding = padding;
    this.bounds = bounds;
  }

  ComputeTruePadding(node) {
    return this.ComputeSize(node) + this.padding;
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
    if (Object.prototype.hasOwnProperty.call(node, this.nodeSizeKey))
      return node[this.nodeSizeKey];
    return 20;
  }
}
