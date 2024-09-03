(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('衢州轮廓', {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"衢州"},"geometry":{"type":"MultiPolygon","coordinates":[["@@B@@BDBB@@B@BB@@BD@BBD@B@@BBB@BB@@B@B@BB@ABAB@B@B@B@B@B@BB@ABBB@BA@ABA@@BA@@BABA@@B@BBBBB@B@B@D@BB@BBBBBBB@B@BAD@B@@BB@B@B@B@BBB@@BA@@BD@BB@B@B@BB@B@B@@BB@BD@B@BADB@@BBBB@B@B@F@BBB@BBBB@BB@B@@BB@B@BDDBBBB@BBB@B@B@BBB@@BBB@BB@B@B@B@@BB@B@BABAD@BAB@@BB@B@@BB@BB@B@B@B@BBB@B@BB@B@B@BBB@DDB@B@BB@BBDB@@BB@@BB@@BB@B@B@B@B@B@B@BBB@B@@B@B@BB@BBB@@BBB@B@B@BB@@B@BBB@BB@@BBB@BB@BBB@@BBBB@@BB@@B@BB@D@@B@BB@BBBBB@@BB@B@B@BBB@B@@AB@B@B@B@@AB@BABAB@@BBABBB@B@B@@B@B@BB@@DBB@BB@B@B@B@BBB@BBB@B@BCBAB@@A@AB@@ABCB@B@B@B@BABAB@@A@AB@BA@AB@DAB@B@@ABABAB@BA@ABABADCBB@ADBB@B@@AB@B@BAB@BAB@@ABBB@B@@BBABCB@BCBAB@@A@AB@B@B@BAB@BABBDAAAB@BAB@B@BBB@B@@ADA@A@AA@AAAAAAAAA@@A@A@AA@AB@AA@@AA@A@A@@A@AA@@AB@@AA@@A@AAAB@DBA@@BB@@BB@B@AABA@AB@@A@ABA@AB@@A@A@A@ABABAACB@B@B@B@@BB@B@B@@ABA@ABAB@B@B@BA@AB@B@B@BABAA@@AB@@AB@BBBB@A@AB@B@@BB@@CBA@ABA@A@A@ABA@AB@@ABA@A@A@A@A@AAAA@AAAA@A@ABA@AB@@AA@@A@ABA@A@CAA@AA@@ADA@BB@BA@AAAAA@ADBBA@BB@@A@AA@@ABAB@@BB@@A@AB@@BB@@AB@@AB@B@B@@BB@@A@AB@@A@A@ABABAB@B@AA@A@AB@@DBB@A@A@ABBD@B@@BB@BBB@@BB@B@B@D@@BB@B@B@B@@BBA@BB@B@B@@BB@B@@B@B@BB@@B@BB@@BB@B@@AB@BA@BD@B@D@B@B@B@BBB@B@@BB@B@B@BBB@DAB@B@B@BBB@BB@BB@B@@BB@BBB@B@@BD@B@@AB@B@B@B@BAB@B@B@B@DAB@@AB@B@BB@BB@BBBBBB@BB@BBB@B@B@BA@BB@@AB@@BB@@BB@B@@ABABABAB@@BB@BA@BB@B@B@DAB@B@DAB@@B@B@BBBB@BBD@B@@BBBB@B@@BB@B@@BB@BDBAB@BBB@B@DA@AB@B@B@@A@AAA@AA@@AA@@A@A@A@ABABADABAD@@A@AB@B@B@B@@B@BB@@BB@B@B@B@B@@BB@B@B@@B@BB@BBB@B@B@BA@ABAB@@ABABAB@B@@AAAB@BA@A@AA@BA@A@AB@@BB@BBB@@BB@@BDBB@B@@A@A@ABA@BB@B@@AB@DA@ABC@ABAA@AABABA@A@ABBBAB@B@@B@B@BB@BB@A@AB@B@B@@A@AB@BBB@D@@BAB@BB@@BA@@BB@@BA@@B@BB@@AB@B@ADB@@BBB@BB@B@@BA@@DA@@BA@A@A@@B@BA@@B@B@B@B@BBBB@@BB@B@B@@ABAB@@BB@B@B@BBBBB@@A@AA@@AB@B@AAA@BABABB@AB@B@BAB@BA@BB@B@B@@AB@BB@B@BA@BBA@A@@BA@A@@BBBAB@B@B@BBDA@CB@AAB@BB@B@D@@AB@B@@BB@B@@AB@@BBA@B@BA@AB@BA@@B@BA@@B@BA@A@@BB@BBBBB@@BA@A@@BA@A@A@AAA@@BB@AB@B@BA@@BA@@BA@A@AB@BABA@@BABA@A@@AAAA@@AABA@A@@BABA@@B@B@BA@A@@BB@@B@BA@ABAB@BA@@BABB@BBB@@BB@@BB@@AB@BBB@B@BB@B@BB@@B@F@DBB@BBB@B@B@BB@@B@B@BB@BBBAB@BAB@ABBBBAB@BAB@BB@D@DABABB@B@B@@AB@B@BA@BBBBABAB@BBB@DABA@ADDB@BAA@BAD@@AB@BA@AA@@AA@ACBAB@B@AA@A@A@ABCA@A@@A@A@AA@@AB@@A@A@AB@@AB@@BB@@BBABA@A@A@AA@AAA@BA@AB@@ABAB@@ABA@A@A@ABBB@B@AAAA@AA@@A@AA@A@@BAAABB@CB@ABCB@B@@AB@@AA@@A@AB@BAAAB@BB@BB@@BB@B@BBBABA@BB@@BB@B@@BA@@B@BBAB@B@@AB@B@B@@AB@B@@ABAB@BAB@B@@AB@B@EC@C@AAA@AA@AA@AAA@A@AA@@AA@AAAAA@AAA@@A@AAA@AAAC@@AA@A@@AA@A@AA@AA@C@A@BA@AB@@AAABABABA@ACAA@AA@A@A@ABAA@BA@AB@B@@AB@@A@AB@AAB@AAAA@AA@A@@ABCAAA@A@A@A@CAA@ABA@A@A@@AAAA@BC@BB@@AB@@AB@B@B@BBBAB@@A@ABAB@@BB@B@B@@B@BA@BBB@B@@AB@BCBBB@B@@AB@AAB@@A@A@A@AB@AAB@@AB@B@@AB@AAA@@A@AAAB@AAB@@AB@BAA@@AA@@A@AA@@BAA@AA@@A@ABAA@@AB@BA@AB@@A@AAAA@@AB@@AB@@AB@@AB@BAA@@AB@@AB@@AB@B@B@@ABAA@A@@A@AABA@BABA@AB@@A@A@AA@@A@AA@A@@A@AB@AAB@B@@AA@@AB@B@@AB@@A@AA@BA@ABBB@B@@BB@B@@ABBBAB@B@@BB@@BBA@AB@@BB@@A@ABBB@@AA@@AB@B@@AB@@A@AB@AAB@@A@AA@@AA@AAB@@AB@AA@AB@DAA@A@A@BAB@B@@CF@B@B@@ABBB@@A@AD@@BB@B@@AA@@CB@@BB@B@AAB@B@B@BB@A@AB@B@@AA@@A@A@AA@@AA@@AB@@AB@@BBB@AB@@AB@B@@AA@BCB@@ABB@ABBB@B@@ABA@BBB@A@ABAB@B@AAB@BA@A@AA@AA@AA@@AB@@AB@B@@A@A@AA@BAA@A@A@BAB@@ABBB@@BB@@AB@B@B@BAA@@AA@@A@ABADDB@B@@BB@B@D@@AB@BDFHBBBBB@B@BBDCAEBCB@BCBA@AB@@ABA@AB@B@@AB@@ABBBC@C@A@A@A@AAAA@@A@AA@A@ABA@@AC@@A@A@AA@@A@A@AAA@CA@@AA@@ABAA@DCFCA@@AB@@C@A@AB@BAB@BABA@CA@BAA@@AA@@AA@A@@AA@BAB@B@@A@A@A@A@C@A@A@AA@@B@BA@@BB@@B@BA@A@AD@BA@@BABA@@A@ABAB@@C@AAAAE@A@C@A@ABA@AB@@BB@@AAA@A@A@AA@@BA@@AA@A@@AAC@A@CBB@A@A@A@AA@A@AAA@@AB@@A@AAA@A@AB@BB@A@AAAAAB@B@AABAB@@AB@B@@CB@B@AAA@A@@AA@@AB@@A@AABA@@A@CB@B@D@@AB@B@DAAA@AAA@AB@AA@AA@@CA@@A@AAAA@@AAA@A@A@ABA@AB@@AAAB@B@@AA@A@A@@BAA@BAAAA@CA@@AAAA@@AA@@ABA@AA@@AAAA@@A@C@AB@@ABABCCA@ACAB@@AB@@B@BB@B@BA@AA@@AA@@ABA@AB@B@B@D@AA@A@AB@D@@AB@B@B@@A@AB@@A@ABA@AAA@A@AAA@A@AB@AA@AAAA@A@@AB@BAD@B@BABAA@CADADA@A@AB@@A@A@A@A@AB@BA@BB@FAB@@AB@@AB@B@@A@AB@@ABABAB@BACAA@DC@AAC@A@A@A@AAA@AABAB@BA@BCBAB@@AA@AB@AABA@BAA@@AA@@C@CA@@AA@@AAB@BA@CBA@A@@A@AA@BABBB@BAB@B@@ABAAABAA@BA@A@AA@@CAAA@@A@A@A@AAAA@ABA@A@A@A@ADA@A@@AAAA@A@@AA@@B@BABA@AAA@@ACC@BA@@BA@@BAA@A@AAAA@@AB@@ADBB@@C@CA@@AACA@@AB@@A@AA@@A@A@A@A@A@CAA@ABAD@BBBBD@B@BBB@D@B@BBB@DBB@B@@ABAB@B@@B@BBA@AB@@AB@@AB@AAB@D@@AA@@AA@A@@A@AB@@A@ABABABABAB@B@@AD@@A@AB@@AB@@A@A@AA@A@@AC@AAA@@AAABCB@AA@AA@AAA@@A@A@AA@@AG@A@@A@A@A@ABAGBA@@A@AECA@CA@B@B@BAB@B@BAB@BA@A@A@C@ABAAA@@AAAA@AA@AA@A@A@@A@AAAAAA@A@AA@BA@A@ABABC@A@A@ABA@A@A@A@A@AAA@ABA@AA@AA@@AA@A@AAA@@BA@ABA@ABABAA@AA@A@A@A@@AACBAB@B@@B@BB@@BB@D@@ABAB@@ABA@A@AB@@AAA@A@AA@AAAAA@ABA@CBA@@AAA@CCAAAA@@A@AB@@AB@D@@BB@B@@AA@AAAAA@@AA@@AABA@@A@A@AA@A@AAA@A@AA@AB@@AAA@A@AA@A@@AAAAA@AA@@A@A@AB@@AA@@AA@@AABA@A@AAAA@AA@ABA@A@A@C@A@A@CDA@@BAACBA@A@C@ABA@A@A@CDCHA@ABA@AAA@A@@BA@@AA@@BA@@ABAAABA@AA@AA@BAB@BBBA@AC@AA@A@A@@DBD@BB@@B@B@BA@A@CBA@@BA@C@A@ABA@@CA@@AA@C@A@AA@A@A@A@AAAA@A@A@@A@AA@@A@AA@AA@AA@A@A@C@A@@A@ABA@A@A@AAA@ABAA@AAA@ABAAA@A@BAA@BABA@AA@@AA@@BABA@ABAB@A@A@AAA@A@AA@ABABAAA@CA@AAAA@@AA@A@BAA@A@A@AAA@AA@AA@A@A@A@A@@AA@A@A@AAAAA@CB@AA@A@A@AB@AA@A@A@C@A@A@A@@BA@ABA@AA@AA@A@@BA@ABA@CBA@C@A@ABCBA@@BC@C@A@@B@BA@AB@BABAA@A@A@AA@@AA@AAAA@A@A@AA@A@@AA@@AC@@AA@A@@DA@A@@BA@@B@BA@A@@BA@AAA@ACAAA@@AAAA@A@@AA@A@C@AAA@A@A@A@A@CCAAA@@A@AA@A@@AA@C@@BA@@AA@@A@A@AAA@AC@A@A@AAA@@AB@BAA@@AA@@A@A@AA@@A@A@AAAA@AAA@A@CCAAA@ABA@A@C@A@A@A@@AA@AAA@@BA@@A@A@AAAA@AAA@AAA@A@@AAAA@@AAA@A@A@AA@AAB@@AA@A@CACC@BA@AAAA@AA@@AAAAB@A@CAAACA@@AA@A@A@A@@AA@@AA@@AA@AA@A@AAA@AA@@AACA@@A@AA@A@@A@A@AA@@AAAA@A@AAA@@AA@@AA@@AAAAA@AA@@AAAA@AAAA@AAAA@AA@A@AAAA@AAA@@AAA@AAAAB@DA@ABA@@BA@@BA@A@A@AB@AA@@AA@AAA@A@AAAAA@ABA@@BC@A@AAA@AAAAA@AAA@A@AAA@@AA@@AAAAAAAAA@AA@@A@AAAB@@ABA@ABA@A@A@A@AAAA@@AA@@AAAAAA@@AA@@AAAAAA@AAA@@ABA@AB@@A@A@A@A@A@A@A@CB@@AAA@AA@AAA@A@A@A@A@@AA@@AB@@ABA@AAAA@@A@A@A@A@AB@AA@ABAA@BAAA@A@A@ABA@AAA@AA@A@@AA@@AD@B@@AB@BADABABA@AAAAA@A@A@AAA@AA@@AA@AACAA@@AA@@AAC@A@AB@AAA@@A@AA@A@@A@A@A@AAAAAA@@AA@A@AAA@C@AAAAA@@ABA@A@C@AA@A@@AA@AAA@A@@AC@A@AC@AAA@A@AAAAA@A@AAAA@A@@AAA@AAAA@AAA@@AAAA@@BAB@BAB@BAB@BBD@BA@@BBB@B@B@BA@@BA@@BC@A@A@@BA@@A@AABA@AA@BAC@AA@A@@BBB@BAB@B@DABAB@B@B@B@BAB@BA@A@A@A@A@A@A@AAC@AAA@A@ABA@ABAD@BA@C@@BA@@BC@A@ABABA@A@A@A@AAA@@A@AAAA@A@AAA@C@@A@AAA@A@AA@AA@AAAC@AA@A@AA@A@@BA@A@ABA@ABA@A@@AABA@AAA@A@@CAAAAC@C@A@@AA@AAAAA@@AA@@AAA@A@A@AA@@AAA@AAAA@A@A@A@AB@BA@@BAAA@ABADCBA@@AA@A@A@A@CBA@ABC@C@A@AAAC@A@AA@@A@AA@AAB@ACA@@A@AA@@AAA@AAAEAAAA@AACA@AA@AC@CA@@AA@A@E@A@AA@A@A@AA@@AAA@A@A@A@ABCB@B@B@@A@AB@AABA@A@ABAB@@AACAA@A@AAAA@@A@AAA@A@A@C@A@A@A@A@A@ABABAB@@AB@B@@AB@@AA@@A@C@AA@@AB@BAAA@AAA@AB@@A@AAA@CAA@AA@@AAA@AAAAA@A@A@A@AB@BAB@BAB@@AA@@AAAA@A@@AA@@A@A@AACBA@AAA@AAA@A@A@AB@BAB@B@B@B@B@B@B@BBBBBB@B@BB@B@@AB@BAB@BBB@B@D@B@B@B@@BB@@BBAB@B@F@B@B@@AAA@AAAAAA@A@@AAAB@BB@A@AB@B@B@B@@AAABAA@@ABA@AA@@AB@B@BA@A@A@AAA@AA@A@AA@AA@A@AA@AA@AA@CAAAAB@BAAA@AAAAA@AAA@AAAAAAAAABA@AA@@AAAA@AABABA@AB@BA@A@A@A@A@AA@@AA@@A@AA@@AAAB@AAAAACA@@AA@@AA@@AAC@A@AC@A@A@@A@AAAA@@AAA@A@AA@@AA@AAA@ABA@AB@AA@@AA@AAAAAA@AAAA@@BA@A@@BA@@AAA@AA@@AA@@AA@AAA@AA@A@A@A@ABAAA@A@A@A@AA@@A@AA@@BABABA@@B@BA@AA@AB@@A@AB@BCB@BA@A@AB@@AA@@AEGEGGUKQCGIKCCA@CAE@E@C@CBEBADABCBABC@A@GCAAA@C@A@C@A@AC@ACCCG@AAAACA@A@A@A@A@CAAAEEC@C@E@EBE@C@CACAAAA@A@C@ABABABA@@B@F@FDD@BBD@DABADCBEFCFADA@ABCBC@A@C@EAC@A@EBCBAAC@ICE@A@C@GDCDC@A@@A@C@E@G@CA@@AC@EAC@GAEACAG@A@EAG@C@CBABCDCFCFA@@BA@A@A@A@@A@AAAAAA@A@A@AAAA@A@AAIACACBADAB@@CB@@CB@B@B@BAAA@AAABAB@B@@BD@@AACAA@A@A@AA@A@CAEAACAAAC@AAAABA@EDCDGFABAAAAAAA@ABA@@BC@C@A@CAAAAAA@ABA@@BA@C@@BA@@BA@A@AA@BA@A@ABABA@ADABCAA@A@@B@B@B@BDDBBDB@B@B@BA@A@C@E@E@A@ABB@@BBBBB@BBBABABA@A@A@A@@AA@@B@BAB@FAFA@@BABAB@BBDBFBB@B@BB@FDDBLDDBHDDBHDBBB@@BB@B@B@BBBDBBHHDFBD@BABBBBBF@BBB@BBBBB@DEB@@BADBDBDB@BB@BBD@BABA@ADADA@A@A@@AB@@A@A@AAC@A@AA@ABBB@BA@A@@A@A@AAA@AA@@B@B@BBBA@A@AAC@A@A@@BB@B@FDBBDBBBA@AB@AAAAAA@AB@BB@@DBD@DAFEB@FA@@J@F@D@BABC@@BA@A@AB@B@JAFIT@BCJIDEBCBA@CDADA@@B@DAFABABA@C@CAAAA@@BBD@BBBB@DBBDD@@B@B@DBDJDB@BBB@@ADAB@B@@BA@@B@BB@B@B@B@B@B@@B@BCBA@A@AAA@A@@BB@BDBFB@BBD@BFDF@D@BBB@B@DBFBB@BDFDFAB@BABAFBBABB@B@@ABAB@BABAB@@D@BCDCD@B@BB@B@B@B@@BABBB@AB@@BB@@BFFB@BAB@BBB@B@BD@B@BA@A@A@A@A@@B@B@BB@@BCDA@ADA@A@@B@BBB@BA@ACAAA@@BA@A@A@A@A@A@@BABA@@A@AA@A@A@@ABAA@@AA@AACACBAB@BCF@BAB@BA@A@A@ABABADADABC@ABABA@A@@AA@A@A@AAABA@A@AAA@CBABAAAA@BABCBABCDA@@BDBBDBBB@BBB@B@BABA@AB@BA@BABB@F@BAB@@B@BB@@BB@B@@BB@BB@A@AB@BAB@@B@BAB@BBBB@D@@B@BBBBBBBB@@BADABCBCBAD@BABA@@ACCAAAA@AC@@AA@@BA@DB@B@B@B@BA@A@ABA@@B@B@BAAA@@B@BB@B@@BA@@BA@@BB@@BABAB@BBAB@@BBAB@@B@B@BADA@@BA@AB@BA@@BAAAB@D@BAB@BB@B@F@B@BBB@@BABC@C@CBA@@B@B@BA@A@@BA@A@CBABAB@B@BBB@BB@ABABBB@BABA@A@@B@BAB@B@BB@@B@BBB@BB@JA@BBB@BABA@@B@DBB@BABA@@BB@B@BDB@BAB@B@BB@BB@B@@BABA@@AA@AB@B@B@B@BAB@BBDABA@CCC@A@AB@BB@@BAB@B@BFHA@A@@BA@@B@DBBDBDBB@@A@AAAA@@AB@DBB@BA@B@BABB@B@@ABB@BB@@BA@@BB@BB@D@BB@@BB@B@BAB@@D@FBDB@BB@BABA@A@AB@BA@@BA@@B@B@BA@A@@B@B@BCBAF@B@B@BA@@BBBB@ABA@@BB@BBD@B@BBB@BBB@BBBBC@A@C@@BDBBB@B@D@BADBBBD@BAB@BBB@BA@AB@F@D@BD@BBAD@BA@EDA@C@ECA@@BCDA@C@@BBBBBABEB@D@BB@@BFAB@@B@BA@CDCBCB@B@BA@CBA@AAA@ABCFABA@CAE@A@@ACAA@A@@BA@BDADA@@BB@B@@B@D@DB@@BB@D@DBB@BBB@BB@B@BA@@B@B@B@B@BABACA@ABABABBB@BB@B@BAB@BAB@@BABA@@B@B@BA@ABA@@BABAAA@A@A@@BB@@B@BB@@BB@D@B@B@B@B@@BAB@BA@@AA@@BA@CBA@@BA@A@@B@D@BBB@BA@C@ABCBB@B@DBB@B@@BB@ADB@@BA@@BB@B@B@@BB@@BA@@BCAAB@BA@AAA@A@AB@BA@@C@AA@ABBB@B@BAD@B@BA@AB@BB@@B@B@DB@@BA@A@@BBB@BA@@BB@@BA@A@AAA@@BA@@D@BBBB@@BA@@B@B@B@BCDBBB@B@BB@BB@@BABA@A@ADABAB@BABA@A@AB@DAD@BA@@BB@@BB@B@@BA@A@@BABA@@B@B@BABABABA@A@@AA@@B@BA@E@A@A@ADA@A@A@A@@AG@E@E@EBA@A@A@CAE@CBABCBCDA@EBA@ABABA@A@G@E@CBEBADABA@C@@AA@@D@B@BABABABCB@B@BB@DBBBBBDBDB@BCB@BB@@BA@@BA@A@CDAB@B@B@D@BABADAF@DA@ADA@ABC@A@@BBFAFAHADCDAD@B@H@DAHABCFEB@B@DAD@F@DADAF@BCD@D@DABCBA@E@ABA@AACDCDA@A@A@AAACA@AAC@CBE@A@CAEAGCAAC@CAAACAAAE@A@CACCICEAA@@AE@GAAAA@GBA@AF@D@F@BBBDDBBFDB@B@HBBBDFDFHHBBFDBBDBDD@B@BBBBBDD@BABA@@B@BA@@BA@CBC@A@EAA@EBAB@BAB@B@B@BA@A@A@CAAAA@EDA@A@@B@D@DADABAFABADEDABADCF@BC@A@A@@BA@CFA@A@AAA@A@A@ABADABA@ABA@ABA@A@@BA@AAAAA@ABA@AAAAA@A@@BBBA@A@@BA@AAC@C@A@@AA@@A@A@ABC@C@AA@A@@D@BA@C@A@ABA@CBCB@BA@A@A@CFADEHCD@B@BBBB@B@@BB@@BB@@BA@@B@B@B@B@BB@@BB@@BB@@B@BA@@BAB@BA@@B@B@BA@ABA@@AA@AAA@@AA@@AA@@AA@A@A@A@A@@AA@@AA@A@@AB@@A@AA@@AA@@AA@@AA@@BA@@BA@@B@BB@@BA@@BA@@B@B@BA@AAA@A@@A@AB@@AA@@AA@@AA@@A@AA@@A@AAAA@A@@A@AA@@AABCDADAFAFAB@D@D@H@D@D@DABAF@DEBABADCDCBCBC@CBC@@B@D@DB@AB@BC@CDABAD@DBB@BB@BBDDDDBBBBBBBB@BADAB@B@BBB@F@B@BCDCBABABCBG@ABC@ABABEDCBCBC@EBC@ADABABCB@BA@CF@D@B@DBBBDDFBB@BB@DBF@B@DDB@BB@B@DCBEFC@EDCDABCB@B@BDHBDBB@BBD@F@D@D@B@BBBBBAB@DABBB@D@DCDABCBA@CBABCBC@ABA@ABADBBBDBBBDBDBB@DBF@D@DB@@FBD@B@D@BBB@BD@BB@D@B@B@B@B@BBB@DBD@BBBB@@DFDDDB@B@B@BADAB@DADBD@D@B@FBD@B@D@BB@B@DBBBDBB@BBDBBBFBBBBBBAB@BA@AFBD@BBBABA@CBABAB@B@BBF@DBF@F@B@BBDBBBB@BABABA@@B@D@D@FBBAD@BAFA@CDABAB@B@BBBDBD@D@D@DAFAFAD@LCD@BAD@D@D@DBBBBB@BFDBDBBB@B@D@BABEBABAD@FAJAFADAB@D@@BFBDBBBD@BAD@B@D@DBDBDDD@BDDBDBBDD@BBD@D@D@B@DB@B@BAFAFABCDCDEBABAB@BD@FBDBDDDBBBDBBDDD@B@D@D@DDBDDD@@BBBBBDBBBDBD@D@DBDBDBBBBB@B@BBB@FBF@D@BAFCFADABABBBBDBDBB@BBD@BCDCBEDABGFABCB@BABAD@DBBD@DCD@D@B@BBDBDH@DBBBBFJ@BDDDD@B@D@DBDDBDBDBDBBBD@B@D@F@F@DDDBDBHDBBD@B@DABCDABAB@F@DBH@FBDAB@DABABABAD@BBDBD@BBF@D@BCBC@CB@BAD@F@D@BBDBB@D@B@FAHBD@BB@B@B@D@FAF@D@B@H@F@HBD@B@D@D@DABADAD@DAF@DADABAD@DAF@BCD@DBB@B@D@BAF@D@BBBBDFBB@D@D@D@D@FBD@D@D@BCBABEBCBADCBCDCDAB@DABA@A@CB@@ABA@A@AAA@A@ABCBA@AAAAA@A@AB@BAB@BAB@BABA@A@AB@@A@A@ABAB@B@B@D@B@B@BAB@D@@AB@@AB@@A@ABAB@B@B@@C@ABAA@BA@CB@BAB@@ABABCBAD@B@BA@BB@B@B@@AB@@ABA@ABA@ABABA@AB@@AB@B@B@B@BA@BBA@BB@@BB@B@@BB@@AB@B@B@B@B@BAB@B@BABAB@BAB@@ABBBA@A@AA@@AA@A@@AAC@AC@@A@AA@@A@AA@@AA@@AB@@A@ABABAB@B@D@BBB@B@B@@CBA@AA@@AAA@AB@B@AA@AA@@ABA@AB@@ABA@AB@B@BBB@@ABABA@AB@BAB@@ABAB@@AB@@ABAB@B@B@@AB@@AB@BADAB@BABBB@BBB@BAAAB@B@B@@AB@FAB@D@BCB@@A@A@AA@@AB@BA@ABA@ABAB@BABA@ABABBB@B@BBB@B@B@@ADBBBB@@BB@@BB@BBBBB@B@B@@BB@@B@BB@BABBB@B@B@@AB@B@BCBABA@CBAB@B@B@D@B@@BBBBB@AB@@AB@B@B@BA@AB@@BB@@B@BB@ABD@BBBABA@BBBB@B@BBB@@BB@BABA@ABAA@@AB@B@B@B@B@AC@A@AA@AA@ABA@AA@@AA@@ABAB@B@B@BA@ABA@A@AB@BAB@B@BA@A@AB@BA@BB@B@@ADBBBB@B@@AB@AA@ABA@AAABAB@@BB@B@F@B@@BB@B@@BBBBBB@B@B@B@BA@ABAB@B@B@@BB@@BB@B@B@@ABAB@@BB@B@B@BAB@B@@ABA@AB@B@@AB@@AB@@AB@BABBBB@BDABAB@B@@A@A@AA@BA@AB@BBB@BBBB@ABBB@@AB@B@D@BADC@AB@B@@A@A@ABAAA@A@A@AAA@AB@D@@ABABB@AB@BABA@CB@BAB@@ABAB@B@B@@A@A@A@A@AAA@CAAAAB@B@BABEBADADA@A@A@AB@@ABAD@B@@AA@A@@ABABAB@@AB@@ABABA@A@AB@@A@ABA@ABA@A@CB@BA@A@A@ABAACA@ABABADA@CBA@A@CAABA@@BABA@ADA@AB@B@BAB@B@B@BABABA@ABA@@BAAA@AA@ABA@AAA@A@C@AA@AAA@@AA@@ABA@AB@@ABA@ABA@A@ABA@ABA@A@ABABCBA@A@A@A@AAA@AA@@AA@@A@AA@AAA@AA@AA@@ABAB@@ABCB@BA@A@ABABABA@A@AB@BA@A@ABABA@ABCBAB@B@@BB@B@B@@BB@D@B@B@@AB@BAAA@A@A@A@A@AB@@A@AB@@A@AAA@A@A@A@A@AA@@AA@AAAAA@@AAA@ABAB@@AAABAB@B@B@B@DAB@BBB@B@B@DBB@B@B@@BF@BBB@B@D@D@BBB@BBB@@AB@@BB@D@B@BBB@B@BBB@BBB@B@B@B@B@DA@BB@B@B@BBB@B@BBD@BAB@@AB@@BB@@AB@@ABAB@@ABAB@BAB@BAB@B@BABAB@DCB@B@B@BAB@BABABABAB@@BBBB@@BBBBBB@B@ABB@@BB@BB@B@B@B@B@BB@B@B@B@B@B@B@B@B@B@B@@B@BBB@B@B@B@BB@AB@BB@D@BBB@@BDBDB@BBBB@B@B@DB@AB@B@B@B@B@BBBAB@"],["@@@AB@@AB@@AAAA@@A@AAE@C@AC@C@A@AAA@A@C@DDBB@BBB@BBBB@@BB@@B@B@B@B@BB@B@B@B@"],["@@@B@BB@@ABAAAAB"],["@@@BB@@AA@"],["@@BB@AA@"],["@@B@@AA@@B"],["@@B@@AAB"],["@@@BB@AA"],["@@@BB@AA"],["@@B@@AAB"],["@@B@@AAB"],["@@BAA@@B"],["@@B@B@@AA@AB"],["@@DB@AC@"],["@@DBAAA@"],["@@A@@B@BBA@A"],["@@A@@BAFB@BC@A@A"],["@@A@@BBA"]],"encodeOffsets":[[[121605,29915]],[[120946,29700]],[[121260,30098]],[[121846,29924]],[[122021,29917]],[[122107,29864]],[[122115,29837]],[[122159,29803]],[[122167,29788]],[[122191,29662]],[[122192,29661]],[[122187,29559]],[[122201,29536]],[[122126,29478]],[[122128,29479]],[[121268,29214]],[[121269,29218]],[[121235,29422]]]}}],"UTF8Encoding":true});}));