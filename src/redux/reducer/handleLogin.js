
const initialState = {
    hideButtons: false,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HIDE_BUTTONS':
            return {
                ...state,
                hideButtons: true,
            };
        case 'SHOW_BUTTONS':
            return {
                ...state,
                hideButtons: false,
            };
        default:
            return state;
    }
};

export default loginReducer;