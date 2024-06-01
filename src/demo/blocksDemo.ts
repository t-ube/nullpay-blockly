export const DemoBlockXml = `
  <xml xmlns="https://developers.google.com/blockly/xml" id="demoBlocks" style="display: none">
    <variables>
      <variable id="FLOps7RStIedf8T6Cj.e">userInfo</variable>
      <variable id="Qpg##5jJet;/iZcxAsHM">payloadID</variable>
      <variable id=";XKRH!_e+3NgCbeNNtdu">error</variable>
    </variables>
    <block type="xaman_simple_login" id="1G4^q;#XDrsSU-K+fe[g" x="70" y="57">
      <field name="VAR" id="FLOps7RStIedf8T6Cj.e">userInfo</field>
      <next>
        <block type="xaman_payment" id="iXm]l;1xMGc[#%CZ3Bv%">
          <field name="VAR" id="Qpg##5jJet;/iZcxAsHM">payloadID</field>
          <field name="ERROR_VAR" id=";XKRH!_e+3NgCbeNNtdu">error</field>
          <value name="DESTINATION">
            <block type="xrpl_address" id="E}isnNO_;!U[I#.PUL3?">
              <field name="ADDRESS">rPJuukGFu7Awm2c2fBY8jcAndfEZQngbpD</field>
            </block>
          </value>
          <value name="AMOUNT">
            <block type="xrpl_xrp_to_drops" id="]J2MeW/S~^96l^zA.|mR">
              <value name="AMOUNT">
                <block type="math_number" id="ar[7Gjk|q8-^w;yz4QdC">
                  <field name="NUM">0.01</field>
                </block>
              </value>
            </block>
          </value>
          <value name="MEMO">
            <block type="text" id="y}+7gK{qmV:]$2N8@#j0">
              <field name="TEXT">This is a demonstration.</field>
            </block>
          </value>
          <next>
            <block type="dynamic_if" id="0b3x*.FmgL6[[R.;tKri">
              <mutation else="1"></mutation>
              <value name="IF0">
                <block type="variables_get" id="tB,!TpahgP0{=D;M]J=3">
                  <field name="VAR" id=";XKRH!_e+3NgCbeNNtdu">error</field>
                </block>
              </value>
              <statement name="DO0">
                <block type="text_print" id="+$%BJK2YazsqL9ahT)W|">
                  <value name="TEXT">
                    <block type="text" id="ZMC(,beC3=;ZhcnImLl1">
                      <field name="TEXT">Error</field>
                    </block>
                  </value>
                </block>
              </statement>
              <statement name="ELSE">
                <block type="text_print" id="~FG1)aSTV*fCS.iBydOR">
                  <value name="TEXT">
                    <block type="variables_get" id="mPQaUEZ8w_;b8o}0hF1)">
                      <field name="VAR" id="Qpg##5jJet;/iZcxAsHM">payloadID</field>
                    </block>
                  </value>
                  <next>
                    <block type="xaman_wait_for_signature" id="pW(vn]2*l=Y2Y)KQaK9k">
                      <value name="PAYLOAD">
                        <block type="variables_get" id="*eBJWH#[YvoJ.okwq]{Q">
                          <field name="VAR" id="Qpg##5jJet;/iZcxAsHM">payloadID</field>
                        </block>
                      </value>
                      <next>
                        <block type="text_print" id="Pwt64\`$yY=32Y^XtaQs\`">
                          <value name="TEXT">
                            <block type="text" id="-w{!b{GF/h(WM[zi;L}v">
                              <field name="TEXT">Congrats!</field>
                            </block>
                          </value>
                          <next>
                            <block type="confetti_animation" id="u!bNEB=A*!0+WRPjVU7)">
                              <field name="DURATION">5</field>
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
  </xml>
`;
