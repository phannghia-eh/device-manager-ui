import mockingData from '../../mockingData'

const initState = {
  items: []
}

const device = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_NEW_DEVICE_SUCCESS':
      return {
        ...state,
        items: [
          ...state.items,
          action.payload.device
        ]
      }
    case 'EDIT_DEVICE_SUCCESS':
      return {
        ...state,
        items: state.items.map(i => {
          if (i.id === action.payload.device.id)
            return action.payload.device
          else return i
        })
      }
    case 'FETCH_LIST_DEVICE_SUCCESS':
      return {
        ...state,
        items: action.payload.items
      }
    default:
      return state
  }
}

export default device