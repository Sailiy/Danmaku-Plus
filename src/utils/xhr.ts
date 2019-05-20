interface AjaxPara {
  url: string
  callback(err: Error | null, res: ArrayBuffer): void
}
export async function ajax(para: AjaxPara) {
  // let xhr = new XMLHttpRequest()
  // // 使用异步调用的时候，需要触发readystatechange 事件
  // xhr.responseType = 'arraybuffer'
  // xhr.onreadystatechange = function() {
  //   if (xhr.readyState === 4) {
  //     if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
  //       para.callback(null, xhr.response)
  //     }
  //   }
  // }
  // xhr.onerror = function() {
  //   para.callback(new Error('error'), xhr.response)
  // }
  // // 在使用XHR对象时，必须先调用open()方法，
  // xhr.open('get', para.url)
  // xhr.send(null)
  try {
    let tmp = await fetch(para.url)
    let response = await tmp.arrayBuffer()
    para.callback(null, response)
  } catch (e) {
    para.callback(e, new ArrayBuffer(0))
  }
}
