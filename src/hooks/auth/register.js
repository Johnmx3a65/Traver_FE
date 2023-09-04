import { useRegisterMutation } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import useAlert from '../alert';
import { ALERT_MESSAGE_ON_FAILURE, ALERT_MESSAGE_USER_ALREADY_EXIST } from '../../utils/constraints';

export const useRegister = () => {
  const [register] = useRegisterMutation();
  const { addLoading, removeLoading } = useActions();
  const openAlert = useAlert();
  const ACTION_NAME = 'register';

  const registerUser = (user, onSuccess) => {
    addLoading(ACTION_NAME);
    return register(user)
      .unwrap()
      .then(() => {
        removeLoading(ACTION_NAME);
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((e) => {
        removeLoading(ACTION_NAME);
        if (e.status === 409) {
          openAlert(ALERT_MESSAGE_USER_ALREADY_EXIST, 'error');
        } else {
          openAlert(ALERT_MESSAGE_ON_FAILURE, 'error');
        }
      });
  };

  return {
    register: registerUser,
  };
};
