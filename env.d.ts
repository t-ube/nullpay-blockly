// Generated by Wrangler
// by running `wrangler types --env-interface CloudflareEnv env.d.ts`

interface CloudflareEnv {
    NEXT_PUBLIC_XUMM_API_KEY:string,
    NEXT_PUBLIC_XUMM_API_SECRET:string,
    NEXT_PUBLIC_XUMM_API_REDIRECT_URI:string,
    NEXT_PUBLIC_OPENAI_API_KEY:string,
    NEXT_PUBLIC_ANTHROPIC_API_KEY:string,
    NEXT_PUBLIC_NOTION_CLIENT_ID:string,
    NEXT_PUBLIC_NOTION_CLIENT_SECRET:string,
    NEXT_PUBLIC_NOTION_REDIRECT_URI:string,
}

namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_XUMM_API_KEY: string,
        NEXT_PUBLIC_XUMM_API_SECRET: string,
        NEXT_PUBLIC_XUMM_API_REDIRECT_URI: string,
        NEXT_PUBLIC_OPENAI_API_KEY:string,
        NEXT_PUBLIC_ANTHROPIC_API_KEY:string,
        NEXT_PUBLIC_NOTION_CLIENT_ID:string,
        NEXT_PUBLIC_NOTION_CLIENT_SECRET:string,
        NEXT_PUBLIC_NOTION_REDIRECT_URI:string,
    }
}
