import { useEditLocationMutation } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import useAlert from '../alert';
import { ALERT_MESSAGE_ON_FAILURE, ALERT_MESSAGE_ON_SUCCESS } from '../../utils/constraints';

export const useEditLocation = () => {
  const [editLocation] = useEditLocationMutation();
  const { addLoading, removeLoading } = useActions();
  const openAlert = useAlert();
  const ACTION_NAME = 'editLocation';

  const edit = (category) => {
    addLoading(ACTION_NAME);
    return editLocation(category)
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
    editLocation: edit,
  };
};
