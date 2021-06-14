import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.jsx';


import logger from 'redux-logger';

// Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// all the students from the DB
const studentList = (state = [], action) => {
    if(action.type === 'SET_STUDENT_LIST') {
        return action.payload;
    }

    return state;
}

// hold only the single student object being edited
const editStudent = (state  = {}, action) => {
    
    switch (action.type) {
        case 'SET_EDIT_STUDENT':
            //action.payload here is the DB row.object being edited
            return action.payload;
        case 'EDIT_ONCHANGE':
        //update the github_name field, or whatever they sent, really
        //keep whats not being changed the same
        return {
            ...state, 
            //compute the value of action.payload.property
            //make that the key
            [action.payload.property]: action.payload.value
        }
        //change the sent property to the sent value
        case 'EDIT_CLEAR':
            return {}
    }
    return state;
}

// The store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    combineReducers({
        studentList,
        editStudent
    }),
    applyMiddleware(logger),
);


// Wrap our App in a Provider, this makes Redux available in
// our entire application
ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));

