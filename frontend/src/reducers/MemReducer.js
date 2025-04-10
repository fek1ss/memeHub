const initialState = { memes: [] };

function memeReducer(state = initialState, action) {
  switch (action.type) {
    case 'DELETE':
      return {
        ...state,
        memes: state.memes.filter(
          meme => meme.id !== action.payload.id,
        ),
      };
    case 'ADD':
      return {
        ...state,
        memes: [...state.memes, action.payload.memes],
      };
    default:
      return state;
  }
}

export default memeReducer;

export const addMeme = payload => ({ type: 'ADD', payload });
export const deleteMeme = id => ({ type: 'DELETE', payload: { id } });
