import { useResetPasswordMutation } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import useAlert from '../alert';
import { ALERT_MESSAGE_ON_FAILURE, ALERT_MESSAGE_ON_SUCCESSFUL_PASSWORD_RESET } from '../../utils/constraints';

export const useResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const { addLoading, removeLoading } = useActions();
  const openAlert = useAlert();
  const ACTION_NAME = 'resetPassword';

  const reset = (data, onSuccess) => {
    addLoading(ACTION_NAME);
    return resetPassword(data)
      .unwrap()
      .then(() => {
        removeLoading(ACTION_NAME);
        openAlert(ALERT_MESSAGE_ON_SUCCESSFUL_PASSWORD_RESET, 'success');
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(() => {
        removeLoading(ACTION_NAME);
        openAlert(ALERT_MESSAGE_ON_FAILURE, 'error');
      });
  };

  return {
    resetPassword: reset,
  };
};
