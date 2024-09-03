import pako from 'pako'

export function loop(dataRaw) {
  const dataRawList = dataRaw.split('MAILFILEGAP') // 原始压缩数据 数组
  const dataList = [] // 12导联最终数据数组
  const dataMoveList = [] // 12 导联每段数据 数据偏移数组
  let nowDataByte = 0 // 目前为止，已经添加了多少个字节到 最终数据数组 dataList
  let dataItemLen = null // 单个片段 buff 可被32 整除的最大长度

  let tempDataPrev = null
  let tempDataPrevLen = 0
  const tempData = new Uint8Array((dataRawList.length - 1) * 31)
  let tempDataLen = 0
  const seriesMove = 200

  for (let len = 0; len < 12; len++) {
    dataMoveList.push(new DataView(new ArrayBuffer(8 * (dataRawList.length - 1))))
  }
  // console.log(dataRaw)
  // console.log(dataRawList)

  for (let i = 0; i < dataRawList.length - 1; i++) {
    // console.log('开始解压数据' + i)
    // console.log(new Date().getTime())
    const decodedData = window.atob(dataRawList[i])

    // // 字符串转数组 在循环返回一个 Unicode表所在位置的新数组
    const charData = decodedData.split('').map(x => x.charCodeAt(0))
    // Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。
    const binData = pako.inflate(new Uint8Array(charData))

    const start = (845847 * 16 * 2) % (256 * 16 * 60 * 10)
    if (Math.floor((845847 * 16 * 2) / (256 * 16 * 60 * 10)) === i) {
      console.log('十秒数据')
      console.log(i)
      console.log(JSON.stringify(Array.from(binData.slice(start, start + 256 * 16 * 10))))
    }
    // console.log('解压结束，洗数据开始' + i)
    // console.log(new Date().getTime())
    const binDataLen = binData.length
    console.log(binDataLen)
    const count = []
    // 创建十二个数组 用于装载12导联数据
    for (let d_l = 0; d_l < 12; d_l++) {
      count[d_l] = 0
      if (dataList.length < 12) {
        dataItemLen = binData.length - (binData.length % 32)
        const length = dataItemLen / 16 * (dataRawList.length - 1)
        const buff = new ArrayBuffer(length)
        dataList.push(new DataView(buff))
      }
    }

    // 本段数据长度 - 上一段数据结余长度到32的补数 再 整除32 得到 本段数据的结余长度。
    // 这些都是因为 数据结构为 8导联心电数据 被拆分为高位低位。并不断循环。
    // 如[0,0,1,1,...,7,7,8,8] 0,0 代表第一导联的数据，第1个0为低位，2高位。依此类推 8导联数据共16位。
    // 如上 每16位 是 8导联数据。采样率 256 降低 为 128 所以每取16位 跳过16位。
    // 8导联心电数据（共12导联数据，其余四导联通过计算得出）
    // const tempDataLen = (binDataLen - (32 - tempDataPrevLen)) % 32
    // const tempData = binData.slice(binDataLen - tempDataLen - 1)
    tempDataLen = binDataLen - (dataItemLen - tempDataPrevLen)
    tempData.set(binData.slice(binDataLen - tempDataLen))

    // 如果上一段数据，不能被32除尽，则从这段数据头部 取出数据进行补齐。
    if (tempDataPrevLen > 0) {
      // tempDataPrev[tempDataPrevLen + i] = binDataLen[i]
      for (let j = 0; j < 32 - (tempDataPrevLen % 32); j++) {
        tempDataPrev[tempDataPrevLen + j] = binData[j]
      }
      // console.log('遗留数据')
      // console.log(tempDataPrev)
      for (let i = 0; i < tempDataPrevLen; i += 32) {
        // 先处理上一段的遗留数据
        unitCalc(tempDataPrev, dataList, i, nowDataByte, count)
        nowDataByte += 2
      }

      // 此处应该判断上一段遗留数据 是否大于等于 dataItemLen // 12导联 单个导联 单个片段 长度。
      // 如果是，应该将其视为单独一段数据处理。在整体数据包极小 且仍然分段时出现。 如五分钟数据还是分了144段
      // 留给后人解决了:)
    }
    for (let j = tempDataPrevLen === 0 ? 0 : 32 - (tempDataPrevLen % 32); j < dataItemLen - tempDataPrevLen; j += 32) {
      unitCalc(binData, dataList, j, nowDataByte, count)
      nowDataByte += 2
    }
    if (tempDataLen >= 0) {
      tempDataPrev = tempData
      tempDataPrevLen = tempDataLen
    }

    // console.log('洗数据结束，Data平移开始' + i)
    // console.log(new Date().getTime())

    count.forEach((item, index) => {
      const length = dataItemLen >> 5
      if (index === 4 && i === 10) {
        // console.log(item)
        // console.log(length)
      }
      const positionCenter = (index * seriesMove) + (seriesMove / 2) // 计算 十二导联 心电图应处于的位置
      const dataMove = positionCenter - (item / length) // 计算 十二导联 心电图 目前的数据位置与 其应处于的位置的偏差
      dataMoveList[index].setFloat64(i * 8, dataMove)
    })
  }
  const test = new Uint16Array(dataList[4].buffer, 100 * 60 * 128 * 2, 10 * 60 * 128 * 2)
  const len = []
  test.forEach(item => {
    if (item < 1556) {
      len.push(item)
    }
  })
  // console.log(len)
  // console.log(test)
  // console.log('100分钟值：' + dataList[4].getInt16(100 * 60 * 128 * 2))
  // console.log('100分钟位移值' + dataMoveList[4].getFloat64(8 * 10))
  return {dataList, dataMoveList, dataItemLen}
}

function unitCalc(source, target, s_i, p_i, count) {
  // 降导联，所以拿出32条数据 但只循环16次
  let pointI = 0
  for (let i = 0; i < 16; i += 2) {
    const listOne = (source[i + s_i])
    let item = listOne + ((source[i + s_i + 1]) * 256)

    const remainder = i / 2 //  取导联
    const diff = remainder <= 1 ? remainder : remainder + 4

    if (diff === 0) {
      pointI = item & 8191
      item = pointI
    }
    if (diff === 1) {
      // 在第二导联计算 III VR VL VF 导联的数据
      const pointIII = (item - pointI)
      const pointVR = (item + pointI) >> 1
      const pointVL = (pointI - (item - pointI)) >> 1
      const pointVF = (item + (item - pointI)) >> 1

      target[2].setInt16(p_i, (pointIII))
      target[3].setInt16(p_i, (pointVR))
      target[4].setInt16(p_i, (pointVL))
      target[5].setInt16(p_i, (pointVF))

      count[2] += (pointIII)
      count[3] += (pointVR)
      count[4] += (pointVL)
      count[5] += (pointVF)
    }
    target[diff].setInt16(p_i, (item))
    count[diff] += (item)
    // target[2].setUint16(p_i, (pointIII / 102))
    //   target[3].setUint16(p_i, (pointVR / 102))
    //   target[4].setUint16(p_i, (pointVL / 102))
    //   target[5].setUint16(p_i, (pointVF / 102))
    //
    //   count[2] += (pointIII / 102)
    //   count[3] += (pointVR / 102)
    //   count[4] += (pointVL / 102)
    //   count[5] += (pointVF / 102)
    // }
    // target[diff].setUint16(p_i, (item / 102))
    // count[diff] += (item / 102)
  }
}

