import { MenuContext } from '@/components/stateful/MenuProvider';

export function useMenu() {
  const object = useContext(MenuContext);
  if (!object) {
    throw new Error('useMenu must be used within a Provider');
  }
  return object;
}
