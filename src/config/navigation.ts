import { siteCopy } from "@/config/siteCopy";

/** 顶栏导航项，与 siteCopy.nav 同步 / Header nav items aligned with site shell */
export const NAV_ITEMS = [
  siteCopy.nav.hero,
  siteCopy.nav.about,
  siteCopy.nav.projects,
  siteCopy.nav.contact,
] as const;
