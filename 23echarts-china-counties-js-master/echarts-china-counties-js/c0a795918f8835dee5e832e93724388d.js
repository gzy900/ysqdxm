(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('全南县', {"type":"FeatureCollection","features":[{"type":"Feature","id":"360729","properties":{"name":"全南县","cp":[114.530125,24.742403],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@@A@@B@@@@@@A@@@@B@@AB@@AB@@ABA@@AA@@DAAA@AA@A@AAA@@@@@@@ABA@A@A@AB@@AA@@@@@A@@@A@A@@@A@@AA@A@@@A@@B@@CB@AA@AA@@@AAA@@@@@A@AC@AA@@A@@AC@@@A@ABAA@@@@AB@@A@@@A@@@@@@@CB@A@@AB@@A@@A@@A@C@@@A@@AA@@@A@C@@C@@AAACA@@AA@AA@A@@@@@AA@@A@A@@A@@@A@A@@A@@AC@@@@A@@AA@@A@@@AA@@A@A@CA@@@A@A@AA@@AA@@A@@@@@@AB@@A@CBABCB@AAA@@@A@@B@@AB@@AB@@@B@@@@A@@AC@AA@@@AA@A@A@@A@@@@@A@A@AA@BA@A@CB@@A@@@C@C@ABA@@@A@@AAA@@A@@A@A@@A@@@@AA@@A@@A@@@A@@@A@@A@AAA@@@ABABCAAA@@@A@AB@@ABA@@@@@AB@@AB@DABA@@BAB@@A@AB@@A@ABA@C@@ACA@AAAA@@@@AA@@A@@A@@@AA@AAA@A@AACCAAAAAACA@@@A@CAA@@@@A@@@A@CAA@A@AAE@@BABA@@@A@@@A@@AA@A@@@@AACACA@@@A@@@A@@AAAA@@@A@A@@AC@@@AAA@AA@@@@@CB@@@BA@@B@B@@ABA@@@@A@@@@A@@@@BAB@@@@@AAA@@@A@@A@@B@A@@@@@AA@@AB@@@A@A@AAAB@@@A@@BA@@B@B@@@AA@@@@DA@@@AA@@@A@@@@A@@@ABA@@@A@@A@@@AB@BAB@B@BABABA@AA@@A@AB@B@@A@@@A@A@@@AA@@A@@@@BA@@B@@A@@@@@@@@B@@@@@BC@@@AA@@@@@@A@@BA@@A@@ABA@ABA@A@@BA@@@@BAB@@@B@@ABA@@AA@@@@@A@B@AB@@A@@@AA@@@@@A@@@A@AAC@@BAA@@@BA@A@@@@AAA@@@A@A@AAAA@AAA@@A@@AA@@AB@@A@@@A@AB@@A@@@@@ABA@@@A@@CA@@A@@@AA@@A@A@@@@@A@@A@@@@@@@@AA@@A@@AC@@@A@@@EC@AACAC@@AA@@AA@@@@@A@@BA@@A@@@AA@AA@@@AAAAAA@@A@@AA@BBA@A@@@C@C@GAE@CDAF@D@DABABCDCBC@C@ABABAH@@ABA@E@@@EA@@A@A@@B@BBFBD@B@@E@GCEEBEDABABC@AACCAA@AD@FCFEBE@EEGGGAEFABCAKEGAGA@@EBEFAB@FAH@FCFADCDADCBAD@D@BADADDD@B@@@JCHCBGBC@@F@B@B@DA@@DABABC@A@IAIBC@@BA@CDAFAFABIDKDI@ICKEIBIDOFKFAF@DGAK@G@EAGACECAC@E@GAANBFDF@BF@DCBCAEF@HDFDAB@@EDCBAB@@@J@@@DCBEDABCDAFADCBABCBAHBHJDPBTBLCFADE@@DBL@RHXJZBB@DABBD@D@FAF@D@DBDBBBH@J@B@BBBBBBB@BDBF@H@JDNFFHFJDH@JAF@HDFBDD@@FFFHFBD@B@HDHBBBBDDFBHFLBBAJAHGJEFBJBDHDJBBD@N@BEPBHBB@@DFFDFBF@B@DB@BABAF@FBDBFFFFF@DBBAD@BBBBBDDFBBDDDDDBHBFBBHBJBFBFJHDHDDHBPBB@NAJEJGHIHAB@DB@DDHDDDBJBH@D@@EFA@@BCD@BBDBBBD@DCDADADBBBBBBDBFBHBH@TBHB@@BD@B@BGFADBHDDR@T@RFHDDDBBBD@D@DAF@BAD@D@D@B@BB@B@B@D@D@BBDDF@BBPHD@DBDA@CBC@@D@D@DBDAB@NCLB@@B@FDBH@@BTDLFFHAHEH@HDHHFJBFBH@@@LAD@BBDJHBFBDFFBBJTJLNBP@P@JAB@DADADADC@CB@B@B@@BADCD@DDFDBDDB@D@@CBA@CBEBBDBD@DAJCJAR@L@HBDBPJJHDD@@BDHFANBFDDLDNDJ@HCJANDJFBAD@@@DBDB@BBBBDDB@@D@DBDBB@DBBBDBF@B@B@B@BDB@BH@DBB@D@@B@B@B@BA@@@A@@@@B@@ABA@@BAB@@A@A@ABAB@B@@@@A@@BA@@BABABABA@A@A@A@@B@B@@@@ABC@A@@@AB@@@BA@AB@@@BCB@@CB@@@B@@@BA@@@AB@@@B@@@@B@@@@A@@@@BD@B@@@@A@@BA@@B@BAD@HCB@B@@ABABCDEDEBA@@A@@AB@BA@@BAB@B@@@@@@@F@@@DA@@B@B@@@BA@@BC@ABCAA@AAA@A@@@A@@@@B@DBB@@@@@@@BC@@@@BA@BB@@@B@B@@@BB@@@@B@@A@A@@B@@@B@DA@BB@@@B@B@@A@@B@@@zQB@BAD@@AB@@A@A@A@@BABA@@DAB@@ABA@A@@@@B@@@BA@A@@BAB@BA@@@@@A@AA@@AA@@E@@B@BABAFA@A@@AC@@@A@A@AB@BA@ABA@ABA@@D@@@BB@@BAB@@@@CBAA@@@@@A@@@@A@@BA@A@A@@CC@A@@@@@AA@A@@@@AB@@A@A@@@AAA@@@@@AE@AA@@@A@@A@@@AAAC@A@A@@@@A@CB@@AB@@ABA@@@A@ABAB@@A@@@BA@A@@@@A@AA@@@@@A@@B@@@@A@@CA@@@@BA@AD@@AAA@@@A@@AAA@@@@A@AAA@@AA@AA@A@@@@AA@AA@@A@@@@B@@A@A@A@@BA@@@ABA@@@AB@@C@A@A@@@A@A@@@@@A@A@A@A@@@@@A@AC@@AA@@@@AAA@A@A@E@A@@@@@BFAB@@@@ABA@A@@A@@A@AAA@@@@AA@A@A@@A@BA@@@A@A@A@A@A@A@AA@@@@A@@@C@@@A@@@A@@@@A@@A@EACA@@@A@@CAC@AAA@A@@@A@@A@@@ACAA@@@@A@@AA@@A@A@A@@AA@A@A@@@@A@@@@@AAA@@A@@@@@@AA@@AB@AA@@@@A@A@A@@ACA@@@AA@@@EAA@@@@@@@@AA@@@A@@@A@@@CBA@@D@B@@CBA@A@AAA@A@A@C@A@@@B@@D@BBBBB@@@@A@@BAB@@@@A@@A@@ABA@@B@BA@ABEBA@@@ABA@@BA@@@@@A@@@A@A@A@A@A@A@A@A@@@A@@BA@A@@@@A@@A@@@AA@@@@A@@@AA@@@@BA@@BC@@@@B@@@@AA@BA@@AA@A@A@@A@@@@BA@@@A@AA@AC@@@@BA@@BA@A@@A@@AAA@A@AAA@AAA@@@A@@@@@A@@@@AA@A@@@@@A@@B@@A@A@@@@@A@ABA@A@A@ABA@@BAB@@A@A@A@AB@@@@A@@@A@@@@@AA@@@@AA@@@@@@@ABA@@@@@A@@@@@@@@BA@A@A@@@AB@@@BABC@@DE@@@@AA@ACC@@ABA@@A@@A@@@CA@@@@@@BAAA@A@@@AA@@A@@A@@@AA@@@@A@@@@A@@@@@@@@@AA@@A@@@@A@C@CA@@A@AAA@@@A@@@C@@A@@@@AAA@@AAA@@A@@@@AC@AAA@@@AA@@@@@A@@@@@@A@A@A@AA@@A@@@CDA@AB@@A@@@A@@BA@@@A@A@@@@A@@BA@@@ABAB@DA@@BABA@@@AA@@@@@@A@A@@AAAAA@@@@A@@@@AA@@@BC@ABA@A@A@@@A@@@A@@A@@@A@@@@C@AA@@A@@A@@A@@AAA@AAC@AAA@A@@A@@AC@@AA@AA@@@@AA@@@A@@@@A@@AA@@A@@@@@@A@AB@@A@@@@@ABAA@BA@@A@@AB@@@BAB@@@@@@A@AAA@@@A@@@@A@@AA@@@@@@@@@@A@@@A@AA@@AB@@@@AA@@@@A@@@@@A@@@A@AAA@@@@A@@A@@@A@AB@@A@@@A@A@@@A@@@AA@@A@@@@@@@@A@@@C@@AE@A@@@@@A@@@A@A@@@@@A@@@A@@@@A@@@A@@@@@@@@A@@BA@@A@@@@@@A@@AA@@A@BAA@@AA@@@@AAAAA@@A@@@EA@@@@@AA@@@@@CA@@AA@@A@A@@@@A@@AA@@C@@@@A@@@@A@@@@AA@@C@A@A@@@@@A@@@@BAB@B@@A@@@@B@B@B@BA@BB@DA@@BA@@BA@@@@B@B@B@@@D@@@BA@@@A@A@AB@BABA@@B@@@B@@ABA@@DBBB@A@@@@@A@ABA@@BC@@@@BA@@@@BA@@BAB@B@D@B@@@BABA@@@@AAACAA@A@AAA@AAA@CA@AA@@AB@@CAA@AAAC@@AAA@@@@A@@@@@A@@@@@A@@@AA@@@@A@@@A@A@@@@B@@@D@BA@@B@BABAB@BABABADCB@@ABA@AB@B@D@BBB@B@@@B@BA@@BC@@DABA@@@A@AAA@CAA@@@@AB@@A@AAA@@@CB@BCB@BA@@@AA@@@A@@@A@@A@@@@A@@@A@@DA@@@@A@A@A@A@A@@@@A@@B@@A@@B@BA@@@A@@C@@@AA@@BA@@@@BA@@B@@AB@A@BA@@@@@A@AA@@A@@@@B@@@B@@A@@@@B@B@B@D@@@@A@@@A@@CB@@C@@@@AB@@A@@@A@@B@ACB@@A@@@A@@BB@@B@BA@@CA@@@AACB@@A@@@A@AB@DBBABAB@B@@@BA@@@@FABA@@BC@ABA@AB@B@BA@@AA@ABA@AB@BA@A@A@@@@A@AA@@@A@@AAEA@@@A@@A@@AA@@@A@@BA@@B@B@B@B@@A@@@C@AAC@A@@@AA@AB@@A@@AA@@A@@@@AAAAA@A@@@@@ABAA@B@@ABAAA@AAC@A@@@A@@@CB@@@B@@@BA@@@A@@@E@AB@@@@@BA@@BAB@@ABA@@BAB@@@BA@@B@@ABAB@@ADA@@@@AA@AA@@AA@@@@AAA@@@@AA@@@@A@@BAB@BA@@BA@@@@BBB@@@B@@@@@B@@A@@@A@@@A@@AA@@@A@A@A@E@A@A@A@@BABA@AA@@ABA@A@A@A@@@A@@@CA@A@@A@@@A@A@@@@A@@@A@@@AA@@@A@AA@@C@A@@A@A@A@A@@AA@AA@A@AAC@"],"encodeOffsets":[[117325,25312]]}}],"UTF8Encoding":true});}));