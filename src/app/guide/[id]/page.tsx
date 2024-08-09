import React from 'react';
import { guideData } from '@/data/guideData';
import dynamic from 'next/dynamic';

export async function generateStaticParams() {
  return guideData.flatMap(category => 
    category.steps.map(step => ({
      id: step.id,
    }))
  );
}

export const dynamicParams = false;

export default function GuidePage({ params }: { params: { id: string } }) {
  const guideStep = guideData
    .flatMap(category => category.steps)
    .find(step => step.id === params.id);
  
  if (!guideStep) {
    return <div>Guide item not found</div>;
  }

  const DynamicGuideContent = dynamic(() => import(`@/components/guides/${guideStep.componentName}`));

  return <DynamicGuideContent />;
}