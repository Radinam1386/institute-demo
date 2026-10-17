import {
  Phone,
  MapPin,
} from "lucide-react";
import "./ContactPage.css";
import { siteConfig } from "../config/siteConfig";

const SOCIAL_ICONS = {
  instagram: (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  telegram: (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.5 2.5L2 10l7 2.5 2.5 7L21.5 2.5z" />
      <path d="M9 12.5l3.5 3.5" />
    </svg>
  ),
  whatsapp: (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
};

const CONTACTS = (siteConfig.phones || []).map((p) => ({
  label: p,
  href: `tel:${p.replace(/[^0-9]/g, "")}`,
}));

const ADDRESS = siteConfig.address;

const SOCIALS = (siteConfig.socialLinks || []).map((s) => ({
  label: s.label,
  href: s.href || "#",
  icon: SOCIAL_ICONS[s.type] || SOCIAL_ICONS.telegram,
}));

function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-blob contact-blob-1" />
      <div className="contact-blob contact-blob-2" />
      <div className="contact-blob contact-blob-3" />
      <section className="contact-hero">
        <div className="contact-hero-content1">
          <span className="contact-hero-badge">در تماس باشیم</span>
          <h1 className="contact-hero-title">ارتباط با ما</h1>
          <p className="contact-hero-subtitle">
            سوالی درباره دوره‌ها دارید؟ می‌خواهید ثبت‌نام کنید؟ همین حالا با ما
            تماس بگیرید.
          </p>
        </div>
      </section>

      <section className="contact-body">
        <div className="contact-grid">
          <div className="contact-info-card">
            <h2 className="contact-card-title">اطلاعات تماس</h2>

            <div className="contact-info-list">
              {CONTACTS.map((c) => (
                <a key={c.href} href={c.href} className="contact-info-item">
                  <span className="contact-info-icon">
                    <Phone size={18} />
                  </span>
                  <span>{c.label}</span>
                </a>
              ))}

              <div className="contact-info-item contact-info-address">
                <span className="contact-info-icon">
                  <MapPin size={18} />
                </span>
                <span>{ADDRESS}</span>
              </div>
            </div>

            <div className="contact-socials">
              <span className="contact-socials-label">ما را دنبال کنید</span>
              <div className="contact-socials-row">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    aria-label={s.label}
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            {siteConfig.mapEmbedUrl ? (
              <div className="contact-map">
                <iframe
                  src={siteConfig.mapEmbedUrl}
                  title={`مشاهده «${siteConfig.instituteName}» روی نقشه`}
                  className="contact-map"
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
