(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('郁南县', {"type":"FeatureCollection","features":[{"type":"Feature","id":"445322","properties":{"name":"郁南县","cp":[111.535285,23.23456],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@@@@A@A@@@@A@@A@@@A@A@AA@@@BA@A@A@AA@@AABBB@@AB@@AB@B@@A@@@A@@@BBA@A@@BA@@@AA@B@B@@A@@@AB@@A@@@@@AA@BA@@@@B@BCBA@@B@BABA@@BA@@@A@@A@B@@@B@@B@B@B@@@@BABBBB@@@B@D@DB@@BA@@@@@BAD@BA@@B@BB@@D@@A@A@A@@@AB@@@@A@@@AA@@@A@@AA@AAC@AAAA@@@@AABCDABABADABA@EBCBABCBA@ABAA@@@ABA@@BABABADABA@A@A@@ACA@AACA@@@@@BA@@B@BAB@BA@AB@@A@AA@@@A@@@A@A@A@@BC@@@A@A@@AAA@AA@AAAACCACAA@C@@BABABADCBA@A@A@@AAAACA@@A@AA@@@@A@@AAA@@AAAA@A@A@@A@@@AA@AB@@ABA@A@AB@BBB@@@D@@C@ABAB@BEDAAABABADA@C@ABBBBBBBDBB@D@BDBBBBABCBEBAD@BAD@BADABAB@DC@AB@BBBA@@BCBAB@@@B@BAB@@@DADCBCBE@CBCBEAE@CACBEACACAAEAAA@A@@@ABCDA@ABCBA@A@@@@AAACAC@AB@BBF@D@D@@CBA@@DBB@B@BBDABADAB@BBB@B@BBBBD@B@@@BB@@@BB@@ABAD@@AF@@ABC@ABC@AB@@AB@B@B@D@BBB@D@B@D@BBB@DADABABC@ABAB@DA@CBABA@CBABABA@@BAB@@@B@@@BAB@BA@AB@BA@ABABCFAD@D@BBBBB@F@B@B@B@BA@CBEDCDCBC@CACDADB@D@D@BB@BADAD@DCDA@A@ABCBA@@C@@C@ADA@AA@ACAA@A@A@A@CAE@CBC@C@CBA@A@AA@AAAAA@A@A@AAAA@A@CBABC@CBA@A@ABAAAAAA@A@@E@C@C@A@@BA@A@AAACCCCAC@A@EACAE@CAA@@@A@A@@BAB@BAB@BC@@BABC@A@AB@DAB@BBBDBD@@BABAB@B@F@B@@@B@BA@@BABAB@B@B@BAB@@A@@@@B@@B@@BB@@@B@B@D@B@BAB@BAB@DBBB@B@@@B@DB@D@B@BBB@DDBBD@B@BBBBDBD@D@BB@@@BB@@BDF@BFBBD@DEDA@EBAB@BA@AB@D@@ILDBBBBBFBBHN@F@@BBFDAH@FFE@FNHFJJHABBHF@DCDBNEFEDADDDAJFBBJDBBHABMEBEGC@@A@A@AHGCEBE@GAC@EAABA@IBGHGFGHGFCBCHAL@PBP@@AFBFB@B@@HB@ADCBAB@@FA@BBBDBABABAC@B@DD@D@@@AABC@@BF@BA@A@A@AA@BADA@@@@B@BBF@FAJSBADVF@@LJH@H@BBLHDD@@CLIHCE@@A@IB@L@@@N@L@PBPBDBFDD@DCDKBEDA@@HDDINCDCFEDCDAF@D@@B@D@@HDDBF@DBH@PCBA@@BOJEECAC@BD@@C@@CAAA@ANFND@@@DHABA@@@C@@HH@DDHNNFFBHFDJ@FADCB@D@FBBDBB@D@CDAFHDBC@ABCJBF@BBF@DEJCDAFCBCH@JB@BHCFC@CDCDDFEDAHEBCFABA@CAAAA@CC@@@@CD@DAFCD@D@D@FADE@ABC@CCAFGBBB@DCDCDCBBCFDBFBDDBCAABCJFJFJDB@FADFD@DAFABDBBB@BC@AF@HFD@BAF@@D@DB@B@BDAFDB@@@DBBCFBJHDHF@HDB@FABCC@BCHABB@BBH@DBBAPSHMLQBCHGBAFGHG@ABADABCDA@ABABABA@ABAB@@A@CB@@A@ABC@ABC@E@@@A@IAAACCGGGMEECKAE@@@EAIACCCCACEG@AAC@ABEHGBADAHCHCJE@@FC@@@@BAD@DADABADADAFCDADAB@DAD@BAB@FADAF@BAB@B@B@D@B@F@D@H@D@D@J@HBF@F@HAJCD@FCDEBABCFIDIFIBCDAFEBALAbCB@HBDBDBD@D@FAFAJCJEFAH@HBB@F@J@HAFAFCJCJCBADAFCBAHANCJCB@F@JAF@F@FAH@H@NAZ@Z@@BT@B@D@DBB@B@BBRFJFFDN@F@LEPMFADADADADAD@DA@ACEA@AC@CBABAAKAKBAB@@CBGBAAE@CAA@C@@EAAAAAEEEAACFCBABELOBEDIFCHG@IFK@C@AEAGCCACBE@BCAEBAAIAECACACCEBEACBK@@AA@E@CBEHGDGDCBCCGEEIDE@AACFEDCB@AAACBCDC@AEACA@A@@@ABA@AB@@ABA@@BA@@@A@ABAAA@@BCDBDAACCAC@C@A@AABABA@ABC@A@ABC@A@@AA@ABC@ABC@A@@A@A@CA@AC@AAA@AACA@CA@CAAAAAEAAAECCAC@CABABADBBC@CA@BADCAAA@ABABAAA@@ADCAA@AAA@AAA@@AA@@@AAC@ABABA@A@ADABBD@B@BADA@@BCBADAB@@@BA@@B@B@@@B@@@BA@@BA@@@A@@@AAA@A@@AABA@ABABA@@B@D@@A@AB@BBB@BBD@BDB@BDBBB@BABCBABC@C@AB@@BB@B@B@B@@A@@B@@AB@@@@@@@@@BA@@B@@@FBB@@@D@DCBAB@@AB@@ADB@A@A@AB@BA@AB@@@BCBAB@B@BABABBB@B@@CAACAA@ACAA@CAC@A@E@CCCCACA@B@DAB@DBBA@ABABAF@B@BBB@B@D@BCBC@AD@BCF@@C@C@CAA@CACCAAAA@AAA@AACC@AA@AAA@C@E@@AAAA@@BC@EACAEACAAABAACA@EA@AAC@AAAAC@A@@A@C@AAABA@C@ACAABC@A@ADADG@@@@AABABCBA@EAC@CAA@C@CAA@AAA@C@@C@AACAA@@CA@@A@AA@B@BABEA@BC@ABA@A@A@CAABADA@A@CBABABAB@@@B@BABA@AAABCFAA@A@AAA@AB@@A@A@@@AA@@AA@@@A@A@A@A@A@@@AAA@@A@@AA@C@A@A@AAA@@@AA@@AA@@@@AA@@@@EA@A@CB@@ACBC@ABA@A@AAAACCCAA@CDABABA@A@CA@AA@AACA@A@C@A@ABA@GDA@@@@C@AABA@@@AAC@AAC@AAAA@@AAA@AAA@A@A@@BA@CBA@AB@@AA@@@@AB@@@BAB@@@@A@ABAB@B@BB@@B@BA@ABA@A@A@@AA@AAA@AAA@A@@ABABA@@A@A@A@A@A@A@AB@BAB@@A@AA@@A@A@@A@A@CA@A@A@@@CBAB@@A@A@@B@B@B@B@B@BB@BBDABAF@B@@AB@BB@B@B@@B@B@@BABBB@BABA@A@CACB@BADA@AB@@BB@BAB@BA@C@A@A@A@AAC@A@AAA@A@@BB@@@@BBB@BA@ABCA@@A@CB@B@BAB@AABA@ABAACA@@@AAA@AA@@AB@@AD@D@BA@@AAAA@AAA@A@@@@AB@@@@A@@AB@AA@CC@@@ACA@@A@A@AAA@@@AAA@@BA@A@@@A@@AAA@@AB@B@@A@@AA@@AAA@@A@@B@@@AA@@A@@AB@A@AA@@A@@@@B@BA@ABA@@AA@@BA@A@AA"],"encodeOffsets":[[114327,23348]]}}],"UTF8Encoding":true});}));