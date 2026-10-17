/**
 * بَج کوچک و دائمی «نسخه دمو» — در گوشه‌ی پایین سایت و پنل.
 */
import { siteConfig } from "../config/siteConfig";
import "./DemoBadge.css";

export default function DemoBadge() {
  if (!siteConfig.isDemo) return null;

  return (
    <div
      className="demo-badge"
      title="این یک نسخه نمایشی است؛ تمام داده‌ها جعلی هستند."
      aria-label="نسخه دمو"
    >
      <span className="demo-badge__dot" aria-hidden="true" />
      نسخه دمو
    </div>
  );
}
