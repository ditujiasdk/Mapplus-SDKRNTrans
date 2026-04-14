import Toast from 'react-native-easy-toast';
import { BackButtonRefProps } from 'src/components/BackButton';
import { LoadingRefProps } from 'src/components/Loading';

let Loading: React.RefObject<LoadingRefProps> | null | undefined = undefined;

const setLoading = (ref?: React.RefObject<LoadingRefProps>) => {
  Loading = ref;
};

const getLoading = () => {
  return Loading?.current;
};

let toast: React.RefObject<Toast> | null | undefined = undefined;

const setToast = (ref?: React.RefObject<Toast>) => {
  toast = ref;
};

const getToast = () => {
  return toast?.current;
};

let nativeBackBtnRef: React.RefObject<BackButtonRefProps> | null | undefined =
  undefined;

const setNativeBackBtn = (ref?: React.RefObject<BackButtonRefProps>) => {
  nativeBackBtnRef = ref;
};

const getNativeBackBtn = () => {
  return nativeBackBtnRef?.current;
};

export default {
  setLoading,
  getLoading,
  setToast,
  getToast,
  setNativeBackBtn,
  getNativeBackBtn,
};
