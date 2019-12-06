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
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = mount(BarChart, {
      propsData: {
        title: msg,
        "x-key": "name",
        "y-key": "amount",
        data: barData
      }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
