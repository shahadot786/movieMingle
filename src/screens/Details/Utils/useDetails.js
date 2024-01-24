import {useAppSelector} from '../../../store/store';

export const useDetails = () => {
  const {isAdShown, interAdCount} = useAppSelector(state => state.ads);

  return {isAdShown};
};
