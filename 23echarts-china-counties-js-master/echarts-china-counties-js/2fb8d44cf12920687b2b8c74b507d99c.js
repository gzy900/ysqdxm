(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('黎城县', {"type":"FeatureCollection","features":[{"type":"Feature","id":"140426","properties":{"name":"黎城县","cp":[113.387155,36.502328],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@O@O@SBE@BF@BBBDB@BABA@AB@B@@@B@DAB@B@@AD@F@@ADABCDABAB@@A@ABA@CB@@E@CDGFEHCBEFABCDIJEJC@G@I@GAKAKCA@GB@@C@CH@BAF@FBBAHCBA@EAAFENEZABOEMEMEEAIAIAKBIBOBC@E@C@CHIFIFKHOJGFWPMJ@@ABIPGNC@ABD@CFCTEPCH@BEPGRBPDPFLJNDHLLJJLHPHTFJD@NALADAJBFHNBFDHFLFLHPHHJFRDFDFBRLNFLFVFRBFHDH@H@F@D@NADAFCR@PJLJHJFJNEP@N@HBD@FBFHHBBRHFBFBLHJJDJAJELGJGJIJILAN@BFHFFJFLDRFFBAC@@BAB@RADBD@FBHGDCJIFANGVCRCJCFAFCNIBAJGLGLIBAHIFGTGNANGJGHGDCDMFSHQFIBEDGHIFIJKJGJADAHCLCAKKMQDQDMBYHQEOKIKKSMQDOLCH@NBNFPFR@BOGQCMIGUSKKGMCOHKPKN@PCPCP@PAVARKBMCI@GCOCKHGTCTBNGHKHGJMLKBMBEAEACACAAACCAAAC@C@E@CBGDC@A@AAC@KECCEA@@CBCFCBCC@A@GDAHAHBHGH@BA@EC@CDA@@CBC@I@A@CEIAA@C@A@E@ECC@KCAIAAE@CBADBJFHBL@DAJIHAD@FAB@DABMBQFKNGBECGEIEEA@EBABG@I@G@CBA@@BBJBFABC@KEKEAB@BABKAMMAAECA@CCCCEAMCO@YHKDQBSFQEEKGKEIEMCECGEGCAIIKEA@SC"],"encodeOffsets":[[116147,37271]]}}],"UTF8Encoding":true});}));