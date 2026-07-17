import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/whoami")({
  head: () => ({ meta: [{ title: "Who am I — Admin diagnostic" }, { name: "robots", content: "noindex" }] }),
  component: WhoAmI,
});

function WhoAmI() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.navigate({ to: "/auth" });
  }, [loading, user, router]);

  const { data: roles, refetch: refetchRoles } = useQuery({
    queryKey: ["my-roles", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role, created_at")
        .eq("user_id", user!.id);
      if (error) throw error;
      return data ?? [];
    },
  });

  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  const runInsertTest = async () => {
    setTestStatus("Attempting insert…");
    setTestError(null);
    const slug = `__probe-${Date.now()}`;
    const { data, error } = await supabase
      .from("projects")
      .insert({ slug, title: "__probe", published: false, author_id: user?.id })
      .select("id")
      .maybeSingle();
    if (error) {
      setTestError(error.message);
      setTestStatus(null);
      return;
    }
    setTestStatus(`Insert OK (id=${data?.id}). Cleaning up…`);
    if (data?.id) {
      const { error: delErr } = await supabase.from("projects").delete().eq("id", data.id);
      if (delErr) setTestError(`Cleanup failed: ${delErr.message}`);
      else setTestStatus("Insert + delete succeeded. You have full admin write access ✓");
    }
  };

  if (loading || !user)
    return <div className="container-editorial py-24 text-sm text-muted-foreground">…</div>;

  return (
    <div className="container-editorial py-16 max-w-3xl">
      <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">← Admin</Link>
      <h1 className="mt-4 font-display text-4xl">Who am I?</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Diagnostic page — shows your account, roles and permissions.
      </p>

      <section className="mt-10 border border-border rounded-sm p-6 space-y-3">
        <Row label="User ID" value={<code className="text-xs break-all">{user.id}</code>} />
        <Row label="Email" value={user.email ?? "—"} />
        <Row label="Signed up" value={user.created_at ? new Date(user.created_at).toLocaleString() : "—"} />
        <Row
          label="Admin role"
          value={
            isAdmin ? (
              <span className="text-accent font-medium">✓ Yes — full access</span>
            ) : (
              <span className="text-destructive font-medium">✗ No — read-only</span>
            )
          }
        />
        <Row
          label="All roles"
          value={
            roles && roles.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {roles.map((r, i) => (
                  <span key={i} className="text-xs bg-muted px-2 py-1 rounded-sm font-mono">
                    {r.role}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">no roles assigned</span>
            )
          }
        />
      </section>

      {!isAdmin && (
        <section className="mt-8 border border-destructive/50 bg-destructive/5 rounded-sm p-6">
          <div className="eyebrow text-destructive">Access denied</div>
          <h2 className="mt-2 font-display text-2xl">You don't have the admin role</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Only accounts with the <code className="text-xs">admin</code> role can create, edit, or delete projects.
            The first account to sign up is granted admin automatically; subsequent accounts default to <code className="text-xs">user</code>.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            To grant admin to this account, an existing admin must run the following SQL in the database:
          </p>
          <pre className="mt-3 text-xs bg-background border border-border rounded-sm p-3 overflow-x-auto">
{`INSERT INTO public.user_roles (user_id, role)
VALUES ('${user.id}', 'admin')
ON CONFLICT DO NOTHING;`}
          </pre>
        </section>
      )}

      <section className="mt-8 border border-border rounded-sm p-6">
        <div className="eyebrow mb-2">RLS write test</div>
        <p className="text-sm text-muted-foreground">
          Attempts a real insert (then delete) on <code className="text-xs">projects</code> to verify your write access
          and reveal the exact database error message if it fails.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={runInsertTest}
            className="inline-flex items-center rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Run write test
          </button>
          <button
            onClick={() => refetchRoles()}
            className="text-xs underline underline-offset-4 text-muted-foreground"
          >
            Refresh roles
          </button>
        </div>
        {testStatus && <div className="mt-4 text-sm text-muted-foreground">{testStatus}</div>}
        {testError && (
          <div className="mt-4 text-sm text-destructive whitespace-pre-wrap font-mono bg-destructive/5 border border-destructive/30 p-3 rounded-sm">
            {testError}
          </div>
        )}
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-4 items-start text-sm">
      <div className="eyebrow">{label}</div>
      <div>{value}</div>
    </div>
  );
}
