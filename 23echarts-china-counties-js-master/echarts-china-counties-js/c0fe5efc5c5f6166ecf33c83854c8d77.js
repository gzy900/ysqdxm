(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('洪江市', {"type":"FeatureCollection","features":[{"type":"Feature","id":"431281","properties":{"name":"洪江市","cp":[109.836669,27.208609],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@CC@GAEAGCCC@AAKA@@EAKAE@CBA@IDGAKCIEK@GA@@A@A@GDEHIFG@GAGCEBE@CDGF@HVNX\\@@@@JJbPEHEHGFGHM@I@C@@@ABABA@C@C@IBC@C@C@GBEB@@C@IBEAGAIB@B@B@B@DBDFB@@D@B@B@D@@@FB@@BB@@@B@@@L@BABCBG@A@CD@BDBH@HBD@DDBADAFAFAF@BBB@@@BDDDF@DAD@DBABDBBDBBDADABCBA@@DCDAB@BB@BDAB@BBB@B@B@BD@DBDBBA@ABABAB@B@B@BB@B@HABAB@@ABB@BBDBB@@B@BABADADCFE@@@@B@@B@DCF@BBDF@FABD@B@BDBF@FFB@D@@AB@B@@BADBBBAD@BAD@BABA@BBBAD@DBB@@@B@F@DADCDAD@BABBFDDHDFBD@BD@DA@AFABCBAFAFEFBFDBDBDBDA@ABA@A@C@E@C@EBCB@B@@@@BAD@DBBDD@BBB@@@@DF@@BDBF@DCF@BDBDDHFD@@C@EACDABAFAB@BAL@FBDBD@LDHFBDFFHNDPAD@D@@AHCPEJEDEFBFDBJ@FBJBDBBBFJBDB@@B@BBBFJHDNBP@NEFABA@ANADAFDBBFBHDDDHDBBBCDCBAD@DABB@@DJBDA@A@FHBBBB@@F@@@DB@BB@DDD@D@DADAD@@BB@AB@BE@@DB@DB@BDDDBFDDFDBD@D@BA@AHCFED@BBB@@ABADI@ABGDEFK@ABA@A@@DAFAB@HAFEDABAB@@@BDD@B@DBD@BADAHEB@@@BDBBBBB@@@BA@A@ADABBD@D@NEB@D@@BB@BB@D@@C@C@AB@D@DDD@@LBD@FDBBBBFANCBC@ABAB@BBB@BBB@D@B@@ABABAH@BABC@ABCB@BAB@D@DAB@DADEB@BBB@BBDBBA@ABAB@HDD@H@HBBBDAHCB@@@DDFDBBBBB@D@@BBB@B@DB@DBHBBB@@@@@B@BADBD@HABAB@B@D@BABA@E@C@EBKFA@DD@B@D@BB@BABCBAD@@BABCDA@BBD@BBFFDBD@DBD@B@@BAFBDBBBDFDHBBBB@FFBBB@@B@BA@DDBBDDB@DBB@@BBBBBD@D@D@DDB@D@BADED@BB@BBBADDD@J@BAJCBCBABAD@B@@DH@BBDDD@F@@@@ADEDCDADAD@DABBDDFDHBF@BBB@DD@FBDAD@HGDABBBD@FHHBBHBDBFD@@DDLNCD@DFDLFLDH@BBBBBBDBDDDBLHDBFB@B@BABCBAB@BBBDB@BABCAA@C@C@CBC@@B@@DDD@F@B@@BCD@B@DBBBBDBFJ@BBBD@F@DABCBABA@AAAIBC@A@AABAFCF@J@D@BB@BBDB@@DABCDAB@BBBD@F@HEHGBCAAAC@C@CDAFBBA@A@A@A@AG@CA@A@C@AAAA@CAA@AA@A@A@AB@@@D@HA@AAAE@BA@AFAD@D@DDF@DCBABCDAB@DADA@ABCBC@A@A@GBCBC@CAGA@ECEC@A@A@AB@B@DDB@D@@AAAA@A@AA@@BCDA@@AI@E@ABAB@F@BBBBBBBBDBBDBBBBB@D@B@D@JBD@D@D@@@@A@AB@BBBBAB@BBB@BBD@@B@@A@AB@DDB@BA@A@A@ADBB@BBDHAB@BBB@BBBAB@DBBB@F@BB@@@B@DBBH@D@BA@ABA@BDHBB@DBBB@B@DEDCBABABABCB@B@BBHBD@BABCBAB@BBDBD@H@DBBBALBDBBDBD@B@BABC@ABADBFJBBB@B@BA@A@CF@D@D@@ABA@A@AFAB@D@@B@@BBBB@BABA@@B@BBDBD@@BB@BBFB@B@BAFCBC@ADADCB@B@F@F@F@FA@ABCBGBEDG@@@A@@BAFCFAH@F@H@FBB@JBLCFCB@HAFATFB@LBHBFBDBFB@BBD@F@BBJ@JDDJ@JEFG@ADCHKFEHGB@DBD@@OAEEEMSAGCECG@@CGCMBMAQBOBMDIDCDAF@FDFDDHBDFL@BDHDH@@FBDBDAB@FA@AJCJALAF@@@@@F@DBDBB@JDL@N@B@\\ENAB@HGHKBA@MCQEICG@GBIBIDGAIFGEEEGGIKGMGUGSGOGQKIIEO@M@GAOCO@@GGCEOIIC@@E@@@U@OFOHGDIFEBIDABCB@@CFGDCBABC@C@A@AAECAACAAAACAAAEAA@@AAC@EACAACCEAG@EBGFOBE@EAC@A@AEE@AACCCGK@C@C@CAAACCAAAC@OD@@@B@B@B@BABABCBC@K@CAG@CDA@ADABCDAB@BAB@@AACCGEA@A@A@ABABA@CAECGAKCGCMCMAE@A@CAGAA@GECEGICAAA@@KGAAGEOGWGKGEKCEEKFKHCDCFCDIDKAA@ACICMCKGEOCMCOEWKACECAAAAEE@@AECGAG@GA@@GBEDGBE@E@K@CACA@ACACAA@CCBIAE@G@C@E@@BDFBBBDA@@@CDABGFGBEJEBE@AAA@GAG@KAG@EDAFBDBDHFFFBDBDBFAJEHGHGFABIBGDGJENAJELEHCDCBEFEFC@IBIHEJE@AECIEI@@GKAAEICICCECA@C@IBGDGJGDEJGFABEBE@I@C@G@QCE@C@E@I@GFABBL@F@DABAL@@AB@B@DADCNEJGJABCDI@@@EBO@Y@WEC@ECSIOACB@@ID@BCHJ\\HTKJMGCA]MIECCIKACAECK@AAACEEECA@@SCCAMIIMGAG@KCOHQ@C@CAIAICEEECECGAG@EBGDIHGF@@IBCCA@CGGEGCIAKCK@IFCB@@ACACEEOKECCECECEA@"],"encodeOffsets":[[112288,27710]]}}],"UTF8Encoding":true});}));