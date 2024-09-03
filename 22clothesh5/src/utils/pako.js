export function heartToChartData(sourceData = [], uintSize = 51) {
    const data = new Uint8Array(sourceData)
    // console.log(data)
    const list = []
    const target = []
    const count = []
    const rate = 128
    const xList = []
    const uintMove = 4 * uintSize
    for (let t = 0; t < 12; t++) {
        list.push([])
        target.push([])
        count.push(0)
    }
    for (let k = 0; k < data.length; k += 32) {
        xList.push(k / 32)
        let pointI
        for (let i = 0; i < 16; i += 2) {
            const one = data[k + i]
            let item = one + (data[k + i + 1] * 256)
            const r = i / 2
            const diff = r <= 1 ? r : r + 4
            if (diff === 0) {
                pointI = -(item & 8191)
                item = pointI
            } else {
                item = 0 - item
            }
            if (diff === 1) {
                const pointIII = (item - pointI) / 102
                const pointVR = ((item + pointI) >> 1) / 102
                const pointVL = (pointI - ((item - pointI) >> 1)) / 102
                const pointVF = (item + ((item - pointI) >> 1)) / 102

                list[2].push(pointIII)
                list[3].push(pointVR)
                list[4].push(pointVL)
                list[5].push(pointVF)

                count[2] += (pointIII)
                count[3] += (pointVR)
                count[4] += (pointVL)
                count[5] += (pointVF)
            }
            list[diff].push(item / 102)
            count[diff] += (item / 102)
        }
    }
    list.forEach((item, index) => {
        const center = 3
        // const center = (index * uintMove) + (uintMove * .5)
        const move = center - (count[index] / (data.length / 32))
        item.forEach((im) => {
            target[index].push(im + move)
        })
    })
    // console.log(333)
    // console.log(target)
    // console.log(list)
    // console.log(count)
    // console.log(data.length / 32)
    return {
        yList: target,
        xList
    }
}