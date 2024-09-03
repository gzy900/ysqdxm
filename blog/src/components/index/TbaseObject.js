import { GLTFLoader } from "three/addons"

export function loadModel() {

    const modelList = [
        {
            name: 'cat',
            url: '/model/cute_cat_in_cute_banana.glb',
            type: 'glb',
            loadType: 'GLTF',
            model: null
        }
    ]

    const promises = modelList.map((item) => {
        return load(item.url, item.loadType)
    })
    return Promise.all(promises).then((res) => {
        return res
    })
}


function load(url, type) {
    const loader = new GLTFLoader()
    return new Promise((resolve, reject) => {
        loader.load(url, (glb) => {
            const model = glb
            resolve(model)
        })
    })
}

import { AxesHelper, GridHelper, AmbientLight } from 'three'

export const allHelper = []

// 坐标辅助
export const axesHelper = new AxesHelper(500)  // 创建坐标辅助

const ambientLight = new AmbientLight('rgb(255,255,255)', 0.8)

// 创建地面网格辅助
export const gridHelper = new GridHelper(100, 10, 'red', 'rgb(222, 225, 230)')

// allHelper.push(axesHelper, gridHelper, ambientLight)
