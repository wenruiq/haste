import SavedActionTypes from './saved.types';

import { firestore } from '../../firebase/firebase.utils';

export const addSavedStart = () => ({
  type: SavedActionTypes.ADD_SAVED_START,
});

export const addSavedSuccess = product => ({
  type: SavedActionTypes.ADD_SAVED_SUCCESS,
  payload: product,
});

export const addSavedFailure = errorMessage => ({
  type: SavedActionTypes.ADD_SAVED_FAILURE,
  payload: errorMessage,
});

export const addSavedStartAsync = (userID, product) => {
  return dispatch => {
    const savedRef = firestore.collection(`users/${userID}/saved`);
    console.log(product);
    dispatch(addSavedStart());

    savedRef
      .add({
        ...product,
      })
      .then(snapShot => {
        dispatch(addSavedSuccess(product));
      })
      .catch(error => dispatch(addSavedFailure(error.message)));
  };
};

// todo: fetchSaved actions...
