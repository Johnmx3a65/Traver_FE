import { useCallback, useEffect, useRef, useState } from 'react';

const useFilter = (items, key) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFilterEmpty, setIsFilterEmpty] = useState(false);
  const filterQueryRef = useRef('');

  const filter = useCallback(
    (value = '') => {
      if (!value) {
        setFilteredItems(items || []);
        setIsFilterEmpty(false);
        return;
      }
      const filteredLocations = items?.filter((l) => l[key].toUpperCase().includes(value.toUpperCase()));
      setFilteredItems(filteredLocations);
      setIsFilterEmpty(filteredLocations.length === 0);
    },
    [key, items],
  );

  const searchHandler = useCallback(
    (e) => {
      filterQueryRef.current = e?.target?.value?.trim();
      filter(filterQueryRef.current);
    },
    [filter],
  );

  useEffect(() => {
    filter(filterQueryRef.current);
  }, [filter, items]);

  return { filteredItems, isFilterEmpty, searchHandler };
};

export default useFilter;
