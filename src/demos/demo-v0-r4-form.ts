export const DemoV0R4Form = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id=";z!a2xC^GeJya%K349f$">result</variable>
  </variables>
  <block type="form_modal_block" id="/yh?qxZS5|wvO)Ua*~(S" x="0" y="0">
    <field name="INPUT">{"editable":false,"title":{"default":"Form Title"},"items":{"label_0":{"key":"label_0","value":"ABC","type":"string","name":{"default":"Param1"},"description":{"default":"New Description"}}}}</field>
    <field name="FORM_RESULT" id=";z!a2xC^GeJya%K349f$">result</field>
    <next>
      <block type="dynamic_if" id=";q_fdtZar$B04v?F_VEP">
        <mutation else="1"></mutation>
        <value name="IF0">
          <block type="form_submitted" id="Fze8yGSp#TqSb-s|;A7%">
            <value name="FORM_RESULT">
              <block type="variables_get" id="Lds_9W*eitD~,z%4-#@:">
                <field name="VAR" id=";z!a2xC^GeJya%K349f$">result</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO0">
          <block type="text_print" id="noO.(y9Rl)[r6@Vg/v|P">
            <value name="TEXT">
              <block type="text" id="D~\`S,5_}5_Hy[/aR^]In">
                <field name="TEXT">submitted</field>
              </block>
            </value>
            <next>
              <block type="text_print" id="I9#y/i)|$N4fnR;,SB@j">
                <value name="TEXT">
                  <block type="form_variable_get" id="-_fN_!Z;ukoi#Jo}2l-I">
                    <value name="FORM_RESULT">
                      <block type="variables_get" id="a)U![Co7|:/7{2EPOi$L">
                        <field name="VAR" id=";z!a2xC^GeJya%K349f$">result</field>
                      </block>
                    </value>
                    <value name="NAME">
                      <block type="text" id="c1+-UU()ma}Z2Y8~Hi0\`">
                        <field name="TEXT">Param1</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </statement>
        <statement name="ELSE">
          <block type="text_print" id="KxFCfl6L-7s(@kbFQh_P">
            <value name="TEXT">
              <block type="text" id="r!VB03@K4Ln!Z]*Vk~v%">
                <field name="TEXT">cancel</field>
              </block>
            </value>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>
`;