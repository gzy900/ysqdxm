(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('衡阳轮廓', {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"衡阳"},"geometry":{"type":"Polygon","coordinates":["@@BBBDBBBB@BDFBBJ@DBBBDDBD@DBHDBD@FADBDDDDDDD@D@DAD@BBBBDBBB@D@H@F@D@DADADCB@D@BKB@BB@B@B@B@B@BBB@B@B@BBBB@D@B@BBBBBBBHHFBDBDADAFAFBF@B@HCFADBBBBBB@BDBDDF@D@F@DABCBAFBD@D@BCBCBEDAB@BABBDBBHD@B@BABC@E@ABAD@B@HAHADCDEBC@KDUFCDCD@BBDNDDD@D@D@B@BABADCFAH@F@FBDB@BDDFBBAH@DCFEDCDCD@BAD@F@BDFDFBDBB@B@B@BABCD@B@D@B@B@BBDBD@D@BBB@BBHBDBFFH@BB@@B@BBBBBDBBBBBBBFD@BA@@B@B@BBBDBB@@AB@B@@ABAB@@AA@AAB@B@BAB@B@@BD@FBB@B@@AB@B@B@B@BABBB@@B@B@B@BA@A@ABAAAAA@@B@B@BB@B@B@BBB@@BBBABA@@AA@@BAA@B@BBB@BBB@BB@BB@B@B@B@BBB@BBBB@BAB@@BBBBA@CB@B@ABBBBBDDBBBBBBBABA@AB@@AF@B@BB@BA@A@@BAB@B@B@B@B@BBB@B@B@BB@B@@AB@DBB@B@@AD@B@FCB@B@B@BBBBAB@BABAB@BBBBBB@B@B@BB@BBB@D@BBBBBD@B@B@HBDBDAD@DBDBBBDFBBDB@B@BCBC@CDADCDAF@D@H@BBDBBDBDBDBBDBDBBBBB@@BBDALAD@BCBADADCHCD@D@BBBB@B@BBDBBBBDAB@BA@CACCC@A@@DBDDDBBDDBB@DAD@DBBDBDBDAFANEDCDCBCBCBCBAB@D@HDBBB@@A@C@ABADCBA@ACAAC@ABABABADAD@D@DBD@BABEBA@CAAAC@A@A@ABAB@BABA@ABCB@FADA@AA@A@A@@G@ABC@ABAB@DADABADCBADBDBB@BBBBBB@F@BBBBBBBBB@D@BAB@BDD@B@B@DABBDBBJDFDBBBBDBD@B@DB@B@BBH@DED@DBBBDBBBADALGB@B@BB@B@DBBDBBBB@F@F@B@BBB@ABAB@DBFBBBBDBDD@BBD@DADADABADAB@BBBBDDDDDDDDB@BBDDDBBBBBB@BBDDBD@DAD@BBBB@BAB@DBBDBB@D@DAHADABBFFDDD@DBBAD@BAHEF@H@H@D@DAFCD@B@BB@BABBBB@BBD@F@DABA@CAECE@A@AD@FBNBB@DBB@J@H@FBH@HBF@BBD@BAB@JEF@DABAFAD@B@F@DABABADMBAB@D@BBJDHDDBB@BA@ABABBBB@B@BCF@B@BB@B@B@DAB@BB@DB@DD@BBB@D@B@BBBBB@BBBBBB@@B@BB@B@@ABC@ABAB@D@B@@A@AB@B@BA@EB@BB@AB@@ABAB@B@B@BB@BBB@B@B@D@BAB@D@BB@BBB@BBFBD@D@BBBB@B@BABAF@B@B@BABA@AB@BB@BB@B@BAFABAAABADAB@B@BBBB@B@BCBAB@DBBBB@B@DB@BADB@B@B@B@B@DAB@B@@D@BABCDADCBAD@DBBBBB@B@DBFBB@F@D@BBDB@B@D@DAB@BABD@FBD@B@B@BA@A@C@A@ABAB@DA@CBC@AB@BADBDBBBBDDDDDB@D@B@D@@DADAB@BBBFDFDFDBBB@DDBBD@DAB@BABABABCBCB@FAD@BBDBBBBB@D@B@D@DBDDBBBDBB@AD@FABBBBBDADAD@B@F@DBD@DDDBDFBF@DB@@BB@BBB@FCD@B@D@B@B@B@B@BA@ABAB@B@BBBAB@BC@ABAB@BBB@@BBDB@BBB@B@B@DABA@AA@BA@ABADABCDADABABAB@B@DBBBDDBBD@D@B@B@@ABA@AB@F@FBD@B@D@F@B@@ABA@A@AACACAC@A@EAAAE@AAAAAA@AACAAA@AA@AABA@C@CAA@C@AAABC@ADADADC@ABC@A@C@AB@B@FBDBD@B@D@DAFBF@D@HAFCDADAFCD@BCDCBABAD@DBBFDB@BB@BBD@FAF@DADAB@F@DBB@DDDDBBBABA@CBA@ADADAFCBAB@BABC@CBA@CBE@A@A@CAA@A@ADADADADABCDEBABCDABABAB@DBDDB@B@HCFA@CBE@A@CBA@C@C@CAAC@CAAA@ABADCBABAB@D@BBBBBBDBBBDB@AB@BABCBCD@D@F@F@D@B@@B@BADADABBB@DBBBFBDB@DBD@F@FADBD@D@F@FADAD@DABAB@B@BBBDDBBBD@D@F@D@D@D@HBFBBBD@FBF@DBD@FAHAH@FADAD@B@FLDHAL@J@L@JAF@FAP@LADBF@D@BFFHFDDRFXFHBVHJDNFHBL@NABADADA@E@ECS@IACCMBMNMPGN@NEBC@AACAAAA@AAA@ABA@CBCBCBCDCDADCB@BABABC@ABABAB@BADABABA@AAAACCAEAAAA@AAAA@CBA@C@ABC@CAA@A@C@AB@F@D@DADADADABCBABA@A@CAC@C@AAAAAAAA@A@BCBABABC@A@C@C@C@CBCBC@CBABABAD@BABABABAD@DAD@B@D@DABABABCBABCDA@ADABABA@AB@B@D@DA@ABA@AAA@AAAACA@@A@AD@BA@AA@CA@A@ABABCDCBCFEBCBA@A@AAAC@A@AABABADADAB@B@D@D@BCBABAD@DCDABABA@AB@AA@AC@@ADCBADCBC@ABA@A@A@CBA@AD@D@F@DBB@BBBBBD@FBDBFBF@FBFBD@DBBBBBFBDDFBFDDBFBDBBBBB@B@BABABA@ADAD@DCBABCDCBCDABABADAB@DAD@BBFBDBBDDBBDB@D@D@DAD@DAF@D@F@F@D@D@F@F@F@F@D@DBD@B@D@BABAD@D@FBDBD@DBD@B@D@BABCDEBCBADC@A@A@A@C@ABCDADADCBABC@ABABABABCBABABABABA@CBCBCBABEBCBABAB@@C@ABA@CBCBA@C@C@C@CAA@C@AAA@CA@@AC@ABA@C@E@C@ABABEBCBCBABA@A@AAACBC@C@CBA@C@AC@A@C@AAA@@C@AAA@AAAAAA@AAA@@A@A@C@C@A@C@AAA@AA@A@A@AD@BABABA@A@A@@A@A@A@AA@C@A@AACAEAAACA@AAAAACCA@A@A@EBA@EDCBADCBCBCBCBC@ABAAA@@A@A@A@A@A@AA@C@C@A@AAAAA@AAC@C@A@AAA@AA@AA@AAC@CAAAC@@AAC@ABA@ABCAA@AAAAC@A@A@A@C@AAC@C@A@CBAB@BAB@B@B@BA@ABCBCBEBCB@DAB@D@BABABCDABABABADAB@BABA@A@AAC@ABC@ADA@CBABA@AACBABA@ABAA@@AAAA@@ABAB@BA@A@A@C@AAE@CACBAB@B@HAJ@DBD@BBB@B@@E@A@ABABCBA@CAAAA@AA@@AB@@AB@D@B@D@B@B@D@BABABABAD@BBBAB@BA@C@A@A@AA@EAC@EAC@AAA@AC@A@CA@AAACA@@ABABAD@BABABA@A@ABCACAA@IACBACE@ECGBCFCBCAE@E@E@EB@JCJEBEBA@ADCDCBCDEH@F@FBDBH@H@H@F@D@FBJADC@AACAACE@EEACAGIECAAG@IACCACBCBE@E@CAAAEEACAAAA@CAG@CC@ADABE@EAGAECCEDA@A@G@CAACBEDEBCB@@G@A@ABCDELIFCHKFEDEBE@EBEFCFABEACAC@EACGECAE@CAEACAEA@CCAEBAFCDKDABADBB@DADE@GBGDCBA@C@CBA@@BBB@BBBCBECE@I@G@ECGAIACBE@MBC@G@ABABAFAFADGBC@E@CAA@@AAA@GAG@A@G@I@G@ADA@C@CACBEDCFABC@ECCEAIAC@GCCAG@EBGCGAEAC@E@C@E@EACCG@ACBAAC@A@CBA@C@C@CAA@EAEDGBCHAFBHBFABABE@EDGDAD@JBJ@D@BA@EACCAICCCACAEAEFCF@HAH@JCBCCEE@BEBADEDCJCFADCDABEB@@ADCDEDABEDAF@DBFBD@DBH@FADAAG@EBCDC@G@EBCBGBC@CAE@GACACACAEACCGAA@C@E@EDEBEBEBCAEACBEDCDC@GEA@C@G@G@AAC@EAECKA@@G@A@E@E@GACCECCAAAACCECECCECCAE@C@E@CDCBADADCDABCBEBCF@FADADABEDCFADABC@EBCD@DAF@F@F@FBFBFCDADEDADEDCDCDGDADIAG@GAC@EACCCE@CCEACBIDEAECGIKKEI@AFCFCDCFCFADAHEDEAIKIOOCCKIKCKBONEBC@EE@E@AAAAC@G@EAEAEBCBCDCDEDE@C@CGCCAAAA@CCAC@GBGDCFEDADADE@CEAACBEBEBCFEDEB@@AAC@AA@E@C@A@CAAACBCBCCCAEAC@GBCBCBGAAACCCCIGACBEDC@EAACEAC@EBEBAACE@EBCBAAAEACE@GBABC@EBGACACEACACCECCCCAAAE@C@EDC@E@CBCBEBC@C@AAAC@C@CBE@E@EAC@CBCDCDCAG@EACAEACAEDCDCDEBE@CAEAEACEEEAAAEBGDEDADC@CBC@EBCBEDEDCBECCCAAGBCBCBE@G@AACACBE@G@ABGAC@CAEA@AAABABABAAAAAECGECGAECAAAECAC@C@ABABA@CFCBGBE@C@ACCAGCAAKCGAG@E@EDMHC@A@E@EBA@ADAHGHEDEBABABIDC@E@E@AE@WAISMGEEBGDCDC@ABCDABEBAAECEAGEEAAB@FCBEBG@GAC@CAEBEBEBEDGCA@EAE@CDCDEBEAEAEBADBD@DBN@HAFALGJGDA@A@E@GCCIEGCACAGBBBADBF@FBD@DAHC@E@AACACIAAGIAGDEHABAN@DCFCCCA@@AB@@CEAEAA@A@@AAAAE@CBEAA@E@IAAA@G@E@IBCB@FADC@A@GCAC@EDGBG@ABAAA@ACCECIBC@AD@PAHCBEBCCACAEEIEAEACCEGCAC@ADAD@FCBABC@CAAC@C@CACCEGEICCAE@EACCABA@AB@D@B@B@D@DABABABA@@BA@A@CBA@AC@I@GAGCEAAGBEAEKCAKCOFGDA@@DBDBBDDH@JBHBTTDF@DCAA@A@ABADA@AA@AE@A@EBC@ABCAABA@AB@BA@C@A@ABA@AA@DAFEBADADAFCDCD@D@FBFBFBF@DAFAD@FABCF@DADAH@FADCDCBA@G@EDIHCHAJAB@JCHEFC@SBGAEAAC@G@GEKCGCGA@@CBE@C@CDEDC@CAE@C@C@E@CDGDEDC@ECCCAE@CDAD@DA@E@CAEECA@AECCCCEE@ADE@C@EACAE@E@EBG@AC@E@CACCCA@C@EAE@EACDAFCH@BDJAJAHABA@A@AAAAC@A@C@CAAA@AACCAC@CAC@ABCDAB@DAD@DBDDF@F@BADA@CFADCBCBC@C@E@CAE@C@CB@BC@CBCBC@CACAAACCA@CDABCDABCBE@CBC@@B@DAB@DC@A@CAECEAE@ABABE@AACCC@C@A@CBC@C@C@ABABABAB@F@BAD@FAFADCDABC@C@CCAAACAC@CAC@E@CCCECCCCCCCCCAC@CAE@GACAECCEAEBEDCBEBEDE@C@EAECCCACE@GBG@GCCA@EA@DIBCCEAEAGAECCAAEAA@CBCB@F@BA@AAACAAA@ADBJ@DABE@A@A@A@ECECCCECCCCCEAEAE@C@A@A@@C@G@AAAI@A@A@@F@BABA@@AA@AAACCACAEACAEA@AAB@B@BBB@B@D@D@HAB@B@B@BA@C@A@ADEF@BAJ@HAD@BA@AAAAA@GBC@@B@B@D@DBDBDDFBDCDC@CACAC@A@CBCBEBCDCDCBADAFCDADCDAD@D@BHDBBDDBDBD@D@F@D@B@BAFCD@DAD@F@D@DADBBBBDBBDBBBD@D@BBD@D@BBDAH@FBH@F@FBDBDADAD@D@BAD@FADBBBDBBDDDBBFDDBDBDBFBD@F@D@BBDBB@B@DADADCDCBC@CAAA@AACACAAC@ABABADABE@CAEACA@ECCCAAB@D@B@F@DAF@D@B@D@D@F@BBDBDBDBFBD@F@DAD@BCDCDC@EBEA@AAAAB@B@D@BA@EBABC@C@CCAAEA@BABAD@BABABAB@DDH@D@J@BAD@B@DDDBF@D@BA@ABEDA@EBA@ABAB@DBD@D@B@D@NAB@B@BBBB@DABCBADCDAD@BBBB@BCDAB@BBB@BBBCF@BAB@BB@BBB@B@B@@DABAD@B@DBDADCBC@EB@BBFEBAB@B@B@DBBDBDBD@D@D@B@DBBDDBDDBD@DB@ADCBCBA@ABBF@FABABC@CB@BBBDBDBBDBBDBD@D@DB@B@FABA@ABCDABA@@DAF@DBBDDD@D@F@D@BBBDDBBBDADABABCBABAB@BADCB@BAB@DABA@CACBCDC@HBFBFFFDFJHJFFBBBF@JAD@DAJBJDFFHL@B@DBL@L@FA@AFIHCFGDEDABKDKBEAGACAAAKEEAMIECAAIGMIAAIGACECACEECEA@CCECACA@CBC@C@AB@BBFBBBD@D@B@B@FBD@DCD@B@D@BFBBDFD@DBBB@D@FAB@BDBBADCDC@EDA@GB@BCD@BB@B@DBBBDFBDBBBADCBDB@DAB@FBBD@BA@@B@BDBFBBB@B@BCB@BBDBB@BADGBCB@BD@DDBDAFAFA@@BC@EDCBA@A@ABADE@K@E@EBEFBDAF@B@BD@BBBBBDAJ@D@BD@DBBBBDBF@B@DABCBC@ABABEDCBA@CAABEF@B@BA@A@EAC@@BABIDEFCBBD@FD@@BADEBCA@AABABADC@CBAAECAE@E@AA@C@ABA@CAACBK@CAAAAA@CFGBABEDCDEDKBGBE@C@KDKEECC@CBQHADCBEBCAAAGBAACAG@I@AAEBECCAEACAAA@A@A@CBABCBABADCDABABC@C@CDADDBBDBD@ACAABADAF@BABC@CAAACAGCKEICCCCCBCDEFEDAB@BAF@BAFABABA@AB@DAH@BAD@BA@GDG@EBCBEDCHADA@ABCDCDCBADAD@B@DBD@BADADCBABCDCDAD@B@D@F@FAFAD@BADAFADCDADADAF@DCFABADGDCB@BA@ABCDADADADADAFCFADADAB@DCD@D@D@DBD@D@D@D@BBDEBEBE@G@CBEBCDADAD@DCDABCBCDCD@BAB@DAFCB@BA@CD@BABA@CDCDAB@D@DADAFAB@BCDCDA@E@E@EAAACCCEACCCCACAA@A@EAE@C@C@E@ACCCACC@A@CDA@A@CBC@@DBD@B@BBBB@FB@DBD@F@D@FABA@A@E@A@E@IAGAEAAA@AAEAA@AAAAAEACAGAE@EAABCHA@ADGDCD@BBL@BADC@C@E@ABABCAAACCC@E@A@CBABABCBCBAB@DAD@BBD@B@B@DBDB@B@FDDBBD@BABA@CBA@@DFDBBADABC@A@ECEECGCAC@GBEDCD@BAHCDAB@BABCBA@ABEBC@AACCAACAE@C@AA@C@CDCAACAC@CBCBAACCCACACBGBCDC@ABEFEDC@A@CBAACAA@E@C@E@EACCAC@C@C@CAACEAA@E@CACAC@A@ABC@E@E@ABC@AC@CAC@AABADA@AAAC@C@CACCAC@CAACACBC@CBEBE@CAA@IGCAA@C@A@A@ADCB@BCBEBABC@@DADABI@EBC@ADAD@FAD@DEBA@C@CAS@I@CBAD@F@BAB@BBBEBADAB@FDFDHADABCB@DABADB@BBDBBBBBBDBDBFCB@B@D@DBD@DDDBBD@B@DBD@DDDD@FBF@HBFBBBBD@D@BAD@BAB@BB@BBFBBDBB@BB@BBD@BDBDD@B@BAFCDCFAD@D@BBBABADB@BB@B@D@BDBC@@BAB@DMDA@ABCB@BCDCDCB@BBBHFJJBFBD@BBFBF@FBFBBB@BBDBBDD@BBBA@CBCBADAD@DAB@DADAF@B@DDD@DABAFABCBAD@D@FBDBDBDDBDDDDBDABAB@BBBBB@H@DA@BAD@BBDBDDFBDBHFL@B@BGFCFBBBDABAB@BA@ADAB@B@BDD@BBBBBD@DBD@BDBH@BDD@BADAB@BB@BBDBBB@BAB@B@BB@@BB@B@B@BBD@BA@BBAB@B@BBB@B@B@D@D@B@DABAB@@BBFBB@BB@BBB@BBB@B@BBB@@B@B@BBB@DBB@BB@B@B@B@BBBBBBB@B@B@DBB@@BBB@B@BB@BBBBBB@BBBB@BBBB@B@B@BBBBBB@@BBBAFB@@AB@@ABAB@B@@AB@B@BABA@AB@FA@ABAB@B@B@B@BBBAB@@ABAB@BBB@D@F@BBBBB@B@B@@AAAEAAA@A@AB@FBB@D@B@B@BABBB@BBB@B@B@B@B@DA@AB@@CBCDM@AB@BAB@D@BAB@BCBABAD@D@FAB@BABCJ@D@BABABAD@BDBB@D@DCF@B@B@BBBD@F@DABABCJKBA@ACEACAEACAE@A@AB@D@D@BADEB@D@BBDABAJEJGB@B@DBFBDBH@FADAD@BBHDDBB@BA@CBABAD@DABC@CAE@C@ABABBB@DDB@@A@ABANCDCB@DEDCB@@A@C@AAACCAEBABEBABGBI@GAG@EBG@C@AAC@ABE@A@C@A@E@AAC@AAAB@BEFCB@BAD@DBBBBDDFFDBDDBB@DBD@FAB@BBDDBB@BBFDH@BDHBBB@FBJBB@DAB@DBFBB@BADADADCD@B@BBHBBBBBBHD@BBD@JAD@BABA@A@C@ABA@CCA@ACAAACA@AACF@D@JBFBDBD@BAB@B@D@B@"],"encodeOffsets":[[114690,27591]]}}],"UTF8Encoding":true});}));