const initialState = { user: null, token: null };

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return { ...state, user: null, token: null };
    default:
      return state;
  }
}

export default authReducer;

export const login = payload => ({ type: 'LOGIN', payload });
export const logout = () => ({ type: 'LOGOUT' });
