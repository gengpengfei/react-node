import TYPES from "./actionTypes";
export function userInfoAction(user_type, user_info) {
    switch (user_type) {
        case "GET_USER_INFO":
            return {
                type: TYPES.GET_USER_INFO,
                value: user_info
            };
            break;
        default:
    }
}
