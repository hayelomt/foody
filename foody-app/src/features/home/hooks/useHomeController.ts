import { useEffect } from 'react';
import useFetchData from '../../../core/hooks/useFetchData';
import { MenuItem } from '../../restaurant/restaurant';

export default () => {
  const { data, fetchData } = useFetchData<MenuItem[]>([]);
  const tags = [
    'Recommended',
    'Junk Food',
    'Vegan',
    'Bread',
    'Meat',
    'Dessert',
    'Shiro',
    'Beyayinet',
    'Pasta',
  ].map((label, i) => ({ id: `tag-${i}`, label }));

  useEffect(() => {
    fetchData('v1/menu-items', {});
  }, []);

  return {
    data,
    tags,
  };
};
