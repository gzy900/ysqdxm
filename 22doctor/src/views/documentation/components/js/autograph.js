const autograph = {
  oldX: null,
  oldY: null
}

export function init(id) {
  autograph.dom = document.getElementById(id)
  autograph.width = autograph.dom.clientWidth
  autograph.height = autograph.dom.clientHeight
  autograph.canvas = document.createElement('canvas')
  autograph.dom.appendChild(autograph.canvas)
  autograph.canvas.setAttribute('width', autograph.width + 'px')
  autograph.canvas.setAttribute('height', autograph.height + 'px')

  autograph.canvas.addEventListener('mousedown', mousedown)
  autograph.canvas.addEventListener('mouseup', mouseup)
  autograph.ctx = autograph.canvas.getContext('2d')
}

function mousedown(e) {
  autograph.canvas.addEventListener('mousemove', mousemove)
}

function mouseup(e) {
  autograph.oldX = null
  autograph.oldY = null
  autograph.canvas.removeEventListener('mousemove', mousemove)
}

function mousemove(e) {
  const x = e.layerX
  const y = e.layerY
  if (!autograph.oldX) {
    autograph.oldX = x
    autograph.oldY = y
    return
  }
  autograph.ctx.beginPath()
  autograph.ctx.moveTo(autograph.oldX, autograph.oldY)
  autograph.ctx.lineTo(x, y)
  autograph.ctx.lineWidth = 3
  autograph.ctx.stroke()
  autograph.oldX = x
  autograph.oldY = y
}

export function clear() {
  autograph.oldX = null
  autograph.oldY = null

  autograph.ctx.clearRect(0, 0, autograph.width, autograph.height)
}

export function getImageData() {
  return autograph.canvas.toDataURL('image/png')
}
