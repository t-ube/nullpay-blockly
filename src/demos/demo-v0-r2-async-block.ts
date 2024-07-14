export const DemoBlockXml = `
<xml xmlns="https://developers.google.com/blockly/xml" id="demo-v0-r2-async-block" style="display: none">
  <variables>
    <variable id="SCCBolVb[Z4Zs:Utl96W">exchanges</variable>
    <variable id="~_b6iJcgV_ym.fFIk9j5">xrplClient</variable>
    <variable id="ES0/)T6)?BE|qSt%jewk">transactionInfo</variable>
  </variables>
  <block type="variables_set" id="0U*6zc~k~P1S!6,+!{u!" x="525" y="34">
    <field name="VAR" id="SCCBolVb[Z4Zs:Utl96W">exchanges</field>
    <comment pinned="true" h="80" w="160">Addresses of the Exchange</comment>
    <value name="VALUE">
      <block type="dynamic_list_create" id=",~,a2_WbB:UKc:.RMoEL">
        <mutation items="9"></mutation>
        <value name="ADD0">
          <block type="xrpl_exchange_address" id="C\`ff,w$#C.KhgX%=x]X9">
            <field name="ADDRESS">rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh</field>
          </block>
        </value>
        <value name="ADD1">
          <block type="xrpl_exchange_address" id="Pz%_mV_j_SS!G.X[OnE6">
            <field name="ADDRESS">rLbKbPyuvs4wc1h13BEPHgbFGsRXMeFGL6</field>
          </block>
        </value>
        <value name="ADD2">
          <block type="xrpl_exchange_address" id="1$Dg(rQec5nN$)eB{K@x">
            <field name="ADDRESS">raLPjTYeGezfdb6crXZzcC8RkLBEwbBHJ5</field>
          </block>
        </value>
        <value name="ADD3">
          <block type="xrpl_exchange_address" id="D7n+Y09EoRCdlptl(i\`#">
            <field name="ADDRESS">rhUYLd2aUiUVYkBZYwTc5RYgCAbNHAwkeZ</field>
          </block>
        </value>
        <value name="ADD4">
          <block type="xrpl_exchange_address" id="DoharXE_6Zmg78lVRNUx">
            <field name="ADDRESS">rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w</field>
          </block>
        </value>
        <value name="ADD5">
          <block type="xrpl_exchange_address" id="B5;j{x/)_mH8n%s6}[xY">
            <field name="ADDRESS">rNQEMJA4PsoSrZRn9J6RajAYhcDzzhf8ok</field>
          </block>
        </value>
        <value name="ADD6">
          <block type="xrpl_exchange_address" id="x0X@nlxRv(^+uSlYJsmM">
            <field name="ADDRESS">rGDreBvnHrX1get7na3J4oowN19ny4GzFn</field>
          </block>
        </value>
        <value name="ADD7">
          <block type="xrpl_exchange_address" id="X-0;4,7x4a=58%85oCl?">
            <field name="ADDRESS">rUzWJkXyEtT8ekSSxkBYPqCvHpngcy6Fks</field>
          </block>
        </value>
        <value name="ADD8">
          <block type="xrpl_exchange_address" id="zrxz,nF,.@:Y{l0qQcIs">
            <field name="ADDRESS">rBg33rYWkR9G2jDKZKmCsGd1wZrGoL83Lb</field>
          </block>
        </value>
      </block>
    </value>
    <next>
      <block type="xrpl_client_initialize" id="QF9@!2dA)Z8=f%C_QKL9">
        <field name="VAR" id="~_b6iJcgV_ym.fFIk9j5">xrplClient</field>
        <value name="SERVER">
          <block type="xrpl_network_wss_selection" id="6MjF0aai[X_)@BZ@D5tL">
            <field name="NETWORK_TYPE">xrpl</field>
            <field name="CONNECTION">wss://xrplcluster.com</field>
          </block>
        </value>
        <next>
          <block type="xrpl_subscribe_account_txn" id="tJM*;^\`t~)2/1!az$a}-">
            <field name="VAR" id="ES0/)T6)?BE|qSt%jewk">transactionInfo</field>
            <comment pinned="true" h="80" w="257">It monitors transactions for the specified address.</comment>
            <value name="CLIENT">
              <block type="variables_get" id="=.uSa8RDkfWc[hn)c2I/">
                <field name="VAR" id="~_b6iJcgV_ym.fFIk9j5">xrplClient</field>
              </block>
            </value>
            <value name="ID">
              <block type="text" id="szuZMkYM4uzjqaTJ)TP)">
                <field name="TEXT">subscribe1</field>
              </block>
            </value>
            <value name="ACCOUNTS">
              <block type="variables_get" id="WFC]7N.d]iULGSj[Z=Q\`">
                <field name="VAR" id="SCCBolVb[Z4Zs:Utl96W">exchanges</field>
              </block>
            </value>
            <next>
              <block type="controls_whileUntil" id=".goz/:DUKv3$N#wyc!7^">
                <field name="MODE">WHILE</field>
                <comment pinned="true" h="80" w="257">The program is repeatedly checking until it receives the transaction.</comment>
                <value name="BOOL">
                  <block type="logic_compare" id="/tDZJ0#]DQ9qV9(+v:K#">
                    <field name="OP">EQ</field>
                    <value name="A">
                      <block type="variables_get" id="7q;.NR?NHG,x}Wj,;td$">
                        <field name="VAR" id="ES0/)T6)?BE|qSt%jewk">transactionInfo</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="undefined" id="biK*Nb-*$UaN3)Fx9f:{"></block>
                    </value>
                  </block>
                </value>
                <statement name="DO">
                  <block type="text_print" id="dfCufoqj=ubK),-q(.pu">
                    <value name="TEXT">
                      <block type="text" id="b.pW%!6k-_;:q$Fj/NZs">
                        <field name="TEXT">polling...</field>
                      </block>
                    </value>
                    <next>
                      <block type="wait_seconds" id="Lh.z4b(E!=.#:geLI,zJ">
                        <value name="TIME">
                          <block type="math_number" id="*@[7MGd/A22fF=Yp2!}#">
                            <field name="NUM">5</field>
                          </block>
                        </value>
                      </block>
                    </next>
                  </block>
                </statement>
                <next>
                  <block type="text_print" id="OOffWonov3bE(k#S#Z%k">
                    <value name="TEXT">
                      <block type="text" id="YLN{nC/X2wfAh!|SkI+=">
                        <field name="TEXT">---------------------------</field>
                      </block>
                    </value>
                    <next>
                      <block type="text_print" id="Rfgc=Ue;|3Gde_A]52eC">
                        <value name="TEXT">
                          <block type="json_to_text" id="lnpv!x)vY|tIY.:m7u!T">
                            <value name="JSON">
                              <block type="variables_get" id="m!eZ?8Q6RVJCn9L?p9[1">
                                <field name="VAR" id="ES0/)T6)?BE|qSt%jewk">transactionInfo</field>
                              </block>
                            </value>
                          </block>
                        </value>
                        <next>
                          <block type="text_print" id="2h;-~5m;)_|HUDvqv~/y">
                            <value name="TEXT">
                              <block type="text" id="aj2ThljKy~,{}wTAjR]2">
                                <field name="TEXT">---------------------------</field>
                              </block>
                            </value>
                            <next>
                              <block type="xrpl_unsubscribe_account_txn" id="-rK?aF\`hW8;u^MsOVDVo">
                                <value name="CLIENT">
                                  <block type="variables_get" id="+bA%y^)n7n#z3i@QZZN;">
                                    <field name="VAR" id="~_b6iJcgV_ym.fFIk9j5">xrplClient</field>
                                  </block>
                                </value>
                                <value name="ID">
                                  <block type="text" id="9,v!Gt|]0k}#|~Y=\`9!B">
                                    <field name="TEXT">subscribe1</field>
                                  </block>
                                </value>
                                <value name="ACCOUNTS">
                                  <block type="variables_get" id="%n7WmrCN=;1*;DAJC@;u">
                                    <field name="VAR" id="SCCBolVb[Z4Zs:Utl96W">exchanges</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="text_print" id="oj;?yw-~[6m+j[SX}nz!">
                                    <value name="TEXT">
                                      <block type="text" id="2Oq}EXBoFAzYkg{w;yV8">
                                        <field name="TEXT">Complete!</field>
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
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
`;
