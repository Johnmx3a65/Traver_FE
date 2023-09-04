import { useActions } from './actions';

const useAlert = () => {
  const { setAlertOpen, setAlertMessage, setAlertType } = useActions();

  return (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertOpen(true);
  };
};

export default useAlert;
