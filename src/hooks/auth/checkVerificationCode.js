import { useCheckVerificationCodeMutation } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import useAlert from '../alert';
import {
  ALERT_MESSAGE_ON_FAILURE,
  ALERT_MESSAGE_USER_NOT_FOUND,
  ALERT_MESSAGE_WRONG_CODE,
} from '../../utils/constraints';

export const useCheckVerificationCode = () => {
  const [checkVerificationCode] = useCheckVerificationCodeMutation();
  const { addLoading, removeLoading } = useActions();
  const openAlert = useAlert();
  const ACTION_NAME = 'checkVerificationCode';

  const check = (data, onSuccess) => {
    addLoading(ACTION_NAME);
    return checkVerificationCode(data)
      .unwrap()
      .then(() => {
        removeLoading(ACTION_NAME);
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((e) => {
        removeLoading(ACTION_NAME);
        if (e.status === 400) {
          openAlert(ALERT_MESSAGE_WRONG_CODE, 'error');
        } else if (e.status === 404) {
          openAlert(ALERT_MESSAGE_USER_NOT_FOUND, 'error');
        } else {
          openAlert(ALERT_MESSAGE_ON_FAILURE, 'error');
        }
      });
  };

  return {
    checkVerificationCode: check,
  };
};
