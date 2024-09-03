(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('卫滨区', {"type":"FeatureCollection","features":[{"type":"Feature","id":"410703","properties":{"name":"卫滨区","cp":[113.865663,35.301992],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@A@@AE@@AABEC@AC@A@GAABGA@@AD@@C@A@CA@@KEA@CH@ACAE@A@ADA@AAABFB@@C@@BB@@DA@@FABAB@@@@C@A@@@@D@DCDABDJDFG@CCCHHJ@JO@EA@DA@A@G@GABDK@@DKA@DI@@@@BC@@BA@@@@FA@@B@JA@@F@@A@@B@FC@@DC@@BA@@F@@A@@LA@@F@@K@@BF@@DF@@BDA@DEAIHE@@@LB@B@FB@@JD@@FDA@AB@@B@@@BB@BHABB@@ABABA@CBAB@B@D@@@@B@B@@@D@BB@DAF@D@B@BBDA@@B@B@B@BBB@FBB@BA@ADAAEACBCB@@@FAFAD@DBB@F@H@JF@@D@FAF@@@DEDBFDB@@@B@BCDAB@BABBB@B@D@@A@C@C@A@@@C@@AA@A@@@A@@@E@@@A@C@C@E@G@E@@@C@C@A@@@IX@@@D@F@@A@C@A@C@A@A@E@IFKBEAA@KA@FM@@BEA@B@A@C@@A@@@EE@"],"encodeOffsets":[[116622,36076]]}}],"UTF8Encoding":true});}));