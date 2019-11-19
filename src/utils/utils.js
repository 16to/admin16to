/* eslint-disable no-console */
import { parse } from 'querystring';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const uploadImgFromPaste = (file, path, callback) => {
  const formData = new FormData();
  formData.append('pasteimg', file);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', path);
  xhr.onload = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (callback) { callback(JSON.parse(xhr.response)); }
      } else {
        console.log(xhr.statusText);
      }
    }
  };
  xhr.onerror = () => {
    console.log(xhr.statusText);
  }
  xhr.send(formData);
}
