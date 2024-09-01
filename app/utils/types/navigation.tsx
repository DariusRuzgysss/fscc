import {SCREEN_NAMES} from '@utils/constants';

//Libraries
import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type StackWithParams = {
  EMPTY_SCREEN: undefined;
  [SCREEN_NAMES.LOGIN]: undefined;
  [SCREEN_NAMES.PROFILE]: undefined;
};

export type NavigationProps = NavigationProp<NavigationStack>;

export type NavigationStack = StackWithParams & {[key: string]: undefined};

export type NavProps = NativeStackScreenProps<NavigationStack>;

export type ScreenProps<
  screenName extends keyof NavigationStack = keyof NavigationStack,
> = screenName extends keyof NavigationStack
  ? NativeStackScreenProps<NavigationStack, screenName>
  : NativeStackScreenProps<NavigationStack>;
