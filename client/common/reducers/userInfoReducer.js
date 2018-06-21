import * as TYPES from "../actions/actionTypes";

export function userInfoReducer(state = init, action) {
    switch (action.type) {
        case TYPES.GET_USER_INFO:
            return {
                ...state,
                userInfo: action.value
            };
        default:
            return state;
    }
}
const init = {
    userInfo: null
};
