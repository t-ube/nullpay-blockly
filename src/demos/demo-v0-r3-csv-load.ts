export const DemoV0R3CsvLoadXml = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="7eS^:vno|7w$R,nJ4c|!">csv</variable>
    <variable id="2=71lVd$7rX]Qs(dBzvy">table</variable>
    <variable id="Ujm}94h(.OSmL%aNGTCo">column</variable>
    <variable id="ElY=y_c+SRB4UU!nMf(t">i</variable>
  </variables>
  <block type="variables_set" id="EA(1E#xlSp8-]?uh!;zr" x="102" y="-170">
    <field name="VAR" id="7eS^:vno|7w$R,nJ4c|!">csv</field>
    <value name="VALUE">
      <block type="table_load_csv" id="--zfX}}iWN*P7k:ra{wJ">
        <field name="TABLE">[["",""],["",""]]</field>
        <comment pinned="true" h="38.888885498046875" w="154.44439697265625">Load CSV file</comment>
      </block>
    </value>
    <next>
      <block type="variables_set" id="5%;_y4)G|LPW5k,V1t.,">
        <field name="VAR" id="2=71lVd$7rX]Qs(dBzvy">table</field>
        <value name="VALUE">
          <block type="csv_to_table" id="w,No7me$SL4jEtJ8,F#Q">
            <field name="EXCLUDE_HEADER">FALSE</field>
            <value name="TABLE_TEXT">
              <block type="variables_get" id="!cx8Z__-qbOTe0Uc}uZF">
                <field name="VAR" id="7eS^:vno|7w$R,nJ4c|!">csv</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="variables_set" id="ji4v\`aii?uOvMui\`($P%">
            <field name="VAR" id="Ujm}94h(.OSmL%aNGTCo">column</field>
            <value name="VALUE">
              <block type="table_get_column" id="|E]]E7q3)o#el(4Z8keq">
                <value name="TABLE">
                  <block type="variables_get" id="_s@eek^I{6Bm!xEQphhm">
                    <field name="VAR" id="2=71lVd$7rX]Qs(dBzvy">table</field>
                  </block>
                </value>
                <value name="COLUMN">
                  <block type="math_number" id="HdCY}H+TG%)bfSoEmAHp">
                    <field name="NUM">1</field>
                  </block>
                </value>
              </block>
            </value>
            <next>
              <block type="control_run_speed" id="k.Y\`d5h{W%F.yC|v*FC]">
                <field name="SPEED">1000</field>
                <next>
                  <block type="controls_forEach" id="/%z-=#~%0Ch]sk0(a#p=">
                    <field name="VAR" id="ElY=y_c+SRB4UU!nMf(t">i</field>
                    <value name="LIST">
                      <block type="variables_get" id="h1Sf#jsS\`TYS-~3yJ]XB">
                        <field name="VAR" id="Ujm}94h(.OSmL%aNGTCo">column</field>
                      </block>
                    </value>
                    <statement name="DO">
                      <block type="text_print" id="%+JakUJQgJ)|_[~]3QWT">
                        <value name="TEXT">
                          <block type="variables_get" id="!0%luMK62I)2{AP?1\`%w">
                            <field name="VAR" id="ElY=y_c+SRB4UU!nMf(t">i</field>
                          </block>
                        </value>
                      </block>
                    </statement>
                    <next>
                      <block type="table_csv_save" id="fzZc{*BMNH9V%!fe7qPS">
                        <comment pinned="true" h="40" w="141.11111450195312">Save CSV file</comment>
                        <value name="TABLE">
                          <block type="variables_get" id="w8-6c5Vdo*3FQDNqc=Y-">
                            <field name="VAR" id="2=71lVd$7rX]Qs(dBzvy">table</field>
                          </block>
                        </value>
                        <value name="FILENAME">
                          <block type="text" id="iv;S)l?AQ86gUTGAGVy,">
                            <field name="TEXT">newTable.csv</field>
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
</xml>
`;