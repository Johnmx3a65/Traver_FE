import { useAddUserMutation } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import useAlert from '../alert';
import {
  ALERT_MESSAGE_ON_FAILURE,
  ALERT_MESSAGE_ON_SUCCESS,
  ALERT_MESSAGE_USER_ALREADY_EXIST,
} from '../../utils/constraints';

export const useAddUser = () => {
  const [addUser] = useAddUserMutation();
  const { addLoading, removeLoading } = useActions();
  const openAlert = useAlert();
  const ACTION_NAME = 'addUser';

  const add = (user) => {
    addLoading(ACTION_NAME);
    return addUser(user)
      .unwrap()
      .then(() => {
        removeLoading(ACTION_NAME);
        openAlert(ALERT_MESSAGE_ON_SUCCESS, 'success');
      })
      .catch((e) => {
        removeLoading(ACTION_NAME);
        if (e?.originalStatus === 409) {
          openAlert(ALERT_MESSAGE_USER_ALREADY_EXIST, 'error');
        } else {
          openAlert(ALERT_MESSAGE_ON_FAILURE, 'error');
        }
      });
  };

  return {
    addUser: add,
  };
};
