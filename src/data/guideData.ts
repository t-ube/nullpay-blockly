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
    category: 'Control Flow',
    steps: [
      { id: '5', title: 'Making Decisions with If-Else', componentName: 'IfElseGuide' },
      { id: '6', title: 'Repeating Actions with While Loops', componentName: 'WhileLoopGuide' },
    ]
  },
  {
    category: 'Lists and Loops',
    steps: [
      { id: '7', title: 'Creating a List', componentName: 'CreatingListGuide' },
      { id: '8', title: 'Adding Items to a List', componentName: 'AddingToListGuide' },
      { id: '9', title: 'Looping Through a List', componentName: 'LoopingListGuide' },
    ]
  },
  {
    category: 'Xaman',
    steps: [
      { id: '10', title: 'Xaman Payment', componentName: 'XamanPaymentGuide' }, 
      { id: '11', title: 'Xaman Payment with Payload', componentName: 'XamanPaymentPayloadGuide' }, 
    ]
  },
];