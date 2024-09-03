(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('东港市', {"type":"FeatureCollection","features":[{"type":"Feature","id":"210681","properties":{"name":"东港市","cp":[124.152705,39.863008],"childNum":9},"geometry":{"type":"MultiPolygon","coordinates":[["@@@@B@@@@A@@B@@@AA@@AB@@@B@@"],["@@@B@@A@BB@@B@@@@A@@@@@@A@@A"],["@@A@@@@@@DB@@@BA@A@@@@A@"],["@@@A@@A@@@@@A@A@@@AB@@@B@@@@B@@@D@@@B@@@@A@@@@"],["@@@@B@D@@@@@@AAAA@A@@@@B@B"],["@@A@@B@@@D@@DB@@@@@@B@@@BA@@@AA@@A@@@@CA@@"],["@@A@ABABABA@A@AACACAABA@CBC@AB@BBB@BDBFDHBF@H@B@@A@@@AAC@ABABA@AB@@AAA@@A@"],["@@C@E@@BABBDHLDBHDCHBBVFNAFBDALCBAHEBCDE@AAEA@CAC@A@EBC@U@OCE@CCEAC@"],["@@SJM@KCOKAMD]GKe]UMWE]AEDCDAJABE@C@ACEE@AAA@ABE@CAAACCCACC@GAE@AAGA@CAAE@CBEHAFFDFB@RCJEDAFABIFC@AACCA@K@CCAUACCA@`@ZATELQJCBER@JDN@@@@BFGRQJQFGLCFEP@JBB@B@@B@B@@B@@@BBBBDBB@B@BB@BBDBJFBBBB@B@D@@@@@@@BAB@@CBKHADCFEH@BA@AD@BCF@B@@AB@@A@@AAAAAAAAAA@@@A@@@@@EC@@A@@@A@@@AD@@D@@@@BB@@BDBB@@B@@@@ABCBA@@@@B@@AB@AAAA@AD@B@@C@@@AA@@@@BA@@@AC@A@@@AA@@@AAC@A@@CBA@BBBD@B@@@B@@@B@@@@A@C@A@@@A@AEA@@AA@A@C@@A@@AACFC@ABA@@@@BAB@B@@C@ABCB@@CB@@A@@BABA@A@CAA@CBA@CB@@G@AA@AAC@C@@@@AAA@GAA@AA@@@@@@CB@BAB@B@@BB@@@@BB@@BBB@@B@@@BA@AB@@A@A@AB@@CAA@@@@B@D@B@@BB@DBBBBA@@@ABA@@@BBDDDC@@@B@@@@@B@DAA@@A@@B@@@B@B@B@@@BA@E@E@A@A@@@CF@@B@@@AD@BCD@B@DABCDAD@BA@B@BBD@B@DBB@BBFBDBBDBBDBBBB@B@D@DBB@@B@B@B@B@@AB@@@BBB@@@B@@@BAD@BB@@@@BB@@BD@@BB@BD@@B@@B@B@B@B@@ABA@@D@B@B@BAB@@BBB@@BAB@@@BB@BB@BB@BBBBBB@@BBBBBB@@@@BBB@ABBB@@B@D@@BB@BFDF@@@@B@@@BBB@B@B@B@@BB@@BDABB@@D@B@B@@@B@B@DBB@B@@BBBB@@@D@B@BBDADAD@@AB@BABAD@B@F@B@B@B@B@B@BAB@B@D@B@F@@@@@@@ABA@@BAB@B@@AB@BCAA@E@EDCDCPAHAFABE@A@A@@BE@A@BBN@D@HEBCDG@@ACAEBA@@D@@@@ABAB@BBDD@FB@@@BCBABB@F@@D@DBDBDBADAF@B@@@@@DB@AB@B@BA@@DABAB@B@B@@@@AB@BAD@@BBDDDBB@B@@@BBB@BBBBBB@@D@@@B@BBBBD@B@@@BB@BB@@D@@@@B@HBB@DB@@B@DBD@@BB@BBD@@B@@@@@BAB@BB@BBBBB@@@D@@@BBB@@BBB@BD@D@@@@@B@DB@@@B@@@BB@B@B@@@B@D@DB@AB@B@D@B@@@@@B@@@B@BABBB@@ABA@AB@D@B@BAB@@@DD@@BBB@D@BBB@DA@@@@BF@@AD@BBB@BBDBB@@@@BBBBDBB@BA@@BB@@D@@@@@DD@@BBBBBBB@@@BBB@@BDFB@DBB@BB@BD@@@@@AD@@BBBB@D@@JLHLFJBHDJ@D@JADKDHDHHHD@@LBLBB@DBJBD@DBDAB@F@D@DALCDCFC@A@E@EBABADCDGDGFGFCDAB@DBF@JFFDB@B@DALGHIBE@E@C@GAE@ACC@AAA@ACCCCECECICIEAAAAAAAEAG@C@C@GDI@@BC@ADEB@FEBABCFEHCDAFEBA@ADA@CBC@CBCDEHIHGJQDAB@@@BDB@F@D@FABABC@AB@BBBBBHDBFDLDDB@DABABBBB@DAFC@AB@BAVM@@@BBBBDBD@HBBBDBDB@BBHBD@FDFDBBB@F@B@BAD@JCDADA@@D@FA@@DAHCDAF@DAF@NEF@H@B@L@@@DAB@DCBCBC@@BBB@B@FD@BD@@@BB@B@BB@AB@D@@@BB@@BB@DB@BB@@BABAF@@FDB@B@DBB@DBDBDAJEBONGL@JDJFLHNDTCZ@H@LAVBRELBL@@@@@@@D@@@B@B@@@BAB@D@@@B@B@B@B@@B@B@@AB@@DBBB@BBB@@@@EB@BA@A@@@@@A@@BAB@@@@@B@B@@A@@BAB@BB@@@@B@@@BBB@D@@@B@B@B@B@DBB@@BBB@@BA@@B@B@@BBB@BBB@@@BB@@@@@B@B@B@B@BB@@B@@ABBB@B@B@BCBA@C@@@@B@@BF@BBBBBB@DB@@B@@BB@@@B@@@B@@B@B@@@BA@@BB@@B@DB@BBBBB@@@B@BBBBFBBB@@@B@@@@BB@@B@BA@@B@B@D@D@B@@BBB@@@@DBA@@B@BBBDBBBDDB@BBBB@@D@B@B@B@@@@@BBB@@BB@BBB@@@@BBD@B@B@@DBBB@B@B@BFD@BBD@@BB@@@@DABA@@D@@BB@@DBB@B@@@B@DBB@BB@@@AB@BA@AB@@@B@B@B@B@B@@ABA@@B@@@@@B@@@BA@@B@@@@DB@@BB@@BBD@BBB@BB@BDB@BBABB@@@BBBDDB@BDB@DBB@@@BA@@FBB@B@@A@@@A@@@A@C@@DA@@B@B@F@@BB@BBB@@@B@D@B@@B@@@BB@@@DBB@B@@@@B@@ABED@B@@@@BB@@BDB@BB@@@@@BB@BBD@B@BBB@@@@BA@@@@BB@B@@B@BB@@BB@@BDD@@BDB@B@@B@B@@BB@@B@D@@@D@BBB@B@@@@B@B@BB@@@B@@BB@BBABBBB@@@D@B@@@D@B@@AB@BAB@BBB@B@@@AAAC@@@AAAB@BAB@DABABAAAB@BA@A@A@@@@@AB@DAD@B@B@@AB@BA@@A@@A@AB@BA@A@@@C@@AABA@@DC@@@A@A@A@AA@@AB@D@@ADABAB@@AB@B@@ADBD@D@DBDB@@DDB@BBB@BAB@B@@AF@B@@AB@BABBB@D@@@@@BABA@@@@@A@@@A@A@ABA@AA@@AAA@@AA@A@AAA@@AAAA@A@@A@@A@A@AA@@@AA@@@@BA@@AA@@@A@@CA@@AA@@@@@ABA@@AA@AA@C@CA@ACABAAA@@@AAA@AAC@AAA@AAA@A@@@@AAA@AA@@AAC@E@AAAAAACA@A@AA@@ABA@A@AAC@ACC@A@@A@A@AAAA@A@A@C@@@A@@@AAA@C@A@@@AAA@@@AB@BAF@BAD@@@@ABA@A@A@@@A@@@AA@@A@@DC@@@@@@@@B@@@B@@@AAB@@@B@@@@@@@@@B@@ABBB@BBBB@B@B@B@@@BD@@@AAA@@ABA@@@@B@@@BA@@B@@@A@@B@@@BB@FAF@B@FB@@@B@@BBBBBBB@B@DDBB@@B@B@BBBBB@B@@@B@@@B@BB@@BB@BBB@@@B@@A@@B@@@B@BBB@@D@BB@@@BB@@@@BAB@B@@BBB@BBB@B@B@B@BBBB@@@@B@D@B@BAB@@@B@D@@ABA@AB@BBBAHA@A@@AA@A@@@@BAB@@@B@@A@@@A@@@A@@@A@@BBB@B@B@DA@@@@@A@@@A@@B@BA@A@@AAAA@@@@@@BAB@@@B@B@B@@AB@B@B@@@@BBD@@@B@A@AB@@@BB@@@@@@@@D@@@@A@@@@@A@@A@@@@@@ABABAHA@@EAA@@@@@CD@@@@A@AA@@@A@A@@A@@A@AAA@A@AA@AAC@A@@CAA@@A@AAA@BACBABC@C@C@C@C@AAC@@CAA@AAACAAAA@@A@C@AAA@AAAA@A@A@@B@@@B@BABABABA@ABA@@AA@@@A@A@ADAA@AAAC@A@C@A@CA@AC@CAA@AAA@AA@A@AB@@A@@@A@@@A@@B@AA@@AA@A@AA@@A@@A@@AA@@@AA@@@@@A@@@A@AA@@A@@BA@@B@BBB@@BB@A@@A@AA@@AA@@@AAA@A@@@@@AAA@@@A@AA@@CA@A@@BA@@B@D@@@B@@@B@@@B@B@@AB@B@@@@AB@@@BABA@@@AA@AAA@BAB@BA@@@A@@C@C@A@@@@A@@B@BAHAD@F@D@DBDAB@FBFBFBDCBEDEBA@A@ADABCBABABCBCBABABABCBABABCD@BCB@@AB@BA@@BA@A@AAEAEF@D@HDFFDFBDDDBB@D@BBD@BBEBC@C@A@A@CBAAC@AAA@C@ABA@@BABA@ABA@ABA@AB@@A@AB@@A@AB@@A@AB@@ABA@A@@BA@ABA@@AA@A@A@AB@@@BB@@B@@@B@@AACHABAFBFBB@@C@@JBABLDCDHBB@BBBAB@B@@AB@@A@@@@AAAA@@@A@C@@DB@B@@BB@B@BBB@@B@@A@AAC@@@@@ADB@A@@@@AC@@@@@AB@BBBB@@BCBCA@C@C@GAE@G@E@@AB@@A@A@@F@F@BAAAAAAAEBAAABA@CDCBCBGDAA@C@AA@AAD@B@B@@GAAE@EAA@@B@BABBBC@A@@BA@AA@AA@AAA@AA@AAA@ABA@AB@@AA@AAA@A@AAAB@A@AA@@A@A@@BA@AA@@AAA@@@A@@A@A@A@@B@@A@ABAAA@ABA@@@AA@A@@BA@@AAB@AACAA@EAGCFEE@EAABAB@@AA@CEAC@DEDG@C@A@C@@@AAA@AA@@AACAA@AACCC@AAECE@AA@@AABABAAAACABA@AA@EAA@BACA@ABC@C@@AAA@IAEABCA@AB@@ABA@BC@A@ACAC@A@BGBC@C@A@A@AIICECCCCACEECECGACEBA@AC@AA@@A@A@@AA@AAA@@@A@AA@@AEBCI@A@@A@@@AB@@A@@@@BA@@B@B@BBBAB@@D@BF@DCFCFAD@AAAAAC@CACA@AAAACAAAA@@@AB@DCJ@B@DAAKEG«GFGN@PXvGJSCG@cGWIMEeEKCuIG@EBeHSFULIHOD_AcBsF[@iF]HODO@Q@QGOIcA[AyEkKcII@GBEFCPGJGF"]],"encodeOffsets":[[[126786,40742]],[[126805,40737]],[[126761,40743]],[[126545,40732]],[[126729,40706]],[[126567,40718]],[[126798,40742]],[[126686,40700]],[[126644,40783]]]}}],"UTF8Encoding":true});}));