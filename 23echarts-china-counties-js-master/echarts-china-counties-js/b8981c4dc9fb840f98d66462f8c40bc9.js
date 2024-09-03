(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('武宣县', {"type":"FeatureCollection","features":[{"type":"Feature","id":"451323","properties":{"name":"武宣县","cp":[109.663206,23.59411],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@A@@@ABA@A@A@@B@@@B@@A@@BABAB@@@AA@@B@@@@AB@@@@@BA@@@A@@@@BAB@@A@@B@@AB@B@@A@A@A@@BABA@A@@B@@AB@@@AA@AD@@AA@@B@@@@AABAB@B@@@@@B@@@@@B@@@D@B@B@@@@CBA@@@A@@@ABA@A@@AA@AB@@ABA@CDA@A@@BBB@@@DBB@B@@BDBB@B@@E@AB@@CD@@A@@@AD@@@B@D@B@@@B@B@@EBA@@@@BA@@@@A@@C@@BA@@B@@@@B@BB@@A@A@AB@@B@@BB@@@B@@B@@@B@@@@@@AA@@AA@@@@A@@BAB@@ADA@@BB@@B@@@@@BDB@B@@@@AB@B@@@B@@@@@B@@A@@B@@AB@@@B@B@B@B@@@@AB@@BBBB@@@D@@@B@@@@B@B@@B@B@@@B@B@@AB@@@BA@A@@@ABA@A@@@AB@@AB@BC@@@@B@B@B@@A@A@@@@BABA@A@@@ABABAB@B@@A@@@A@@BA@AB@@@B@@@BAB@B@BABAB@DA@@B@@@@A@AB@@A@AAAAA@@@CCA@A@@@@B@@@BBBBDDFDBBB@BBBABBB@BBBFFBB@@@@BDDBBD@BB@@DB@BBDDB@@B@@BB@BB@@BB@DDBBDD@B@B@@@B@B@@AB@@@@E@EBA@AB@@EDA@@B@B@@BB@@@B@@@D@@AB@@@BAB@B@D@B@@@B@DB@@BADAB@@BDB@J@B@@@@@B@@B@@@B@BADAD@B@BB@BDBDBBABBB@B@B@@@@@@BBAB@BBB@B@@@B@D@B@@@B@@AD@D@@@BBB@@AB@@@BBB@B@@@B@@@BADB@@B@@@@C@A@A@@@ABAD@B@D@B@@BD@@@@@@@@@D@@@B@@B@@B@@@@FB@B@@AB@@@@@B@@B@B@@@@DBB@@B@D@@BB@@ABA@C@A@A@AB@@AB@DCDCBA@@D@@@@@DBB@B@F@B@B@B@@@@B@B@@@BBB@@@@BBDFBBB@BA@@@BB@AF@BDH@DBB@BAD@@BDBBD@@B@B@@@@DA@@BBD@@F@B@BBD@@@@@@DBDBB@@B@@AD@@@B@@@@FBDBD@B@BBB@FB@@B@@@B@@@B@@B@BBD@BBBBBBAB@B@D@B@B@@@BA@@DD@B@B@B@B@@DDB@@B@B@@@B@B@@BB@@D@@@BBBB@@BFBH@@@B@@@BB@BBBB@@B@@@FDB@BDBB@DBB@B@B@D@BBB@BBB@BBB@@B@BBB@@@@B@@B@@BBB@B@@D@BBBB@@@B@B@@@@D@@@B@@BB@@B@B@@@BB@B@@@B@@@AD@@@@BB@@BB@@BBBBB@@@@DBB@BB@@B@@@B@@@DAB@B@BAB@BA@AAA@A@A@ABAB@@A@EBAB@@@B@@@@@@@B@@@B@BABB@@D@@B@@@AD@FADBD@DDD@D@D@DBBB@@B@@AFBB@BA@@FA@@AA@G@EAIAGAAAC@CAEAC@EBC@GDGDADADAD@B@BBD@@BB@@@B@@BB@BBBBDBBDB@@BBBDDB@@@BB@BD@B@BBBDD@B@@BB@@BB@BB@@BBBBBDDFH@DFFBB@BB@B@B@BADAD@BABBB@DBFF@BAJCFAHAJ@FADAF@@ADCJCHCFABCBABABGDABA@ABCBCB@@A@ABA@@@EBC@C@EBA@C@G@E@@@@@ABCDCBABABCB@@A@@B@BC@AB@@ABA@@B@B@@@D@B@B@BAB@BA@@B@B@@@D@B@BBFBD@BBB@BDD@@BBBBFHDBDBBB@BBB@BDH@D@BDDBFBN@B@@@BBFDHBBBDBBBBFDBBDBBBDDBD@BBB@BBBBBDBBBBBB@DDDBFBDBB@@@D@@@F@D@D@FAHBHBD@BBFDFDDBDBDBNDDBLDFBDDLHLHHBDBFBB@B@@@D@B@BADADADAFEFCB@@A@A@A@AAA@AAC@A@@@A@@@ABA@A@A@ABA@A@A@@BCDCB@B@B@B@D@@@DBBA@@BAB@@ABAB@BAB@B@B@B@BAD@BA@@@A@@@A@@@A@@@A@@BA@A@ABA@@@A@@@@@@@@A@A@@AC@@@A@C@@@A@AB@@A@@@@@A@ABA@AACBC@E@@BC@@@AB@@@B@@CBC@@BAA@@A@A@@@A@A@@@C@@@@@A@A@A@A@A@@@A@@A@@AC@AAA@C@A@A@@B@@AD@B@@A@@B@B@@A@AB@@@D@B@B@@@B@@AD@BCB@BA@A@@@A@A@A@A@A@@B@BA@@BCB@F@@ABA@A@@BAB@@@D@D@B@BBB@BB@@B@B@B@@A@AB@BAA@@AAA@@@AA@AAA@CAC@@@BC@A@ABA@ABA@CBA@A@A@A@AB@@@DC@@B@B@BBB@@A@@B@BA@@@ABC@@@A@@A@@@@A@@@A@@@@BABC@@BA@CBA@@@@BAB@B@B@@ABAB@DA@@@AA@@A@AAA@A@@@ABAB@@AB@@A@@BA@A@A@@@A@@@AAAAA@AA@@AAAECAC@C@A@C@@@C@@BA@A@ADC@A@@@A@@BA@@DBB@D@B@DBBAB@D@FAD@BBBBBB@@B@@@BA@AF@DBFDB@@@B@@AFB@@BABAB@@AB@BBB@BBDAB@@@B@BBHBB@@@B@@@B@B@@A@@@@BB@@BA@@@@B@@@BA@@B@@@@AD@B@@AB@DAB@B@@@BADAB@@@BC@A@@BA@@BA@@@@BAB@@@B@BA@@@@@A@@@@@@@@@A@A@A@@@ABA@@@@@@@ABA@@BA@@BA@@AA@@@AB@AA@@@@AA@A@@@@@A@@@CB@@@@A@B@@DA@@@A@@@A@@@C@@@AA@BA@@@A@@A@BA@A@A@@@@@A@AD@@A@@@@DAD@B@FBB@B@DBB@D@@@BA@@BC@@@AB@@@@ABA@@BAB@B@BAB@@@@A@AB@@A@@B@D@B@B@BA@@BBDB@@D@@@@@B@DAB@BAB@BA@@BAB@B@B@B@B@B@@@@@B@@AAA@@BA@ABA@@BC@CBAAA@@@A@@@AA@CCAAABEAA@CAC@BA@@@A@@@AA@@@DABCAAB@AABC@ABA@@@C@@FC@@BB@@B@B@B@BB@@BAB@@@@@B@@@B@B@B@@@DA@A@@@AB@BA@@@A@ABA@@B@@@BA@@BB@@DBB@B@BBB@B@B@DBBDABBBABBB@@@DB@@B@@AB@@@@A@BHB@@@ABBBA@B@@B@@@B@@A@@@@D@B@@@B@@@@@B@BB@@@BB@@@@BB@B@@D@FAB@B@@A@@B@@@@@BA@@@AB@D@BAB@@@B@D@B@B@B@@B@@F@F@@@@B@BAB@@@BBB@@BB@@BA@@@B@D@@AD@@B@@@@B@@B@DBBBB@DBBAB@@B@@B@@@@@BAB@BA@@@@@@B@@AB@B@BA@A@A@@@A@@@AD@@AB@@A@@@A@A@@@AB@@@AA@A@A@@@A@@@ABA@@A@@A@ABA@@BAB@@@@@@A@@A@@A@@B@@@@AB@@AB@B@@ABABAB@@A@A@@BA@@@@@ABA@AAA@@@@@ABA@@BA@@A@@@BA@@@ABA@@@AA@@A@@@@B@@@@A@@A@@@@@AA@@@AA@@@@@@@@@@A@@@@@@@A@@A@@@@A@@@@BA@AAA@@AAA@@A@@@@B@@@@A@@@@@A@@@@AC@@@@AAB@AAB@@@@@@A@@@@@AA@BA@AB@AAB@@@@A@@@AAAA@@A@A@A@A@@@A@A@A@A@@@A@@@ABA@@@A@CB@@A@@DAB@@AAC@A@@BA@@@A@@@@BAAAB@@A@@@A@@@@BA@AAAB@AA@@BAA@@AA@AC@@A@@A@@AC@@@A@@@AAA@AA@@AAAAAAA@AA@@AA@@@@A@A@@@A@@@A@@@A@@@A@A@@@@BAAA@@@A@@@A@@@A@@@C@@BA@A@@@@@@@@@BB@@@@@BA@@@A@A@AA@@A@A@A@A@@@ABA@@@A@@@@AB@@@A@@@@AAA@@@AA@@AA@@A@AA@@@AAA@ACC@@@A@A@@AAA@@@@@AA@@AAA@@A@@@AA@@@ACA@@@AA@AA@@A@AA@@@AA@@A@@EBA@@A@@@@@@AA@AA@@@@A@@A@@AA@@A@@@@@@A@@@AB@@A@@BA@@@AB@@@AA@A@@@AAAA@@@@AB@@A@@AA@@@A@A@A@@AA@@A@@@AA@@@CB@@@@AB@B@@@BADA@@B@@@B@B@BA@@@@@A@@@AAA@@BAC@@@BC@@BA@@@@@A@@@AA@@@@A@@@AA@@AA@BA@@B@@A@AB@@A@@BA@AAAA@@AA@BA@C@@AAA@@@@AACB@@A@@@AB@@@AA@@@A@AA@@A@@@AA@@A@@AAAC@@@@AA@AAA@@@A@@@ABA@@BA@A@A@@AA@@@A@@CA@A@ABA@A@A@@@A@A@@BC@@BABA@A@@@@@A@@AB@@A@@@A@@@@A@@AAA@@@AAA@@A@@@@@BAA@@@AB@A@@@@@A@@@@AA@@@@A@CA@@@@@@@A@@@@@@@@A@@@@A@@@A@AA@@AA@@AA@A@@@A@@AA@AB@@@AA@@@@A@@B@@A@@@@@@AA@A@@ABAB@@@A@@@A@@@AAA@A@@@@@AB@@A@A@@@@@@@BA@A@@@@B@@AAA@@@@A@@@A@@A@@@A@@A@@B@@A@@@BA@A@AA@A@A@@C@@@A@A@A@@BA@@AA@@@AAA@@IFADCDABADAF@H@DAB@D@B@D@@@@@BAF@BADAB@BA@IFCDABGBCBA@A@G@C@CBCBG@EBCBA@CAC@A@A@CDA@A@EBA@A@A@AACAAAA@CBA@CA@@@@@@AA@A@GAC@C@CAA@A@A@@AAACCCCCECCA@@AAC@C@A@GBA@CAG@@@@H@@A@A@@AAE@A@AAA@@@@AB@BGBAB@@AB@@A@@@@B@D@@@@AB@@@@BBA@@B@@BB@@A@AB@@A@@AA@@@@AA@@A@AAA@@@A@AA@@A@@A@A@@@A@@A@@AA@@@AA@@@A@@@@@@A@@BAAC@C@@AA@@AC@AA@@@A@@BAA@@@A@@@@@A@@BAB@@A@@@@@ABA@A@@@AAAAC@@@A@@@AB@@@BB@@@@@AB@@AA@BA@@B@@A@@AA@@@A@@@C@A@@AA@@@A@@BA@@B@@@@A@EAA@@CCAC@A@@AAA@E@@AA@@@A@A@CAA@A@IB@@A@@@C@A@@@@@@A@@@@@@@@B@@@AAA@@@AB@@A@A@@@ABA@@@@@A@@@A@@A@@BA@@BA@C@@@@BADA@AAA@A@@ABAAA@@@A@AAABA@ABAA@AAB@BA@E@@B@BA@@B@@A@@B@@@@AB@@A@@B@B@B@B@@@@@B@@@B@BAB@BA@AA@@A@@B@@@BA@ADA@@DA@AB@@@AC@A@AA@@@@AB@@CD@@ABA@@@A@@@AB@BADABA@@@@@A@A@@@AAA@@@@A@@AAA@ACC@@AA@AACBAAA@@@AA@@AA@@@A@@@AAAA@@@@AAA@@@A@@@@@AAA@@@A@AA@A@A@@@@AA@@@AA@@AA@AA@@@@AAA@A@@@A@@@@@A@@@@@A@A@A@@CA@@@A@@A@@@AA@@@@@ABA@@A@@AACA@AA@@@@A@A@@@@@@A@@A@@@@@AA@@AA@@A@@C@A@@A@A@@A@@@@A@@@A@@@AA@@@@@@@AA@@@AA@@@@@A@@A@@@@AA@@@AA@@@@@@BA@AA@@A@@@A@@@@AA@A@@@A@@@A@@B@@@@@@AA@AA@@@@A@@@@@AA@A@@A@AA@@A@@A@@A@A@AA@@@@@A@@@@@AA@@@@@A@@@@@A@@@@A@@@@A@@@@A@@B@@@AA@@@@AAA@@@AA@@@A@@@BA@@A@BAB@@A@B@BB@@@B@B@@@@@BA@@B@@@BA@@@A@A@@@AAABA@AA@@A@@AA@@@AAA@@@A@AAA@@A@@@@AAA@AAA@AA@@@@BABAB@BC@@A@@A@@A@@ABA@@AA@@@AA@@@@A@AAAAA@@A@@@A@@A@A@CAA@A@@@ABA@@AA@AAAA@AA@@@@A@@@A@@@AA@@A@@AB@BAB@@C@@@@@A@@BA@@AA@A@@@CA@@CA@@@AA@@@@A@@@AB@AA@@@@@A@@AABA@@@@A@@AA@@A@@CA@@A@A@@A@@@@@A@@A@@@@@@BA@@@AA@@@AAA@@@AAAAAAA@A@@A@AA@@A@@A@A@AAA@@@@@CB@@AB@@B@@BB@@B@B@@@BAB@@@B@@"],"encodeOffsets":[[112169,23868]]}}],"UTF8Encoding":true});}));