export const DemoV0R4WebApi = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="?if}UM_(hRl+^E.~#@S=">status</variable>
    <variable id="F45NtRZ%d(~g4(ZaO3r0">response</variable>
  </variables>
  <block type="webapi_request" id="~3veFu$19_YR*,ZAH~xp" x="0" y="0">
    <field name="METHOD">GET</field>
    <field name="BODY_FORMAT">json</field>
    <field name="STATUS" id="?if}UM_(hRl+^E.~#@S=">status</field>
    <field name="RESPONSE" id="F45NtRZ%d(~g4(ZaO3r0">response</field>
    <value name="URL">
      <block type="text" id="Cstk%+c2-zEABkEe6{@_">
        <field name="TEXT">https://openapi.bitrue.com/api/v1/depth?symbol=XRPUSDT</field>
      </block>
    </value>
    <next>
      <block type="text_print" id="X-,=s*XF5vjJtrLiV@*u">
        <value name="TEXT">
          <block type="json_to_text_v2" id="ZUdoCWmMT1DjIk)5Avxs">
            <value name="JSON">
              <block type="variables_get" id="kwzp~Kg(eQH*HdQdUJ8q">
                <field name="VAR" id="F45NtRZ%d(~g4(ZaO3r0">response</field>
              </block>
            </value>
          </block>
        </value>
      </block>
    </next>
  </block>
</xml>
`;