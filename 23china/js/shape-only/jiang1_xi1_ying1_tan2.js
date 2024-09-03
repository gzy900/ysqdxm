(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('鹰潭轮廓', {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"鹰潭"},"geometry":{"type":"MultiPolygon","coordinates":[["@@B@B@HB@AB@B@@BB@@BB@@ADB@BB@BBBBB@B@BBB@BBBBAB@DBB@AB@@CB@B@@BB@@BB@@BB@@BB@@BB@B@B@B@B@BBB@BBBBBBB@BB@DB@BBBBB@B@B@DBDDB@H@BBB@B@@B@BDBB@BB@BAB@D@BBB@ABA@ABABCB@B@BB@BB@BAB@DBABB@@BBBB@@BB@@BBD@B@B@B@B@B@BB@@BB@B@@B@BBB@B@BAB@B@BBB@DA@@BABAD@BB@B@BBBBB@B@B@B@BBFAB@B@B@@AA@A@AAA@AAA@AC@ABBB@B@BBB@DBDBB@@ADCBAB@DABA@A@A@A@AB@B@B@B@HAB@B@F@BAB@@AB@BA@ABC@ABA@AB@B@B@B@D@FAB@B@BA@AAA@A@A@C@A@ABAAA@ADEBA@ABABEAAAA@A@AB@@A@A@ABA@AB@FAB@B@BAB@B@@A@AB@BA@A@ABA@A@A@C@A@ABABA@ABAHAB@@A@CAA@ABAAAB@B@B@@AD@@AB@@AA@AAAA@AB@BBB@BABAFADA@A@AB@@ABBBACACCA@A@@BB@B@@B@BA@@AA@@ACCA@BABC@A@ABA@AB@B@BABABAB@BAAABAAC@A@AA@@A@A@ABA@A@ABABC@ABA@AA@@BA@A@@AB@@ABA@ABAB@B@AAB@@A@A@AB@B@@A@AAAABA@@AB@BAB@B@@A@AA@@AA@A@@BA@BBEB@A@AA@@AB@@A@AAB@A@ADA@BB@B@B@B@@AB@@AA@A@A@BA@CBA@A@ABAB@BAB@DAB@AAA@@AA@BC@CBA@AA@ABA@@A@A@AAAB@B@@ADA@A@CA@A@C@A@AB@A@AAA@BA@@C@ABABA@A@A@A@AB@B@@CB@@B@BBAB@ABABABB@B@BAB@FCBA@CAABA@AB@@ABA@ACB@AB@@AA@A@A@BA@C@AAA@B@B@BAD@A@A@A@A@A@A@A@ABCA@@ABABB@AAAA@@BAAAAAAAAA@@A@A@A@AB@@AA@A@A@AAA@@BAA@BBBA@A@@A@AA@@A@A@A@C@C@AA@@AA@A@@CACBCA@AAAA@ABBB@@A@AEAA@@AB@@AA@@AB@@ABABABBBBBB@A@C@ABBB@B@BA@ABABAD@BB@AB@BABABAAABABC@A@AA@@AC@A@BA@AB@@AAA@AAA@C@A@A@ABCBC@AAAA@@A@A@AA@A@@A@A@AAAAA@ABA@AB@BA@AB@BC@C@AA@C@CAE@CAA@CAC@KAAAEEAAAAGCA@A@ECCAA@@AA@AA@A@CAC@E@ABI@C@C@ACCAAA@AAC@C@A@KBA@A@GB@BI@A@AAAA@A@A@ABEBABG@CBCBE@C@C@ACG@A@ABABBBB@BB@F@@ACC@A@ABAB@BBB@BBD@D@D@BAB@B@DBB@B@@ABA@AB@BBB@BAB@@AAAC@@AA@@AB@BABAB@B@@CBA@AB@@AB@B@@AAAA@@A@C@A@A@ABABAB@BAAABAF@DC@AA@@AB@BAB@@A@C@A@A@A@A@AA@A@C@AA@AAC@A@A@AB@@A@A@AC@A@@AB@@AA@A@A@A@A@A@@BA@ACA@@BA@@A@AA@@AAAAABAAA@A@A@ABCB@@AAAAA@AAA@AB@@A@AAA@A@A@ADAA@AA@AA@@ABABAA@@AA@@AB@@AA@A@CAA@@AAABABA@AA@BCA@AC@AB@BAB@B@@BBA@A@ABABA@AB@B@@A@AB@@ABAAA@A@AA@AAA@ABA@A@A@@AA@AC@AA@A@A@@AA@@AAA@AAA@AB@BABA@A@AACA@@A@ABA@A@AB@B@B@D@@AB@@BB@B@D@B@BAB@AAAA@AB@B@@ADBB@B@@ABAB@B@@BBBB@@BB@BBB@B@BABBB@BBBAB@B@B@@AB@@ABAB@B@BBBBB@B@B@B@B@B@B@@BDAA@@AB@BA@AB@@AD@@BB@B@@AA@@A@AB@@AAAAA@ABABA@AB@@A@A@AAAAB@AAABA@AB@B@H@DA@DABB@B@B@BBB@D@@A@ABABAB@B@BBBBB@DBB@BBFHBB@AB@@BBAB@B@B@@BB@B@@A@A@CBAB@@AD@BABB@AD@@ABAC@A@@AB@@AB@B@B@B@DAB@AAA@@A@A@AA@@AAA@AB@B@B@B@BA@ABBBABD@BBDBBB@BABAB@@ADAB@B@B@DAB@B@B@@AB@B@B@BBB@BABAFAB@B@BAB@B@@B@BBBB@B@@B@BBBB@DAB@BB@AB@BAB@BAB@B@B@B@F@@AB@@A@A@A@ABABABABAB@B@B@BAD@BABB@AB@@ABA@AB@BAB@B@BAB@B@BE@AA@@ACC@A@A@A@A@C@ABA@A@AB@BA@A@AB@@A@AB@@AB@BA@A@A@ABA@ABABAB@@AB@@AB@@A@A@A@ABABAB@@A@A@C@A@AAA@A@A@A@A@C@ABA@ABAB@@A@AA@@A@AD@BA@AB@@A@A@AB@B@@A@A@C@A@AAA@ABC@A@ABABC@ABAA@@AA@BAAA@CA@A@A@@AA@AA@A@AAABACA@CAAA@A@A@@AA@AAB@@AA@AAAAA@A@A@@AAAB@AABC@A@A@AAA@AAA@A@A@AA@CA@AA@@C@AA@@C@A@A@A@A@A@A@ABABBBAAA@AAC@A@C@AB@@A@CAA@A@A@A@A@AA@AAA@A@@AA@AAA@ACAAA@@A@AAAAAA@C@@A@AAA@A@AB@BA@A@AAA@A@AB@BBD@B@D@BAB@@AB@BADA@AAAAC@AACCACAEACAAAAA@CAC@AAACCCCGEIGCCCEAACCEAEAG@E@C@A@CCECAAAAA@A@AAA@A@ABABA@C@A@CACACAAAC@CCCCACEICECCCCAC@A@A@C@AAAAAA@AAA@CAC@A@C@C@@BADABCBCBA@@D@DBBBD@DAB@BBD@DBDAF@DAJCDCDEDCBE@A@C@CAACEGAAACCAAA@KKIGCG@E@A@AACAA@@AABA@A@@B@BA@A@A@@BA@AAA@BCBABA@AACAACQAKA@@BA@ABAB@BA@@B@D@B@BAB@BA@ABA@A@A@A@ABAB@BAD@BAB@BA@@BA@A@AB@AA@A@ABAAA@ABA@ABA@A@@BAB@BA@@B@B@BA@A@@BA@ABABAB@BAD@B@BABABABA@CBAAA@ABAB@BA@C@ABC@C@@BABABA@C@@AA@A@@BAAA@AAAA@AAA@AA@@AAA@AADABA@AA@A@AAA@BA@ABABABABAA@A@A@A@EA@@AA@ABABABAB@BA@@BA@ABAB@A@AA@@AAAAAA@AAA@A@A@A@@DADA@ABA@CB@B@BA@AB@BB@BBA@AB@DA@ABA@@AA@@BC@A@A@@AA@A@A@A@@A@AAAAAA@AA@AA@AA@AA@@AA@A@ABA@A@A@A@@BA@A@AB@BA@@B@BAB@BA@CBABA@ADA@AB@BA@@BADAB@B@B@B@BA@@BAAA@@AABA@@BAAA@AAA@A@@AA@A@@A@A@AA@@AA@@ACCA@AAA@AA@ABC@AA@@C@ABA@AAA@AA@@A@AB@AA@AA@@AB@@A@AAAAAAAAAABAAAAABA@ABABAB@B@B@BA@CB@BABABA@@DAB@B@B@B@DA@A@A@AA@A@AC@A@@AA@BC@A@A@AA@@A@A@AAA@AAA@AC@A@AAA@@BAAA@A@@A@AA@AAA@AABAA@@AACEEA@BAA@@AA@AAAB@AA@@AAA@AAAA@A@@AA@@AA@@AB@AA@AAA@AAAAC@A@A@AA@@A@CE@A@C@A@CACA@B@BABBD@DAAABA@@B@B@BA@A@A@A@A@A@A@C@ABA@@BABA@@BA@A@AAAB@BDD@B@B@BAD@BB@@B@B@B@BABA@A@@BA@ABAB@BC@ABA@@BA@@BABBB@BB@BD@BAB@B@BABABAB@D@B@BB@BBBB@BDB@B@B@B@B@D@B@BBBB@B@@BB@DBBB@BB@BBB@@B@BB@@B@B@DBBBBBDB@BB@B@B@B@DBDBB@BD@D@@BD@B@BAD@@ABBBBB@BB@BBBB@@BBB@B@D@B@B@BAB@D@BA@AB@B@D@B@B@B@B@BA@@BBB@BFD@BB@@BB@@BB@@BB@@B@BAB@DAB@BADA@EAA@ABAB@BA@A@A@AB@BA@A@C@A@A@A@C@CBAAA@@BABBBAB@BABA@EB@BA@ABA@CBA@ABCBA@A@@B@BCBABA@AB@B@BBB@BABA@ABC@@BABABABABCBC@A@ABABABAB@D@BA@ABABA@C@@B@B@B@B@B@B@BAB@BB@@BA@@BBBABA@A@A@A@ABABAF@BABABBB@BA@@BBB@DBB@B@B@DI@@BAB@BE@@BA@ICA@@AA@A@A@AB@B@BABAB@AA@A@@A@AACB@@AB@@BB@@AAAA@C@A@@BAAAAA@EA@AA@A@C@@DA@@BABB@BBBBD@BB@B@BAB@BBABABB@B@B@BBB@BAB@B@B@DA@@FBDDBBBBB@BAAA@A@ABA@A@AA@AC@AB@DCB@B@B@B@BABB@AD@B@B@BA@@B@BB@@D@BAD@BBB@B@B@B@BA@A@A@ABA@@BC@ABA@AAAAA@@BC@BABAA@AA@AAAA@@A@A@AAAC@AAA@@AAA@AB@B@BA@A@AAA@A@AAAB@B@@AA@@AA@@ABABACABAB@@ACBA@@AAAC@BBABAB@BA@C@@AA@C@AAA@AAAAABAAAAA@A@@B@BA@A@A@A@A@AA@BA@A@A@BBD@@B@B@BC@@BB@@BA@@BBB@BB@ABA@@BA@AB@BABA@A@@BA@A@AA@BAA@BAA@BA@A@AAA@ABA@A@A@@BA@AB@BA@@BAAA@A@A@A@A@AAABA@@B@BA@A@@AA@@AA@AA@AA@@BA@AB@BB@@B@B@BBF@B@B@BA@CBA@A@@AA@A@A@A@A@C@@B@BA@@B@BAB@BA@@B@BA@A@AB@BABA@@BA@A@A@A@A@C@AAA@@AA@@A@AA@@AC@@AAAA@@BAAAA@A@AAA@A@A@A@AA@A@A@@BA@A@ABA@@BA@@B@BA@AB@BAB@BBBB@BB@BA@BB@BAA@BA@@B@BB@BB@BABABABA@@BA@CBA@@DA@@BA@AB@B@D@BABBB@DBB@BA@@BB@@B@B@B@B@BB@@BBB@BA@@B@D@BB@BB@B@BB@B@B@@BBB@BB@BB@BFDB@BB@B@BBD@BBB@B@B@BBB@DBB@B@DABA@@B@B@BAA@AA@CAAAA@ABA@CBABABABA@A@ABA@A@@BE@C@@BB@B@BBA@@BB@@BA@A@A@@BA@@BABA@A@A@@A@AA@@AA@A@@AAAAAA@AA@AA@AAAB@BA@AAC@A@A@@AA@@ACA@BA@A@AAA@C@A@AAAAA@AAA@ACAAA@A@A@A@A@A@ABAB@BA@@BBBDBB@@B@B@BAB@D@BA@A@A@E@@B@B@BA@AAA@AB@AABAAACEBABABABABAB@B@BAB@B@B@BA@ABA@ABA@BBA@BBBBDCBBBABB@CB@@BB@B@BB@BB@@B@BBBBBAD@B@B@BB@@D@BA@CAC@ABAA@BABA@CA@AA@@AA@ABA@@BABABA@A@@AC@@BAAC@A@A@CBA@ACABA@@AA@A@A@A@ABABAB@BA@@B@BA@@BAB@B@B@B@DABA@@B@B@B@B@BA@AB@B@B@BBBB@@BB@B@B@@BB@BBDDBB@BB@@FBB@DBBDBB@BB@BBBDBB@@BB@B@LBBBABAHAB@B@BAA@B@BBBB@@BB@@AB@@A@A@A@AB@@ABAB@@ABBBA@B@BB@BBBABABB@BAB@BB@BB@BB@B@B@@BB@DBBBB@B@B@B@B@@DB@BABABBB@B@B@@ABAB@BBB@BABCBA@A@ABABA@AB@D@B@BAD@BBB@D@B@@BB@HDB@BBBBDBBB@BB@@BB@@AB@B@@A@A@A@A@A@A@AB@@AD@@AB@BB@AB@@AF@B@B@DAB@D@BAD@B@B@BD@FBF@BD@B@B@@BB@@B@B@BA@AB@BA@A@@BBB@BA@@B@BBB@B@B@BB@B@@AB@B@B@B@B@B@B@@D@B@BA@@B@BABB@@B@B@B@BBBBDBBBBBBA@A@@B@B@BADABABCD@BBBDBABB@ABA@@BABA@A@@BAB@BAB@BA@ABAA@BA@A@A@CAA@@AA@@BA@A@@BB@B@B@B@BBBB@BIAC@@BBBBBBBAB@BBA@BB@@B@BB@BBB@@B@B@BA@CAA@ADBB@BA@ABABAD@DAB@BA@@BA@A@AB@BA@A@ABAB@B@B@B@BABB@@BBAB@BBBBAF@D@BB@@ABCBABD@BBB@B@B@B@BB@BBBB@BD@B@B@BAB@AABAB@DAB@@B@B@B@BB@B@B@@BA@@BA@@BBBBB@BB@@BA@@B@BB@B@BA@B@BB@BBB@B@DDBBBBBBDBBB@BB@BBBBB@B@@AFAB@BABAB@DAD@B@B@FADBB@B@D@F@B@B@BBDBBBD@@BBAB@FBF@D@BB@BBD@B@BB@@B@D@BBF@BAB@BBB@BBDBBAB@BABAFABABADCBABADEF@BCDADBDHJBBBDB@DBD@D@B@BADBFB@BHFBFABBBB@BBBDBBDDBB@BB@@B@B@BB@@B@BABBBDDDB@B@BCB@B@BA@@BCBABABA@@BADAB@BABAB@BABBBAB@DABA@@BBBAB@BA@@B@B@BABADCFA@@BA@AB@BBD@B@B@B@DBBB@B@B@B@BBB@HA@AB@B@@AB@@BB@B@BBB@D@D@BBB@B@D@BBA@@B@BABB@B@AB@BABBBB@BBB@AABA@BB@@A@AB@B@@AD@AB@BB@@B@BBBB@@ADDBA@AB@@BADB@FBD@ABA@A@@BBB@B@BB@B@@BBBBADABA@BB@B@@ABA@AB@B@B@BB@BB@@BB@@BB@@ABABB@AB@@BB@@BB@@BBB@AB@FBB@B@@AB@@AB@@A@AABA@BAA@@AB@B@BB@B@BB@@A@EB@@AB@@BBA@AB@@B@BB@@FB@B@B@BABH@B@D@B@B@B@BBAB@B@B@B@B@ABABDA@BBABB@B@B@BD@@BB@@AB@AA@A@AB@@AB@B@BA@ABA@ADA@AB@@ABA@C@A@EB@@AB@@A@ABAB@BA@AB@BAB@AAAA@AABAAA@BABB@CB@@A@A@AB@@BB@@BB@@A@AB@@BBB@BBCAA@ABABBBB@AB@B@@AB@@AA@BA@C@ABADCB@@B@B@BBB@BB@B@B@BB@BB@@BBB@BBBABBBB@@BBBA@A@@BA@@B@BA@@BB@B@@ABBB@@BB@@BB@@BBB@BB@B@@BDBDBB@B@BBB@BBB@B@@BB@B@BBBA@B@B@D@B@DB@BB@BB@BDBB@BDBDB@B@BB@@BBDB@B@BBB@BABB@BBAB@@BA@BB@BB@@BB@@BAB@BB@@BBBAB@B@DAB@B@BABB@@B@B@B@B@DBDABAAC@@BAF@BAD@BA@@BB@@BBBAB@DADABC@@BA@A@@B@BCB@B@B@B@BB@DABDB@B@B@@BBAB@BBB@AB@B@BBBBBBB@BB@BBBB@BB@@BB@DAB@@A@ADBBAB@@BB@B@B@@AB@B@BBB@@ABA@BB@@ABC@CB@@D@BB@B@@AB@B@AA@AB@B@@A@A@A@A@A@ABB@B@BB@@BBE@A@AB@BAB@DCBAD@@AB@B@B@BB@AB@@AB@@ABAB@BAB@BA@BB@BBB@BA@AB@B@B@@AB@@AB@B@BABAB@B@@BBD@BBAB@BAD@@ABA@A@AB@B@DB@BB@@AB@B@BA@ABA@A@AA@ACAA@AB@@BBBBA@AB@@BB@@A@ABAB@B@B@@AB@B@@APE"],["@@A@@BBA"],["@@@BB@AA"],["@@@BB@AA"],["@@ABB@@A"],["@@@BB@@AA@"],["@@A@@BBA"],["@@A@A@CBB@B@B@ABABA@@BDAB@B@@A@A@A"],["@@BB@AA@"],["@@@BB@AA"],["@@ABB@@A"],["@@A@@BBA"],["@@@BBB@A@AA@"],["@@@B@BB@@AAA"],["@@AD@BBA@A@A"],["@@A@@BBA"],["@@AB@BBC"],["@@AB@BB@B@@AAA"],["@@@BB@AA"],["@@@BB@AA"],["@@BB@AA@"],["@@B@@AAB"],["@@BA@AAB@B"],["@@B@@A@AAB@B"],["@@B@@AAB"],["@@B@@AAB"],["@@@BB@AA"],["@@B@B@B@AAA@A@@B"],["@@BB@AA@"],["@@@BB@@AA@"],["@@BD@A@AA@"]],"encodeOffsets":[[[119959,29249]],[[119694,28745]],[[119530,28871]],[[119717,29198]],[[119717,29200]],[[119717,29201]],[[119717,29202]],[[119721,29203]],[[119721,29205]],[[119724,29203]],[[119724,29204]],[[119729,29208]],[[119762,29211]],[[119764,29207]],[[119775,29220]],[[119780,29222]],[[119800,29193]],[[119801,29193]],[[119804,29193]],[[119806,29191]],[[119807,29192]],[[119810,29191]],[[119811,29190]],[[119810,29187]],[[119811,29185]],[[119890,29289]],[[119942,29258]],[[119949,29256]],[[120140,29035]],[[120141,29033]],[[119760,28720]]]}}],"UTF8Encoding":true});}));