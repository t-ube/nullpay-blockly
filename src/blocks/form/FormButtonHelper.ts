// @/blocks/form/FormButtonHelper.ts
export function shadeColor(color: string, percent: number): string {
  const f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;
  return "#" + (
    0x1000000 +
    (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 +
    (Math.round((t - B) * p) + B)
  ).toString(16).slice(1);
}

export function createStylishColorButton(text: string, color: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = text;
  button.style.backgroundColor = color;
  button.style.border = 'none';
  button.style.color = 'white';
  button.style.padding = '10px 24px';
  button.style.textAlign = 'center';
  button.style.textDecoration = 'none';
  button.style.display = 'inline-block';
  button.style.fontSize = '16px';
  button.style.margin = '6px 10px';
  button.style.cursor = 'pointer';
  button.style.borderRadius = '4px';
  button.style.transition = 'background-color 0.3s ease';
  button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = shadeColor(color, -10);
  });

  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = color;
  });

  return button;
};

export function createStylishBorderColorButton(text: string, color: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = text;
  button.style.backgroundColor = 'white';
  button.style.border = `2px solid ${color}`;
  button.style.color = color;
  button.style.padding = '8px 22px';
  button.style.textAlign = 'center';
  button.style.textDecoration = 'none';
  button.style.display = 'inline-block';
  button.style.fontSize = '16px';
  button.style.margin = '6px 10px';
  button.style.cursor = 'pointer';
  button.style.borderRadius = '4px';
  button.style.transition = 'all 0.3s ease';
  button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
  button.style.fontWeight = 'bold';

  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = color;
    button.style.color = 'white';
  });

  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = 'white';
    button.style.color = color;
  });

  return button;
};

export function createStylishIconButton(text: string, icon: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.innerHTML = `${icon}${text}`;
  button.style.display = 'flex';
  button.style.flexDirection = 'column';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.padding = '10px';
  button.style.width = '140px';
  button.style.height = '40px';
  button.style.fontSize = '14px';
  button.style.fontWeight = 'bold';
  button.style.color = '#ffffff';
  button.style.backgroundColor = '#9CA3AF';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';
  button.style.transition = 'background-color 0.3s';
  button.style.textAlign = 'center';

  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = '#2196F3';
  });

  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = '#9CA3AF';
  });

  return button;
}

export function createDeleteButton(onDelete: () => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.innerHTML = '❌';
  button.style.marginLeft = '10px';
  button.style.padding = '5px 10px';
  button.style.backgroundColor = 'transparent';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  button.style.fontSize = '16px';
  button.classList.add("delete-button");
  button.addEventListener('click', onDelete);
  return button;
}
