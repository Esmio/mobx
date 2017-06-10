import { Toast } from 'antd-mobile';

export function showToast(text) {
  Toast.info(text, 1);
}
