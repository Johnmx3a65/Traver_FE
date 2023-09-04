import { useAddLocationMutation } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import useAlert from '../alert';
import {
  ALERT_MESSAGE_LOCATION_ALREADY_EXIST,
  ALERT_MESSAGE_ON_FAILURE,
  ALERT_MESSAGE_ON_SUCCESS,
} from '../../utils/constraints';

export const useAddLocation = () => {
  const [addLocation] = useAddLocationMutation();
  const { addLoading, removeLoading } = useActions();
  const openAlert = useAlert();
  const ACTION_NAME = 'addLocation';

  const add = (location) => {
    addLoading(ACTION_NAME);
    return addLocation(location)
      .unwrap()
      .then(() => {
        removeLoading(ACTION_NAME);
        openAlert(ALERT_MESSAGE_ON_SUCCESS, 'success');
      })
      .catch((e) => {
        removeLoading(ACTION_NAME);
        if (e?.originalStatus === 409) {
          openAlert(ALERT_MESSAGE_LOCATION_ALREADY_EXIST, 'error');
        } else {
          openAlert(ALERT_MESSAGE_ON_FAILURE, 'error');
        }
      });
  };

  return {
    addLocation: add,
  };
};
