/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}


//解决DPI的绘制模糊问题。
export function drawDpiBegin(dom, context, width, height) {
    context.save();
    let scaleValue = window.devicePixelRatio
    dom.setAttribute('width', width * scaleValue);
    dom.setAttribute('height', height * scaleValue);
    dom.style.width = width + 'px'
    dom.style.height = height + 'px'
    context.scale(scaleValue, scaleValue);
}


//解决DPI的绘制模糊问题。
export function drawDpiEnd(context) {
    context.restore();
}


/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        return value.toString().padStart(2, '0')
    })
    return time_str
}

export function addTimeZero(num) {
    let reStr = ''
    if (isNaN(num)) {
        reStr = '00'
    } else {
        if (Number(num) < 10) {
            reStr = '0' + num.toString()
        } else {
            reStr = num.toString()
        }
    }
    return reStr
}

/**
 * 计算百分比
 * @param   {number} num   分子
 * @param   {number} total 分母
 * @returns {number} 返回数百分比
 */
export function Percentage(num, total) {
    if (num == 0 || total == 0){
        return 0;
    }
    num = Math.abs(num)
    total = Math.abs(total)
    // return (Math.round(num / total * 10000) / 100.00);// 小数点后两位百分比
    return (Math.round(num / total * 10000) / 100);
}