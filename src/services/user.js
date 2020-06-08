import Constant from '../config/apiConstant';

export const userService = {
    listUser,
    addUser,
    updateUser,
    deleteUser
}

function listUser() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${Constant.API_URL}`, requestOptions).then(handleResponse);
}

function addUser(user) {
    const requestOptions = {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(user)
    };
    return fetch(`${Constant.API_URL}/add`, requestOptions).then(handleResponse);
}

function updateUser(user) {
    const requestOptions = {
        method: 'PUT',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(user)
    };
    return fetch(`${Constant.API_URL}/update`, requestOptions).then(handleResponse);
}

function deleteUser(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: new Headers({ 'Content-Type': 'application/json' }),
    };
    return fetch(`${Constant.API_URL}/delete/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log('handle response :', data);
        if (!response.ok) {
            if (response.status === 403) {
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}