(function () {
    const projectUrl = 'https://wlkzczynxoybwfyutiae.supabase.co';
    const publishableKey = 'sb_publishable_NnaGrxAuuqZAXzgK9_bqiQ_tlLdg238';

    window.SUPABASE_URL = projectUrl;
    window.SUPABASE_PUBLISHABLE_KEY = publishableKey;
    window.SITE_ADMIN_EMAIL = 'admin@architect.bg';
    window.SUPABASE_AUTH_REDIRECT_URL = window.location.hostname === 'v0.app' || window.location.hostname.endsWith('.v0.app')
        ? 'https://v0.app/chat/api/supabase/redirect/ngOFNJkW1Vj'
        : `${window.location.origin}/auth/callback`;
    window.siteSupabase = window.supabase.createClient(projectUrl, publishableKey, {
        auth: {
            storageKey: 'academy-architect-studio-auth',
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: false,
            flowType: 'pkce'
        }
    });
})();
