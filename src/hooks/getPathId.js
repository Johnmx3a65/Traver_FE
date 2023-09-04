import { useLocation } from 'react-router-dom';

export const useGetPathId = (pathName) => {
  const { pathname } = useLocation();
  const id = Number.parseInt(pathname.split(`/${pathName}/`)[1]);

  return { id };
};
