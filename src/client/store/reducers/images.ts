import { ImagesActionsTypes } from '../action-types/images';
import {Action} from '../actions/index';

export type ImagesState = {
  data: Array<string>,
  isLoading: boolean,
  prevImage?: string,
  nextImage?: string,
}

const initialState = {
  data: [],
  prevImage: undefined,
  nextImage: undefined,
  isLoading: false,
  error: null,
}

function reducer(state: ImagesState = initialState, action: Action) {
  switch (action.type) {
    case ImagesActionsTypes.FETCH_IMAGES_SUCCESS: {
      return {
        ...state,
        data: action.payload.images,
        prevImage: action.payload.before,
        nextImage: action.payload.after,
        isLoading: false,
      }
    }
    case ImagesActionsTypes.FETCH_IMAGES_ERROR: {
      return {
        ...state,
        data: [],
        isLoading: false,
        error: action.payload, // TODO: Add a system message for this
      }
    }
    case ImagesActionsTypes.FETCH_IMAGES: {
      return {
        ...state,
        isLoading: true,
      }
    }
    default:
      return state;
  }
}

export const imagesReducer = reducer;
