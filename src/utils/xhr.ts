interface AjaxPara{
  url:string
  callback(res:Response):Function
}
export function ajax(para: AjaxPara) {
  let xhr = new XMLHttpRequest();
  // 使用异步调用的时候，需要触发readystatechange 事件
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {   // 判断对象的状态是否交互完成
      para.callback(xhr.response);      // 回调
    }
  }
  // 在使用XHR对象时，必须先调用open()方法，
  xhr.open('get', para.url);
}
