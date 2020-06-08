import { userConstants } from '../constant';
import { userService } from '../services';
export const userAction = {
    listUser,
    addUser,
    updateUser,
    deleteUser
}

function listUser() {
    return dispatch => {
        userService.listUser()
            .then(
                data => {
                    console.log(data)
                    if (data.status) {
                        dispatch(success(data.message));
                    } else {
                        dispatch(failure(data.message));
                    }

                }
            );
    }

    function request() {
        return {
            type: userConstants.USER_REQUEST
        }
    }
    function success(user) {
        return {
            type: userConstants.USER_REQUEST_SUCCESS,
            user
        }
    }
    function failure(error) {
        return {
            type: userConstants.USER_REQUEST_FAILURE,
            error
        }
    }
}

function addUser(user) {
    return dispatch => {
        userService.addUser(user)
            .then(
                data => {
                    console.log(data)
                    if (data.status) {
                        dispatch(success(data.status));
                    } else {
                        dispatch(failure(data.status));
                    }

                }
            );
    }

    function request() {
        return {
            type: userConstants.USER_CREATE_REQUEST
        }
    }
    function success(user) {
        return {
            type: userConstants.USER_CREATE_REQUEST_SUCCESS,
            user
        }
    }
    function failure(error) {
        return {
            type: userConstants.USER_CREATE_REQUEST_FAILURE,
            error
        }
    }
}

function updateUser(user) {
    return dispatch => {
        userService.updateUser(user)
            .then(
                data => {
                    console.log(data)
                    if (data.status) {
                        dispatch(success(data.status));
                    } else {
                        dispatch(failure(data.status));
                    }

                }
            );
    }

    function request() {
        return {
            type: userConstants.USER_UPDATE_REQUEST
        }
    }
    function success(user) {
        return {
            type: userConstants.USER_UPDATE_REQUEST_SUCCESS,
            user
        }
    }
    function failure(error) {
        return {
            type: userConstants.USER_UPDATE_REQUEST_FAILURE,
            error
        }
    }
}

function deleteUser(id) {
    return dispatch => {
        userService.deleteUser(id)
            .then(
                data => {                    
                    if (data.status) {
                        dispatch(listUser);
                    } else {
                        dispatch(failure(data.status));
                    }

                }
            );
    }

    function request() {
        return {
            type: userConstants.USER_DELETE_REQUEST
        }
    }
    function success(user) {
        return {
            type: userConstants.USER_DELETE_REQUEST_SUCCESS,
            user
        }
    }
    function failure(error) {
        return {
            type: userConstants.USER_DELETE_REQUEST_FAILURE,
            error
        }
    }
}
