export const makeResponse = work => `
  self.onmessage = function(event) {
    const args = event.data.message.args
    if (args) {
      self.postMessage((${work}).apply(null, args))
      return close()
    }
    self.postMessage((${work})())
    return close()
  }
`
export const createDisposableWorker = response => {
  const URL = window.URL || window.webkitURL
  const blob = new Blob([response], { type: 'application/javascript' }) // eslint-disable-line
  const objectURL = URL.createObjectURL(blob)
  const worker = new Worker(objectURL) // eslint-disable-line
  worker.post = message =>
    new Promise((resolve, reject) => {
      worker.onmessage = event => {
        URL.revokeObjectURL(objectURL)
        resolve(event.data)
      }
      worker.onerror = e => {
        console.error(`Error: Line ${e.lineno} in ${e.filename}: ${e.message}`)
        reject(e)
      }
      worker.postMessage({ message })
    })
  return worker
}

export const run = (work = null, args) => {
  const worker = createDisposableWorker(makeResponse(work))
  return worker.post({ args })
}
