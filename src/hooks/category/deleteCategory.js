import useAlert from '../alert';
import { useActions } from '../actions';
import { useDeleteCategoryMutation } from '../../store/traver/traver.api';
import { ALERT_MESSAGE_ON_FAILURE, ALERT_MESSAGE_ON_SUCCESS } from '../../utils/constraints';

export const useDeleteCategory = () => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const { addLoading, removeLoading } = useActions();
  const openAlert = useAlert();
  const ACTION_NAME = 'deleteCategory';

  const deleteHandler = (id) => {
    addLoading(ACTION_NAME);
    return deleteCategory(id)
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
    deleteCategory: deleteHandler,
  };
};
