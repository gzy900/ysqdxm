self.onmessage = ev => {
  const funName = ev.data.method
  if (self[funName]) {
    self[funName](ev.data.params)
  } else {
    console.warn(`方法${funName}未定义`)
  }
}

self.transferLang = function() {
  const arr = []
  self.postMessage({
    params: arr
  })
}
