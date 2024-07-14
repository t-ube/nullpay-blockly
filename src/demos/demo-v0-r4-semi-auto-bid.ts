export const DemoV0R4SemiAutoBid = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="K+=7kLss}zzFh+WDV|w4">userInfo</variable>
    <variable id="gF*aYnq*HcLnh}aDPP$u">userAccount</variable>
    <variable id="GfI4b9ixq-b_FaGZ[gKV">result</variable>
    <variable id="a8odClXjH1#I}N7#T6SE">xrplClient</variable>
    <variable id="^C=-[p.p[Yv,Ydoajoxh">nftID</variable>
    <variable id="8I/xk/gsj-/y/X|Gv.sG">brokerAddress</variable>
    <variable id="#(CSK,Ivnl4\`=oNPQb.}">bidStep</variable>
    <variable id="g$p.34oz2Ndzsh\`^\`8%n">startBid</variable>
    <variable id="f5Q?cJ|ceq:VtvA\`W@2N">status</variable>
    <variable id="H8?7.T:4!\`hKG.w57*E^">response</variable>
    <variable id="-,dV?p?EbB}Gm?~SUB*t">ownerAddess</variable>
    <variable id="3ZAKt=2Sbga)Go6jb5u~">sortedOffers</variable>
    <variable id="L*8JxJvWWO)aF+}m,c$w">buyPayload</variable>
    <variable id="0r9JNHH9?h;Sp8A[R*JK">topOffer</variable>
    <variable id="}r8U68uAomtU|j6ig4wf">payloadID</variable>
    <variable id="zDx^.:C$OkRI3Ukgi3Xb">highestBidAccount</variable>
    <variable id="DJAIoI2uq.*U,y!Iv|b?">highestAmount</variable>
    <variable id="-9^X_9!F{?~WFtM=)|,|">newAmount</variable>
  </variables>
  <block type="xaman_simple_login" id="lsScrv}mFNf72aYU9;,B" x="0" y="0">
    <field name="VAR" id="K+=7kLss}zzFh+WDV|w4">userInfo</field>
    <next>
      <block type="variables_set" id="AQ(;k.L#K/vCne~q?~mR">
        <field name="VAR" id="gF*aYnq*HcLnh}aDPP$u">userAccount</field>
        <value name="VALUE">
          <block type="json_get_value" id="@H??[~#b2O-8dBBaPTv1">
            <value name="VAR">
              <block type="variables_get" id="M9.rAde3hfQTMb\`|TIGJ">
                <field name="VAR" id="K+=7kLss}zzFh+WDV|w4">userInfo</field>
              </block>
            </value>
            <value name="KEY">
              <block type="text" id="@\`.\`E\`NhYdR{N,YHI]*}">
                <field name="TEXT">account</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="form_modal_block" id="X7tU0Tc(g[X9dAfi7-mR">
            <field name="INPUT">{"editable":false,"title":{"default":"Semi-Automatic Bid on xrp.cafe"},"items":{"label_0":{"key":"label_0","value":"000800003B47E48122DE8B064405969E0426B39DA2BF658811007754040393BA","type":"string","name":{"default":"NFT ID"},"description":{"default":"New Description"}},"label_2":{"key":"label_2","value":0.2,"type":"number","name":{"default":"Starting Bid (XRP)"},"description":{"default":"New Description"}},"label_4":{"key":"label_4","value":0.1,"type":"number","name":{"default":"Bid Step (XRP)"},"description":{"default":"New Description"}}}}</field>
            <field name="VAR" id="GfI4b9ixq-b_FaGZ[gKV">result</field>
            <next>
              <block type="dynamic_if" id="]s2boZttjzxl]\`P))u{:">
                <value name="IF0">
                  <block type="form_submitted" id="RvuGM4e=*$wGur,wt+t6">
                    <value name="FORM_RESULT">
                      <block type="variables_get" id="z.U$!RK~4#1$Y|Kd]wG$">
                        <field name="VAR" id="GfI4b9ixq-b_FaGZ[gKV">result</field>
                      </block>
                    </value>
                  </block>
                </value>
                <statement name="DO0">
                  <block type="xrpl_client_initialize" id="+C3Ae85(~-GN{3=Z-JG8">
                    <field name="VAR" id="a8odClXjH1#I}N7#T6SE">xrplClient</field>
                    <value name="SERVER">
                      <block type="xrpl_network_wss_selection" id=")H?Jo:o~?BriyHM\`bRJ6">
                        <field name="NETWORK_TYPE">xrpl</field>
                        <field name="CONNECTION">wss://s1.ripple.com</field>
                      </block>
                    </value>
                    <next>
                      <block type="variables_set" id="Ou@_wl^w1pO~,ySzyjlQ">
                        <field name="VAR" id="^C=-[p.p[Yv,Ydoajoxh">nftID</field>
                        <value name="VALUE">
                          <block type="form_variable_get" id="Z5VJPz43P?ilaHuW_?~y">
                            <value name="FORM_RESULT">
                              <block type="variables_get" id="0$T[In%t?i8+BUz_KF,\`">
                                <field name="VAR" id="GfI4b9ixq-b_FaGZ[gKV">result</field>
                              </block>
                            </value>
                            <value name="NAME">
                              <block type="text" id="(HrFw\`f?[I?!9nq=?VL;">
                                <field name="TEXT">NFT ID</field>
                              </block>
                            </value>
                          </block>
                        </value>
                        <next>
                          <block type="variables_set" id="-6w(g{}wXmkZ[d9dZE|P">
                            <field name="VAR" id="8I/xk/gsj-/y/X|Gv.sG">brokerAddress</field>
                            <value name="VALUE">
                              <block type="xrpl_address" id=",tl9N7(3X9@,~B0DW[q2">
                                <field name="ADDRESS">rpx9JThQ2y37FaGeeJP7PXDUVEXY3PHZSC</field>
                              </block>
                            </value>
                            <next>
                              <block type="variables_set" id="N$uY/om~V.)knw%3e_cp">
                                <field name="VAR" id="#(CSK,Ivnl4\`=oNPQb.}">bidStep</field>
                                <value name="VALUE">
                                  <block type="xrpl_xrp_to_drops" id="[Ywy~oB$Ti2o63u$s4A.">
                                    <value name="AMOUNT">
                                      <block type="form_variable_get" id="%5FPpvQy8YFb.fvNyz$R">
                                        <value name="FORM_RESULT">
                                          <block type="variables_get" id="H,[WSBjn1SG_7\`y?72/I">
                                            <field name="VAR" id="GfI4b9ixq-b_FaGZ[gKV">result</field>
                                          </block>
                                        </value>
                                        <value name="NAME">
                                          <block type="text" id="JB86.!%BiC/9M[b|*=kk">
                                            <field name="TEXT">Bid Step (XRP)</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                                <next>
                                  <block type="variables_set" id="H1Afu32L,GHV2{KgAiaS">
                                    <field name="VAR" id="g$p.34oz2Ndzsh\`^\`8%n">startBid</field>
                                    <value name="VALUE">
                                      <block type="xrpl_xrp_to_drops" id="C.m~-/ixxMZy9uXR))GT">
                                        <value name="AMOUNT">
                                          <block type="form_variable_get" id="|@tpxZm{qkj[*eP^(VZi">
                                            <value name="FORM_RESULT">
                                              <block type="variables_get" id="j[c*TSP-oflK.B%-3^(c">
                                                <field name="VAR" id="GfI4b9ixq-b_FaGZ[gKV">result</field>
                                              </block>
                                            </value>
                                            <value name="NAME">
                                              <block type="text" id="zKPU[^RDo_UR}HhTcLip">
                                                <field name="TEXT">Starting Bid (XRP)</field>
                                              </block>
                                            </value>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <next>
                                      <block type="xrpl_clio_nft_info" id="%RE;,JEzW4r#RZ!}[TtD">
                                        <field name="STATUS" id="f5Q?cJ|ceq:VtvA\`W@2N">status</field>
                                        <field name="RESPONSE" id="H8?7.T:4!\`hKG.w57*E^">response</field>
                                        <value name="CLIENT">
                                          <block type="variables_get" id=")?WEXZB#e]m]zy-vM)=e">
                                            <field name="VAR" id="a8odClXjH1#I}N7#T6SE">xrplClient</field>
                                          </block>
                                        </value>
                                        <value name="NFT_ID">
                                          <block type="variables_get" id="q]?L8crtsoPt^;r;mJUT">
                                            <field name="VAR" id="^C=-[p.p[Yv,Ydoajoxh">nftID</field>
                                          </block>
                                        </value>
                                        <next>
                                          <block type="variables_set" id="M,1AU;+*/EYC|m.k67hX">
                                            <field name="VAR" id="-,dV?p?EbB}Gm?~SUB*t">ownerAddess</field>
                                            <value name="VALUE">
                                              <block type="json_get_value" id="0IX_5db]yF2]Q4]RtX@r">
                                                <value name="VAR">
                                                  <block type="variables_get" id="J)-:P.U_Dz%U$})i4UYE">
                                                    <field name="VAR" id="H8?7.T:4!\`hKG.w57*E^">response</field>
                                                  </block>
                                                </value>
                                                <value name="KEY">
                                                  <block type="text" id="Kf1hR.n~]=hp#JH\`uX1b">
                                                    <field name="TEXT">owner</field>
                                                  </block>
                                                </value>
                                              </block>
                                            </value>
                                            <next>
                                              <block type="controls_whileUntil" id="{b6M2@/{n[%kB!5I2Sm=">
                                                <field name="MODE">WHILE</field>
                                                <value name="BOOL">
                                                  <block type="logic_compare" id="Fmcbf5Bs_b8HO*E#/)h6">
                                                    <field name="OP">NEQ</field>
                                                    <value name="A">
                                                      <block type="variables_get" id="T@2uV_568~X3@a}HcfG%">
                                                        <field name="VAR" id="-,dV?p?EbB}Gm?~SUB*t">ownerAddess</field>
                                                      </block>
                                                    </value>
                                                    <value name="B">
                                                      <block type="variables_get" id="xn3$xh;jZ7?RDZB,2GVr">
                                                        <field name="VAR" id="gF*aYnq*HcLnh}aDPP$u">userAccount</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </value>
                                                <statement name="DO">
                                                  <block type="xrpl_nft_buy_offers" id="BU,sKqtu(Mz=iK,}I82l">
                                                    <field name="STATUS" id="f5Q?cJ|ceq:VtvA\`W@2N">status</field>
                                                    <field name="RESPONSE" id="H8?7.T:4!\`hKG.w57*E^">response</field>
                                                    <value name="CLIENT">
                                                      <block type="variables_get" id="bZR5LNWzGUR5D5^=RI.\`">
                                                        <field name="VAR" id="a8odClXjH1#I}N7#T6SE">xrplClient</field>
                                                      </block>
                                                    </value>
                                                    <value name="NFT_ID">
                                                      <block type="variables_get" id="^!j}_,(7hzcxBd^yA2:@">
                                                        <field name="VAR" id="^C=-[p.p[Yv,Ydoajoxh">nftID</field>
                                                      </block>
                                                    </value>
                                                    <next>
                                                      <block type="dynamic_if" id="q2u5{zB1lYAaJ3~e*8:9">
                                                        <mutation else="1"></mutation>
                                                        <value name="IF0">
                                                          <block type="json_get_value" id="?a^^7NhI~lY-=xijxJZy">
                                                            <value name="VAR">
                                                              <block type="variables_get" id="V%Ef1-ZJVxXUoQ/m,n)c">
                                                                <field name="VAR" id="f5Q?cJ|ceq:VtvA\`W@2N">status</field>
                                                              </block>
                                                            </value>
                                                            <value name="KEY">
                                                              <block type="text" id=",RRC+qYjsN:M#E2)q9*[">
                                                                <field name="TEXT">success</field>
                                                              </block>
                                                            </value>
                                                          </block>
                                                        </value>
                                                        <statement name="DO0">
                                                          <block type="variables_set" id="=EmIgh+2jxat.B/|BzCu">
                                                            <field name="VAR" id="3ZAKt=2Sbga)Go6jb5u~">sortedOffers</field>
                                                            <value name="VALUE">
                                                              <block type="lists_sort_json_value" id="0Xo3wy?|DNREr3AF5wy7">
                                                                <field name="TYPE">numeric</field>
                                                                <field name="ORDER">desc</field>
                                                                <value name="ARRAY">
                                                                  <block type="json_get_value" id="Gr?d{/i=gMG[\`;Fx2f7=">
                                                                    <value name="VAR">
                                                                      <block type="variables_get" id="r)P+EJX.P=fz}v]HBoNG">
                                                                        <field name="VAR" id="H8?7.T:4!\`hKG.w57*E^">response</field>
                                                                      </block>
                                                                    </value>
                                                                    <value name="KEY">
                                                                      <block type="text" id="w)ClZ=kZOdP51s(j}J4/">
                                                                        <field name="TEXT">offers</field>
                                                                      </block>
                                                                    </value>
                                                                  </block>
                                                                </value>
                                                                <value name="KEY">
                                                                  <block type="text" id="n+YwVFH]w+N9WO*uba_R">
                                                                    <field name="TEXT">amount</field>
                                                                  </block>
                                                                </value>
                                                              </block>
                                                            </value>
                                                            <next>
                                                              <block type="variables_set" id="v1;O$eEKa,.qgng0f$L.">
                                                                <field name="VAR" id="0r9JNHH9?h;Sp8A[R*JK">topOffer</field>
                                                                <value name="VALUE">
                                                                  <block type="lists_getIndex" id="e|U%Am7SeR[Q4kt9EoR4">
                                                                    <mutation statement="false" at="true"></mutation>
                                                                    <field name="MODE">GET</field>
                                                                    <field name="WHERE">FROM_START</field>
                                                                    <value name="VALUE">
                                                                      <block type="variables_get" id="PZHx,IH#]%4r8lBl7,[J">
                                                                        <field name="VAR" id="3ZAKt=2Sbga)Go6jb5u~">sortedOffers</field>
                                                                      </block>
                                                                    </value>
                                                                    <value name="AT">
                                                                      <block type="math_number" id="fsa#9c*l]m1+(wsd58f(">
                                                                        <field name="NUM">1</field>
                                                                      </block>
                                                                    </value>
                                                                  </block>
                                                                </value>
                                                                <next>
                                                                  <block type="variables_set" id="#x(aKL@18d~Iaeq/q/oo">
                                                                    <field name="VAR" id="zDx^.:C$OkRI3Ukgi3Xb">highestBidAccount</field>
                                                                    <value name="VALUE">
                                                                      <block type="json_get_value" id="%/]u|EiUJ[S@a_q~Rgq6">
                                                                        <value name="VAR">
                                                                          <block type="variables_get" id=":s-2_d%um~Et6b5a)KKE">
                                                                            <field name="VAR" id="0r9JNHH9?h;Sp8A[R*JK">topOffer</field>
                                                                          </block>
                                                                        </value>
                                                                        <value name="KEY">
                                                                          <block type="text" id="j#aKW(fBT24ig^#3i~kM">
                                                                            <field name="TEXT">owner</field>
                                                                          </block>
                                                                        </value>
                                                                      </block>
                                                                    </value>
                                                                    <next>
                                                                      <block type="variables_set" id="a,JJd^2S5Xv@[j_v*ymE">
                                                                        <field name="VAR" id="DJAIoI2uq.*U,y!Iv|b?">highestAmount</field>
                                                                        <value name="VALUE">
                                                                          <block type="json_get_value" id="twRCp_*^/hUQe:(W(8kT">
                                                                            <value name="VAR">
                                                                              <block type="variables_get" id="3^]~onU8awy\`BP}qesGb">
                                                                                <field name="VAR" id="0r9JNHH9?h;Sp8A[R*JK">topOffer</field>
                                                                              </block>
                                                                            </value>
                                                                            <value name="KEY">
                                                                              <block type="text" id="*rI;Ilhik3DR]O}Pr*=/">
                                                                                <field name="TEXT">amount</field>
                                                                              </block>
                                                                            </value>
                                                                          </block>
                                                                        </value>
                                                                        <next>
                                                                          <block type="dynamic_if" id="IiJ]#r0MS[UHnBg%hzT:">
                                                                            <value name="IF0">
                                                                              <block type="logic_compare" id=":zrG74WzRxzw;zSPkhc=">
                                                                                <field name="OP">NEQ</field>
                                                                                <value name="A">
                                                                                  <block type="variables_get" id="Vq5,]GY/JJ|g*Lo;R/9k">
                                                                                    <field name="VAR" id="zDx^.:C$OkRI3Ukgi3Xb">highestBidAccount</field>
                                                                                  </block>
                                                                                </value>
                                                                                <value name="B">
                                                                                  <block type="variables_get" id="8J85Tci3sC]S:QE)-6QR">
                                                                                    <field name="VAR" id="gF*aYnq*HcLnh}aDPP$u">userAccount</field>
                                                                                  </block>
                                                                                </value>
                                                                              </block>
                                                                            </value>
                                                                            <statement name="DO0">
                                                                              <block type="text_print" id="h!iP:D~dTwvPwJ%1*L|I">
                                                                                <value name="TEXT">
                                                                                  <block type="dynamic_text_join" id="4GFKN#;h~r1dd.7U\`4ia">
                                                                                    <mutation items="2"></mutation>
                                                                                    <value name="ADD0">
                                                                                      <block type="xrpl_drops_to_xrp" id="Ro)OC}l.sgql[Q/^DW#-">
                                                                                        <value name="AMOUNT">
                                                                                          <block type="variables_get" id="Y:5[ZOfr]EQ;AjtjwZR6">
                                                                                            <field name="VAR" id="DJAIoI2uq.*U,y!Iv|b?">highestAmount</field>
                                                                                          </block>
                                                                                        </value>
                                                                                      </block>
                                                                                    </value>
                                                                                    <value name="ADD1">
                                                                                      <block type="text" id="V~E76!jDoi\`G81)f]%:G">
                                                                                        <field name="TEXT">XRP</field>
                                                                                      </block>
                                                                                    </value>
                                                                                  </block>
                                                                                </value>
                                                                                <next>
                                                                                  <block type="variables_set" id="%\`[/Cq{~h.hy:7j(X0*(">
                                                                                    <field name="VAR" id="-9^X_9!F{?~WFtM=)|,|">newAmount</field>
                                                                                    <value name="VALUE">
                                                                                      <block type="xrpl_token_amount_arithmetic" id="2W!d(2lWtzh*$Y}qquMb">
                                                                                        <field name="OPERATOR">+</field>
                                                                                        <value name="TOKEN">
                                                                                          <block type="variables_get" id="R.xXId;3YbU7L%/!ZIz[">
                                                                                            <field name="VAR" id="DJAIoI2uq.*U,y!Iv|b?">highestAmount</field>
                                                                                          </block>
                                                                                        </value>
                                                                                        <value name="VALUE">
                                                                                          <block type="variables_get" id="tbB6?_:Y$M\`+1]-f.KUt">
                                                                                            <field name="VAR" id="#(CSK,Ivnl4\`=oNPQb.}">bidStep</field>
                                                                                          </block>
                                                                                        </value>
                                                                                      </block>
                                                                                    </value>
                                                                                    <next>
                                                                                      <block type="variables_set" id="}Y2]]LZ[.(Y]W4!Rx4EJ">
                                                                                        <field name="VAR" id="L*8JxJvWWO)aF+}m,c$w">buyPayload</field>
                                                                                        <value name="VALUE">
                                                                                          <block type="xrpl_nftoken_buy_offer" id="Pp@](4f.^%k=Ik_6#tV[">
                                                                                            <value name="OWNER_ID">
                                                                                              <block type="variables_get" id="\`X/E_RJ[RNkF]Uy4R2[T">
                                                                                                <field name="VAR" id="-,dV?p?EbB}Gm?~SUB*t">ownerAddess</field>
                                                                                              </block>
                                                                                            </value>
                                                                                            <value name="TOKEN_ID">
                                                                                              <block type="variables_get" id="P(LAeP:SD5M6qaCpW?/y">
                                                                                                <field name="VAR" id="^C=-[p.p[Yv,Ydoajoxh">nftID</field>
                                                                                              </block>
                                                                                            </value>
                                                                                            <value name="AMOUNT">
                                                                                              <block type="variables_get" id="PT*DxI0w[iEmyfPLi,X+">
                                                                                                <field name="VAR" id="-9^X_9!F{?~WFtM=)|,|">newAmount</field>
                                                                                              </block>
                                                                                            </value>
                                                                                            <value name="DESTINATION">
                                                                                              <block type="variables_get" id="DU5Gt^HQ?OluC0^n1.]h">
                                                                                                <field name="VAR" id="8I/xk/gsj-/y/X|Gv.sG">brokerAddress</field>
                                                                                              </block>
                                                                                            </value>
                                                                                          </block>
                                                                                        </value>
                                                                                        <next>
                                                                                          <block type="xaman_payload_set" id="d$@,umhk2Oz+F=}Gtj/k">
                                                                                            <field name="STATUS" id="f5Q?cJ|ceq:VtvA\`W@2N">status</field>
                                                                                            <field name="PAYLOAD_ID" id="}r8U68uAomtU|j6ig4wf">payloadID</field>
                                                                                            <value name="PAYLOAD">
                                                                                              <block type="variables_get" id="\`wTCT/pU+PX]9y@875@y">
                                                                                                <field name="VAR" id="L*8JxJvWWO)aF+}m,c$w">buyPayload</field>
                                                                                              </block>
                                                                                            </value>
                                                                                            <next>
                                                                                              <block type="xaman_wait_for_signature" id="~3g{mb9R?F;XdOYW5$}|">
                                                                                                <value name="PAYLOAD">
                                                                                                  <block type="variables_get" id="2r;XR8I/{i@[]\`N9K5xI">
                                                                                                    <field name="VAR" id="}r8U68uAomtU|j6ig4wf">payloadID</field>
                                                                                                  </block>
                                                                                                </value>
                                                                                              </block>
                                                                                            </next>
                                                                                          </block>
                                                                                        </next>
                                                                                      </block>
                                                                                    </next>
                                                                                  </block>
                                                                                </next>
                                                                              </block>
                                                                            </statement>
                                                                          </block>
                                                                        </next>
                                                                      </block>
                                                                    </next>
                                                                  </block>
                                                                </next>
                                                              </block>
                                                            </next>
                                                          </block>
                                                        </statement>
                                                        <statement name="ELSE">
                                                          <block type="variables_set" id="yHgFVF3Y$@@v0mj7n)9v">
                                                            <field name="VAR" id="L*8JxJvWWO)aF+}m,c$w">buyPayload</field>
                                                            <value name="VALUE">
                                                              <block type="xrpl_nftoken_buy_offer" id="vCo#Y[7lpY=3.-|FHqJC">
                                                                <value name="OWNER_ID">
                                                                  <block type="variables_get" id="uD~%S*8=odMX?n=M\`iLy">
                                                                    <field name="VAR" id="-,dV?p?EbB}Gm?~SUB*t">ownerAddess</field>
                                                                  </block>
                                                                </value>
                                                                <value name="TOKEN_ID">
                                                                  <block type="variables_get" id="PZB^j@K]p}ji(C+jT1,#">
                                                                    <field name="VAR" id="^C=-[p.p[Yv,Ydoajoxh">nftID</field>
                                                                  </block>
                                                                </value>
                                                                <value name="AMOUNT">
                                                                  <block type="variables_get" id="Gu?\`z{T]=e5qCo2Kt]Td">
                                                                    <field name="VAR" id="g$p.34oz2Ndzsh\`^\`8%n">startBid</field>
                                                                  </block>
                                                                </value>
                                                                <value name="DESTINATION">
                                                                  <block type="variables_get" id="r;xKjp9*xSA7AUgageb1">
                                                                    <field name="VAR" id="8I/xk/gsj-/y/X|Gv.sG">brokerAddress</field>
                                                                  </block>
                                                                </value>
                                                              </block>
                                                            </value>
                                                            <next>
                                                              <block type="xaman_payload_set" id="vWo~Ri|2IEOigwEIZjfu">
                                                                <field name="STATUS" id="f5Q?cJ|ceq:VtvA\`W@2N">status</field>
                                                                <field name="PAYLOAD_ID" id="}r8U68uAomtU|j6ig4wf">payloadID</field>
                                                                <value name="PAYLOAD">
                                                                  <block type="variables_get" id="VhZfEuP!g.n#]g;zVD!S">
                                                                    <field name="VAR" id="L*8JxJvWWO)aF+}m,c$w">buyPayload</field>
                                                                  </block>
                                                                </value>
                                                                <next>
                                                                  <block type="xaman_wait_for_signature" id="Al]oC/yXHEF;z@D}%nd2">
                                                                    <value name="PAYLOAD">
                                                                      <block type="variables_get" id="HisB-e/}OnVM\`k?$B^Z5">
                                                                        <field name="VAR" id="}r8U68uAomtU|j6ig4wf">payloadID</field>
                                                                      </block>
                                                                    </value>
                                                                  </block>
                                                                </next>
                                                              </block>
                                                            </next>
                                                          </block>
                                                        </statement>
                                                        <next>
                                                          <block type="wait_seconds" id="]f[0m)]+tG]\`xv~X(1X,">
                                                            <value name="TIME">
                                                              <block type="math_number" id="$6~-~57vqv{L19ir:r6L">
                                                                <field name="NUM">5</field>
                                                              </block>
                                                            </value>
                                                            <next>
                                                              <block type="xrpl_clio_nft_info" id="\`)(UI\`JP0e:[zj6a[nyM">
                                                                <field name="STATUS" id="f5Q?cJ|ceq:VtvA\`W@2N">status</field>
                                                                <field name="RESPONSE" id="H8?7.T:4!\`hKG.w57*E^">response</field>
                                                                <value name="CLIENT">
                                                                  <block type="variables_get" id="YVFX|U{\`q}BYJ99f83Cz">
                                                                    <field name="VAR" id="a8odClXjH1#I}N7#T6SE">xrplClient</field>
                                                                  </block>
                                                                </value>
                                                                <value name="NFT_ID">
                                                                  <block type="variables_get" id="EIz!,UJ5Cg+0K=;7im;/">
                                                                    <field name="VAR" id="^C=-[p.p[Yv,Ydoajoxh">nftID</field>
                                                                  </block>
                                                                </value>
                                                                <next>
                                                                  <block type="variables_set" id="TJu9SQ4jaI)|h2B=pMbK">
                                                                    <field name="VAR" id="-,dV?p?EbB}Gm?~SUB*t">ownerAddess</field>
                                                                    <value name="VALUE">
                                                                      <block type="json_get_value" id="M1Xb$)lB\`f1:[D;bt8s0">
                                                                        <value name="VAR">
                                                                          <block type="variables_get" id="kAQFiuZ1m%oJ70FJ\`6FQ">
                                                                            <field name="VAR" id="H8?7.T:4!\`hKG.w57*E^">response</field>
                                                                          </block>
                                                                        </value>
                                                                        <value name="KEY">
                                                                          <block type="text" id="**-YowB(qfz/wu6nPnrJ">
                                                                            <field name="TEXT">owner</field>
                                                                          </block>
                                                                        </value>
                                                                      </block>
                                                                    </value>
                                                                  </block>
                                                                </next>
                                                              </block>
                                                            </next>
                                                          </block>
                                                        </next>
                                                      </block>
                                                    </next>
                                                  </block>
                                                </statement>
                                              </block>
                                            </next>
                                          </block>
                                        </next>
                                      </block>
                                    </next>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
`;