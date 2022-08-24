import React from "react";

const UPDATE_SELECTED_CATEGORY = "UPDATE_SELECTED_CATEGORY"
const ACTION = {
    UPDATE_SELECTED_CATEGORY
}

const initialState = {
    selectedCategory: 'all'
}

function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case ACTION.UPDATE_SELECTED_CATEGORY:
            {
                return { ...state, selectedCategory: payload }
            }
    }

    return state
}

const StateContext = React.createContext();
const StateProvider = ({ children }) => {
    const reducerContext = React.useReducer(reducer, initialState);
    // 1. state variable => initialState;
    // 2. dispatch function => dispatch actions
    return <StateContext.Provider value={reducerContext}>
        {children}
    </StateContext.Provider>
}
// custom hooks
const useSelector = (fn) => fn(React.useContext(StateContext)[0]);
const useDispatch = () => React.useContext(StateContext)[1]

export { StateProvider, useSelector, useDispatch, ACTION }