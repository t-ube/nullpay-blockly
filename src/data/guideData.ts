export interface IGuideStep {
  id: string;
  title: string;
  componentName: string;
}

export interface IGuideCategory {
  category: string;
  steps: IGuideStep[];
}

export const guideData: IGuideCategory[] = [
  {
    category: 'Getting Started',
    steps: [
      { id: '1', title: 'Hello World', componentName: 'HelloWorldGuide' },
      { id: '2', title: 'Basic Math Operations', componentName: 'BasicMathGuide' },
      { id: '3', title: 'Text Concatenation', componentName: 'TextConcatenationGuide' },
      { id: '4', title: 'Working with Variables', componentName: 'VariablesGuide' },
    ]
  },
  {
    category: 'Account',
    steps: [
      { id: '100', title: 'XRPL Testnet Generate Wallet', componentName: 'XRPLTestnetGenerateWalletGuide' }, 
      { id: '101', title: 'XRPL Account Information Retrieval', componentName: 'XRPLAccountInfoGuide' }, 
      { id: '102', title: 'XRPL Account Information Retrieval with Xaman', componentName: 'XRPLXamanAccountInfoGuide' }, 
    ]
  },
  {
    category: 'Payment',
    steps: [
      { id: '200', title: 'Xaman Payment Process', componentName: 'XamanPaymentGuide' }, 
      { id: '201', title: 'Xaman Payment with Payload', componentName: 'XamanPaymentPayloadGuide' },
      { id: '202', title: 'XRPL Payment Process', componentName: 'XRPLPaymentGuide'}, 
      { id: '203', title: 'XRPL Detailed Payment Process', componentName: 'XRPLDetailedPaymentGuide'},  
    ]
  },
  {
    category: 'NFT',
    steps: [
      { id: '300', title: 'Creating an NFT Buy Offer on XRPL with Xaman', componentName: 'XRPLNFTBuyOfferGuide' }, 
    ]
  },
  {
    category: 'Control Flow',
    steps: [
      { id: '50', title: 'Making Decisions with If-Else', componentName: 'IfElseGuide' },
      { id: '51', title: 'Repeating Actions with While Loops', componentName: 'WhileLoopGuide' },
    ]
  },
  {
    category: 'Lists and Loops',
    steps: [
      { id: '60', title: 'Creating a List', componentName: 'CreatingListGuide' },
      { id: '61', title: 'Adding Items to a List', componentName: 'AddingToListGuide' },
      { id: '62', title: 'Looping Through a List', componentName: 'LoopingListGuide' },
    ]
  },
];