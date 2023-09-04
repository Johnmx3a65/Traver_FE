import useAlert from '../alert';
import { useActions } from '../actions';
import { useEditCategoryMutation } from '../../store/traver/traver.api';
import { ALERT_MESSAGE_ON_FAILURE, ALERT_MESSAGE_ON_SUCCESS } from '../../utils/constraints';

export const useEditCategory = () => {
  const [editCategory] = useEditCategoryMutation();
  const { addLoading, removeLoading } = useActions();
  const openAlert = useAlert();
  const ACTION_NAME = 'editCategory';

  const edit = (category) => {
    addLoading(ACTION_NAME);
    return editCategory(category)
      .unwrap()
      .then(() => {
        removeLoading(ACTION_NAME);
        openAlert(ALERT_MESSAGE_ON_SUCCESS, 'success');
      })
      .catch(() => {
        removeLoading(ACTION_NAME);
        openAlert(ALERT_MESSAGE_ON_FAILURE, 'error');
      });
  };

  return {
    editCategory: edit,
  };
};
