import SavedActionTypes from './saved.types';

import { firestore } from '../../firebase/firebase.utils';

// *Toggle the saved "cart"
export const toggleSavedHidden = () => ({
  type: SavedActionTypes.TOGGLE_SAVED_HIDDEN,
});

// *Set saved (this is just to update state with latest data)
export const setSaved = savedItems => ({
  type: SavedActionTypes.SET_SAVED,
  payload: savedItems,
});

// *Add saved
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
    dispatch(addSavedStart());

    savedRef
      .doc(product.id.toString(10))
      .set({
        ...product,
      })
      .then(snapShot => {
        dispatch(addSavedSuccess(product));
      })
      .catch(error => dispatch(addSavedFailure(error.message)));
  };
};

// *Get saved
export const fetchSavedStart = () => ({
  type: SavedActionTypes.FETCH_SAVED_START,
});

export const fetchSavedSuccess = data => ({
  type: SavedActionTypes.FETCH_SAVED_SUCCESS,
  payload: data,
});

export const fetchSavedFailure = errorMessage => ({
  type: SavedActionTypes.FETCH_SAVED_FAILURE,
  payload: errorMessage,
});

export const fetchSavedStartAsync = userID => {
  return dispatch => {
    const savedRef = firestore.collection(`users/${userID}/saved`);
    dispatch(fetchSavedStart());
    savedRef
      .get()
      .then(snapShot => {
        // *docs is [product...]
        const docs = [];
        snapShot.forEach(doc => {
          docs.push(doc.data());
        });
        dispatch(fetchSavedSuccess(docs));
      })
      .catch(error => dispatch(fetchSavedFailure(error.message)));
  };
};

// *Delete saved
export const deleteSavedStart = () => ({
  type: SavedActionTypes.DELETE_SAVED_START,
});

export const deleteSavedSuccess = productID => ({
  type: SavedActionTypes.DELETE_SAVED_SUCCESS,
  payload: productID,
});

export const deleteSavedFailure = errorMessage => ({
  type: SavedActionTypes.DELETE_SAVED_FAILURE,
  payload: errorMessage,
});

export const deleteSavedStartAsync = (userID, productID) => {
  return dispatch => {
    const savedRef = firestore.collection(`users/${userID}/saved`);
    dispatch(deleteSavedStart());

    savedRef
      .doc(productID.toString(10))
      .delete()
      .then(snapShot => {
        dispatch(deleteSavedSuccess(productID));
      })
      .catch(error => dispatch(deleteSavedFailure(error.message)));
  };
};
