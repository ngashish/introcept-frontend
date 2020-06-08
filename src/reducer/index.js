import { combineReducers } from 'redux';

import { users } from './user';

const rootreducer = combineReducers({
    users
});

export default rootreducer;