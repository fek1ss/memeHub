const initialState = { comments: [] };

function CommentsReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE':
      return {
        ...state,
        comments: action.payload.comments,
      };
    default:
      return state;
  }
}

export default CommentsReducer;

export const addComments = payload => ({ type: 'CREATE', payload });
