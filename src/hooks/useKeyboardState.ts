import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

function useKeyboardState(): boolean {
  const [state, setState] = useState<boolean>(false);
  useEffect(() => {
    const s1 = Keyboard.addListener('keyboardDidShow', () => setState(true));
    const s2 = Keyboard.addListener('keyboardDidHide', () => setState(false));
    return () => {
      s1.remove();
      s2.remove();
    };
  }, []);
  return state;
}

export default useKeyboardState;
