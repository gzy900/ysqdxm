(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('阜新轮廓', {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"阜新"},"geometry":{"type":"MultiPolygon","coordinates":[["@@@CAAACB@DA@ABAB@AAGBA@A@BDA@A@@C@AAC@ABAA@CAC@@A@AA@@AA@@ACBCBA@AAE@@AC@CAG@BCBAEAA@@BA@EAA@ABA@AAEBA@A@@AA@CBEBE@A@CBA@@BGBA@@AA@AA@CCA@AA@ACDCDABA@AHA@AA@E@A@@AGDC@CBAAC@AAAAAA@C@ABCBA@CCCCACEA@@A@CEAA@A@AB@ABAA@AA@BAD@BA@@ACBA@ABA@CCA@A@CEAAA@AADAAAECCBA@@AA@AAAAA@CAEA@AB@@A@A@AB@B@@A@AE@@AAAAABA@A@AC@CA@ACCA@AAECCAABA@ABA@@AA@C@C@AACAA@@AAB@DADABAAAAA@@ABAAC@A@CAA@AA@CCAAA@@ACCIG@AA@A@A@AACAAAAA@A@ABACACGDEIEAAA@@AE@A@GCE@C@C@A@@C@AE@A@A@ABABE@AB@BA@A@ABA@ABEAA@AACA@AAAACAABA@AABACCAB@FEDEAACA@ADBD@CCAAAAAAMKA@C@@B@BA@A@@ABA@AA@A@ABA@@A@ABA@AA@A@@AA@@AABAAA@@A@AA@CB@BA@A@@AG@@A@AACA@@B@DA@BBA@A@@B@BABA@@AA@ACAC@AF@HC@C@CEEB@@AA@AAB@DA@AA@C@A@G@EAGCA@C@@BA@@C@AAAABA@A@AB@BA@A@AC@AABABACACA@A@A@BA@CA@CBA@A@@C@AHAD@@AA@@ACACBA@@BAA@BC@A@A@BAA@C@ABA@A@A@C@A@A@A@AA@ADANEEAA@AAECEEAAC@AACAEACCE@C@K@C@EAA@CBC@[BKAAAAACC@AAC@AACCACAAAEAC@E@C@AA@CAKACFGNENCJ@TBMKKIGEGGMQAAGCGAG@GFMJILQLQDUDMEQEQGUAW@S@OHEFGDGACAIEEEMOMOCEEGG@O@QD[AGECBCBGTIBSDK@C@A@E@ABKAU@UAC@O@U@AAEB@A@AA@ABA@ABA@CAAAC@@ACB@AAACIAAF@BA@AAAAAC@CAG@EAC@AAAAAC@C@AA@E@A@EBAC@O@A@C@C@ACCECAA@C@AD@DAB@@A@A@A@CBABABABC@A@C@ABC@AAECCC@EAC@A@E@IDCDC@A@A@A@GCA@ACCA@ACAAAC@@AAC@CACAA@CAC@CBAB@@C@AAAAAA@A@A@CAA@A@ABA@ADEBC@CADD@BCB@B@B@B@D@B@BBBABCDERGHABKHIJM@QBCF@BC@BCB@BAEAAFA@ACA@C@A@ABADKMBFADEDKA@AA@A@OGGC@E@CGAG@KBMBSFQFEDEHEHDD@BB@B@BBD@BBB@B@BB@BBBA@BBAB@B@B@B@BAB@BBB@BA@@BA@BDBB@B@B@B@B@DA@ABC@CBABA@AAA@EDCAA@@AA@A@A@CBABA@@AA@A@C@A@AAA@@BCA@BA@@BEFGDMDYJKJKFIDG@AD@B@BB@BBBBBB@BD@DBD@@BA@AB@BAB@B@BABABBB@BB@@BAB@B@BA@@BB@@D@BA@BB@BB@@BB@@BB@BDDABBB@BB@B@BBB@BBBABB@@BABAB@BBAB@D@B@B@D@CBABBB@BBD@DA@@BB@B@@BBB@B@BBFDB@B@BBBDBB@@B@BB@DDHD@DB@BBAB@D@BADABA@@BBH@F@HGFEFC@EBA@YFUH[DUHWLEBKDIDGJAH@PEJCHAJCJALILADCFGDKDKFYH[@MESCUEMGK@I@MDA@ABA@A@A@CBCBA@A@@BA@A@AB@BA@A@C@A@@BA@@BA@@BAB@BA@@AAB@BAA@BA@A@A@AAA@A@A@AA@BA@A@A@A@A@C@C@A@A@A@A@@AA@A@CAABA@@BGBCBCPJL@JD@HNFLDNCPALIREVDPVPTJFTDHBLBJBLHJLHCTADAJADAB@DAH@DCBCDADAD@F@B@D@B@DCDAB@BA@AB@B@BCDABEH@BBBML@ZGJBJBFHN@NAH@BGHINOHABCBC@ABABA@ADABABAB@BBABB@BBB@BBAB@DADBBBBDABA@CDCBABDBB@BBFBHBHDDBBAB@BAB@B@@AB@D@B@@AB@BAFABAB@BAD@B@B@BBBBBDBDBDDH@BDDDD@BBBBBBDB@DD@BBBBBB@BBD@DBB@HBDBB@DBBAB@@ABA@ABA@BD@JBB@B@F@B@B@B@@B@B@B@B@BBB@BB@BBBBDBDDDB@BB@@B@BBB@B@DB@BBB@B@BBB@@BB@@A@A@AAAB@B@B@BBB@B@@AB@BBB@@BB@@BA@@BBB@D@BB@B@B@@B@BB@BBABA@@BA@@B@BA@BBBA@BB@BBB@BBB@B@B@BBB@BBB@B@@BB@@B@BB@DBB@B@B@BBDBBBDDDB@BB@B@B@BBBBBB@B@B@B@BB@BBBDBB@B@B@BABABAB@BBB@B@BDBBBB@BBB@BBBAB@B@B@@BB@B@B@BBB@BBBDB@B@BBB@B@BBBBD@BBB@@B@BB@BB@BAB@DBBBB@BD@@BD@D@BB@AB@@AB@D@D@B@B@B@B@BBB@B@B@B@B@B@BBB@B@B@B@B@DBB@DBDBB@B@BBABA@C@ABAB@B@BB@BBB@BAB@BAB@DA@AD@B@B@B@BBD@BBB@BBB@BBBBB@@BB@D@B@BBD@DBB@BBB@@BBB@BB@@BB@@BB@@BB@BBB@BBB@BBBBB@B@BBBBBDDFBBDJ@DBB@B@B@B@B@B@B@B@BAB@BB@B@BBJFB@@BA@@BA@ABC@A@A@ABA@@BAB@DA@@BD@B@BBBBBBBBBBD@B@JBJBB@B@BBD@BBB@FDB@BBBBB@DBB@B@@BB@BB@BDBB@@BB@BB@B@B@BBDD@B@@ABAAABA@AB@B@B@BB@B@B@BBBB@B@BBBAB@B@BADCB@BABABAB@B@BAB@B@BAB@B@B@B@B@DAB@BB@B@D@DAB@B@BBD@B@DAD@D@D@B@BBBBBB@F@DBB@D@D@B@D@J@H@D@B@D@BBB@BBAB@B@B@BA@@B@B@BA@BBB@B@J@B@@AB@DABA@A@ABEB@B@BAB@BABAB@@BB@B@B@DAB@BBBBB@BBB@DAB@B@B@BABBB@@BB@B@B@BBB@FBB@DBB@BBBBDBBBA@ABABB@@BD@BB@BB@BBBBDBBDBBBBB@BADAB@B@B@B@@AB@B@@BB@@AB@DAB@B@B@B@DEBABAB@@A@C@ABAB@B@B@B@B@B@BDBBBBBB@B@D@BB@B@B@BAB@DEB@DBB@BAB@@ABABCBAB@DDB@D@BBD@DBF@DBDBB@B@B@DBB@BBB@B@BAB@D@B@BAB@B@B@B@@AB@@AB@B@B@B@B@B@BBBBBBB@B@B@@BB@@BB@@B@B@BA@@BA@@B@BB@B@D@B@B@@BB@DBDBBBD@@BB@@BAD@B@D@BB@B@B@B@B@B@B@@BB@@B@B@BD@D@B@B@@B@BB@@BB@B@B@BA@CB@@ABA@A@AAA@AA@@AA@AAA@AACCA@@A@A@A@AB@@A@AB@@ABA@AB@B@@AB@@AD@@AB@B@@AB@B@@ABC@ABA@AB@@AB@D@BAB@BAB@B@@ABA@AB@BABABBB@B@@BDBBBB@D@B@BABCBC@AB@@A@AAA@A@AB@@A@A@AB@@A@ABA@A@ABAB@@AB@@A@AAA@A@AB@B@B@@A@A@AB@@AB@B@BA@A@ABABABABA@AB@@AB@DABABABAB@B@@AB@B@B@BBB@BBBBB@B@B@B@B@B@B@B@B@B@B@BAB@BAB@B@B@BAB@BBD@B@B@B@B@BBB@B@BBD@DBBBB@@BB@BBB@B@B@@BBBBBB@@BB@BBBBB@BB@BBBBBBB@BB@@BB@@BB@@B@B@B@BB@BDBBB@@BDDBBB@BDFDBB@BBBB@@D@BB@BBBBBB@B@BB@BBBB@B@B@BBAB@@AB@B@B@BBB@@BB@B@B@DAB@B@B@@B@BB@B@@B@BB@DBB@@BB@B@B@@BB@B@B@BBB@B@D@B@B@B@B@BBBBB@@BB@@BB@@BB@@B@BBB@BBBBDBBBBD@BBBBB@BBBBBDB@BBBAB@@AB@@ABA@A@A@AAAAAAA@AAA@A@A@A@AB@B@B@B@B@B@@BB@B@B@@BB@BBBBB@B@BB@BBB@B@B@BBBBB@B@B@D@BFJ@B@BA@@BBB@BB@BBBBB@@BBB@B@BB@@BB@BBB@B@B@B@B@B@B@@AB@BABA@CBC@CBCB@@AB@BBB@B@BBBBDBBBBB@B@B@B@BAD@B@B@BBBBBBBB@B@BABAD@BABA@C@AAA@A@ADAF@DAB@@B@B@BABA@@BABBB@B@BABBB@B@B@BBBBB@B@BAB@B@BB@@BB@BBB@BBB@B@BBB@DBD@@BD@B@BBB@BBB@BBBBBBDBB@@B@BDBB@B@@BB@BB@B@BB@@BBBB@B@@B@BB@@B@B@B@BAB@B@B@D@BB@BBB@@BA@@BABCBCBCBA@AB@BAB@BA@AB@BBBB@B@B@@BBAB@D@B@@ABA@A@ABA@AB@BABABAB@D@B@BBB@BBBB@B@B@B@BAB@BA@ADCD@BAB@B@BDBB@B@B@B@BBBBB@@BB@@BA@A@@BA@@BA@ABA@@BA@ABC@ABA@@BABABA@@BA@ABAB@BA@@BA@@B@BB@@BB@H@B@B@BBB@B@B@BBBBB@B@BBB@@BAB@BA@A@A@A@A@C@A@A@ABA@AAAAA@A@ABA@@BABBB@B@BB@@B@BB@BBB@BBB@D@BAB@BA@ABABAB@B@B@@BB@BBB@@B@BABABAB@B@B@B@BA@@BBDBBBBBB@B@BABCBABABBBB@BBD@@BB@@B@BB@@BBBBDFBBBB@BAB@BADCDAD@DBB@@BBD@D@BADABELCH@BBDDB@DB@BBFAJ@B@BAD@D@F@B@D@B@B@@BBBAD@FAD@BBDBBFBD@B@D@B@DAD@B@DCB@@AB@BIBA@ABBDBFDBDBB@F@DBDDBDBF@DAH@HAHCLCDAD@BBB@BBBDBFBBB@BBH@F@D@DBDBB@B@DBD@DB@BB@@B@BAB@B@B@B@BB@B@DBNFB@D@B@B@BAFAFAB@BC@AAAAC@A@CBAD@F@HBFDFBD@B@B@BCB@BEDKBAB@B@B@H@JAFAFADADADABAB@D@FDB@D@D@BCBA@AAAAA@A@AB@D@D@F@B@FCB@B@DAD@FAB@B@B@AB@B@BB@B@DAB@BC@AB@B@@B@BBB@BA@@BB@B@B@BA@AB@B@BAD@D@B@DBBBD@DBLBB@FBH@BABCBCAG@AAA@A@AB@@BB@@BB@B@B@B@BBBB@BB@@B@B@BBB@B@B@B@BAB@BBD@D@H@BBH@BDD@BBB@B@D@BAB@BADADAB@B@D@B@DAB@BAB@BBBB@B@@AB@@AB@B@B@B@B@D@B@B@BAB@B@B@DAB@DAB@B@@AB@@ADABABAB@BABADABABA@AB@@A@ABA@ABAD@BABAB@B@BAB@BABAB@@AB@BAB@B@BA@CB@@A@A@A@A@ABAB@BAB@B@B@B@D@B@B@D@B@BAB@D@B@B@B@B@B@B@BAB@B@B@B@B@B@B@D@B@B@B@B@D@B@BAB@FAB@B@BAB@B@@ABA@ABA@ABA@C@AB@B@BBDBB@B@D@BBB@B@B@B@DADADADAB@BA@ABCAA@A@A@A@AB@BABAB@B@DBBBB@BBBB@BBBB@BBB@DBB@BBB@D@B@DB@B@BBBB@B@@BB@D@D@D@BAB@B@BADBB@B@B@D@D@B@F@B@B@D@D@B@B@BBB@B@BBBBBBAD@BAB@DA@@B@B@B@B@D@B@D@B@D@B@B@BB@@BBBBB@BBBB@@BB@BBB@DBBBB@DBB@B@BBB@DBHBDBBBB@BBB@BBBBDBB@@BB@DBBBBBBBDFBF@BBB@B@F@B@B@BB@@BBBDBBBB@B@B@BBB@DBB@D@BBB@DBBBB@@BBB@B@B@B@BAB@B@B@BAB@D@BAD@BAB@DABA@A@EAE@A@AAA@A@A@A@AAA@@AA@AAA@A@C@ABA@A@C@A@A@A@A@C@A@A@A@C@A@E@CBE@A@GBE@C@A@ABC@A@A@A@A@A@A@C@C@A@A@C@A@A@C@CBA@C@ABA@ABA@AB@B@BA@@BAB@BABABABABA@@BAB@B@B@B@B@B@B@BAB@BAD@BAB@BAB@B@DAB@B@B@BAB@BAB@BADABADA@AB@B@B@B@D@B@DBB@DBBBBBBDBBBB@BBB@B@F@BBF@F@B@B@D@D@D@D@D@B@DBB@B@B@D@BBF@D@D@B@F@B@DBD@DBD@D@DBD@D@B@DBF@B@B@B@B@D@D@B@D@D@B@BAD@DAD@B@BAD@B@B@B@B@D@B@B@D@D@D@B@DAF@BAF@D@F@B@B@DAB@F@B@BAB@F@D@B@F@B@D@B@D@D@B@B@BAB@@AB@DAB@B@D@B@B@DAB@BAB@DAB@B@B@B@B@B@B@D@@AB@B@B@B@D@@AB@B@B@B@B@B@B@B@B@B@HAH@B@B@BAB@B@D@@AB@FABADAB@B@DABABA@A@AAAACACA@@CA@@AAA@A@ABABAB@@AB@BA@ABA@ABA@AB@BCBC@CBC@AFABADAB@B@B@BAB@B@DAB@B@B@B@B@BABAB@B@DAB@FAB@B@DAB@B@BAB@B@BAB@@AB@BCB@BABAB@@BB@B@B@BBB@B@B@BBFBB@FBB@BBB@B@B@B@DBBBDBB@B@@BB@B@B@F@B@FAB@D@B@B@D@BAB@B@B@@BB@FAB@F@@BB@D@B@FBB@B@D@BBB@DAB@B@B@B@BABBB@B@BBD@B@F@BBB@B@BBB@B@B@B@B@DBB@B@D@B@DBB@BAB@B@B@@A@AB@AA@AB@@A@A@A@AB@@A@A@AB@@A@ABA@AB@@AB@DAB@BAB@B@BAB@B@BAB@B@B@B@@BB@B@D@B@BAB@@AB@@ABAB@@A@A@AB@BAB@BAB@B@B@B@B@B@B@B@B@B@BAB@BA@AB@B@FBB@B@@A@AB@BA@A@AB@@AB@@AB@B@BA@AB@B@@A@AB@@A@ABABA@A@A@AB@@AD@B@B@BBBB@BB@B@@ADADA@AB@B@BAB@B@B@B@B@@A@A@A@ABABABAB@BABABAB@@ADABABADAB@B@BBD@D@B@B@@A@EAA@EACABADC@ABA@G@EB@AA@A@A@CBIBA@CBABMHGBA@@AKEC@AAAAAA@AA@IBAA@CAAACAACCC@@AA@A@CBC@AAA@ACKCIEKIBKCAA@@AAAA@BAB@HGDCBABAHADAP@BADAD@BAB@DCB@@E@AB@BAB@BADAB@JG@ABCBAAA@C@C@EB@BAPBRBD@HADA@BB@D@@BB@BBB@@AB@B@B@B@BA@BB@B@@A@ABBB@@AB@@BB@@BBABB@A@AB@@ABB@AB@B@B@@AA@@AA@@AA@@AA@BA@A@AFKA@DCA@@AJENGRKJMLID@BB@BB@BCB@@ABD@BB@B@BABBD@FAB@BAB@B@B@HFB@FBBBDADABAB@DABAD@FAJCJCBADAAAAAA@EEBAAC@AH@@EDABA@AJCB@LC@AHA@AJ@BABADA@AB@F@BAFADAB@DAB@DA@AAEBABADABAA@@AC@CAA@A@@C@AA@@A@AA@ABA@@AEEEG@ACA@BA@CCAAA@AAA@ABEBA@@BGCGCCAYOIKACB@@ABA@C@C@AAAAACBA@A@@A@C@A@CA@CC@A@ABI@A@AAABAA@@ACBEB@A@A@AA@C@A@G@GBABC@A@@BA@ABA@AAA@A@@B@BU@aEWAQC@AUICAEABAB@FBFA@CC@AA@AAA@AA@EC@ABC@AA@@AA@@AB@B@B@AADA@A@AB@@A@AAAAA@ADC@A@A@ADA@AA@@ACA@A@ADCDC@A@ABACA@ADABAAA@C@A@C@AC@A@@AB@BA@A@AB@@BB@BBDC@ABCBAA@A@A@A@CAAABA@AA@@AA@BAB@AAE@A@A@@AA@@A@AACAC@AD@BABAD@BBB@BBB@B@B@@BB@B@B@B@@AB@@A@AAACACAA@@A@ABA@A@ADCBA@AB@BAB@B@B@BABBB@BAB@B@BAB@B@B@@B@BB@@AB@@B@B@B@BD@B@D@H@BABDDBBABC@A@AB@BE@A@A@A@AB@BA@AB@B@@AB@BAB@@ABAB@FBF@@BB@BAA@@AB@@AA@@A@AACAA@AAAAAACAGJ@@AAA@AAAB@BAAUAI@C@CAGKACBW@@A@AGEA@@AA@CCIEECGCWIcYGCA@AAA@GEKEQKC@@AA@M@IAIEA@AAICQEK@CAECEAA@BC@A@AGCD@GC@AB@BAAACCA@CAEDECOIOIGIEEIGUIUGSIICE@A@@AA@ABABAAA@@BABADQAAADA@AAAB@@AA@AAC@A@AB@BABA@AAABABCAAB@ACA@AE@BCI@A@E@C@DQBGFIEAQEWKSEOGQGYGKCQGSGOGOGWK@AeQQIICKCEAMBIBABADA@A@EA@BA@@BA@@ACAAAAAAA@AA@@ABADABA@AA@AAA@C@A@CD@AA@A@GBAA@A@EBC@ABA@CDAGCA@GEOEWGOESI]KUCQCSKYKUIGAOEO@UKUKC@[KAASGAACAAA@BA@EA@BA@A@@C@AB@KGEAA@@B@BE@@AC@@AA@C@BDG@CBC@"],["@@B@@AAB"]],"encodeOffsets":[[[125146,43060]],[[125107,43037]]]}}],"UTF8Encoding":true});}));