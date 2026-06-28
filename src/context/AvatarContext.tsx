import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useTheme } from "@/context/ThemeContext";
import { AVATAR_POOL, type AvatarPoolItem } from "@/skins/shared/constants";

export interface HeroAvatarState {
  id: AvatarPoolItem["id"];
  src: string;
  objectPosition: string;
  revision: number;
}

interface AvatarContextValue {
  avatar: HeroAvatarState;
}

const AvatarContext = createContext<AvatarContextValue | null>(null);

/** 随机选取，尽量避免与上一张相同 / Pick random avatar, prefer different from previous */
function pickRandomAvatar(excludeId?: AvatarPoolItem["id"]): AvatarPoolItem {
  if (AVATAR_POOL.length === 0) {
    throw new Error("AVATAR_POOL must not be empty");
  }
  if (AVATAR_POOL.length === 1) {
    return AVATAR_POOL[0];
  }

  let candidate = AVATAR_POOL[Math.floor(Math.random() * AVATAR_POOL.length)];
  if (excludeId && candidate.id === excludeId) {
    const alternate = AVATAR_POOL.find((item) => item.id !== excludeId);
    if (alternate) candidate = alternate;
  }
  return candidate;
}

function toAvatarState(
  item: AvatarPoolItem,
  revision: number,
): HeroAvatarState {
  return {
    id: item.id,
    src: item.src,
    objectPosition: item.objectPosition,
    revision,
  };
}

/** 预加载头像资源，减少切换闪烁 / Preload avatar URLs to reduce swap flicker */
function preloadAvatars(): void {
  for (const item of AVATAR_POOL) {
    const img = new Image();
    img.src = item.src;
  }
}

/** 刷新/切肤时随机头像 / Random hero avatar on refresh and theme change */
export function AvatarProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const [avatar, setAvatar] = useState<HeroAvatarState>(() =>
    toAvatarState(pickRandomAvatar(), 0),
  );
  const isFirstThemeEffect = useRef(true);

  useEffect(() => {
    preloadAvatars();
  }, []);

  useEffect(() => {
    if (isFirstThemeEffect.current) {
      isFirstThemeEffect.current = false;
      return;
    }
    setAvatar((prev) => {
      const next = pickRandomAvatar(prev.id);
      return toAvatarState(next, prev.revision + 1);
    });
  }, [theme]);

  const value = useMemo(() => ({ avatar }), [avatar]);

  return (
    <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>
  );
}

/** 当前 Hero 头像状态 / Current hero avatar for HeroAvatar component */
export function useHeroAvatar(): HeroAvatarState {
  const ctx = useContext(AvatarContext);
  if (!ctx) {
    throw new Error("useHeroAvatar must be used within AvatarProvider");
  }
  return ctx.avatar;
}
