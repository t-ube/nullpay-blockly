import React from 'react';

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex' }}>
      <main style={{ flexGrow: 1, padding: '20px' }}>{children}</main>
    </div>
  );
}
