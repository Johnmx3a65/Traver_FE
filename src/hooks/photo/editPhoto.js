import { useEditPhotoMutation } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import useAlert from '../alert';
import { ALERT_MESSAGE_ON_FAILURE, ALERT_MESSAGE_ON_SUCCESS } from '../../utils/constraints';

export const useEditPhoto = () => {
  const [editPhoto] = useEditPhotoMutation();
  const { addLoading, removeLoading } = useActions();
  const openAlert = useAlert();
  const ACTION_NAME = 'editPhoto';

  const edit = (photo) => {
    addLoading(ACTION_NAME);
    return editPhoto(photo)
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
    editPhoto: edit,
  };
};
