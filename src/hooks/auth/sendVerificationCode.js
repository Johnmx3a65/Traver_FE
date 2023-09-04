import { useSendVerificationCodeMutation } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import useAlert from '../alert';
import { ALERT_MESSAGE_ON_FAILURE, ALERT_MESSAGE_USER_NOT_FOUND } from '../../utils/constraints';

export const useSendVerificationCode = () => {
  const [sendVerificationCode] = useSendVerificationCodeMutation();
  const { addLoading, removeLoading } = useActions();
  const openAlert = useAlert();
  const ACTION_NAME = 'sendVerificationCode';

  const send = (data, onSuccess) => {
    addLoading(ACTION_NAME);
    return sendVerificationCode(data)
      .unwrap()
      .then(() => {
        removeLoading(ACTION_NAME);
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((e) => {
        removeLoading(ACTION_NAME);
        if (e.status === 404) {
          openAlert(ALERT_MESSAGE_USER_NOT_FOUND, 'error');
        } else {
          openAlert(ALERT_MESSAGE_ON_FAILURE, 'error');
        }
      });
  };

  return {
    sendVerificationCode: send,
  };
};
