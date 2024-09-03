(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('葫芦岛轮廓', {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"葫芦岛"},"geometry":{"type":"MultiPolygon","coordinates":[["@@CCECKEEKAI@CBCFUBG@CHS\\ECCGAKGAGBILCZCVKDQAMLAJIBAABA@C@AAEAAACIE@A@C@ABCBADADALAFAFAJIBCDG@E@EACGCQEACCGAGAK@MBCBABCBAD@B@D@D@D@FF^@b@DCBAB]BCF@FA@AAA@C@E@IAEACA@EAK@OAK@M@E@EDCBEDEBE@EAEAAEACECECAA@EAAAAA@C@IBC@E@CAC@CCEGECAACAG@G@KAI@O@M@M@KAC@C@A@CAA@AAE@A@A@A@A@ICC@C@ABA@A@E@A@A@ABABA@A@ABAASACAICICECA@CCACAA@CBGBEBEBADCDI@G@GEGEICGAS@AAO@KCMEKMMQKOKSKcSUIMGaOSGGQ@MCQYMOCKACBO_KSGMCEECIC_BW@OCMEKECGAEBQ@IAE@CBIBUCKQSUIAE@E@CDCJMBKBOCOEIGGKIOIWKoOQEKIIMISAUFYBS@QAKMCKKCICQGICKG[KSCEMOQMQG]CwDK@gBGAQA[GaICgcQYaIQiGEAwkUA]DUBKB_GQYGIAcGMCUAcCQCQECACACCCCEKAIAG@I@KAE@CEGGGKIMIGEIAKAM@I@I@mDG@I@IAA@AFA@BB@BA@ADADADA@A@A@A@@B@B@BB@B@@BABA@@BA@A@@BA@A@A@A@@BB@@B@BB@@B@B@BB@B@@BB@@BB@@BBB@BB@@BB@B@@B@BB@@BA@A@@BB@@BB@@B@B@BA@@BABHFDB@B@BA@A@ABA@A@@BA@ABA@A@A@@BA@@BABA@@BA@@BA@@BA@@BABAB@BA@@B@BB@@BA@@BA@A@CAA@A@@AC@@BA@@AA@A@@AA@@BA@@BA@A@ABABA@@BAB@A@A@AA@ABAAAAA@@AAA@A@AA@A@A@A@@AB@GCC@@BA@A@@AA@A@BAEAA@@BAB@AA@A@A@@BA@A@A@AAA@BB@BA@@BA@@BA@AB@BA@@A@AA@@BA@A@BBBBA@A@@BA@A@@BC@A@A@A@AAAAAD@BADA@A@A@A@@BB@BBB@B@@B@B@BABA@CDC@ABAD@BABBDBDDDBF@DLHBB@BG@EDEBEDEDSNEFGDCDADBDFHB@FFJNFFDFDDADBDBDFDDD@D@JADCFCDCBBFBD@DADAFCFAF@LAL@LADAHCJAN@BABMAA@AAAA@A@AAA@AA@A@ABAB@B@B@BK@KA@AB@@A@ABA@AAAA@@AAAA@@AA@A@ABA@ABA@@BA@@BA@AB@B@BA@@BABABIDIBGFMLQN@B@BB@@BB@@B@BA@@BA@@B@B@BA@@B@BAB@BABABABA@A@C@A@@AA@A@A@@AA@@AA@A@@AA@A@@AA@A@A@@A@AA@@AA@A@A@A@AAAAAAA@A@A@A@@BA@A@A@AA@BA@@B@BAAAAA@AA@AA@A@@AA@@A@A@AEAE@ABABADB@BBB@@B@BBB@BB@@BBB@B@B@BB@@B@B@B@B@B@B@BB@@BB@@DBB@B@BB@B@B@B@@BBBBB@BA@AB@B@BB@B@BBB@@BB@@BB@B@@B@BABAB@B@BBBB@B@BBB@@BBBBBB@BBBB@BAB@BA@AB@BA@@B@BAD@B@D@B@B@BA@ABA@@BA@@B@BA@@BA@A@A@A@@BA@A@@BA@ABA@A@@BA@A@A@@BA@@B@BB@@BA@@BC@A@A@A@@BA@ADAHAFGPEFCFGFIFCDCFAD@F@H@DDJBF@HEFEFGJEJAFDNDHBNHNJN@J@FEFAH@DAF@HADAHDFFDHHDJBD@FGLEJABCFIDI@GBGFCDAHAFCHGJIFGDKHAJAFBJFFNDNDFFBF@FBF@D@BAFADA@IHMFQDIBC@A@CBABA@A@A@AB@BA@A@A@ACCCA@@AA@AAE@AAC@A@ABA@ABA@A@A@CBC@@B@BB@@B@BA@@AC@@AAAA@@B@BA@ABA@@A@A@AA@AA@AC@@A@AAAAA@AA@ECAA@A@A@AA@A@AABAAAEACAG@E@G@A@MBK@MDKDKBK@MBGAKCI@KAK@KAEBKBGBE@IAI@I@I@IAA@GAGACAEAIAGAE@GBG@CAE@IAK@KBOBQDQBMHMDMFOJWPQNKHCDALBHBDFDJFHHDHBHHLFFB@B@BBBB@B@BB@BBBB@B@B@BDBADBBB@@BDBD@D@BAB@BABADA@ABAB@@ABA@A@A@AAAB@D@FADAD@B@@ABBB@BDB@BBDBD@D@FB@B@BB@DAB@BBB@@B@BAB@BB@DBBBBBA@AAA@CBDBBBBBBBBBB@@DLFHFJJFDHFJNJPLLHFFFHDHDJHJDLBJBH@H@HCH@HBJFLDFDFDJHHFBDHLDJ@N@HDLHLJHHJHDJDHJJFBDC@EB@BBDBBB@B@B@DDFD@B@BBBBAB@B@BADBHADCBAB@BBB@D@DBD@BAD@JDDFD@DBDDFDFH@JDLFLDLLNFDFDDFBBDHAFCHAJ@F@HDDLBJCRCLINIJEHCDAH@HDJFHDHDFDLLBBB@@BABB@DBB@BB@BB@B@DADAFCB@FAB@DAF@@AB@FAFABAHAB@BABC@A@AB@@ADEBABABA@AB@B@D@DABA@A@AB@@ABA@A@A@AB@B@B@B@@A@A@ABA@AAABABA@CBA@AAAA@@A@ADC@AB@B@@A@A@AB@BA@ABAB@BA@AB@DAB@B@D@BBB@B@BA@AB@D@B@B@BB@B@BB@@BBB@BBB@BB@BB@B@B@B@B@BBD@BAB@BB@DD@BH@BBBDBBBBBBDBBB@B@D@BBB@BB@BBB@@BB@BB@B@BBB@B@D@DCAC@CAA@I@C@C@AAA@BBAB@BAB@F@BBB@B@B@BBBB@D@B@BB@BBBB@B@B@BB@B@BABBD@B@B@BBBBDBBBB@BBD@DBB@BB@DBB@DAB@D@B@DBD@BAD@B@BBDBB@BBBB@BDBB@B@BBDBBAB@BC@A@A@AB@BC@AB@JAF@B@B@BBD@D@B@B@BAHABA@AB@BCAABABAB@D@B@@AB@BA@A@AB@B@DDBDAB@D@BFDB@BAB@BBBAB@BAB@D@BBBBBDB@BBBD@B@B@B@BBB@B@D@BBBD@B@B@D@BBB@DBBAB@BB@BDB@B@B@B@B@BBB@BBBB@@BBBB@B@@BD@@B@BAB@BB@@B@BB@AB@B@B@B@BABABABAB@BBDBB@D@B@BA@@DAB@BA@@B@D@B@B@B@BBB@BAB@B@B@BAB@B@B@BAB@BB@BDBBB@B@B@BBB@B@@BB@FBB@B@@E@A@A@A@ABAB@B@DBD@D@B@B@BAB@D@BBB@@AB@BADA@AB@B@D@BAB@@AHC@ABABA@AB@@A@A@ABCB@D@B@B@BA@AB@B@BBD@B@B@B@B@BBDBD@FADBB@D@@AAAAA@AB@BDDBDABAD@D@@ABAFB@B@DAD@BFBBJFNHHHBJBFBHFDJHHHDF@D@HCJGDKDGDCDCFAF@DBDBLFDFDDHFBBFDJJBDDFDHBB@BB@@BDD@BBB@BABABB@@BBDABB@@B@BBD@F@BB@DBBBB@B@B@@BBBBB@BAB@BABB@@BBBBBB@DB@BD@B@BB@BABBBBB@B@BBBBBB@B@@BB@@BC@AB@BBBA@A@ADA@A@BBABABBB@B@BABA@BDABB@@BBBABAB@B@BA@ABBBAB@B@BBB@B@BBB@BCDBBCD@BA@A@A@A@@BABABA@A@A@@B@B@B@B@B@B@BAB@BAD@BAB@BAB@BBB@B@BA@A@@BEBC@G@@B@BA@AB@B@B@BB@@BB@BBDD@BBDB@D@B@B@@DB@BBB@B@B@B@B@BBBBBBBAB@B@@ABBB@D@B@B@@BDB@BB@@BBBDBB@D@F@H@JBBBBBB@B@@BHFB@DAB@B@@AB@BB@BBBBBB@@B@B@BBB@B@DDAD@D@D@D@BAB@B@B@BBDA@BBABA@ABAB@@ABABA@AB@BAB@DAD@FADAB@BAB@B@@BB@B@B@@AB@DBB@B@BAB@BBB@BC@C@ABCB@@BB@B@@CBC@AA@BAB@@AB@AAA@@AC@AAAA@ACAA@@AA@@ABAB@CAAABAAA@ABAB@BABBB@D@BABBDABEHIFIHMFMDIDIDI@ADIBEFGH@HFHHJJJJFFFBJ@FKDKDKDIBE@AB@B@B@B@DBHAB@BC@A@A@ADC@ABABAB@@CA@@A@A@AA@@ABA@A@ADCAAAA@AAABA@A@AB@AAA@A@AAAAEAC@@AC@@ABABA@C@AAAACA@A@@A@CA@@AA@A@AAC@A@C@A@ABA@AAA@E@A@@A@A@A@AB@BABCCAA@CAA@@AACA@C@@AAA@C@ABA@AAA@ABA@ABA@A@AB@@A@ABADA@AB@BAD@JCB@B@DBB@BAB@D@B@B@B@B@B@BBD@@BDB@B@BBBBBB@@BBBBB@B@B@B@D@BBBBB@BB@BBBD@B@DBBBBB@ABBBDBDDBBBDB@F@@AB@D@BAB@B@BBBAB@BADADCH@HFFFNFDK@A@A@AA@A@A@AACAB@B@B@@CB@@BB@@AB@BBB@@A@AB@BA@BB@D@D@B@FDB@BAF@HABAB@DB@B@BBB@BBB@BDBD@@B@BDBBD@DB@BD@D@BAD@BAB@BB@@B@BBB@BB@FAB@B@PBBBBF@JAFBFHFPHB@@BBBBB@BABBBB@BAB@DB@BB@D@B@@EB@B@D@AABABAB@@BBDDB@B@B@BCBB@B@B@D@@AAABADBDBD@B@BAA@@AC@AAAAEAA@A@@AFAB@B@@A@A@A@AB@BAB@B@B@D@@A@CD@DABCPCBAJELELCBAL@JSFGHGFAHALBNDLPRLJFBB@BB@DBBBBB@B@D@BB@@BB@B@B@@BBBB@@BB@AB@BB@BBDD@BABBBA@A@AB@DB@AB@BBBB@BADBBBDBAB@BBB@BA@ABA@@B@B@BBB@B@BBBABABA@@D@D@B@BA@@BB@@BBB@B@D@BBD@BA@@BAB@B@BD@@B@B@BAB@D@B@B@B@B@B@BBB@BADABA@@B@B@BBBBF@BB@DBB@@BBABBBBBB@B@BBBBBDB@B@DBBBBBDB@B@B@FD@BB@@AB@B@B@DBB@B@BAB@FBDBD@B@BBDAHCDIHG\\IHAF@JDFFDH@FAL@J@HBHLHLAXHZDXDTDB@B@BBB@ABBB@B@BBB@B@BBB@DB@@BBB@DA@@B@B@BBB@B@B@B@BBD@BABBBBB@B@BBBF@@B@BB@BBA@@BBBB@BBBBAD@B@BBB@BAB@BBBABAD@BFLPF\\HDDDJ@J@HHB\\CFCHEJ@FDBBBAB@BB@B@D@BBBBBB@D@@BD@B@@BBA@B@BB@@DBBB@BB@BBBD@B@DBD@@BB@B@DBB@@A@ABAB@AA@AAAA@AA@CA@@A@AAC@ABABBB@D@D@B@D@B@B@DAB@B@BBB@D@BBBBB@F@H@B@@BDBB@BBB@@BBBB@@BBB@BBAD@B@F@DB@B@BBBB@B@BABAB@B@@AD@@ABAB@@AB@B@B@FA@AB@D@BBB@B@BBB@BBDBA@FDDFB@BBBBDDD@B@B@B@BCBA@ABCBC@ADCBCBC@A@AB@@AB@@A@C@ACA@AAAA@A@@AA@AAA@@AAA@AA@@CA@@A@A@A@ABAB@B@@EBA@AB@DAB@B@D@B@@AB@DAB@@A@ABBB@D@B@@A@C@A@AAC@ABA@AB@@ANCFCHAB@BAH@@AAAB@@AB@@BB@B@BA@AB@@AB@BA@ABABA@AB@B@B@BBB@B@B@D@BBBBBBDB@B@BFFB@B@B@DAB@B@DB@B@BA@BB@BB@BBBBB@BB@BB@B@BBD@@BA@@BDBBBB@FDB@DAHE@AB@B@B@B@DBB@@ABA@ABAB@B@DB@BB@@A@ABAAA@A@ABBB@BBFAB@@B@BDAB@D@@A@ABABAB@@A@ABA@A@AA@@A@AA@A@@AC@C@A@@A@AA@A@A@A@@AA@AC@ABABAB@B@@AB@BABAB@BABAB@BA@BB@@B@BB@F@@ADCB@@BB@B@B@B@@BB@@CB@B@@AD@HCDBBB@BBBBB@BB@B@B@B@BAB@@A@ABAB@AE@AAC@CBIBA@ABI@AFIDG@IBEBGK@BEBEEK@CAG@CBCBC@EB@DABAB@BCBCB@BABBD@DBDDBBB@D@DADADAHCD@DBDBB@@AB@B@@A@CACA@AABADCFAHA@A@AB@F@B@FBB@D@B@B@DBD@DBBDBDBBDBBBDAD@BBD@BBBBDBD@B@DFBBH@CGBKAA@IA@EGCA@ABC@CCE@ACKEG@CCICKAOCI@GAIA@@AAEB@D@D@@GAIB@B@@A@A@A@A@AAA@AA@A@EAA@AGB@B@B@B@AG@ADAB@@AB@@ABA@A@AB@B@BBB@BN@EB@BFBB@A@A@CB@AIB@DBB@BAB@B@@BDBB@@ABAA@@A@A@ADA@A@A@A@ACAA@AAAE@BABA@CAAAA@CADGBBBAHDB@ACBAFAB@@A@AA@AA@A@C@A@AA@G@AADEFE@AAOA@@C@ABE@EAGACEECGAAEI@A"],["@@B@@AB@B@@AA@@ABAA@A@@BA@@B@B@B"],["@@FA@A@AACAACACA@DDB@D@BBD"],["@@BAA@@B"],["@@AAABAB@BBB@AB@B@BBBAB@BAB@@AA@A@AAA@AB"],["@@A@A@AAAB@BA@@BB@@B@BB@@BB@B@@B@BB@BA@AB@@AAAAA@ABAAA@B"],["@@ABABABBB@BFFD@B@D@B@@AB@@AAAGGA@A@AA"],["@@AA@CAAA@CAC@AB@B@BBJBDBBBBB@B@BA@ABA@G"],["@@ECIASBK@G@EAEGGIEEGCEBIBEFADAH@FBFFDBDBFBDDBH@H@F@BBBDABADAD@D@J@BBBD@DCFAD@FBHDBB@DA@CBCB@F@DBBD@D@BCBC@AD@B@BBB@B@DEDCDCD@F@B@BABEBCAG@EBGBGAGCC"]],"encodeOffsets":[[[123927,41852]],[[123893,41727]],[[123675,42210]],[[122693,41012]],[[123664,41442]],[[123669,41413]],[[123724,41503]],[[123518,41370]],[[123731,41462]]]}}],"UTF8Encoding":true});}));