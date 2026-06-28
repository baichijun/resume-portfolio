import { useResumeData } from "@/hooks/useResumeData";

// LAYOUT: from export/desktop.html (2026-06-28)
// BINDINGS: see layer-map.ts — Section/Contact, Card/Contact/*

/** Halo 联系方式 / Contact section aligned to Pencil export */
export function HaloContact() {
  const data = useResumeData();

  return (
    <section
      id="contact"
      data-pencil-name="Contact"
      className="scroll-mt-24 px-4 py-12 pb-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <h2
          data-pencil-name="Section/Contact"
          className="text-2xl font-bold text-[var(--theme-accent)] sm:text-[30px]/[normal]"
          style={{ fontFamily: "var(--theme-font-display)" }}
        >
          联系方式
        </h2>
        <div
          data-pencil-name="Section/Contact/List"
          className="box-border flex w-full shrink-0 flex-col gap-6 md:flex-row md:gap-6"
        >
          <a
            href={data.email ? `mailto:${data.email}` : undefined}
            data-pencil-name="Card/Contact/Email"
            className="box-border flex min-w-0 flex-1 flex-col gap-2 rounded-[var(--theme-radius)] border border-[var(--theme-border)] bg-[var(--theme-card)] p-7 shadow-[var(--theme-shadow)] backdrop-blur-sm transition hover:bg-[var(--theme-card-hover)]"
          >
            <p
              data-pencil-name="Label"
              className="text-xs text-[var(--theme-text-muted)]"
              style={{ fontFamily: "var(--theme-font-body)" }}
            >
              邮箱
            </p>
            <p
              data-pencil-name="Value"
              className="text-base font-semibold text-[var(--theme-text)]"
              style={{ fontFamily: "var(--theme-font-body)" }}
            >
              {data.email || "待补充"}
            </p>
          </a>
          <div
            data-pencil-name="Card/Contact/Phone"
            className="box-border flex min-w-0 flex-1 flex-col gap-2 rounded-[var(--theme-radius)] border border-[var(--theme-border)] bg-[var(--theme-card)] p-7 shadow-[var(--theme-shadow)] backdrop-blur-sm"
          >
            <p
              data-pencil-name="Label"
              className="text-xs text-[var(--theme-text-muted)]"
              style={{ fontFamily: "var(--theme-font-body)" }}
            >
              电话
            </p>
            <p
              data-pencil-name="Value"
              className="text-base font-semibold text-[var(--theme-text)]"
              style={{ fontFamily: "var(--theme-font-body)" }}
            >
              {data.phone || "待补充"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
