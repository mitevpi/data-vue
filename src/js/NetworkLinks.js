export class NetworkLinks {
  constructor(linkSizeKey) {
    this.linkSizeKey = linkSizeKey;
  }

  ComputeSize(link) {
    if (Object.prototype.hasOwnProperty.call(link, this.linkSizeKey))
      return link[this.linkSizeKey];
    if (!Number.isNaN(this.linkSizeKey)) return +this.linkSizeKey;
    return 2;
  }
}
