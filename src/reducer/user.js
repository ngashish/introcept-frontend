import { userConstants } from '../constant';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.USER_REQUEST_SUCCESS:
      return {
        userList: action.user
      };
    case userConstants.USER_CREATE_REQUEST_SUCCESS:
      console.log(state = {}, action)
      return {
        userAdd: action.user
      };
    case userConstants.USER_UPDATE_REQUEST_SUCCESS:
      console.log(state = {}, action)
      return {
        userUpdate: action.user
      };
    case userConstants.USER_DELETE_REQUEST_SUCCESS:
      console.log(state = {}, action)
      return {
        userDelete: action.user
      };
    default:
      return state
  }
}