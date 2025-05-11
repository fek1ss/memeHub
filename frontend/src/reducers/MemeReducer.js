const initialState = {
  memes: [],
  selectedMeme: null,
  isEditModal: false,
};

function memesReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        memes: [...state.memes, action.payload],
      };
    case 'SELECT_MEME':
      return {
        ...state,
        selectedMeme: action.payload,
        isEditModal: true,
      };

    case 'CLOSE_MODAL':
      return { ...state, selectedMeme: null, isEditModal: false };

    default:
      return state;
  }
}

export default memesReducer;

export const addMeme = payload => ({ type: 'ADD', payload });
export const selectMeme = payload => ({
  type: 'SELECT_MEME',
  payload,
});
export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});
