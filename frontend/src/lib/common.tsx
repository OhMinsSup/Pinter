import { Dispatch, Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

export function createPromiseThunk(actionType: string, promiseCreator: any): ActionCreator<ThunkAction<Promise<Action>, any, any, any>> {
    return (...params: any[]) => {
        return async (dispatch: Dispatch<any>): Promise<Action> => {
            // promise begins
            dispatch({ type: `${actionType}_PENDING` });
            try {
            const response = await promiseCreator(...params);
            dispatch({
                type: `${actionType}_SUCCESS`,
                payload: response
            });
            return response;
            } catch (e) {
            dispatch({
                type: `${actionType}_ERROR`,
                payload: e
            });
            throw e;
            }
        };
    }
}

export const escapeForUrl = (text: string): string => {
    return text
    .replace(
        /[^0-9a-zA-Zㄱ-힣\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf ]/g,
        ' ',
    )
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
};

export const getScrollTop = () => {
    if (!document.body) return 0;
    const scrollTop = document.documentElement
      ? document.documentElement.scrollTop
      : document.body.scrollTop;
    return scrollTop;
};
  
export const getScrollBottom = () => {
    if (!document.body) return 0;
    const { scrollHeight } = document.body;
    const { innerHeight } = window;
    const scrollTop = getScrollTop();
    return scrollHeight - innerHeight - scrollTop;
};
  
export type GenericResponseAction<D, M> = {
    type: string,
    payload: {
      data: D
    },
    meta: M
} 