import { createClient } from "@/lib/supabase/server"

export default async function AuthCheckPage() {
    const supabase = createClient()

    // Lebih aman pakai getUser
    const { data: { user }, error } = await supabase.auth.getUser()

    return (
        <pre>{JSON.stringify({ user, error }, null, 2)}</pre>
    )
}
