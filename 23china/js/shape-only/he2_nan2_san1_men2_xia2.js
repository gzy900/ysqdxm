(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('三门峡轮廓', {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"三门峡"},"geometry":{"type":"MultiPolygon","coordinates":[["@@NTLLNLJDH@HCDCJIFCDCF@D@L@HBH@JALAFABCFEDEDCFAJ@B@H@HDBBDBDFBHBDBDFLDHDFBBFDFBF@NERIJGJCFADBFBPJHDBBHBJDH@FBLFJHJHDBD@B@D@B@DADABCDEDCFAFAD@DAD@H@B@BAF@DAD@DAH@DAB@BAB@@BB@BAD@B@B@DBB@DBB@DBBBDFDBBBBBDBBBDBB@D@B@B@B@BABBF@DBDBB@B@BBBB@BBBFHBBB@DAB@D@F@FADAHCDCFEFCB@D@B@B@LAJ@HBFDD@F@F@B@D@FBD@BDHH@DBB@BD@BBB@B@D@BBBBBBJHBBDBDBB@D@FBD@LDF@H@LAFADA@A@CDCDAB@DABAFBB@DDDDLFBBDD@B@B@BD@DDDHBLBF@F@DBBABBH@DDDBBJFFBBBDBB@FBFAFBBBBBBHBBDNBDAB@H@D@BDBB@DAB@BBDJBDBBDD@BDBDBFFBDBBDDDBLBB@BAJ@D@D@DBLHJDBBBBDBBBBBAD@BABAB@BCH@B@LADADADCDADCBA@ABCDAB@B@DBBBBDBB@HBP@D@B@B@B@B@BBFFDFDFD@H@D@D@B@DDBBB@DDDBB@B@DAB@NBHADBH@B@D@D@B@@BBB@B@D@B@BFFFDD@LBLAD@FAB@D@@BDBDBB@BDBB@BB@@B@D@D@BBBDBD@B@B@BALCD@B@B@B@DBD@B@DBDDFDBDBDBFBHBF@D@DAF@D@D@BAD@B@B@BBBDDFDFBLBH@TDB@H@FBTBDBF@B@DDB@HADAB@FAFCFAFAB@B@DBHFFFFDB@DBD@B@BARKFABAB@BBFBDFDDBDDFDBB@D@H@FAF@R@HAHAHAFCDCDCFGBAAAAAAC@AA@A@@B@D@BABE@A@EAA@@A@AAAA@A@@AA@@AB@B@B@AC@AAA@A@AAI@GA@AA@CAAAAA@ABC@A@A@A@ACAAA@A@EAE@A@@AFA@AA@CAA@@A@A@A@AB@B@H@BABCBAB@FCB@@A@ADE@AB@F@BAB@BABAFEBABAB@F@B@DA@AB@@AB@BABADBBAB@BABAB@BAB@BA@AB@B@@AB@B@@AC@C@CAAABA@AEGB@BAB@@AAAC@A@ABA@@BAD@BBB@B@DBB@BA@AA@A@EA@@AAIA@C@A@@AA@@AA@AAE@A@A@@AAAA@AAA@A@A@C@C@CBEADA@AA@G@A@A@@ABA@AB@B@BBB@B@B@B@B@B@B@B@@AB@DDB@BA@A@AB@B@@AB@@AB@@A@AB@@AB@BBD@B@BBBBB@@A@AA@@AB@DBB@@A@A@A@A@AB@B@DBF@B@BD@A@A@A@AAA@A@A@A@A@ABA@A@ADAB@@AA@C@A@AAA@@A@AAAA@A@ADA@@A@A@AEA@BA@A@ACA@C@A@A@ABA@@A@AA@ABAABA@AA@CAA@GAC@C@CBCBC@C@C@A@EAA@ACA@ACAE@AAA@A@AAAA@AA@AAACAC@AAAAC@EACAA@@B@BA@AB@AA@A@@AA@AAA@A@@BAA@AA@A@@A@AA@EAC@@AA@@AAAA@A@AAAAACCA@A@A@A@A@AA@ACA@@AC@AA@ABABAB@DAB@@A@AAA@CCA@A@AB@@AB@AABAB@@BB@B@B@B@BADADAB@FAB@BCDC@AB@@AB@BBB@B@D@B@BAH@F@BBB@B@FCBABABABADA@ADA@ADAB@DADCB@B@B@BA@ABA@ADABAB@BABA@AB@BA@ABA@A@A@CACAAACAA@AB@BADBB@JBFBB@DBD@BBB@DBB@BABBFBB@FDFBB@D@J@BAB@@ABA@AAA@ACCAAA@CACAAA@A@ABABCB@B@BBB@D@@ACEA@@AB@DAB@BAB@BBBABAB@@AA@@A@ABAAAFAB@@A@A@AB@BAB@@AB@BCBAA@AABA@BB@@ABAB@BBBB@AB@@ADALEBABA@ABA@A@AA@AAAAAACEAAAABC@ABAB@@ABAB@B@F@BAB@BAB@BAB@@BB@@C@ADE@AAA@ABCAA@A@A@A@A@ABAC@A@A@C@@AA@AA@AAA@AA@C@A@A@A@@ABABAAI@AAGAA@AA@@AB@@A@A@A@A@A@A@AA@ABA@A@A@C@A@A@A@@BEBCB@BAAC@DI@A@A@AC@AA@ADA@A@AA@ABA@AB@AAA@A@AB@B@JCDAB@B@B@B@BAB@DAB@@AB@@BB@@AAA@AB@B@@A@A@A@A@AAAA@A@ACA@CAA@AAA@EAAA@AABC@A@DABAAAA@C@@AD@@AA@A@A@BA@AAAAC@A@AAABAAABA@A@ABC@ADAB@@AEEA@A@A@CBC@A@@BEA@BD@@BKA@AA@@FAA@CC@@A@AAADC@CAB@AC@ACMD@ALAE@BA@CB@BBFC@AHA@A@AA@E@@AC@@AA@C@ACBBD@ACB@@ACBAAB@@AB@@C@AB@@ABA@AAEAAB@@ABAFAD@B@@A@AAG@AD@AA@ADAA@CBCBA@AAA@E@AAAAA@AAACCGA@EBAC@AABC@C@CBA@@AKBA@@C@GCEAADCBABABA@ACBA@@AB@BACAGGGBAEAC@A@C@CAAAAA@AAC@@AB@BA@A@ACDE@A@ABABCBA@A@BBFAB@B@EFA@@BCDCDA@A@@BKDDDAB@B@BB@ABA@AAA@A@@BBBC@A@@AA@C@A@@ABA@AA@A@A@AAA@AA@AA@@AA@AB@AA@@BA@A@ABCBA@@BA@@BABABABABABABCDAB@BADA@ABGH@BAFAB@BCBA@@B@DA@ABA@A@A@EBEDABA@A@C@A@A@AAB@B@@A@AA@A@A@C@A@CBEH@BA@A@EC@CA@@ACAA@C@A@A@@AAECC@AF@@AAACC@ADA@A@ABAB@DCE@ABA@@CA@CFEDDCA@A@ACA@@BABIDCBA@ECAA@ABAA@@AC@C@E@E@@A@A@AAAAAA@ABA@A@@AB@BABAA@C@A@A@@ABAB@BAA@A@@ABAFCCCACCCA@@A@E@AA@A@IBC@CBABADA@C@A@AACEAAAC@A@A@CBGDEBA@AA@AAA@ABABA@AAEBABA@@AC@C@@BABA@@AAA@BA@BDA@AAEFA@BB@BBAHBBBA@CBA@A@C@A@CDCBA@@AA@@C@AB@AAC@A@ACAA@B@BA@@A@AA@CB@AAAA@@A@AB@@AA@A@@AB@D@D@@A@AEB@AC@@BIBDAA@DAEBE@ABD@ABABCE@BACACCBAABAAAA@@CB@FAA@CA@AEEEA@A@ACCAB@AA@@AG@@AA@ABEA@BA@AAAAA@A@K@GFABAACA@AAA@ABCBBB@@ADABAFCAE@CA@A@BABAFC@ADA@A@ADAFAD@@A@AA@CBABC@FCHE@AB@AA@AD@@A@ABABABABABCA@@A@A@AA@A@C@A@A@AAA@CAA@A@@BA@ABCD@BA@@A@AA@AB@BB@@B@BC@A@A@@BABA@EDCBG@A@ABEBA@@B@B@BABA@C@IDIBCBABA@A@A@@BCB@BG@ABAAAAA@AB@AK@@D@BA@A@A@A@CBCBA@@BA@BBA@EFAD@B@BABC@A@C@A@@BA@ABAAE@EAABAACDC@A@@C@AAAAAD@AAAABEB@AAA@DAB@AAB@FCFAB@@A@ACAABA@A@@BA@@AA@@B@BA@A@EB@BCA@BA@ABBBA@AB@B@BAAA@@B@B@BA@A@ABA@AAADCDB@CBC@@AA@@A@ABAB@@ABAA@A@A@@A@ABAA@A@@BGA@AA@BA@AA@AAA@A@AACA@AACAAA@AAACAA@A@AA@C@A@ABIBCBA@@CCB@D@BA@@BA@AAAA@AA@@AA@A@A@AAA@C@A@A@@AA@AB@B@B@B@BA@C@C@C@CBA@@A@A@AA@AA@C@AA@@A@ACAA@AA@AA@@AA@@AA@AAAAA@A@A@@AA@@ABCCCAAAAA@CAAA@CAAA@A@A@A@A@A@@AAAAAAAA@CAA@A@EAA@A@AAAAA@ABA@A@A@@A@CAA@AAACA@CAAEAAAA@CAA@A@C@A@AAA@ACCAAA@AA@C@AAA@A@AAAACAA@AA@AA@E@CAA@A@C@@AAAAAA@A@ABAAA@AAA@@AC@CAA@C@CAAA@AA@@A@CAACAC@C@CAE@AAC@A@A@E@A@AAA@A@@BAB@D@B@D@BDBA@C@E@A@EAA@IEA@@AAAA@A@AAA@CCA@C@C@C@C@A@A@ABC@A@A@C@@ACAA@A@@AA@ABA@A@ABA@G@A@CBA@A@CBEBA@A@AB@B@B@B@B@BAD@B@B@B@B@B@BA@A@A@A@A@AAA@A@A@AAAACAAACAAAA@@A@AACAACAA@AACC@AC@AAAA@A@A@ABCB@@A@AA@@ABA@A@A@ABC@A@A@C@A@ABA@AAABAA@EBA@A@CAC@A@C@@BC@ABAB@BA@A@A@ABA@A@A@CBA@A@AAA@A@CBABE@AB@BA@@B@BA@GAA@ABABABCBA@A@AAA@AAA@C@EBEKBADAB@@AA@@C@AAABAAA@A@A@AAAAAAA@A@ADI@A@AA@@A@ACAAAAAAAC@C@ACACA@AA@AA@AAA@A@A@A@E@A@AA@CA@AAAAA@@A@A@ABAB@@A@ABAB@@A@ADA@A@A@C@AC@I@@BA@AAC@A@A@AAEA@AA@A@ABAAAAAAA@A@A@C@A@ABA@A@A@CBC@A@A@AAAA@ACAAAAA@AAAA@C@@A@A@A@C@E@A@A@A@A@AAAEAAABC@ABA@A@AAA@AA@AAAAA@@A@ADA@A@EBCBAB@BBB@BAB@BBB@B@BCB@B@B@B@D@@AB@B@B@B@B@BABA@C@G@E@ABABAB@B@BB@BB@@ABEBC@AB@BAHAD@@ADCDCFCBC@ABABA@A@ABA@A@A@A@ABA@ABA@A@C@ABA@AB@B@@AB@BABADAB@@A@AB@AACA@AEAA@ABA@A@@C@CA@AA@AA@A@A@A@A@@BA@ABA@@A@C@A@A@AAABABABA@AA@BABAB@B@B@BA@A@ABAA@A@CBAAA@AB@A@AAA@A@ABAD@@A@A@AA@AAAA@A@A@ABAB@AAA@@AB@B@@ACCBA@AB@B@@ADAB@@CBA@AAC@AACAC@ACC@A@A@C@AAAA@@A@AACAAA@C@A@C@ABA@AAC@K@C@CAA@@AB@BABABA@AFABA@AB@@AD@B@B@BAB@@ABA@A@AB@B@@AB@BAB@B@DAD@B@B@@AD@@AB@B@B@DAB@B@@ABAB@@ABAB@DABAF@B@BAD@@ABADA@A@AB@@C@AAC@A@AB@@AA@@A@ABA@ABCBA@A@A@ABCB@BDB@@BBAD@B@@AB@B@B@B@F@BBDBBBBA@AB@DA@C@ABA@A@A@AB@BA@AB@B@@ABEBAB@BAHBBAD@DA@A@C@AB@@AB@@AB@B@BCBC@A@A@AFABAFCBABAB@DD@BBB@D@BD@B@BAB@BBB@BA@C@AB@@AAC@CBEB@BBDDDBBBBDBD@BB@B@FCF@D@BAB@BAD@BAB@@ABAB@BABA@A@A@ABA@A@AAAAA@A@A@A@C@A@ADC@C@ABAB@@ABAB@B@BBB@B@DADA@BD@B@BBB@BABBB@DAB@B@B@B@B@FCBCBCBBDABAD@B@BBB@B@BAJ@F@@A@A@A@AB@@ABA@A@A@AB@BAFCB@@ABA@E@AA@C@@AA@AAAAC@A@C@AACCECAC@A@ABC@AA@@AEABAAA@ABCAAACACAAAAC@AA@G@A@AB@@A@A@EB@@AA@@AA@@ABABAAA@A@A@ABE@AACBA@ABEBABA@A@A@AB@F@BA@A@A@ABA@C@ABCBC@A@A@A@A@C@AB@@AAA@A@A@AAA@A@A@A@A@A@AAA@CB@B@BABA@ABAB@@A@CAACA@AA@A@AA@AAAA@AA@A@A@AAAAAA@@A@AC@AAA@@AA@AAC@C@C@EAAAA@ACAAAAAA@AA@GABA@A@AAAC@@AAAA@AAAAEAAA@A@A@AA@AAA@ABA@@A@A@A@AAC@AAA@ABA@A@A@AAA@AAA@A@A@AAA@AA@AAEDC@C@A@AAAAC@A@CAA@A@@BA@@B@B@B@D@B@BA@A@A@A@A@A@ABA@ABA@@CA@A@@A@AA@@AA@A@ABABA@AC@ACCA@ABC@CBABABABA@CBC@A@A@AAA@A@A@CBA@@ACAA@A@A@AAAC@AA@AAA@A@@AA@C@@AAABC@AAC@AAA@ABA@GB@BABADGD@@AB@@CB@@A@ABABA@CAAAAACA@E@AAAA@AA@CD@BA@BB@BADA@A@A@@A@AAABGAACAABA@C@ABAA@AECC@BBB@@B@B@B@BBBA@A@AAAAC@A@@A@ABA@ABA@AA@BE@A@AB@B@D@@AB@BA@AB@B@B@BAB@B@BABA@AAA@A@C@AAA@A@A@A@AB@B@B@BADB@AB@@AF@BA@AB@BBB@BA@A@AD@B@B@B@@ACGB@DABA@A@A@A@C@A@AB@BAB@@ABAFCB@@A@A@A@ABADAD@B@@ABABAB@BAB@DCDA@C@AAA@A@E@CBA@A@AA@BA@ABA@A@AAAAA@ABG@A@A@A@AA@A@C@EBA@@AC@C@IAA@EBCBEBCDA@CAGAA@@AA@A@C@A@@C@A@ACEAA@AAAA@@AA@@AA@C@AAACCCAEAAACAA@A@A@A@AAAAACEAACEAAAABA@A@AAAA@@ABA@ABAAA@AA@@A@A@AAAAC@AF@B@AC@A@ABA@E@ABAAGAA@A@CBCBCAAAA@AA@@AAABABA@AAEA@@A@AA@A@A@AAAA@AA@A@A@A@@AAAA@@ADA@AAECCBA@AAC@EAA@CAACAA@AAGAC@CAA@C@IBCBA@A@G@EBC@C@A@AA@A@A@AACAAA@A@ABABA@E@@AA@A@AAAA@A@A@AFGB@BA@CBA@AB@BAB@@ADCD@@AB@BAB@BABABA@CBADA@A@C@A@A@ABA@AB@@AA@A@@AA@@AAAAA@AACA@A@@A@AAA@ACAA@CAAAA@@AG@AAAA@C@ABA@C@AA@BA@ABAB@@A@AAAAA@C@A@AAAAAA@AAAAA@@AA@@A@AAAAA@AACAA@CAC@A@AAAAAACAAB@@A@A@AAAAA@AAA@AAACAAA@AA@A@C@@BC@AAAAAAAAA@A@@A@AAAAA@AGDA@AAAC@AAA@AAAA@C@ABCBE@A@AB@BEBA@A@A@CAAAEAA@BA@A@A@AA@A@CCCAECA@CAA@A@A@AAA@A@A@E@CAA@ABAAA@CAA@AAABAAA@AAA@@BCBAAAAC@C@ABAB@BADA@ABCBCBCDAB@BAFAFIZCBKHAB@BCDEDMJEDKNIJEBGBE@IACAABA@CFEFEHCBQDUFUFG@CBCFCBABGBG@G@GAKBABCFKNGJGHEFABEBIDC@IDABGFADEHAF@FABCDGDABCDAH@B@DBDDFDDBB@B@B@BAD@DBBBBDDBB@DADCBEDIPCFCHAH@B@D@F@J@B@DADCBGBEDAFAFCFAFCHAFA@C@C@C@CBCBGF@D@BBF@DABABAF@DABC@ABE@C@E@ECE@IBMFA@AAAAC@A@EBE@EDIFMFADAD@HAFADCBABCDELEJABCBC@IBI@A@EBC@GBC@A@IHADABEBEBA@CDCF@BC@A@C@GAECGECAEAC@E@CBEBABC@A@AAEAAAABABABGBEBI@ABAB@D@DBJ@B@B@J@BABE@ODA@AHADADGFGDCD@B@B@BBDBD@BBH@BB@@BBBFBDBD@DBD@BDB@DBHBB@D@B@D@J@H@DBBB@B@BADCFCD@B@B@BFFBBB@F@DBBBHHDBHDNFF@JBN@HBDDHLBDBB@BCBADADAH@B@D@D@B@BA@EBSBE@CBC@ABAB@B@B@BBF@F@HAJ@HABCDINEFABAB@B@B@B@B@BCF@BA@A@ABA@A@ABABAB@DBBB@DB@B@BA@AB@BCDA@AB@DA@@BABCBA@A@A@CAA@AAACBCBA@A@CCACAE@K@I@C@C@A@A@C@CAA@@BA@@B@BBDBB@D@FBB@D@D@BC@GDABA@BBB@B@D@DBB@AB@B@B@BB@B@AB@BB@@BA@A@A@A@@BA@BBB@@BB@B@B@@B@B@B@BA@A@@B@B@B@BB@B@BB@BBB@BB@@AB@@ABB@F@B@HCb@BCHAF@BBHFFFBPFNFDDDDBJDHD@DBBBFFBBBD@BABCDAB@BHDLJJLDJBH@BCDGLCBMDCBCDCFA@E@IAI@G@IDABC@E@IAA@@B@FBDDF@D@BA@GBIBK@C@CAA@C@ABGDC@EAABADABCD@B@BBBAF@FAFADCDC@EBCBCBG@G@GBIBCBCAGCE@@AE@CBKJABCDCBEDCDEDGBIBKBE@CDCBODKBK@EBIBABABAB@BDJDBBD@BADGHEF@D@FADCDCDEBA@@DBDBL@DDDBBD@F@FAD@FBFBF@DBFDDFFHDFBBD@DBBB@DDDFJBD@B@DBDBBBAHAHCF@N@J@DBBD@BAD@DBB@BDJ@F@JAFAFCDOHCBCDAB@HAHAFEPCDCD@FAHABADAD@B@FBHBJBFABCBA@EBEACACCGEAACAA@IBMDGBEDKDA@KHULA@EDAD@D@B@BB@@B@BA@@BA@A@ABA@@BA@@BA@@BB@@BA@@BA@@BB@@B@BA@A@@BA@@BB@@B@B@BB@@B@B@BADA@@BA@BBA@@B@BA@@BA@A@A@@B@B@B@B@BA@@BA@@B@B@B@B@B@B@BA@ABA@ABA@@BA@A@@B@BA@@BAB@B@BA@@BABABA@AB@B@BABA@@B@BBB@B@BA@A@@BA@@B@BA@@BA@A@@BA@ABA@A@@BAB@BA@@BBBAB@BAD@B@BA@@B@B@B@B@BA@@B@B@B@B@BA@@BA@@B@BA@@B@B@B@B@BBB@B@B@D@BBB@BDHBDDDDBDB@B@DBB@DDBD@B@B@DBPJFBNFHBFB@D@D@HABCAECGAO@OBE@KDGD@B@DHLHX@DBBHTPEREB@FAHCHCRCRBFDDBFFJHBBRRDFBBFHHBDBNBLAD@^MBATIDCLEJGTMB@TKPCNDB@JDJDJD\\LTHPHPDRDHBFAD@zBL@EH@bAFBFFfnBDBBPLJLBJFDJDD@J@PCB@PED@PKJGDAFCPMNIR@HBB@JFDBJFTFL@NBP@F@HDRHDFJJDHJJDFJNNZDHJZ@`CTBFFHJBJ@L@VINKVYBADCJ@JDVNPHPJBB^RTJFDJD^L`JfDF@VDD@L@LBJ@D@HFDDBFBLBDDPHNFJ","@@@BA@CBC@C@EBA@A@@A@CBABC@CB@B@HBB@B@B@DHA@"],["@@BA@AA@@B@B"],["@@BAB@AAAD"],["@@@AAAA@DD"],["@@B@@AAB"]],"encodeOffsets":[[[113804,35627],[114719,35618]],[[114417,35435]],[[114409,35428]],[[114432,35424]],[[114617,35433]]]}}],"UTF8Encoding":true});}));