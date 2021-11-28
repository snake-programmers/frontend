import {Theme} from 'react-native-paper/lib/typescript/types';
// FIXME colors
class Colors {
  static getGreyColor(theme: Theme): string {
    return theme.dark ? 'rgba(255, 255, 255, 0.54)' : 'rgba(0, 0, 0, 0.54)';
  }

  static getLighterGreyColor(theme: Theme): string {
    return theme.dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  }

  static getLightGreyColor(theme: Theme): string {
    return theme.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  }

  static getOpacitatedError(theme: Theme): string {
    return `${theme.colors.error}30`;
  }
}

export default Colors;
