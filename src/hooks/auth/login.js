import { useLoginMutation } from '../../store/traver/traver.api';
import { useActions } from '../actions';
import useAlert from '../alert';
import { ALERT_MESSAGE_ON_FAILURE, ALERT_MESSAGE_WRONG_DATA } from '../../utils/constraints';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [login] = useLoginMutation();
  const { addLoading, removeLoading, setCredentials } = useActions();
  const navigate = useNavigate();
  const openAlert = useAlert();
  const ACTION_NAME = 'login';

  const loginUser = (user) => {
    addLoading(ACTION_NAME);
    return login(user)
      .unwrap()
      .then((res) => {
        removeLoading(ACTION_NAME);
        setCredentials(res);
        navigate('/');
      })
      .catch((e) => {
        removeLoading(ACTION_NAME);
        if (e.status === 400) {
          openAlert(ALERT_MESSAGE_WRONG_DATA, 'error');
        } else {
          openAlert(ALERT_MESSAGE_ON_FAILURE, 'error');
        }
      });
  };

  return {
    login: loginUser,
  };
};
