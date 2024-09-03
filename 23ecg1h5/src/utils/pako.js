import pako from 'pako'

function deBase64(encodedData) {
  const decodedData = window.atob(encodedData)

  // 字符串转数组 在循环返回一个 Unicode表所在位置的新数组
  const charData = decodedData.split('').map(x => x.charCodeAt(0))

  // Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。
  const binData = new Uint8Array(charData)

  // 调用pako 解析
  return pako.inflate(binData)
}


// 一个是加密：window.btoa()，一个是解密：window.atob()
export function decode(encodedData, os) {
  // 先 base64编码
  // 加密：window.btoa()，解密：window.atob()

  // encodedData = 'eJxjZGJmYQUAACgAEA=='
  const data = deBase64(encodedData)

  let dataList = []

  // IOS来源
  // if (os === '1') {
  //   dataList = Array.from(data)
  // }
  //
  // // 安卓来源
  // if (os === '0') {
  //   let decodedData1 = ''
  //   for (let j = 0; (j * 10000) < data.length; j++) {
  //     decodedData1 += String.fromCharCode.apply(null, new Uint16Array(data.slice(j * 10000, j * 10000 + 10000)))
  //   }
  //   dataList = JSON.parse(decodeURIComponent(decodedData1))
  // }
  dataList = Array.from(data)

  const chartDataList = []
  for (let i = 0; i < dataList.length; i += 2) {
    const listOne = dataList[i]
    const item = 0 - ((listOne + (dataList[i + 1] * 256)) / 102)
    chartDataList.push(item)
  }

  return chartDataList
}


