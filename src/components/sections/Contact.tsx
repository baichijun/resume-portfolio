import { motion } from "framer-motion";
import { useResumeData } from "@/hooks/useResumeData";
import { Section } from "@/components/layout/Section";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

/** 联系方式 / Contact section with email, phone and social placeholders */
export function Contact() {
  const data = useResumeData();
  const { theme } = useTheme();

  const cardClass =
    theme === "brutalist" ? "brutalist-panel p-6" : "glass-panel p-6";

  const links = [
    {
      label: "电子邮箱",
      value: data.email,
      href: data.email ? `mailto:${data.email}` : undefined,
      placeholder: !data.email,
    },
    {
      label: "联系电话",
      value: data.phone,
      href: data.phone ? `tel:${data.phone}` : undefined,
      placeholder: !data.phone,
    },
    {
      label: "GitHub",
      value: "待补充",
      href: undefined,
      placeholder: true,
    },
    {
      label: "社交媒体",
      value: "LinkedIn / 微信等",
      href: undefined,
      placeholder: true,
    },
  ];

  return (
    <Section id="contact" title="联系方式" subtitle="欢迎通过以下方式与我取得联系">
      <div className="grid gap-6 sm:grid-cols-2">
        {links.map((link, i) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={cardClass}
          >
            <p className="text-sm text-[var(--theme-text-muted)]">{link.label}</p>
            {link.href ? (
              <a
                href={link.href}
                className={cn(
                  "mt-2 block text-lg font-medium transition hover:text-[var(--theme-accent)]",
                  theme === "brutalist" && "underline decoration-4",
                )}
              >
                {link.value}
              </a>
            ) : (
              <div className="mt-2">
                <p className="text-lg font-medium text-[var(--theme-text-muted)]">{link.value}</p>
                {link.placeholder && <PlaceholderBadge label={link.label} className="mt-2" />}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {data.placeholders.length > 0 && (
        <motion.aside
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={cn("mt-8", cardClass)}
        >
          <h3 className="mb-3 font-semibold">待您补充的内容</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-[var(--theme-text-muted)]">
            {data.placeholders.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.aside>
      )}
    </Section>
  );
}
