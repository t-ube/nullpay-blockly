import { XummSdk } from 'xumm-sdk';
const xaman = new XummSdk(process.env.NEXT_PUBLIC_XUMM_API_KEY, process.env.NEXT_PUBLIC_XUMM_API_SECRET);
export default xaman;
