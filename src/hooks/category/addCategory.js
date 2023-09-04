import useAlert from '../alert';
import { useAddCategoryMutation } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import {
  ALERT_MESSAGE_CATEGORY_ALREADY_EXIST,
  ALERT_MESSAGE_ON_FAILURE,
  ALERT_MESSAGE_ON_SUCCESS,
} from '../../utils/constraints';

export const useAddCategory = () => {
  const [addCategory] = useAddCategoryMutation();
  const { addLoading, removeLoading } = useActions();
  const openAlert = useAlert();
  const ACTION_NAME = 'addCategory';

  const add = (category) => {
    addLoading(ACTION_NAME);
    return addCategory(category)
      .unwrap()
      .then(() => {
        removeLoading(ACTION_NAME);
        openAlert(ALERT_MESSAGE_ON_SUCCESS, 'success');
      })
      .catch((e) => {
        removeLoading(ACTION_NAME);
        if (e?.originalStatus === 409) {
          openAlert(ALERT_MESSAGE_CATEGORY_ALREADY_EXIST, 'error');
        } else {
          openAlert(ALERT_MESSAGE_ON_FAILURE, 'error');
        }
      });
  };

  return {
    addCategory: add,
  };
};
