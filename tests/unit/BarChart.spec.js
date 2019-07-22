import { shallowMount } from "@vue/test-utils";
// import BarChart from "../../src/components/BarChart.vue";

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
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(BarChart, {
      title: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
