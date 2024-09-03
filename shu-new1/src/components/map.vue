<script setup>

import { Scene, PolygonLayer, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { defineProps, watch } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: []
  },
})


watch(
    () => props.data,
    (newValue, oldValue) => {
      initData()
    }
)


const lineData = []

const txtData = []

function initData() {
  props.data.forEach((item) => {
    const lng = item.value.split(',')[0]
    const lat = item.value.split(',')[1]
    txtData.push({
      name: item.title,
      lng: Number(lng),
      lat: Number(lat)
    })

    lineData.push({
      lng1: 121.477091,
      lat1: 31.233212,
      lng: Number(lng),
      lat: Number(lat),
      name: '',
    })
  })
}

initData()


const scene = new Scene({
  id: 'map',
  map: new GaodeMap({
    style: 'dark',
    center: [105, 33.732983],
    zoom: 3.8,
    pitch: 52,
    token: '2403a80740f8c14d95b8cf8d17545efd'
  })
});


const router = [
  {
    coords: [
      [100.456984, 38.930493, 10],
      [121.475896, 31.299892, 10],  // 起点
    ],
    value: 10,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [121.345126, 31.788556],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [120.899291, 31.988754],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [119.926696, 32.463356],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [120.581193, 32.378095],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [119.435089, 32.193495],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [117.39149, 32.92516],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [116.377167, 39.918229],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [113.261655, 23.137197],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [108.94819, 34.289309],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [108.715996, 34.340484],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [103.849148, 36.062333],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [102.837143, 24.890205],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [103.72121, 27.337665],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [105.700044, 28.595358],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [106.552113, 29.567739],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [104.070445, 30.659797],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {
      curveness: .5
    },
  },
  {
    coords: [
      [87.60949, 43.818484],
      [121.475896, 31.299892],  // 起点
    ],
    value: 19,
    regionHeight: 2,
    lineStyle: {

      height: 5,
      regionHeight: 5,
      curveness: .5
    },
  },
]


const data = [
  {
    name: "张掖",
    value: [100.456984, 38.930493],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17,
    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'
    },
  },
  {
    name: "上海",
    value: [121.477091, 31.233212],
    label: {
      show: true,
      position: 'right',
      formatter: '{b} 总部',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17
    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'
    },
  },
  {
    name: "崇明岛",
    value: [121.345126, 31.788556],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17,
      distance: 0,
    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'
    },
  },
  {
    name: "南通",
    value: [120.899291, 31.988754],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17,
      distance: -20,
    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'
    },
  },
  {
    name: "泰州",
    value: [119.926696, 32.463356],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17,
      distance: 16,

    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
  {
    name: "如皋",
    value: [120.581193, 32.378095],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17,
      distance: 38,
    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
  {
    name: "镇江",
    value: [119.435089, 32.193495],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17,
      distance: 0,

    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'
    },
  },
  {
    name: "蚌埠",
    value: [117.39149, 32.92516],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17

    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
  {
    name: "北京",
    value: [116.377167, 39.918229],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17

    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
  {
    name: "广州",
    value: [113.261655, 23.137197],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17

    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
  {
    name: "西安",
    value: [108.94819, 34.289309],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17

    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
  {
    name: "咸阳",
    value: [108.715996, 34.340484],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17,
      distance: 20,


    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
  {
    name: "兰州",
    value: [103.849148, 36.062333],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17

    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
  {
    name: "昆明",
    value: [102.837143, 24.890205],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17

    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
  {
    name: "昭通",
    value: [103.72121, 27.337665],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17

    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
  {
    name: "赤水",
    value: [105.700044, 28.595358],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17

    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
  {
    name: "重庆",
    value: [106.552113, 29.567739],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17

    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
  {
    name: "成都",
    value: [104.070445, 30.659797],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17

    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
  {
    name: "乌鲁木齐",
    value: [87.60949, 43.818484],
    label: {
      show: true,
      position: 'top',
      formatter: '{b}',
      color: '#fff',
      fontWeight: "bold",
      fontSize: 17

    },
    itemStyle: {
      color: 'rgba(14,31,109,.7)'

    },
  },
]


// data.forEach((item) => {
//
// })

console.log(txtData)
//
// router.forEach((item) => {
//   const data = {
//     lng1: 0,
//     lat1: 0,
//     lng: 0,
//     lat: 0,
//     name: '',
//   }
//   data.lng = item.coords[0][0]
//   data.lat = item.coords[0][1]
//   data.lng1 = item.coords[1][0]
//   data.lat1 = item.coords[1][1]
//
//   lineData.push(data)
// })


scene.on('loaded', () => {
  let lineDown,
      lineUp,
      textLayer;

  fetch('https://gw.alipayobjects.com/os/bmw-prod/d6da7ac1-8b4f-4a55-93ea-e81aa08f0cf3.json')
      .then(res => res.json())
      .then(data => {
        const texts = [];
        // textLayer = new PointLayer({zIndex: 2})
        //     .source(texts, {
        //       parser: {
        //         type: 'json',
        //         x: 'lng',
        //         y: 'lat'
        //       }
        //     })
        //     .shape('name', 'text')
        //     .size(14)
        //     .color('#0ff')
        //     .style({
        //       textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
        //       spacing: 2, // 字符间距
        //       padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
        //       stroke: '#0ff', // 描边颜色
        //       strokeWidth: 0.2, // 描边宽度
        //       raisingHeight: 200000 + 150000 + 10000,
        //       textAllowOverlap: true
        //     })
        // scene.addLayer(textLayer)

        // lineDown = new LineLayer()
        //     .source(data)
        //     .shape('line')
        //     .color('#0DCCFF')
        //     .size(1)
        //     .style({
        //       raisingHeight: 200000
        //     });
        // scene.addLayer(lineDown)


        // 围墙
        const lineLayer = new LineLayer({ zIndex: 1 })
            .source(data)
            .shape('wall')
            .size(150000)
            .style({
              heightfixed: true,
              opacity: 0.6,
              sourceColor: '#0DCCFF',
              targetColor: 'rbga(255,255,255, 0)'
            });
        scene.addLayer(lineLayer);

        // 3d
        const provincelayer = new PolygonLayer({ zIndex: 1 })
            .source(data)
            .size(150000)
            .shape('extrude')
            .color('#0DCCFF')
            .active({
              color: 'rgb(100,230,255)'
            })
            .style({
              heightfixed: true,
              raisingHeight: 200000,

              pickLight: true,
              opacity: 1
            });

        provincelayer.active(false)
        scene.addLayer(provincelayer);

        lineUp = new LineLayer({ zIndex: 1 })
            .source(data)
            .shape('line')
            .color('#0DCCFF')
            .size(1)
            .style({
              heightfixed: true,
              raisingHeight: 200000 + 150000
            });

        scene.addLayer(lineUp);


        const layer = new LineLayer({ zIndex: 3 })
            .source(lineData, {
              parser: {
                type: 'json',
                x: 'lng',
                y: 'lat',
                x1: 'lng1',
                y1: 'lat1',
              },
            })
            .size([6, 10000 * 10000])
            .shape('arc3d')
            .color('#ffbb64')
            .style({
              heightfixed: true,
              raisingHeight: 200000 + 150000,
              thetaOffset: 0.1,
              segmentNumber: 30,
              blur: 0.8,
            })
            .animate({
              duration: 2,
              interval: .5,
              trailLength: .2
            });
        scene.addLayer(layer);

        const pointLayer = new PointLayer({ zIndex: 3 })
            .source(lineData, {
              parser: {
                type: 'json',
                x: 'lng',
                y: 'lat'
              }
            })
            .shape('circle')
            .animate(true)
            .size(40)
            .color('#ffa842')
            .style({
              heightfixed: true,
              raisingHeight: 200000 + 150000,
            })
        scene.addLayer(pointLayer);

        const pointLayerTxt = new PointLayer({ zIndex: 3 })
            .source(txtData, {
              parser: {
                type: 'json',
                x: 'lng',
                y: 'lat'
              }
            })
            .shape('name', 'text')
            .size(14)
            .color(['#fff', '#fff', '#fff'])
            .style({
              textAnchor: 'top', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
              textOffset: [0, 20], // 文本相对锚点的偏移量 [水平, 垂直]
              spacing: 2, // 字符间距
              padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
              stroke: '#fff', // 描边颜色
              strokeWidth: 0.3, // 描边宽度,

              heightfixed: true,
              raisingHeight: 200000 + 150000,
              textAllowOverlap: true
            });
        scene.addLayer(pointLayerTxt);

        return '';
      });
});


</script>

<template>
  <div id="map">

  </div>
</template>

<style>
.amap-container {
  background-color: transparent !important;
  background-image: none !important;
}
</style>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>