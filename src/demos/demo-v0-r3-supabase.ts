export const DemoV0R3Supabase = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="TR.tJ)ZVHzrlBkNj:|58">supabaseClient</variable>
    <variable id="$+#Le9+jY|fc%74/=D+k">error</variable>
    <variable id="oftB%i+pbb-@^.x#nekb">data</variable>
  </variables>
  <block type="supabase_create_client" id="mrIw6i|cok({Ph!h56J:" x="0" y="0">
    <field name="VAR" id="TR.tJ)ZVHzrlBkNj:|58">supabaseClient</field>
    <value name="URL">
      <block type="text" id="dWmxUjE^FN|=zUC(DJVn">
        <field name="TEXT">https://xbhpawyihmyvuvqdrzsc.supabase.co</field>
      </block>
    </value>
    <value name="KEY">
      <block type="text" id="S#|a|_:XR23Y^LMd~9^O">
        <field name="TEXT">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiaHBhd3lpaG15dnV2cWRyenNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMTY1OTAsImV4cCI6MjAzNDc5MjU5MH0.hd-mml1jhCScf-Zw-5WuiFRHU999lIMDROsjFh9xPwI</field>
      </block>
    </value>
    <next>
      <block type="supabase_insert" id="$ujEBh$Q]}9ABnc0VBF-">
        <field name="VAR" id="$+#Le9+jY|fc%74/=D+k">error</field>
        <value name="CLIENT">
          <block type="variables_get" id="]WB#0,V.b)VNs[v)HG!2">
            <field name="VAR" id="TR.tJ)ZVHzrlBkNj:|58">supabaseClient</field>
          </block>
        </value>
        <value name="TABLE">
          <block type="text" id="r]AlH{hk1cO8Y{J9m~,}">
            <field name="TEXT">transactions</field>
          </block>
        </value>
        <value name="DATA">
          <block type="supabase_text_to_json" id="/~qG@;ST]PjjUAqB+97+">
            <value name="TEXT">
              <block type="text" id="Y3GhEqMKIy6Kgv,e_*Wv">
                <field name="TEXT">[{"transaction":{"abc":1},"number":1,"text":"abcdefg"}]</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="supabase_select" id=":d;I!)E1cjSp3k7O0fpu">
            <field name="CONDITION">gt</field>
            <field name="VAR" id="oftB%i+pbb-@^.x#nekb">data</field>
            <value name="CLIENT">
              <block type="variables_get" id="OI?2e?!;sq9EC=ztQCX|">
                <field name="VAR" id="TR.tJ)ZVHzrlBkNj:|58">supabaseClient</field>
              </block>
            </value>
            <value name="TABLE">
              <block type="text" id="(#Jr?,~g7-+a6-H7-Gje">
                <field name="TEXT">transactions</field>
              </block>
            </value>
            <value name="COLUMNS">
              <block type="text" id="5\`b4J~i%X0^x(5PdbM:T">
                <field name="TEXT">created_at,id,transaction,number,text</field>
              </block>
            </value>
            <value name="FILTER_COLUMN">
              <block type="text" id="CjSE]+87.kb;[!k6T:ud">
                <field name="TEXT">created_at</field>
              </block>
            </value>
            <value name="FILTER_VALUE">
              <block type="text" id="pxAcxz$]CW}-9XT3^aJ9">
                <field name="TEXT">2024-06-30 3:00:00</field>
              </block>
            </value>
            <next>
              <block type="text_print" id="D][=da|D[_\`eI4c/{W6Q">
                <value name="TEXT">
                  <block type="json_to_text" id="tqT]y9UHZ2xQNpVq57UH">
                    <value name="JSON">
                      <block type="variables_get" id="Hm3Y4/=mn3W|2*=VR~qS">
                        <field name="VAR" id="oftB%i+pbb-@^.x#nekb">data</field>
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
</xml>
`;