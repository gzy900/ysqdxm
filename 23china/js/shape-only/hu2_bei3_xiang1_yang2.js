(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('襄阳轮廓', {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"襄阳"},"geometry":{"type":"MultiPolygon","coordinates":[["@@FBBBBBHHD@BDBBFBB@DBBBBBDDDHB@BBD@B@HDBBDAB@FABAD@DBDBDBB@BA@C@CBCBCBCBABA@A@A@AAE@A@A@AAAAE@CAC@ABCBABAB@B@DA@AB@BADAF@D@B@B@B@DA@A@EACA@AAAAAA@AAC@ADADCB@D@H@D@@AD@BABADALIHKLEFCHAF@FD@DB@D@BABC@EDEBCBABAF@BABABA@ADCBABALEBADAB@B@DBBBBDBB@BBBB@@BCBABABA@@AAAC@EAA@AAA@A@@B@B@BHBBBBBA@@DA@@B@BBBBBB@B@ACAC@ADB@AB@@BB@@BB@B@@BA@A@@B@BBBBB@B@BABABA@A@AAA@@DA@CCA@A@CBCBAB@DC@@B@BB@B@@BBBB@B@@BBBB@B@B@B@BABAB@B@BBB@B@AA@AB@B@BBB@BDBAB@FA@A@A@AB@B@B@@A@E@CA@@A@ABAB@DBB@B@@A@AAA@AB@B@@ABA@AAAA@A@A@@A@AAAC@@A@A@ADBD@B@B@D@BBFBDBD@BBF@B@BBLBJBB@DAB@BAD@BAB@DABAB@D@BAB@D@BAB@D@B@BA@A@C@ABABEBAFCB@DAB@DABABAJAD@BABABA@ABA@ABA@A@ABABAB@B@B@B@B@B@BAB@BA@AB@B@B@@AB@@A@AB@B@B@B@B@BAB@BABAB@B@DAB@BABAD@BABABA@AB@@ABABAB@DADA@AB@@CBAD@BAD@BADADCB@BAB@B@BAB@BBB@@BB@BABADEBABADAB@B@BBA@@D@D@F@B@BBD@DBD@BBDDBBDDBBD@BB@BBDBD@B@D@D@DBB@B@DDBDDDBBBHBHB@@BB@FBJBB@D@D@LCFAD@BAD@B@B@@DBD@BBFHAHALCDAJCDABABCBCBA@ABADAHCD@HCFAFALGFAHAD@B@@BCDCDCF@D@FBDFDB@NNFDD@F@HBDBDBBFBFBDBBDBB@D@DAFEFCDAB@D@B@DFB@DBHDD@D@F@FBHBDBD@FCBAFCBAB@LJDDDHFHBD@DABABAB@BBDDDB@B@B@DANGDA@ABBFBDCNEBABCDAB@D@D@LATAJAT@D@PGBATCHEJGLIB@LCDBN@V@B@HAFABC@EBAJCFAH@HAHEH@LAF@@BFJFHPFDBJB@EDK@CAGBALCHEFCD@HAFAD@H@JDFDDDAFFJBDJAHHNJDBVLVFLD^HPJFBJHTJNBFBLADGA[BCBCD@PBNLBBLLJBHBXAD@DA^AH@D@N@LEJOJKLCB@NDHBHL@L@BADAL@BAF@FLVLLXBHBD@BBHDBDBBBBB@B@B@DAFCDAPAH@FELM@CFGLE\\OF@LFVDH@L@BCFIFWHICGEEEGC@A@sJYEKGEC@ABKDSDCDGLGLEXS@IBEEQIKMQACQOWGGAG@O@QAGEEKHWJUDQ@U@QBQAOGO@AEMAACUAY@SHMNKJGPKBU@E@A@AEGICOSSSGIQS@AIGGEOKIM@U@ABA@G@E@A@CB@@KA]@I@A@GBG@O@K@CLCL@NANAFCNEJCDGBG@AAGECE@IACDI@EBCC@ACG@CAGAACBEDCCAE@IAI@IAG@GCECICECCCEGAGCCBG@CAE@EACCCECEBG@IFIDKDIDIHEDGDGBGEGCEGIGCECE@CBGBCBCBGJCDEBE@G@EBMIGICEEEGGKGGEAKGIGIECKACDGHGDMDMAGCGEEKIOGMGMISEGACACICKAG@I@I@IAGEEECG@CCAECGBOHGFSDGBI@CCCC@IDK@EBCBG@KAECGEEECIEGECKAI@I@A@E@EAIAGBIBCBCBKBK@EAG@AAECGBKBGDIHGJAFEHAFC@IEM@IAKCOAK@IBECICECCC@E@KBI@K@GAGCEAGGAEAE@ADIFCHKFKBCFI@ABCDCFEBG@MAICGCEAMCCCEC@GB@BKFA@ABGHEDCDIJMDEBGBKBIFGBGHEBG@EAGCCEE@G@GFILEHGFGHQTIPEJIDEDEDGDIDGFGFEDGBGBW@OCEAGAIAKDE@GBE@A@GCEEGEECEAGKEEGGEEGAE@KASGUIIGGEGKKGKEICA@G@IBC@KBQDEBGDSJUFIBEAEAIAEAC@IHOJKJMDK@G@SFILMJGDGDECGCIAK@IAOCICGEGECECEE@G@MDKFKDEAEECGCGEEEGAGAKDKBOAK@MAQGBIJGBMFS@IACAGCEECA@AAECAAAGEABGAK@CAC@ABC@C@EBC@EBEAIGGCC@EAAAG@CDA@E@A@EAEBEAACBC@AEC@ABEBC@ACEGABCACCCCCAAEBCDCDIHEFCBIBE@C@AAEMAACAEBC@CBA@ABCFCDGDGHEBGDC@C@E@CACCGECCAAC@C@ABABEBA@A@CACC@AA@C@M@E@AAA@ACAEAACKCAAC@ABE@AAC@KAACK@EBG@C@CCKEKCQAA@CACBCJABABA@CAAIC@ABCDC@AEG@C@EAGCK@ABECCECE@C@IBE@@A@C@AB@BCFCDCDCBAB@@AB@BC@C@GCE@A@AAC@CBAFAH@FADEDKDI@G@GCGEGACAECCCCGAE@C@EFEDM@EAIGGCCACCCEEEEKCAAEAACACBGDE@A@ICA@A@A@@AAA@E@AA@A@A@@F@DABABA@C@A@A@@EBCAAAAA@EFABA@A@C@G@CBCBEBGJGJCDEDEDEDE@E@KDCDGB@B@BADCDABAD@BADADEDCFE@CGEECACBEHCNCFCBGCE@A@A@CBEDCHEHCFEFEF@F@DBDHFHDDFBFBDBBDBD@@FEBIBG@A@CF@BDFFDFHDFCJCDA@CBAFADBHBDDH@DMDKEMEOEQ@GAI@KAKCMCIAMAKBI@IDGFIDQJSLA@A@A@C@CEEGCIKIKKIKGGGCCAICIEOGGGKEQCIEAAOECCEAOGSGM@I@EBE@SDQBE@S@EBM@ODMBOFEJCFBPBJ@D@DABCNAJ@JBHBFCD@BGBC@EBEAC@EBABABCBC@CCACECCAA@C@ICCAC@CBA@KAGAIGKICCC@G@IAC@EBCBCBIBCBCBGBEBGBCFEFA@ABC@ABAD@BAB@B@DBDBD@B@DABA@G@C@CBCBCDABC@MBI@E@EAIBCBEFIR@JBH@DCBCFAHBDBBJDDBFLBLBFAHCHADCDEDEFIBMDSFMFEBKBI@EAC@ECAAAAACCCAGAEEKCEEAC@C@CBABADCBCBCDEBCA@CAACAC@ABAFCF@BCBCBA@A@CCCCEGACAACAEAGCECAAA@CBCAA@ABA@CDABCBE@C@AACAAACCGECAACACCGAA@EAEAACAA@C@IHC@E@C@C@CB@BBDDD@BBBAFCFCBABEDA@GJCDA@C@C@EEGAE@CBGDE@ABCBADA@EFIPAFAF@DDL@P@JDHLPHHNHFF@DADCBCBAFAF@P@BCDKDCBCDIHED@B@DDBJFHFBD@F@DAJAJABEBC@KAEAGBE@IAM@I@ABABCDCBA@EAA@EACAC@QFIBKAICKAO@C@CB@B@D@DAPABEJAJ@D@BDLHHDFPTDFDHDFDF@BDFBDBBBFF@D@D@DBB@BBB@BB@BABCFAFABC@EDC@EBCBA@IJABC@G@@BA@ABCDABABA@EBAAA@AAC@CCAACAE@C@CAA@IAMAE@A@CBAFAD@D@DCBIBCBABCBCBABAD@B@BADABAFAD@BA@@BABAB@BABAB@BCD@BAD@D@B@DADAB@BBB@B@B@B@BA@A@@DA@A@ABA@@B@BADBB@BD@BB@B@B@B@BBB@BABBBAB@B@BADCDAB@DCHILIJMP@BCD@BGJMPIHGBK@MAO@IFGHADEDCFMREHOLADAB@D@FADAFADEBCBCBED@F@BBDFDFBD@N@B@DBBDDD@BCPCF@F@BFBH@H@F@FCD@@AFGDCBCBAB@BBDBDBD@BBDAD@HCB@D@BBD@B@B@DCBAB@B@LBB@@AB@DCBAB@B@J@F@NDL@DBB@BB@B@BGHCF@DBDBBB@BABADADED@D@BB@B@BABABGDADABBBBBFDJBH@F@D@BABABCBCDCBAFCFCFAJAFADA@D@D@BCD@B@DDBH@PFFBFDHDB@B@B@BAHGBALAB@BA@C@IBCBCBADCDAFADABCDA@CBCF@DBBDDDHHHDFDDDBBBDB@DBB@BABADEBA@A@A@A@A@E@CACAAA@GCC@@A@ADCBA@ACI@CBGFEDEB@B@DBBBBBJBFBFDBBB@BB@B@BABC@AB@BFDD@D@B@BBBD@D@D@DADADCBABCDADCD@FBH@Z@BCDAB@BAD@BA@A@EBABA@@CA@A@CF@F@DABA@@B@BB@B@B@FHDDLHDDCDCH@BE@CBABA@ABBBBD@BBH@D@DDL@FBBB@D@BBDD@BADAFCDABAD@DABBDABAJAB@BB@D@DAD@B@BBBB@B@BA@EDA@AD@H@BA@EFCBABABABC@ABEDCB@BBDFJB@BBBBB@D@D@BB@BABAD@D@HB@BBD@DBHDB@FBN@JAH@DBJAJGBC@ADCBGBE@ODIBCNMDG@ADS@A@ABBDHBBDBD@B@BADCBABADA@AHGFKBAHEBCB@B@B@B@DBFDDDB@@B@DABCDERCBABABE@KFADAB@D@BBJB@BBD@@B@B@BA@ADAHABCFC@C@CBABA@A@EEAAAC@C@AAAC@AA@A@A@A@AA@A@@BABCBABC@@B@BBBBB@BABEAABB@DD@B@BAF@BBF@DB@BDFFDBD@FCB@BBBD@FBFD@F@BB@DBHBDABIAGFCB@DBD@RBFDBHDFJBD@DBHBB@FABADEBK@KAKEECC@@FDNFLFNHHJBDDHJBBB@BCBGHCFADEFBBBDDBBDDHFDDD@DBJBDBDDDJBBD@DAD@BA@BBBDDDDFF@DB@@BDBDBFBBBD@B@D@B@FAHEBAXF\\NLHTJHFLFNJFFDFBBDHPNFL@BBDBBBDHNFHDHDFLXF^ABAHABCFAB@BADADABCBCBIBABAB@BAD@D@F@F@D@D@FBF@DFF@BBBAB@BE@A@CBC@AACAAAAAA@A@A@C@ADABEDCBA@C@ABABABBB@BLHDFFDFDDBHFBBDDDFBB@BABEDCBA@@D@B@B@BB@BBBB@DFTRNTRXNTHD@PDVBPFLHJRBJBHFFLNHHJBDBPBVJPJLDDBJHFLFJGHBDHFLANIJGLGDGP@D@NFVRLFTDTBLHNLJJHHFD@B@BCFCD@B@B@FADABCBEDA@@D@B@BB@B@F@D@@AB@BBB@DFDDBBBBBBD@DABADAB@D@@BDDDD@BBBBB@B@BBDBDBBB@D@B@@DBBDAHBJHDBNMNRF`BDFHDDFF@BBDBBDFB@@DB@@BAD@FBBHHFFFDNPJNDFDHFL@T@B@FCJHFDDPHNJFHHHPTDBNFNHNADM@ACQBKHKRFHLJHNDJCXGJCD@PGFCR@HAHCDAPMRKFKDCFINIFEJCJERCLGFCDAFE\\SPEDAFCHAFCFAT@N@NBJBPGDE@ABCHIHQRKRERBB@`FNFFDNFTDN@B@BADA@ABADAB@BA@EBA@ABAB@BABE@ABCHG@CBA@ABEBE@CBABAB@BA@C@IBADAJAB@PCDA@A@AAACAAAA@@A@AB@B@AADA@AHBB@DBB@D@B@B@BABCBC@CB@BCB@@BB@B@DAD@","@@EHCFABAFCBC@C@A@AAACAAAC@AAAAAEAC@A@A@A@ABABCFABCDEHA@A@AACCAECECA@AAA@AAAAA@A@A@E@C@ACGMECAACACAEBKAAGA@ABCBAB@F@DBDBFAFBDHBDAFBBB@FAF@FBVP@BGJ@BDB@BD@FBF@D@DBF@L@B@B@D@DBBBBDB@BB","@@KACABCBCDAJ@D@@BBB@BED@DA@"],["@@@BBBB@@ACA"],["@@BB@DBBBBBAD@BAFEFC@ABAA@AACACAA@AAECEEA@AAC@ABA@ABA@@B@BBDDFBBFDBD"],["@@ABAD@BC@ABEDEB@BAB@BBBBABAB@B@B@D@H@D@F@B@BBBBB@BABA@A@A@A@AAA@AA@A@AA@A@C@C@C@A@A@E@A@AA@A@A@A@AB@DAB@BBDABAB@D"]],"encodeOffsets":[[[114703,33230],[113819,32805],[115437,33140]],[[114865,33185]],[[113713,32189]],[[113650,32698]]]}}],"UTF8Encoding":true});}));