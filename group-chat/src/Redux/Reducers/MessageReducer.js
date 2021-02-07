const init = { Messages: [] }
export const MsgReducer = (state = init, Actions) => {
    if (Actions.type === "AddMsg") {
        return {
            ...state,
            Messages: [...state.Messages, Actions.payload]
        }
    }else{
        return state
    }
}
