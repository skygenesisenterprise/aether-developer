import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import * as React from "react";
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  BookOpen,
  Bot,
  Boxes,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  FileCheck2,
  FileCode2,
  GlobeLock,
  KeyRound,
  LayoutDashboard,
  Mail,
  MonitorCog,
  Package2,
  PanelTop,
  Rocket,
  ScrollText,
  SearchCode,
  ShieldCheck,
  Store,
  TerminalSquare,
  UserRoundCheck,
  Waves,
  Webhook,
  Workflow,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { type Locale } from "@/lib/locale";
import { PublicHeader } from "@/components/public/header";
import { Footer } from "@/components/public/Footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface KeyedItem {
  key: string;
}

interface StatusItem extends KeyedItem {
  status: "available" | "preview" | "planned";
}

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
    </div>
  );
}

function SurfaceCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.18)]",
        className,
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-background">
        <Icon className="h-5 w-5 text-foreground" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}

function StatusBadge({
  label,
  tone,
}: {
  label: string;
  tone: "available" | "preview" | "planned";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em]",
        tone === "available" && "border-emerald-200 bg-emerald-50 text-emerald-700",
        tone === "preview" && "border-amber-200 bg-amber-50 text-amber-700",
        tone === "planned" && "border-slate-200 bg-slate-100 text-slate-600",
      )}
    >
      {label}
    </span>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Public.home.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function DeveloperHomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Public.home" });

  const hubItems: Array<KeyedItem & { icon: typeof BookOpen }> = [
    { key: "documentation", icon: BookOpen },
    { key: "apis", icon: SearchCode },
    { key: "sdks", icon: FileCode2 },
    { key: "cli", icon: TerminalSquare },
    { key: "sandbox", icon: MonitorCog },
    { key: "publishing", icon: Package2 },
  ];

  const productItems: Array<KeyedItem & { icon: typeof KeyRound }> = [
    { key: "identity", icon: KeyRound },
    { key: "mail", icon: Mail },
    { key: "edge", icon: GlobeLock },
    { key: "status", icon: Waves },
    { key: "jobs", icon: BriefcaseBusiness },
    { key: "guilderia", icon: Bot },
    { key: "oblivionos", icon: PanelTop },
    { key: "marketplace", icon: Store },
  ];

  const productionItems: Array<KeyedItem & { icon: typeof Rocket }> = [
    { key: "createApps", icon: Rocket },
    { key: "manageAccess", icon: ShieldCheck },
    { key: "testSafely", icon: MonitorCog },
    { key: "validateManifests", icon: FileCheck2 },
    { key: "submitReview", icon: ScrollText },
    { key: "monitorUsage", icon: LayoutDashboard },
  ];

  const sdkItems: Array<KeyedItem & { icon: typeof Code2 }> = [
    { key: "typescript", icon: Code2 },
    { key: "python", icon: Workflow },
    { key: "go", icon: Boxes },
    { key: "rust", icon: ShieldCheck },
  ];

  const toolItems: Array<StatusItem & { icon: typeof TerminalSquare }> = [
    { key: "cli", icon: TerminalSquare, status: "available" },
    { key: "apiExplorer", icon: SearchCode, status: "preview" },
    { key: "webhookInspector", icon: Webhook, status: "available" },
    { key: "permissionBuilder", icon: KeyRound, status: "preview" },
    { key: "manifestValidator", icon: FileCheck2, status: "available" },
    { key: "sandboxConsole", icon: MonitorCog, status: "available" },
    { key: "sdkGenerator", icon: Blocks, status: "planned" },
  ];

  const trustPoints = [
    "noLicense",
    "openSource",
    "selfHosted",
    "review",
    "privateDistribution",
    "verification",
  ];

  const guilderiaUseCases = [
    "diceBots",
    "questManagers",
    "characterSheets",
    "loreCodex",
    "moderationApps",
    "factionSystems",
    "serverTemplates",
    "selfHostedTools",
  ];

  const programTiers: Array<KeyedItem & { icon: typeof UserRoundCheck }> = [
    { key: "community", icon: BookOpen },
    { key: "registered", icon: Rocket },
    { key: "verified", icon: BadgeCheck },
    { key: "enterprise", icon: BriefcaseBusiness },
    { key: "partner", icon: UserRoundCheck },
  ];

  const statusLabel = (status: StatusItem["status"]) => t(`tools.status.${status}`);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader />

      <main>
        <section className="relative overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.04),transparent_32%),radial-gradient(circle_at_top_right,rgba(15,23,42,0.03),transparent_30%)]">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {t("hero.eyebrow")}
              </div>
              <h1 className="mt-7 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                {t("hero.description")}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full px-6">
                  <Link href="/dashboard">
                    {t("hero.actions.start")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-6">
                  <Link href="/docs">{t("hero.actions.docs")}</Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="h-12 rounded-full px-6">
                  <Link href="/program">{t("hero.actions.program")}</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-4xl border border-border/60 bg-card p-4 shadow-[0_30px_80px_-36px_rgba(15,23,42,0.24)] sm:p-5">
                <div className="rounded-[1.5rem] border border-border/60 bg-background p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {t("hero.visual.dashboardTitle")}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {t("hero.visual.dashboardDescription")}
                      </div>
                    </div>
                    <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {t("hero.visual.ready")}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/60 bg-muted/25 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Webhook className="h-4 w-4" />
                        {t("hero.visual.cardOneTitle")}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {t("hero.visual.cardOneDescription")}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-muted/25 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <FileCheck2 className="h-4 w-4" />
                        {t("hero.visual.cardTwoTitle")}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {t("hero.visual.cardTwoDescription")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-border/60 bg-slate-950 p-4 text-slate-50">
                    <div className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {t("hero.visual.cliLabel")}
                    </div>
                    <div className="mt-3 space-y-2 font-mono text-sm">
                      <div>{t("hero.visual.commandOne")}</div>
                      <div className="text-slate-400">{t("hero.visual.commandTwo")}</div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(["typescript", "python", "go", "rust"] as const).map((sdk) => (
                      <span
                        key={sdk}
                        className="rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {t(`hero.visual.badges.${sdk}`)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 bg-muted/20 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={t("hub.eyebrow")}
              title={t("hub.title")}
              description={t("hub.description")}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {hubItems.map((item) => (
                <SurfaceCard
                  key={item.key}
                  icon={item.icon}
                  title={t(`hub.cards.${item.key}.title`)}
                  description={t(`hub.cards.${item.key}.description`)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={t("platforms.eyebrow")}
              title={t("platforms.title")}
              description={t("platforms.description")}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {productItems.map((item) => (
                <SurfaceCard
                  key={item.key}
                  icon={item.icon}
                  title={t(`platforms.products.${item.key}.title`)}
                  description={t(`platforms.products.${item.key}.description`)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 bg-muted/20 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={t("production.eyebrow")}
              title={t("production.title")}
              description={t("production.description")}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {productionItems.map((item) => (
                <SurfaceCard
                  key={item.key}
                  icon={item.icon}
                  title={t(`production.cards.${item.key}.title`)}
                  description={t(`production.cards.${item.key}.description`)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={t("tools.eyebrow")}
              title={t("tools.title")}
              description={t("tools.description")}
            />

            <div className="mt-12 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-4xl border border-border/60 bg-card p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("tools.sdksLabel")}
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {sdkItems.map((item) => (
                    <SurfaceCard
                      key={item.key}
                      icon={item.icon}
                      title={t(`tools.sdks.${item.key}.title`)}
                      description={t(`tools.sdks.${item.key}.description`)}
                      className="h-full rounded-[1.4rem] p-5 shadow-none"
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-4xl border border-border/60 bg-card p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("tools.toolingLabel")}
                </div>
                <div className="mt-5 grid gap-3">
                  {toolItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.key}
                        className="flex flex-col gap-4 rounded-[1.4rem] border border-border/60 bg-background p-5 sm:flex-row sm:items-start sm:justify-between"
                      >
                        <div className="flex gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-muted/25">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-base font-semibold text-foreground">
                              {t(`tools.items.${item.key}.title`)}
                            </div>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                              {t(`tools.items.${item.key}.description`)}
                            </p>
                          </div>
                        </div>
                        <StatusBadge label={statusLabel(item.status)} tone={item.status} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 bg-muted/20 py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <SectionHeading
                eyebrow={t("trust.eyebrow")}
                title={t("trust.title")}
                description={t("trust.description")}
              />
            </div>
            <div className="rounded-4xl border border-border/60 bg-card p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {trustPoints.map((key) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div className="text-sm leading-6 text-foreground">{t(`trust.points.${key}`)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-4xl border border-border/60 bg-[linear-gradient(180deg,rgba(248,250,252,1),rgba(248,250,252,0.72))] p-8 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {t("guilderia.eyebrow")}
                  </div>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    {t("guilderia.title")}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                    {t("guilderia.description")}
                  </p>
                  <Button asChild variant="outline" size="lg" className="mt-8 rounded-full px-6">
                    <Link href="/products/guilderia">
                      {t("guilderia.action")}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {guilderiaUseCases.map((key) => (
                    <div
                      key={key}
                      className="rounded-2xl border border-border/60 bg-background px-4 py-4 text-sm font-medium text-foreground"
                    >
                      {t(`guilderia.useCases.${key}`)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 bg-muted/20 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={t("program.eyebrow")}
              title={t("program.title")}
              description={t("program.description")}
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-5">
              {programTiers.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.key}
                    className="rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.18)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-background">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-foreground">
                      {t(`program.tiers.${item.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {t(`program.tiers.${item.key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-10">
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <Link href="/program">{t("program.action")}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-4xl border border-border/60 bg-card px-6 py-10 shadow-[0_24px_70px_-34px_rgba(15,23,42,0.2)] sm:px-10 sm:py-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {t("finalCta.eyebrow")}
                  </div>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    {t("finalCta.title")}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                    {t("finalCta.description")}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="rounded-full px-6">
                    <Link href="/docs">{t("finalCta.actions.docs")}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                    <Link href="/dashboard">{t("finalCta.actions.dashboard")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  );
}
