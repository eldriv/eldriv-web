"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  AdminTestimonial,
  TestimonialStatus,
} from "@/lib/testimonials-types";

type Counts = Record<TestimonialStatus, number>;

const TABS: { id: TestimonialStatus | "all"; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
  { id: "all", label: "All" },
];

const formatDate = (iso?: string): string => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

const statusBadgeClass = (status: TestimonialStatus) => {
  switch (status) {
    case "pending":
      return "bg-[#fd8128]/15 text-[#fd8128] border-[#fd8128]/30";
    case "approved":
      return "bg-emerald-300/15 text-emerald-300 border-emerald-300/30";
    case "rejected":
      return "bg-red-400/15 text-red-300 border-red-400/30";
  }
};

export default function AdminTestimonialsPage() {
  const [authState, setAuthState] = useState<
    "loading" | "unauthenticated" | "authenticated"
  >("loading");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const [submittingLogin, setSubmittingLogin] = useState(false);

  const [tab, setTab] = useState<TestimonialStatus | "all">("pending");
  const [items, setItems] = useState<AdminTestimonial[]>([]);
  const [counts, setCounts] = useState<Counts>({
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState<string | undefined>(undefined);
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/me", { cache: "no-store" });
      setAuthState(res.ok ? "authenticated" : "unauthenticated");
    } catch {
      setAuthState("unauthenticated");
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const fetchList = useCallback(async () => {
    setLoading(true);
    setActionError(undefined);
    try {
      const url =
        tab === "all"
          ? "/api/admin/testimonials"
          : `/api/admin/testimonials?status=${tab}`;
      const res = await fetch(url, { cache: "no-store" });
      if (res.status === 401) {
        setAuthState("unauthenticated");
        return;
      }
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(json.error || "Failed to load testimonials.");
      }
      const json = (await res.json()) as {
        testimonials: AdminTestimonial[];
        counts: Counts;
      };
      setItems(json.testimonials);
      setCounts(json.counts);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    if (authState === "authenticated") fetchList();
  }, [authState, fetchList]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(undefined);
    setSubmittingLogin(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(json.error || "Login failed.");
      }
      setPassword("");
      setAuthState("authenticated");
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmittingLogin(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthState("unauthenticated");
    setItems([]);
  };

  const setBusy = (id: string, busy: boolean) => {
    setBusyIds((prev) => {
      const next = new Set(prev);
      if (busy) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const updateStatus = async (id: string, status: TestimonialStatus) => {
    setActionError(undefined);
    setBusy(id, true);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(json.error || "Update failed.");
      }
      await fetchList();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setBusy(id, false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm("Permanently delete this testimonial?")) return;
    setActionError(undefined);
    setBusy(id, true);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(json.error || "Delete failed.");
      }
      await fetchList();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setBusy(id, false);
    }
  };

  const tabCounts = useMemo<Record<string, number | undefined>>(
    () => ({
      pending: counts.pending,
      approved: counts.approved,
      rejected: counts.rejected,
      all: counts.pending + counts.approved + counts.rejected,
    }),
    [counts]
  );

  if (authState === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <p className="text-white/60 text-sm">Loading…</p>
      </main>
    );
  }

  if (authState === "unauthenticated") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl border border-white/15 bg-gray-900/80 backdrop-blur-md p-7 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
        >
          <h1 className="text-xl text-white font-sans">Admin sign-in</h1>
          <p className="text-white/60 text-sm mt-1.5">
            Enter the admin password to moderate testimonials.
          </p>
          <label
            htmlFor="admin-password"
            className="block text-sm font-medium text-white mt-6"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            required
            className="mt-2 w-full rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#fd8128]/60 focus:bg-white/[0.06] transition-colors"
          />
          {loginError && (
            <div
              role="alert"
              className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 text-red-200 text-sm px-3 py-2"
            >
              {loginError}
            </div>
          )}
          <button
            type="submit"
            disabled={submittingLogin || !password}
            className="mt-6 w-full rounded-xl bg-[#fd8128] hover:bg-[#ff9033] text-white text-sm font-semibold h-11 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submittingLogin ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-8 py-10 max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="uppercase text-xs tracking-widest bg-gradient-to-r from-white to-[#fd8128] text-transparent bg-clip-text">
            Eldriv · Admin
          </p>
          <h1 className="font-sans text-2xl sm:text-3xl mt-2">
            Testimonial moderation
          </h1>
          <p className="text-white/60 text-sm mt-1.5">
            Approve, reject, or delete client-submitted testimonials. Approved
            ones appear in the public carousel for everyone.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white text-sm font-medium px-4 h-10 transition-colors"
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const isActive = tab === t.id;
          const count = tabCounts[t.id];
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 h-9 text-sm font-medium border transition-colors ${
                isActive
                  ? "bg-[#fd8128] border-[#fd8128] text-white"
                  : "bg-white/[0.04] border-white/15 text-white/70 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {t.label}
              {typeof count === "number" && (
                <span className="ml-2 text-xs opacity-80">{count}</span>
              )}
            </button>
          );
        })}
      </div>

      {actionError && (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-red-400/30 bg-red-500/10 text-red-200 text-sm px-3 py-2"
        >
          {actionError}
        </div>
      )}

      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="text-white/60 text-sm">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-white/60 text-sm">
            Nothing here yet for &ldquo;{tab}&rdquo;.
          </p>
        ) : (
          items.map((t) => {
            const isBusy = busyIds.has(t.id);
            return (
              <article
                key={t.id}
                className="rounded-2xl border border-white/10 bg-gray-900/60 p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-semibold text-sm sm:text-base">
                        {t.name}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border ${statusBadgeClass(
                          t.status
                        )}`}
                      >
                        {t.status}
                      </span>
                      {t.title && (
                        <span className="text-white/55 text-xs sm:text-sm">
                          · {t.title}
                        </span>
                      )}
                    </div>
                    <p className="text-white/85 text-sm mt-2 italic font-serif">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-2 text-[11px] text-white/45 flex flex-wrap gap-x-4 gap-y-1">
                      <span>Submitted: {formatDate(t.createdAt)}</span>
                      {t.reviewedAt && (
                        <span>Reviewed: {formatDate(t.reviewedAt)}</span>
                      )}
                      {t.projectTitle && (
                        <span>Project: {t.projectTitle}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {t.status !== "approved" && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => updateStatus(t.id, "approved")}
                        className="rounded-lg bg-emerald-300/15 hover:bg-emerald-300/25 text-emerald-200 border border-emerald-300/30 text-xs font-semibold px-3 h-8 disabled:opacity-50"
                      >
                        Approve
                      </button>
                    )}
                    {t.status !== "rejected" && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => updateStatus(t.id, "rejected")}
                        className="rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/80 border border-white/15 text-xs font-semibold px-3 h-8 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    )}
                    {t.status !== "pending" && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => updateStatus(t.id, "pending")}
                        className="rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/80 border border-white/15 text-xs font-semibold px-3 h-8 disabled:opacity-50"
                      >
                        Move to pending
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => deleteItem(t.id)}
                      className="rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-200 border border-red-400/30 text-xs font-semibold px-3 h-8 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </main>
  );
}
