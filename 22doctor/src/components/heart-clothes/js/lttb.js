/*
 * The MIT License
Copyright (c) 2018 Alexufo . Original code 2013 by Sveinn Steinarsson
*/

export function largestTriangleThreeBuckets(data, threshold) {
  // data [1,2,3,4,5...] 源数据 一维数组   threshold 最后目标数据的长度
  const data_length = data.length
  // 如果 结果采样数量大于源数据长度 直接返回
  if (threshold >= data_length || threshold === 0) {
    return data
  }
  // 单片段 采样长度 源数据长度 100 ，目标数据10 单片段采样长度为10
  const every = (data_length - 2) / (threshold - 2)

  const sampled = []
  let sampled_index = 0
  let a = 0
  let max_area_point // 目前面积最大的点
  let max_area
  let area
  let next_a
  sampled[sampled_index++] = data[a]
  for (let i = 0; i < threshold - 2; i++) {
    let avg_x = 0
    let avg_y = 0
    let avg_range_start = Math.floor((i + 1) * every) + 1 // 第三个点的开始的 下标
    let avg_range_end = Math.floor((i + 2) * every) + 1 // 第三个点的结束的 下标
    avg_range_end = avg_range_end < data_length ? avg_range_end : data_length // 第三个点结束的下标不能大于源数据长度
    const avg_range_length = avg_range_end - avg_range_start
    for (; avg_range_start < avg_range_end; avg_range_start++) {
      avg_x += avg_range_start
      avg_y += data[avg_range_start] * 1
    }
    avg_x /= avg_range_length // 求的 第三个点的 平均X值
    avg_y /= avg_range_length // 求的 第三个点的 平均y值
    let range_offs = Math.floor((i + 0) * every) + 1
    const range_to = Math.floor((i + 1) * every) + 1
    const point_a_x = a * 1 //  横坐标
    const point_a_y = data[a] * 1
    max_area = area = -1
    for (; range_offs < range_to; range_offs++) {
      area = Math.abs((point_a_x - avg_x) * (data[range_offs] - point_a_y) -
        (point_a_x - range_offs) * (avg_y - point_a_y)
      ) * 0.5
      if (area > max_area) {
        max_area = area
        max_area_point = data[range_offs]
        next_a = range_offs
      }
    }
    sampled[sampled_index++] = max_area_point
    a = next_a
  }
  sampled[sampled_index++] = data[data_length - 1]
  return sampled
}

