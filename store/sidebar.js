export const state = () => ({
  sidebar: false
});

export const mutations = {
  showHide(state) {
    state.sidebar = !state.sidebar;
  }
};
