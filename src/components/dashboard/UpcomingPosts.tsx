import { UPCOMING_POSTS } from "@/lib/constants";
import { cx } from "@/lib/utils";
import styles from "./Dashboard.module.css";

export default function UpcomingPostsCard() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeadRow}>
        <h3 className={styles.cardTitle}>Upcoming posts</h3>
        <span className={styles.countBadge}>18</span>
      </div>

      {UPCOMING_POSTS.map((post) => (
        <div key={post.id} className={styles.postRow}>
          <span className={styles.postDot} style={{ background: post.platformColor }} />
          <div className={styles.postBody}>
            <div className={styles.postTitle}>{post.title}</div>
            <div className={styles.postMeta}>
              {post.platform} · {post.schedule}
            </div>
          </div>
          <span className={cx(styles.postStatus, post.status === "Draft" && styles.postStatusDraft)}>
            {post.status}
          </span>
        </div>
      ))}
    </div>
  );
}
