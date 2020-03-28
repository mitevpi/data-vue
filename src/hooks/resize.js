export function addResizeListener(state, container, method) {
  window.addEventListener("resize", () => {
    state.redrawToggle = false;
    setTimeout(() => {
      state.redrawToggle = true;
      state.svgWidth = container.offsetWidth * 0.85;
      method();
    }, 300);
  });
}
