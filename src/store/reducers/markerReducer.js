import { MARKERS } from "../types"

const initalState = {
    markers: [],
    current: null
}

export default (state = initalState, action ) => {
    switch(action.type){
        case MARKERS.SET:
            return { ...state, markers: action.payload}
        case MARKERS.SET_CURRENT:
            return { ...state, current: action.payload}
        default:
            return state
    }
}