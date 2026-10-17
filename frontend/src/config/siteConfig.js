/**
 * =====================================================================
 *  فایل کانفیگ برند — تنها منبع حقیقت برای هویت آموزشگاه
 * ---------------------------------------------------------------------
 *  برای بازبرندینگ برای هر آموزشگاه جدید کافی است مقادیر این فایل
 *  (یا متغیرهای محیطی REACT_APP_* متناظر) را تغییر دهید.
 *
 *  هیچ مقدار برند دیگری نباید در کامپوننت‌ها هاردکد شود.
 * =====================================================================
 */

const env = typeof process !== "undefined" && process.env ? process.env : {};

/** حالت دمو: پیش‌فرض فعال است. برای حالت اتصال به سرور واقعی، REACT_APP_DEMO_MODE=false قرار دهید. */
export const isDemoMode = (env.REACT_APP_DEMO_MODE || "true") !== "false";

export const siteConfig = {
  /* ------------------------------------------------ نام و برند */
  instituteName: env.REACT_APP_INSTITUTE_NAME || "آموزشگاه زبان نمونه",
  instituteNameEn: env.REACT_APP_INSTITUTE_NAME_EN || "Demo Language Academy",
  tagline:
    env.REACT_APP_INSTITUTE_TAGLINE ||
    "مرکز آموزش زبان انگلیسی — نسخه نمایشی",
  shortName: env.REACT_APP_INSTITUTE_SHORT_NAME || "نمونه",
  logoPath: env.REACT_APP_LOGO_PATH || "/logo.png",

  /* ------------------------------------------------ تماس و آدرس */
  phones: [
    env.REACT_APP_INSTITUTE_PHONE_1 || "021-00000000",
    env.REACT_APP_INSTITUTE_PHONE_2 || "021-00000001",
  ],
  address:
    env.REACT_APP_INSTITUTE_ADDRESS ||
    "تهران، میدان ونک، خیابان ولیعصر، پلاک ۱۰۰ — ساختمان آموزشی نمونه",

  /* ------------------------------------------------ شبکه‌های اجتماعی */
  socialLinks: [
    { label: "اینستاگرام", type: "instagram", href: "#" },
    { label: "تلگرام", type: "telegram", href: "#" },
    { label: "واتساپ", type: "whatsapp", href: "#" },
  ],

  /* ------------------------------------------------ جزئیات پاورقی و نقشه */
  footerNote:
    env.REACT_APP_FOOTER_NOTE ||
    "نسخه دمو — تمام داده‌های نمایش‌داده‌شده در این سامانه فرضی و جعلی هستند.",
  mapEmbedUrl: env.REACT_APP_MAP_EMBED_URL || "",

  /* ------------------------------------------------ حالت دمو */
  isDemo: isDemoMode,

  /* ------------------------------------------------ متادیتا */
  meta: {
    title: "آموزشگاه زبان نمونه — نسخه دمو",
    description: "سامانه مدیریت آموزشگاه زبان انگلیسی — نسخه دمو",
    themeColor: "#4F46E5",
  },
};

export default siteConfig;
