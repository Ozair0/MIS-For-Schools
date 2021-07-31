export const state = () => ({
  sidebar: true
});

export const mutations = {
  showHide(state) {
    state.sidebar = !state.sidebar;
  }
};
