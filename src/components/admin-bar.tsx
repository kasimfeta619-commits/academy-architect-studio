import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export function AdminBar() {
  const { user, loading } = useAuth();
  if (loading || !user) return null;

  return (
    <div className="sticky top-16 z-30 border-b border-border/60 bg-accent/10 backdrop-blur">
      <div className="container-editorial flex h-11 items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="uppercase tracking-widest">Admin mode</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin" className="text-foreground/80 hover:text-foreground">
            Dashboard
          </Link>
          <Link
            to="/admin/new"
            className="inline-flex items-center rounded-full bg-foreground text-background px-3 py-1.5 font-medium hover:bg-accent transition-colors"
          >
            + New project
          </Link>
        </div>
      </div>
    </div>
  );
}

