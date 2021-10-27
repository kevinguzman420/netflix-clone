// const 
const dataInitial = { 
  modalIsShowed: false, 
  modalData: {},
} 

//types 
const SHOW_MODAL = 'SHOW_MODAL';
const MODAL_DATA = 'MODAL_DATA';

// reducer
export default function modalReducer(state = dataInitial, action) {
  switch(action.type) {
    case SHOW_MODAL:
      return {...state, modalIsShowed: action.payload}
    case MODAL_DATA:
      return {...state, modalData: action.payload}
    default:
      return state;
  }
}

// actions
export const showModalAction = (flag) => (dispatch, getState) => {
  dispatch({
    type: SHOW_MODAL,
    payload: flag
  });
}
// get Moda Data
export const getModalDataAction = (movie) => (dispatch) => {
  //console.log(movie);
  dispatch({
    type: MODAL_DATA,
    payload: movie,
  })
}
