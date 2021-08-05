import {ImagesActionsTypes} from "../action-types/images";
import {Dispatch} from 'redux';
import {fetchImages, fetchNextImages, fetchPrevImages} from '../../api/images';

interface FetchImagesSuccessAction {
  type: ImagesActionsTypes.FETCH_IMAGES_SUCCESS
  payload?: any
}

interface FetchImagesRequestAction {
  type: ImagesActionsTypes.FETCH_IMAGES
}

interface FetchImagesErrorAction {
  type: ImagesActionsTypes.FETCH_IMAGES_ERROR
  payload: Error
}

export type Action = FetchImagesSuccessAction | FetchImagesRequestAction | FetchImagesErrorAction;

interface GetImagesOptsType {
  imagesType: string,
  after?: string,
  before?: string,
};

interface ApiResponse {
  data: object,
}

export const getImages = (subReddit: string, opts: GetImagesOptsType = {imagesType: 'new', after: undefined, before: undefined}) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ImagesActionsTypes.FETCH_IMAGES,
    });

    const {imagesType, after, before} = opts;

    if (after !== undefined && before !== undefined) {
      throw new Error('Cannot provide both after and before options');
    }

    let promise = null;

    if (after !== undefined) {
      promise = fetchNextImages(subReddit, imagesType, after);
    }

    if (before !== undefined) {
      promise = fetchPrevImages(subReddit, imagesType, before);
    }

    if (promise === null) {
      promise = fetchImages(subReddit, imagesType);
    }

    promise
      .then((response: ApiResponse) => {
        dispatch({
          type: ImagesActionsTypes.FETCH_IMAGES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: ImagesActionsTypes.FETCH_IMAGES_ERROR,
          payload: error,
        });
      });
  }
}
