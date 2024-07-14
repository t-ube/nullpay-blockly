export const DemoV0R4Chart = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="?if}UM_(hRl+^E.~#@S=">status</variable>
    <variable id="F45NtRZ%d(~g4(ZaO3r0">response</variable>
  </variables>
  <block type="controls_whileUntil" id=":clCTs/YNCAf,[qXsoLh" x="0" y="0">
    <field name="MODE">WHILE</field>
    <value name="BOOL">
      <block type="true" id="jqp:gfPIkj]xxI|s]]/="></block>
    </value>
    <statement name="DO">
      <block type="webapi_request" id="~3veFu$19_YR*,ZAH~xp">
        <field name="METHOD">GET</field>
        <field name="BODY_FORMAT">json</field>
        <field name="STATUS" id="?if}UM_(hRl+^E.~#@S=">status</field>
        <field name="RESPONSE" id="F45NtRZ%d(~g4(ZaO3r0">response</field>
        <value name="URL">
          <block type="text" id="Cstk%+c2-zEABkEe6{@_">
            <field name="TEXT">https://public.bitbank.cc/xrp_jpy/depth</field>
          </block>
        </value>
        <next>
          <block type="chart_order_book_block" id="XCs[{GNn~K\`|iG?dY*BA">
            <field name="INPUT">"Title"</field>
            <value name="TITLE">
              <block type="text" id="isz!3TeB;@\`}^CIL.bx@">
                <field name="TEXT">Order book live chart</field>
              </block>
            </value>
            <value name="PAIR">
              <block type="text" id="v^MV!cI9u,t.D1Zx:]z,">
                <field name="TEXT">XRP/JPY</field>
              </block>
            </value>
            <value name="DATA">
              <block type="chart_extract_balanced_order_book" id="4N]*ouot!!N-S:?,5Gc4">
                <value name="ORDERBOOK">
                  <block type="chart_bitbank_depth_to_order_book" id="uhWh26a$:2lu{b(Yi4iY">
                    <value name="DEPTH">
                      <block type="variables_get" id="/AJO-W3#V^|9Un{L.Od6">
                        <field name="VAR" id="F45NtRZ%d(~g4(ZaO3r0">response</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="LIMIT">
                  <block type="math_number" id="9W\`42hyJqQ!(a|]k@I9)">
                    <field name="NUM">10</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>
`;