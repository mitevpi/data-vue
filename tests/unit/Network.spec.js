import { mount } from "@vue/test-utils";
import { MockData } from "@mitevpi/algos";
import Network from "../../src/components/Network.vue";

const dataLength = 50;
const netData = MockData.networkData(dataLength);
netData.nodes.map(node => {
  node.x = null;
});

describe("Network.vue", () => {
  const wrapperSlim = mount(Network, {
    propsData: {
      width: 600,
      height: 600,
      graph: netData
    }
  });

  const wrapperFull = mount(Network, {
    propsData: {
      width: 600,
      height: 600,
      graph: netData,
      "node-size": "size",
      "node-color": "lightgray",
      "link-color": "gray",
      "node-label-key": "size"
    }
  });

  it("has a mounted hook", () => {
    expect(typeof Network.mounted).toBe("function");
  });

  it("renders a svg element", () => {
    // expect(wrapperSlim.findAll("svg").exists()).toBe(true);
    expect(wrapperFull.findAll("svg").exists()).toBe(true);
  });

  it("renders nodes with the network-node class", () => {
    // expect(wrapperSlim.findAll(".network-node").length).toEqual(dataLength);
    expect(wrapperFull.findAll(".network-node").length).toEqual(dataLength);
  });

  it("renders links with the network-link class", () => {
    // expect(wrapperSlim.findAll(".network-link").length).toEqual(dataLength - 1);
    expect(wrapperFull.findAll(".network-link").length).toEqual(dataLength - 1);
  });

  it("renders node labels on prompt", () => {
    expect(wrapperFull.findAll(".network-node-label").length).toEqual(
      dataLength
    );
  });

  it("doesn't render node labels by default", () => {
    expect(wrapperSlim.findAll(".network-node-label").length).toBe(0);
  });
});
