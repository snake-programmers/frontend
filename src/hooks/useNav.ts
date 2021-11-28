import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavParams} from '../screens/Navigator';

function useNav(): StackNavigationProp<NavParams, keyof NavParams> {
  return useNavigation<
    StackNavigationProp<NavParams>
  >() as unknown as StackNavigationProp<NavParams, keyof NavParams>;
}

export default useNav;
