export function formatAddress(address:string) : string {
  if (address.length > 10) {
    const start = address.substring(0, 5);
    const end = address.substring(address.length - 5);
    return `${start}...${end}`;
  } else {
    return address;
  }
}

export function removeDoubleQuotes(str: string): string {
  return str.replace(/^"|"$/g, '');
}
