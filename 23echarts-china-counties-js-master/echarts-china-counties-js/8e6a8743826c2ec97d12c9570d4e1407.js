(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('岑溪市', {"type":"FeatureCollection","features":[{"type":"Feature","id":"450481","properties":{"name":"岑溪市","cp":[110.994913,22.91835],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@C@AA@ADEBC@GAC@AAA@CAAACAAEEGCEAA@ICC@G@G@GBEDC@EBG@CAEBEBC@@@G@GBA@@@CB@@@B@BA@@@A@@@@@A@AB@@C@AB@@A@AB@@@B@@@BAB@@@@A@A@@@@B@@@@AB@B@B@BAB@@BDB@@B@B@@BB@BB@@@@@@BDD@@@D@BBB@DAB@B@@AB@@@@BB@@A@@@AB@@A@@@A@@B@@A@@B@B@@@@AB@B@B@BAB@@@BA@A@@D@B@B@@AB@@A@AB@B@B@BA@@B@BA@@B@@@@A@@@A@@BA@AA@@AB@BAB@@A@@@@@@@@B@@@B@@ABADABAD@BAB@@B@@@AB@B@D@@A@AB@@ADA@@B@@A@@@A@A@@@A@CF@@A@@BAB@B@B@B@@@B@@@BA@@B@B@@A@ABAD@B@@@@AB@@A@A@A@@@A@@AC@@@A@@@AA@@@@@@A@@@A@@B@@A@A@AA@@CB@BA@@@ABA@ABA@@B@@@@A@AB@@@@@B@B@B@D@@@@A@A@CAAA@@AB@@@@A@AB@@@B@BA@A@@@@A@@C@AB@A@@C@A@@@A@@@CB@@A@@@A@A@@@AAAA@@@CA@AB@@A@A@A@A@A@@@AA@@@@@@A@AB@@A@@@@@@@@@@@BB@@@B@@BB@@B@B@@B@B@@CD@D@@A@@@@@@B@@@B@@@@A@A@A@AB@@A@A@@@@D@B@@@B@@BB@@B@@@BB@@@@BB@@@@AB@@@@@BBB@B@@@@@B@@BB@@BB@@BBA@@@@B@B@@@BA@@B@B@@AB@@@@A@@B@@@@A@@@@@ABA@@AA@A@@BAA@BB@A@@@ED@@@@@BA@@@@@@@@@ABA@@@BBABBB@@@@AB@@B@@BABA@@B@@AB@@@@ABBD@@@D@@A@BBBB@BB@@BB@BB@@@BABB@@B@BB@@B@@@@B@CD@@BDBB@BA@@BB@@BBD@@@@B@BB@@@B@B@@@BBB@@@B@@@@@B@B@@@@@B@@BB@B@@B@@B@@B@@B@@@B@@@B@@BB@@@@AB@@@A@@A@@@@@@@@@@B@@@BA@@@@@@BBBA@@@@@@@@BB@AB@@B@B@B@BABF@@B@@B@@AB@B@@ABB@@BB@@@@BF@@@BB@@A@@B@@@B@@@@@B@@@BB@@BBB@@B@@@@B@BABB@@@@B@@B@AAB@@@@A@@@@@@BB@@@BA@@BA@@B@@B@@BAB@D@B@BB@@B@@@D@B@B@D@B@@@@BB@@BB@BB@@@@@BB@BBBA@@B@@A@AD@@@@AB@@AB@@@D@B@B@BAB@@@B@@@@@@EB@@ABA@@@A@A@A@C@@@A@A@AAA@A@ABA@@@A@@AAA@@@A@@@A@@A@@@@A@@AA@@A@AA@@@A@@AAAA@@AA@@@@@A@A@@@AAAA@@@C@AA@@@B@@@@@BAAA@@@@BAB@@AAAB@@C@@B@B@@@B@B@@@@A@@@A@AA@@A@@@@@@@A@@B@@@@AD@@@@AB@@BB@BA@@@@B@@ADA@@BA@@A@@AB@@A@A@@@A@@@@AA@@@@BA@A@AB@B@@@@@DB@BBA@BB@BA@A@A@A@@@A@A@@@@@A@@BAB@B@@@BBB@B@@BB@B@B@@@BA@@@@B@@@@A@BB@@@B@@@@AB@@@BA@@@AB@@AB@@@@@B@@ABB@AB@@@BA@@@A@A@A@AB@@@B@@@B@@@B@BBB@B@@B@@B@B@@BBA@@@A@@B@@@@BB@@B@AB@@BB@@AD@@CAA@C@@@AB@B@BB@@@@BA@@BB@@@@BDB@@B@B@B@@@B@BBB@@@BB@@BD@BAB@@AB@@@B@@@BB@@@@BA@B@@BAD@@@B@@@@@@AB@@A@@ACBA@A@A@@B@@@B@BBB@BB@@B@B@BB@@BA@@BB@@@B@@@DB@@BBB@@@@B@@@B@@@@@@BBBDB@@@BD@@BB@@@@BB@BA@@BB@@B@@BB@BB@BB@@AB@@BB@@B@B@@@@@BB@@@BB@@@B@@@B@@@B@B@BB@@@@@BB@@@BAB@@@@@B@@AB@B@@@B@@@@@B@BB@@BB@@@@D@B@@@DA@@B@BB@@@BB@@@BB@@AB@@@@@B@B@@A@@@@B@@@@@B@@@B@@@B@@@B@@A@CB@@A@@B@@A@@BAB@@@BA@AB@@A@@@CA@@@@@@A@ABA@@B@@@B@@A@A@@@@B@@@BB@BB@D@@@@@B@@@B@@@B@@A@A@@B@@@@@B@B@@@@@BA@@@A@@@@@AB@@@BBB@@@B@@@@@B@B@BB@@@BBBB@@@B@@@BBB@@BB@@BB@@@BBB@@@B@B@B@@@@@BA@@B@@A@@B@@AB@BA@@@@@@BA@@B@@@@BB@@DB@@BBBB@B@@B@@BB@@D@D@B@BBBAB@@@@@@@BA@@@@BA@A@@BCBA@@B@B@@@BC@A@@BAB@@ABAB@@A@@@BB@B@B@@A@A@@B@B@@@B@@DBBB@@B@@@@B@BBBBB@B@@@@C@A@@@AB@@A@@D@B@@B@@B@@@@AB@@@@@@@@@@A@@@A@@@BB@@@B@@@B@@@B@@@A@@AA@@A@@@@BCB@BA@@@@B@@DBBBB@BB@@@@@BD@@@B@B@@@@@B@@@B@@@B@@@@@BA@@@@@@BBB@@@@@@A@@B@B@B@@A@A@@DB@@@B@BB@@@B@@B@@AB@@AD@@@BA@@@A@@@@@@@BB@@@@@@ABABA@@BEB@@CB@@@B@@D@@@DB@@@BB@@@B@B@D@DB@@DBB@AB@@BBB@@@@@ABAB@@A@@B@@A@@B@@@@@BA@@@@@@B@@@B@@@B@@@@BBBBD@BBBB@@@@B@B@@@B@B@@@B@@@BBBA@@B@@@@@@@@@@@B@@BB@@B@@B@B@B@@B@B@@@@@@BB@@@@@B@@BD@B@BBBBB@@@@@@@BBB@B@@@B@@AB@@@@BB@@@BBB@@@BB@DAB@B@@ABBB@@@B@@@@@B@@@@BA@@@@@@BB@@@BA@@@@B@@@@@@@B@@@ABB@@@A@@@@@A@@@BB@@B@@@B@@@@@AB@@@@@@@@B@@@B@@AB@@@AA@@@A@@B@DBB@BAB@@@B@@@@@BBAB@B@@@FB@@B@@A@@BBB@@@B@FBA@@B@@BBA@@B@BA@@BA@@@@@AB@@BB@@@@B@@B@@@BA@BBB@@@@B@@@@B@@BBB@BD@@@@B@@AB@B@B@B@D@@@B@B@BB@@@@B@B@B@BB@@@BB@B@B@@@@AB@@A@AD@@@@@B@@@BA@@DAB@@@@CA@@AACA@BC@@@A@@@A@@B@BA@@@A@@@A@A@A@@@ADAB@BB@BBB@@@@BADA@@B@@@BA@@BABAB@BAB@@AB@@AB@@@@@B@B@@BB@@B@@@B@@BBA@@DA@@@@B@BBB@B@@@@B@@B@@@@@B@B@@@B@@@@ABB@AB@@@@ABAB@@@@@B@BABAB@@@BBB@@@@@B@F@@ABABAB@BAB@BBB@B@@A@@@ABC@@@A@ABC@AB@@@B@BA@@B@D@@@@BBDB@B@@@B@@BBB@BBAB@@AD@BA@CB@@@@@B@@@D@@@B@@BBB@BB@BBB@@BBB@@BB@@B@@DB@@@@BB@D@BB@@BB@BBD@B@@@BB@B@B@D@B@B@@BBAB@BB@FBB@BB@@DA@@BAB@@@B@BA@AB@B@B@@@B@D@D@@@BB@@@B@@@@@BB@BBB@B@@@@@B@@B@@AD@@B@@BD@B@@@BBBB@@BA@@@@B@@A@@@@B@BAB@@AB@@@BAB@@AB@B@@@B@@@B@B@B@B@@B@@BB@@@B@@B@D@@@BBBBB@@@B@@@B@@@B@@BB@@@BBBB@@BBBBB@@@@B@BA@@@A@@@ADAB@@A@A@A@A@@@@@@BB@@@@@F@DBB@B@@@@@BBB@@BB@@B@@BABBB@B@F@B@@@@A@@B@@AB@BAD@@B@@B@@@@B@@@BBAB@FADA@@@AB@BA@BB@@@BA@@@@B@B@@@B@@A@@@@B@@@B@@BBBBB@@B@@@D@D@B@@@@A@AB@@C@A@AC@@A@@@A@@@ABEAAB@@A@@BAAAACAA@@@AB@@@@@B@B@BA@A@@@A@@@@@A@@@A@AB@@AB@AACC@@AA@@@A@@A@CA@AA@@A@@BABA@@B@BAB@@@B@BAB@@A@@@AA@@@AABAB@@A@@BBB@@@@ABA@A@@@A@@@ABAB@B@@AB@@@@ADABA@@B@@@B@B@@@DCBB@@DA@@BAD@DB@@B@BA@@B@@@@@@@A@@@@@@@@B@@@DBB@@BC@A@@B@@@@@B@@@BC@@B@@@BA@@BAB@@@B@B@B@B@@B@BBB@@B@BA@@@BB@@@@@DBB@B@BBB@@BB@@@D@BAB@@@B@B@D@B@@@BBD@B@B@B@BBDB@@B@@AB@B@@@@@BB@@B@@@@BB@@BB@@@@BB@@@@B@@@@DFBBBD@@@@BB@B@@DD@@@@BD@@BBB@B@@@B@B@@@@@BB@@B@@@B@@@BA@@B@@ABA@@BA@@BA@A@@BA@A@@@ADBD@@@B@B@@@@@CCAA@@@@@@@A@A@AB@@A@@BA@@BCB@B@@@BA@@BB@@B@B@BB@@B@B@B@B@@@@@@@DB@@@AD@B@B@@@BA@AB@@@@@@AB@B@@@D@@@B@B@B@@AB@@@@@D@B@B@B@B@B@BB@BB@B@B@@AB@@B@@B@D@@@BB@B@@BA@@@@BB@@B@B@B@@@@A@@BA@A@@AABA@A@@@@@A@@@A@@BA@@@AB@@@@A@A@ABA@@@@B@@A@@@A@AAA@@@CA@@AAC@@@AB@BA@@B@@ABC@@AA@@@AA@@@@C@@@A@@@@B@@A@@@@B@DEBA@@D@D@BAB@DB@AB@@@B@BB@@BB@B@B@@@D@B@@@D@B@@A@@@@BB@@@@@B@B@@@@BB@B@@AB@BA@A@@@A@@BA@ABB@@BBBB@@@@@BB@B@@@@BB@@BBBDAB@@AB@@AB@B@D@@@@@B@@ABA@@B@@@BA@@B@B@@AB@B@@@B@B@BBB@@@BB@@B@B@BABA@ABAB@B@H@@B@@@B@B@B@B@@@BB@@B@@@B@B@@BBB@D@F@DCHABCF@B@BCBB@BDBADBBBD@@@@B@@@DABD@@D@@@B@@ABA@A@@A@A@@A@A@C@@@CB@@AB@@A@A@@BA@AB@@AB@@A@ABAB@BA@AAA@AAAA@@A@A@@@C@@B@BB@@BBB@@@DDB@BAD@B@BA@@@@@@DA@A@@B@BA@@B@B@BA@@@@BB@AB@@@@@B@BA@AB@@AB@@@@AB@B@@@@@@A@@BA@@B@@B@@B@@@@A@@B@@A@@B@@@@@BAAAB@AA@A@@@C@@A@@@@@A@@@A@@@@AA@A@@A@@@AAA@@@@@AB@@A@A@@@AB@@A@A@CA@@@@@@A@@AAA@A@AA@@ABA@C@@@A@@@A@@@@@A@@@@@A@AA@@@@BC@A@@B@@@DA@ABA@A@@@A@@A@@A@@@AAA@AA@@AB@@AB@DABA@@D@DBBD@@BBB@@BD@@@B@@A@AB@@@BABA@@@ADABA@AB@@@DA@@@@B@B@@@B@@BB@BB@@@BB@B@B@B@@@BB@@B@BA@A@@BA@@@B@@@@@@@@@B@@@@BA@@B@@@@@@B@@@B@@B@@@B@@ABAA@BA@A@@@@@@B@B@@@@B@@@@@@AB@@@@@@@@B@@@B@@@B@@@B@@@@@@@B@@A@@B@@B@AB@@@B@B@BA@AB@@@BAAA@@@A@A@@AA@C@@BA@@@A@ABCD@@AAABABA@@@ABA@@D@B@BA@C@AA@CE@ABA@A@@A@@AACAA@AAC@AAC@@DA@AAC@@DABABA@@@ADC@AB@@AB@B@B@@BD@B@@@@@BBBB@@BDB@@@@A@AB@@ABB@BB@B@@BB@BB@@@AB@@@BA@A@AB@@AD@@@DB@AB@@CB@@BBB@@@@BBBA@BB@@@@A@A@@B@@A@@@@@@@@@A@@@@@@@@@A@@@@@A@@AA@@@@@A@@@@@@@A@@@@B@@@BB@BB@D@@@@BB@@B@BBB@@@B@B@BA@@B@@@BB@BB@@DA@BB@@@B@@@@B@B@@@@B@@ABA@@@@BB@@@@B@@@BA@@BA@@@@BA@@BA@@@@@@@A@A@@@@D@@@D@@@@A@A@AFAB@@@BA@@@@@@BA@ABABA@AB@@@BAB@@@@C@@@@BA@@@ABABC@A@@@@@@A@@AA@@C@AB@AAA@@A@@AA@@AAAAA@AAAA@A@A@@B@@A@@BA@@@A@@B@@@BA@@@A@@@A@@@@@ABA@@@A@@B@B@B@D@@@@@@@B@@@BA@A@A@ABABA@AB@@A@A@@@A@E@ABABA@AC@CAAA@ABA@CBAB@D@BA@AD@@ABA@ABA@A@AAA@ABABA@@@C@C@CAAA@AAAA@CAC@C@CA@CAAAA@@AAA@@@AC@AA@ABA@AA@A@AC@@@C@E@C@CBCAC@AACEAAACACABA@A@@@AAAA@AABCAACAAACBA@@@AA@AAA@A@CCCA@A@A@EACAAAABA@A@A@@@A@@A@@@ABA@ABAAA@A@ACAAA@A@AAA@AA@AAAAC@CBA@A@AA@AAA@ABA@ACAAACAABA@C@A@BA@AB@BA@A@AAAAA@A@AA@A@AA@A@@AAAA@AA@CAA@A@CAABC@@A@@AABA@AD@B@B@@@@A@@AAAE@A@@@AAAAAA@AA@A@A@@B@B@BABC@A@@@C@AAA@AAAAA@@C@A@@BA@C@ECCAA@A@AAAAA@@C@EAE@A@AA@AAA@CB@BCDCBA@ABA@A@A@A@@AAC@A@@@A@AAA@AC@CA@@EAAACAC@CAA@@A@A@AEC@AAC@A@ABABA@A@@AAA@@@A@BA@@@A@@A@A@AAAAA@@A@A@A@A@A@ACCCACCCACACAAC@@A@C@A@A@C@@@@BAB@@CAA@@ACBA@ABAAAA@A@A@A@A@C@@AC@AAAC@CAC@@AA@@BBBABAAA@ACA@C@A@CA@@ABABA@A@@AAA@@C@C@AB@DABABA@A@A@AAA@C@ABQA@D@BEAA@@A@A@AA@AB@@@B@B@BA@AA@CAAAA@@AAAB@@@@@@@@AAA@A@A@CBABAB@B@BABA@@BAA@AAA@A@A@AA@A@ABA@@B@BABA@C@A@@@@@ABA@A@@@@@A@@@A@@BAB@@ABA@AAA@BCBA@@A@C@AAC@A@AD@BABA@@AAA@AAA@@@ACA@@CBABABA@CAAC@A@C@A@A@@@@AAA@A@C@@AA@@AA@A@@AA@A@C@A@ABA@C@C@A@ABA@@AAAA@A@AB@@E@E@A@ABC@@AA@@AA@@AAA@@@AB@B@B@@ABC@A@ADA@AB@B@DAD@@@DABAB@BCBABAD@BABADABABA@AAA@A@AB@@C@CBABADABABA@A@A@@@C@A@A@AC@@@AAAA@CAC@@AAA@ACCCAAAC@A@AAA@A@AAAAAAAAAC@AAA@ABA@C@C@A@@AAAA@@@@A@@@ABA@CAA@@@A@A@@@A@A@AA@ACAAAAAAA@C@CBCAC@C@C@A@C@AA@AAACAA@ABCBA@AB@BADABC@AAC@AAC@AACA@@AAA@CAA@C@@AAC@A@AAACAA@EACACC@AAC@AC@CDA@ABEDA@@HCBA@E@C@E@EAECAAE@AAI@"],"encodeOffsets":[[113625,23180]]}}],"UTF8Encoding":true});}));