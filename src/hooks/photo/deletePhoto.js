import { useDeletePhotoMutation } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import useAlert from '../alert';
import { ALERT_MESSAGE_ON_FAILURE, ALERT_MESSAGE_ON_SUCCESS } from '../../utils/constraints';

export const useDeletePhoto = () => {
  const [deletePhoto] = useDeletePhotoMutation();
  const { addLoading, removeLoading } = useActions();
  const openAlert = useAlert();
  const ACTION_NAME = 'deletePhoto';

  const deleteHandler = (id) => {
    addLoading(ACTION_NAME);
    return deletePhoto(id)
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
    deletePhoto: deleteHandler,
  };
};
