(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('株洲轮廓', {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"株洲"},"geometry":{"type":"Polygon","coordinates":["@@A@@AB@BBB@B@@BAB@D@DBD@DBHBBBBBDBCHK@A@A@AC@@ABCDCAAAAA@@A@AB@B@DA@ABC@CACAC@EAA@ABABADCBADABABA@A@A@ACAACCA@AAAAC@A@C@C@CBC@AAA@AAAA@ABCBABA@A@AAAAACAC@A@ABADCFEDCBCDE@ABA@A@A@A@A@CB@@A@ABAB@BBD@B@D@B@D@DADABABA@ABA@ABA@A@AA@C@C@C@ABA@CAA@C@C@AAA@A@@A@ABABAD@B@BABABCBC@C@ABC@A@CAEBC@C@CAAACAAAAAAACAE@CAA@C@C@A@AB@D@B@FBFBB@F@B@B@BBAD@DAD@D@DABBBB@F@D@B@BBB@D@BA@A@C@C@C@A@AB@DAFAFAD@B@D@DADAFADCDCFADAD@B@B@D@DBD@BBB@D@DADCFCFCFCBAB@BAB@B@DDFBBBF@DBH@F@FBB@D@FBHAD@HAD@B@BBB@B@FBB@DBFBDB@BBBBB@DAD@DBB@DBF@DAF@F@B@DAB@D@BBDB@@BDBDBBBBBDHD@F@F@FAH@FAD@D@F@D@D@DBDBBBDB@DAD@B@D@B@DBFBDBDB@BDDBHDDBDBF@@BD@BBDBBB@BBD@D@DBDBBDBDBB@F@F@HAB@B@F@F@DBFBD@DBD@D@DBBFDD@D@FAF@B@D@BBBB@D@DAD@D@DBFBDBDBD@F@FAD@D@D@FBB@B@FBDBD@B@DAFABABC@ABCBC@C@A@C@C@C@C@ABC@AAAA@A@AAC@@AA@@A@C@AAAAA@C@A@CBC@ABCBABA@A@A@AAAAC@A@A@ABEBCBCBEBABABAB@DAFADCDABAB@BAB@BB@BBFBFBFBB@F@BCF@B@BBBB@HBB@BAD@BAB@DCDCDADADADCDAFCDAF@DADADA@ABCBABCBABADABABABA@A@C@ABAB@DADAD@B@B@B@@D@DBBBBBBB@BBB@DADCFCDCFCF@FAFAF@DADADADAF@DAD@BBDBDDBBBBDBD@BBB@DDDBBBDBBBBB@BB@DBDAH@BAB@@CAC@AACAA@ABCBA@ABABCBAD@D@DBBAFCBAFAF@B@BAB@HEDEBCDI@EDE@CFS@ABMBOAQEMACECQKAASQA@IIGCMOEEEEIIGIIEEE@AEGBE@ABKCKCG@CIIECEEMKGECAGIGQEOEKIKAACCMKMIAAMGCAQIGGAAEGIO@GCOBSAECM@EAIACEMGOAEAAMQKUAA@O@ABIHMBAFCLCJABADCD@FAD@DAB@FBFHDFBDBDB@@BB@B@@AAIBABAB@B@B@@ABG@A@AECACAC@AACBAFEB@@CA@CCA@CAAACGACGG@A@A@A@CBCEACAK@AAAAAAACCAE@CAA@AAB@@CBCFIFOB@AC@IAO@C@G@A@A@AB@DE@C@ABABADADAB@F@FBF@H@DAB@DABA@C@CACA@AAB@DAJABA@AACAAAAC@C@GACAAAOIIGCCAAAG@IBKBKHK@AHI@ADGBCDCHAJAHDHDHDDBL@ZEJGHILINCH@H@N@LBJDJDFDLHDHDDBBJBH@FCLAFDBBBBHHHDDBPFD@HBJATBDDFBNBHBJBNBJCFAHAH@DBBBFDJFLDBBNDPDLFHDHDDADCAOAM@GAI@MAIAECMEKGOACCIEIAEAC@C@EFGJ@LCFEBGAICGKIGMESAIAIAOAMEMAECEOOKMGICCCE@AEGGQGSKOOOEEKIGIEC@AKKEIAG@CACAG@G@K@ECK@KBADGJGFAB@J@JFFHFFFFB@JADODQBUBSDQBKBCBEDGFCJ@JAJ@JCDGBI@IDCD@D@B@D@JBH@FCFOBI@KBOFEBADADCJIHIDIDGLAD@RCD@JCF@FB@C@C@CDCDCDCACACCACAACCCAAECGCECGGCCBI@CCC@CDE@CACCACEAGCAA@ECAC@G@CBE@EACCCDGBA@A@CBCAE@ADG@A@AA@K@C@CAE@C@GG@CAAACCACCACACEGACACCE@GAEEC[[CACCCCACBC@A@CBEFEBCDCHABKBEBCBEDCBCBCAEAEBCBCBC@CAEAC@EBE@EBABABGAEAC@GBCBE@E@E@CBC@CBCFEBK@C@E@E@CAEACBE@G@E@IAG@CDGDGDCBCHBDBDBDBDADABGBGBI@EBEDCD@FADAHADCBCBCBGBEFELCF@DBB@FBF@FAB@BAD@HAH@F@HBF@D@F@DBDBFDDBDCF@F@DCBCFBBDD@DAH@D@D@B@DBD@F@DCDCJEFCDEFCF@DCACACAC@EDEFAHAJ@HAHCFCDABALBL@B@L@HCJEF@BBF@DCDDHBH@FAHBHAFAHBDA@A@A@AB@@A@CACAC@C@CACCECCCCACAACC@A@EBC@AACAAACAAACAAACACCCAABC@ECGAG@G@GCKCEAECCCCCCC@@ABC@C@C@ABAB@BBD@D@B@DAFAB@DBBBBBB@BAHFDBH@LAD@@EOMGIAA@C@CACCCCCCC@CACBE@EACCEAABCBCBAACAA@C@A@C@AACAA@ABADABCAC@E@C@AA@ACACECCBE@ACCBAFCDG@GCACCCACAAACGECECCC@E@CAAC@CCECECEC@GA@C@CBEDCBCDADABC@CAEAEBABG@GDCHEDC@ACEGCAACCCEAEBEBE@EBEDAB@@CAAEAAAECEEGEACAC@CCCACAE@EBEBGBGDCBADEB@EAECEAECA@@AC@C@CAECEAEGGCCAC@EAEAECACCAEEAABEBE@EAECCECCACCBC@CBC@I@EEGECCAGCE@CAE@CCCACEAEAEAECCEAGA@AA@IGK@K@CA@KCMECEEKKCECKEGECIEICMEMESEAAEIGGCCCKAGCCSKIEKEEAG@G@EFAFCJCLEFGBGBGAAAIGIKAKDMBM@EACAECCEEGEGGMKUMMCGBEBGDGFEHEJGHKFEDADADAHAB@BINKPCFAJDJFNBJ@BBJ@FFFFBBBDBJFRFJHDDFPDJ@BB@DNBLBP@TCRENEJAF@NAHAFEHIFKFKHA@MHQHQDIHCFCFEFEFGDGJCHA@CBCAGCEAEBGBABEB[JGBGD@LBBBFBJ@BAB@F@FBHAFEHMFINCDAFAH@NAN@DEFAH@HAFEJ@BGFCDAD@D@FDL@FADAHBFDDHHFDDBBDNNLNBDBJ@JERENADABGHEHCDGJ@F@DDDDBHFCJBJDHBDJbIFCDC@E@EAA@@D@BFH@B@DG@IAECG@EBCFADAJCHEJ@DADADELAPDLDHBJ@BADKTABGFMFEBSDA@CBI@OAMCQGIGGQA@EIECMIAAECMCGBCBEBG@EAE@EAEAE@MAGBA@ABCHAFEPADGP@BCDGDGFGBGHAHDHBBJBFBFDBF@B@B@LDFBFBBDD@B@B@FANCJABEFGJMF@BCFBJGFAFCDABIPGNCH@FBDFFRDNFDHDDBHFHBFHNHRBFBFHTDHDLBLEDGDABGFEFADELAFGLGDMLOMCAWBQDGDQDMFABEBCBK@KC@AKGKMGO@ACKEOEGGCE@C@KDIBKN@FBFHDFH@L@HABIJABEFADAD@JBDJHBDABC@MAE@GBA@EBEBEDAF@FAFCFEFGLEDKJCFAD@B@B@HA@ADCFAFBDDBH@B@B@FCDDBFBH@FAFCB@BDDH@DBB@BBDBFBBFBB@D@FAFADBDDDJBH@BBFDHJDBFB@FDFBBBD@BCDIBEAC@E@G@G@G@CAEAE@G@CFADCDCD@BABAFIFIDA@@F@F@FBFADEDADDH@FDFABBD@JBBBDAD@B@BABABABC@ABAB@BB@BDBBB@@D@BBDB@BBD@FBD@FBB@@B@B@B@DABA@ABAAC@ABABABABC@A@A@C@A@C@A@@BA@@BB@@BBBBB@DABADAB@B@B@FA@A@AAC@CAI@GBA@A@ABBD@DBF@B@D@B@BABA@AB@BB@BB@BB@AB@BABABBD@BABAB@DCB@BAD@BBD@B@BABABA@CBABABABCBADABABC@A@CBA@ADAFADAD@BABA@A@A@ABA@AB@D@B@DBD@B@D@B@B@BBDBB@BBBAD@BAB@BBD@BD@BBDBD@BBB@@BBBB@BBB@D@D@BBB@BBBBB@D@D@B@@B@B@B@B@B@BB@BBBAD@DADADADABCDAFCB@FAB@B@B@DDBBBB@BDBBBFBDBBBB@D@B@@B@B@B@BB@B@B@BABA@ABCB@B@B@@BBB@B@D@B@D@D@B@BB@BBB@BBBB@BBB@B@DB@BBD@B@D@@B@DAB@D@DADBDBBB@B@BADADAFABABAD@F@D@B@BAD@@BB@@DBB@B@DBB@D@D@D@DABAD@DAB@B@DA@ABABADAFABADAD@DABABABABABADABABAB@BADABCDCBCBAD@B@D@B@B@BCDABADCFADABC@A@C@CAC@CAEAC@C@ABABC@A@C@CAC@E@E@E@E@C@C@E@E@C@E@CBC@CBC@C@A@ACCAACCAEAAAC@CBA@CBABABCBADCDADABCDC@CB@BABABABA@A@AAAAACAECCAECEACAEAAAA@CACAE@EAEAEAC@EACAAAAA@CAE@C@C@@BAB@D@B@BAB@BADCDABCD@BD@@BBBA@@BABABCBCDC@ABABADC@C@A@A@CBCBABABBBB@D@BB@B@BABADEFADCDADAB@B@BDBB@@BABC@@B@BB@BDBB@BBB@BAB@BCBC@A@A@@BABABCB@BCBADABADABABCBC@A@C@CBC@ABABABABC@ABABAB@DADAD@D@D@D@D@BADABABADB@B@BBBBBB@B@DBD@D@BABABADCBCBCBCBC@E@A@@B@D@BBB@DAD@B@DAB@DBBBBB@BBFBDBBDBB@BABABCBABA@ABAB@BADABABA@CDCBCDADADAD@DAB@BBB@BBBBBBD@BADMFM@OHMNANDNBD@JDT@F@FCBCB@B@D@BADABABA@A@CBAD@DAB@J@J@B@FBDAB@BABEAAAEACBA@ABAB@BBBCBABA@@BBBBB@FBBFFHDBBDBBBBB@BBD@DBF@BKFK@GHEL@BFLFPBN@B@B@B@NANCLCNBH@D@BDDLJBB@BDAB@B@D@BBBBBBDFBDB@HBBBDD@DBB@BBDBBD@BBB@BD@B@B@BABABCBEBCBAB@D@D@B@DAB@B@B@B@BBBDBDBDBB@B@BAFEDCJEDAD@B@B@BBDH@BB@BBD@D@BBD@HBDB@D@B@FABABAD@BCDEDCBCDABA@ABA@AD@BDH@BDBB@BBD@@B@BABADABCBABCBG@C@C@IGA@CAAAAAAAA@C@A@@BA@@BBDAB@BCDABADABABAD@B@HBD@B@BBBBBB@DDBBBBBBB@DBD@BBDDBDDDBDBBBDBB@BHHDJFJD@B@B@B@HAFBD@D@FBF@BAB@B@B@DHFFBFDL@BA@ABA@@BEFQLMDABIBEDAHBBBFFHBHBFAPELADEJENABIJA@C@A@AAAAA@A@CDCBABC@ABAD@D@JBDBDBBDDDDFJBBDDJHBBNJB@FFFDJHDDHBD@AF@BEJ@B@F@D@BA@CBAB@D@B@BBBBDDDHF@BBNBD@LJP@BHJDHB@BDBJBJ@FDNHRPJFFDAB@BBBBBBBBBA@CDADEDCDCDCDABADABAD@D@B@B@BCBCBA@ABCDADCBABA@A@ABABCDABAB@B@DAB@B@B@B@B@FBB@@BBD@D@B@D@DBB@BBB@B@BCBC@ABA@ADBD@DABCB@B@B@BBBBBD@D@BBBBBBADADAB@BB@BBD@FBH@BBDDBFBDBDBBB@DBBBBB@DABADC@ABAB@DAB@DABABA@@DBBBD@D@BABAB@DBBB@FBFBBBBBB@BB@B@BB@B@@AB@@AA@@A@AB@BAB@B@B@BB@B@B@BB@B@@BABGFAB@B@B@BBDBBBBBBDBD@DBD@B@BA@ABAB@H@F@DAB@BAF@FBB@BBF@HAD@B@BBFN@HBBBB@ABCDCBABADBD@FBB@@CBE@AF@BAH@D@DA@ABABAB@BBBBDHBBBBBDB@@BB@FAB@BE@A@A@ABABBBB@AB@@EAGAC@C@A@E@C@AAA"],"encodeOffsets":[[115976,28667]]}}],"UTF8Encoding":true});}));