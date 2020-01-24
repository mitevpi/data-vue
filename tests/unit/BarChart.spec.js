import { mount } from "@vue/test-utils";
import BarChart from "../../src/components/BarChart.vue";

const barData = [
  {
    name: "Roses",
    amount: 25
  },
  {
    name: "Tulips",
    amount: 40
  },
  {
    name: "Daisies",
    amount: 15
  },
  {
    name: "Narcissuses",
    amount: 9
  }
];

describe("BarChart.vue", () => {
  const wrapperSlim = mount(BarChart, {
    propsData: {
      title: "Bar Chart",
      "x-key": "name",
      "y-key": "amount",
      data: barData
    }
  });

  const wrapperFull = mount(BarChart, {
    propsData: {
      title: "Bar Chart",
      "x-key": "name",
      "y-key": "amount",
      data: barData,
      "top-labels": true,
      "bottom-labels": true
    }
  });

  it("has a mounted hook", () => {
    expect(typeof BarChart.mounted).toBe("function");
  });

  it("renders bars with the bar-positive class", () => {
    expect(wrapperSlim.findAll(".bar-positive").length).toEqual(4);
  });

  it("renders top labels on prompt", () => {
    expect(wrapperFull.findAll(".bar-label-top").length).toEqual(4);
  });

  it("renders bottom labels on prompt", () => {
    expect(wrapperFull.findAll(".bar-label-top").length).toEqual(4);
  });

  it("doesn't render bottom labels by default", () => {
    expect(wrapperSlim.findAll(".bar-label-top").length).toBe(0);
  });

  it("doesn't render top labels by default", () => {
    expect(wrapperSlim.findAll(".bar-label-top").length).toBe(0);
  });

  it("renders title when passed via prop", () => {
    expect(wrapperSlim.text()).toMatch("Bar Chart");
  });
});
