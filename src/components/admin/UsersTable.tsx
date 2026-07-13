"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";
import { authApi } from "@/lib/api/authApi";
import { ApiRequestError } from "@/lib/apiClient";
import { cx } from "@/lib/utils";
import type { User, UserRole } from "@/types";
import styles from "./Admin.module.css";

const ROLE_FILTERS: { id: UserRole | "all"; label: string }[] = [
  { id: "all", label: "All roles" },
  { id: "admin", label: "Admin" },
  { id: "creator", label: "Creator" },
  { id: "subscriber", label: "Subscriber" },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase() : name.slice(0, 2).toUpperCase();
}

interface UsersTableProps {
  onTotalChange?: (total: number) => void;
}

export default function UsersTable({ onTotalChange }: UsersTableProps) {
  const { show } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError(null);
      try {
        const data = await authApi.getUsers({ page: 1, limit: 100, orderBy: "createdAt", order: "desc" });
        if (cancelled) return;
        setUsers(data.users);
        setTotal(data.pagination.total);
        onTotalChange?.(data.pagination.total);
      } catch (err) {
        if (cancelled) return;
        setLoadError(err instanceof ApiRequestError ? err.message : "Couldn't load users");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      const matchesQuery = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [users, query, roleFilter]);

  function notSupported() {
    show("Managing other users isn't supported by the API yet");
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeadRow}>
        <div>
          <h3 className={styles.cardTitle}>Users</h3>
          <p className={styles.cardSubtitle}>Live from GET /auth/users — read-only for now.</p>
        </div>
        <span className={styles.countBadge}>{total}</span>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>
            <Icon name="search" size={15} />
          </span>
          <input
            className={styles.searchInput}
            placeholder="Search by name or email…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          className={styles.select}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
        >
          {ROLE_FILTERS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {loadError ? (
        <div className={styles.emptyRow}>{loadError}</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4}>
                    <div className={styles.emptyRow}>Loading users…</div>
                  </td>
                </tr>
              ) : (
                <>
                  {filtered.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div className={styles.userCell}>
                          <span className={styles.userAvatar}>
                            {user.profileImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={user.profileImage}
                                alt={user.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                              />
                            ) : (
                              initials(user.name)
                            )}
                          </span>
                          <div>
                            <div className={styles.userName}>{user.name}</div>
                            <div className={styles.userEmail}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={cx(styles.roleTag, user.role === "admin" && styles.roleTagAdmin)}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</td>
                      <td>
                        <div className={styles.rowActions}>
                          <button
                            type="button"
                            className={styles.iconGhostButton}
                            onClick={notSupported}
                            title="Requires a backend endpoint that doesn't exist yet"
                          >
                            <Icon name="warning" size={13} />
                            Suspend
                          </button>
                          <button
                            type="button"
                            className={cx(styles.iconGhostButton, styles.dangerButton)}
                            onClick={notSupported}
                            title="Requires a backend endpoint that doesn't exist yet"
                          >
                            <Icon name="trash" size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={4}>
                        <div className={styles.emptyRow}>No users match your search.</div>
                      </td>
                    </tr>
                  ) : null}
                </>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.tableFooter}>
        <span className={styles.tableFooterText}>
          Showing {filtered.length} of {total} users
        </span>
      </div>
    </div>
  );
}
