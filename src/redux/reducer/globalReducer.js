import ActionType from './globalActionType';

let globalState = {
  isLogin: false,
};

const rootReducer = (state = globalState, action) => {
  if (action.type === ActionType.IS_LOGIN) {
  }

  if (action.type === ActionType.IS_LOGOUT) {
  }

  return state;
};

export default rootReducer;
