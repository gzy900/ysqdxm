async function requestFiles() {
    // const modulesFiles = require.context('./modules', true, /\.geojson$/)
    // const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    //     console.log(modules)
    //     console.log(modulePath)
    //     console.log(modulesFiles(modulePath))
    //     // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    //     // const value = modulesFiles(modulePath)
    //     // modules[moduleName] = value.default
    //     // return modules
    // }, {})
    const json = {
        type: "FeatureCollection",
        features: []
    }
    const modulesFiles = import.meta.glob('../../../public/map/*.json')
    for (const key in modulesFiles) {
        await modulesFiles[key]().then(res => {
            json.features.push(res.default.features[0])
            // console.log(res.default.features[0])
        })
    }
    return json
}

export {
    requestFiles
}

