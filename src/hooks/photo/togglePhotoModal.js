import { useState } from 'react';

export const useTogglePhotoModal = () => {
  const [photo, setPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onPhotoClick = (item) => {
    setPhoto(item);
    setIsModalOpen(!isModalOpen);
  };

  return { photo, isModalOpen, onPhotoClick };
};
