export const state = () => ({
  showFooterImage: true
});

export const mutations = {
  showHide(state, payload) {
    state.showFooterImage = payload;
  }
};
