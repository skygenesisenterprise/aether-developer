"use client";

/**
 * Sky Genesis Enterprise
 *
 * Scope: Official Website
 * Component: PublicHeader
 * Layer: Public UI
 * Purpose: Provides the primary marketing and documentation navigation for Aether Developer.
 *
 * Stability: Active
 * Owner: SGE Web Platform
 * Contact: contact@skygenesisenterprise.com
 */

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  FileCode2,
  GlobeLock,
  KeyRound,
  LayoutDashboard,
  Menu,
  Package2,
  Rocket,
  ScrollText,
  ShieldCheck,
  SquareTerminal,
  Store,
  Workflow,
} from "lucide-react";
import { useLocale as useIntlLocale, useTranslations } from "next-intl";
import { MegaMenuItem } from "@/components/public/MegaMenuItem";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface PublicHeaderProps {
  locale?: string;
  className?: string;
}

interface NavigationLinkItem {
  key: string;
  href: string;
  icon: LucideIcon;
  translationKey?: string;
}

interface NavigationGroup {
  key: string;
  href: string;
  matchPrefix: string;
  icon?: LucideIcon;
  items?: readonly NavigationLinkItem[];
}

function getPlatformItems(prefix: string): readonly NavigationLinkItem[] {
  return [
    { key: "overview", href: `${prefix}/platform`, icon: Rocket },
    { key: "apis", href: `${prefix}/platform/apis`, icon: Code2 },
    { key: "sdks", href: `${prefix}/platform/sdks`, icon: FileCode2 },
    { key: "cli", href: `${prefix}/platform/cli`, icon: SquareTerminal },
    { key: "sandbox", href: `${prefix}/platform/sandbox`, icon: Workflow },
    { key: "publishing", href: `${prefix}/platform/publishing`, icon: Package2 },
    { key: "dashboard", href: `${prefix}/platform/dashboard`, icon: LayoutDashboard },
    { key: "security", href: `${prefix}/platform/security`, icon: ShieldCheck },
  ];
}

function getProductItems(prefix: string): readonly NavigationLinkItem[] {
  return [
    { key: "identity", href: `${prefix}/products/identity`, icon: KeyRound },
    { key: "mail", href: `${prefix}/products/mail`, icon: ScrollText },
    { key: "edge", href: `${prefix}/products/edge`, icon: GlobeLock },
    { key: "status", href: `${prefix}/products/status`, icon: Activity },
    { key: "jobs", href: `${prefix}/products/jobs`, icon: BriefcaseBusiness },
    { key: "guilderia", href: `${prefix}/products/guilderia`, icon: Boxes },
    { key: "oblivionos", href: `${prefix}/products/oblivionos`, icon: Package2 },
    { key: "marketplace", href: `${prefix}/products/marketplace`, icon: Store },
  ];
}

function getProgramItems(prefix: string): readonly NavigationLinkItem[] {
  return [
    { key: "overview", href: `${prefix}/program/overview`, icon: BookOpen },
    { key: "membership", href: `${prefix}/program/membership`, icon: Boxes },
    { key: "verification", href: `${prefix}/program/verification`, icon: ShieldCheck },
    { key: "publishing", href: `${prefix}/program/publishing`, icon: Package2 },
    { key: "enterprise", href: `${prefix}/program/enterprise`, icon: BriefcaseBusiness },
    { key: "oss", href: `${prefix}/program/oss`, icon: FileCode2, translationKey: "openSource" },
    {
      key: "changelog",
      href: `${prefix}/program/changelog`,
      icon: ScrollText,
      translationKey: "guidelines",
    },
    { key: "support", href: `${prefix}/program/support`, icon: ArrowRight },
  ];
}

function getPublicNavigationGroups(prefix: string): readonly NavigationGroup[] {
  return [
    {
      key: "platform",
      href: `${prefix}/platform/overview`,
      matchPrefix: `${prefix}/platform`,
      icon: Rocket,
      items: getPlatformItems(prefix),
    },
    {
      key: "products",
      href: `${prefix}/products/identity`,
      matchPrefix: `${prefix}/products`,
      icon: KeyRound,
      items: getProductItems(prefix),
    },
    {
      key: "program",
      href: `${prefix}/program/overview`,
      matchPrefix: `${prefix}/program`,
      icon: BookOpen,
      items: getProgramItems(prefix),
    },
    {
      key: "docs",
      href: `${prefix}/developers`,
      matchPrefix: `${prefix}/developers`,
    },
    {
      key: "blog",
      href: `${prefix}/blog`,
      matchPrefix: `${prefix}/blog`,
    },
  ];
}

const appRoutes = {
  signIn: "/login",
  dashboard: "/dashboard",
} as const;

function isPathActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function isGroupActive(pathname: string, group: NavigationGroup) {
  return isPathActive(pathname, group.matchPrefix);
}

function getItemTranslationKey(item: NavigationLinkItem) {
  return item.translationKey ?? item.key;
}

function DesktopMenuLink({
  groupKey,
  item,
  pathname,
  t,
}: {
  groupKey: string;
  item: NavigationLinkItem;
  pathname: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const Icon = item.icon;
  const active = isPathActive(pathname, item.href);
  const itemKey = getItemTranslationKey(item);

  return (
    <li>
      <NextLink
        href={item.href}
        className={cn(
          "group flex min-h-[104px] gap-3 rounded-xl p-3 transition-colors duration-200",
          active ? "bg-accent text-foreground" : "hover:bg-muted/60",
        )}
      >
        <span
          className={cn(
            "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors",
            active
              ? "border-border bg-background text-foreground"
              : "border-transparent bg-muted text-muted-foreground group-hover:border-border/60 group-hover:bg-background group-hover:text-foreground",
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-foreground">
            {t(`groups.${groupKey}.items.${itemKey}.title`)}
          </span>
          <span className="mt-1 block text-xs leading-5 text-muted-foreground">
            {t(`groups.${groupKey}.items.${itemKey}.description`)}
          </span>
        </span>
      </NextLink>
    </li>
  );
}

function DesktopDropdown({
  group,
  pathname,
  t,
}: {
  group: NavigationGroup;
  pathname: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const active = isGroupActive(pathname, group);

  if (!group.items || !group.icon) {
    return (
      <li>
        <NextLink
          href={group.href}
          className={cn(
            "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t(`groups.${group.key}.title`)}
        </NextLink>
      </li>
    );
  }

  const GroupIcon = group.icon;

  return (
    <MegaMenuItem
      label={t(`groups.${group.key}.title`)}
      align="center"
      dropdownClassName="z-50"
      className={cn(active && "text-foreground")}
    >
      <div className="flex w-[min(92vw,68rem)] flex-col lg:flex-row">
        <div className="flex w-full flex-col justify-between border-b border-border bg-muted/30 p-6 lg:w-72 lg:border-b-0 lg:border-r">
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-foreground shadow-sm">
              <GroupIcon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-base font-semibold text-foreground">
              {t(`groups.${group.key}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t(`groups.${group.key}.summary`)}
            </p>
          </div>

          <NextLink
            href={group.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "mt-6 h-10 justify-between rounded-lg border border-border bg-background px-4 text-sm font-medium hover:bg-background",
            )}
          >
            {t("mobile.overviewLabel")}
            <ArrowRight className="h-4 w-4" />
          </NextLink>
        </div>

        <div className="flex-1 p-4 lg:p-6">
          <ul className="grid gap-2 sm:grid-cols-2">
            {group.items.map((item) => (
              <DesktopMenuLink
                key={item.href}
                groupKey={group.key}
                item={item}
                pathname={pathname}
                t={t}
              />
            ))}
          </ul>
        </div>
      </div>
    </MegaMenuItem>
  );
}

export function PublicHeader({ locale: initialLocale, className }: PublicHeaderProps) {
  const detectedLocale = useIntlLocale();
  const locale = initialLocale ?? detectedLocale;
  const t = useTranslations("Public.header");
  const pathname = usePathname();
  const prefix = `/${locale}`;
  const publicNavigationGroups = getPublicNavigationGroups(prefix);
  const localizedPathname =
    pathname === prefix || pathname.startsWith(`${prefix}/`)
      ? pathname
      : pathname === "/"
        ? prefix
        : `${prefix}${pathname}`;
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({
    platform: true,
    products: false,
    program: false,
  });

  const setGroupOpen = (groupKey: string, open: boolean) => {
    setOpenGroups((current) => ({ ...current, [groupKey]: open }));
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-background/95 text-foreground backdrop-blur supports-backdrop-filter:bg-background/85",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-8">
            <NextLink
              href={prefix}
              className="flex min-w-0 items-center gap-3"
              aria-label={t("brand.homeAriaLabel")}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-foreground shadow-sm transition-transform duration-200 hover:scale-[1.02]">
                <Code2 className="h-5 w-5" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-semibold leading-tight text-foreground">
                  {t("brand.name")}
                </span>
                <span className="truncate text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {t("brand.parent")}
                </span>
              </span>
            </NextLink>

            <nav
              className="hidden items-center lg:flex"
              aria-label={t("mobile.navigationAriaLabel")}
            >
              <ul className="flex items-center gap-1">
                {publicNavigationGroups.map((group) => (
                  <DesktopDropdown
                    key={group.key}
                    group={group}
                    pathname={localizedPathname}
                    t={t}
                  />
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-9 px-4 font-medium text-muted-foreground hover:text-foreground"
              >
                <NextLink href={appRoutes.signIn}>{t("actions.signIn")}</NextLink>
              </Button>
              <Button asChild size="sm" className="h-9 px-4 font-medium">
                <NextLink href={appRoutes.dashboard}>
                  {t("actions.dashboard")}
                  <ArrowRight className="h-4 w-4" />
                </NextLink>
              </Button>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label={t("mobile.openMenu")}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-full max-w-sm flex-col border-l border-border px-0"
              >
                <SheetHeader className="border-b border-border px-5 pb-4">
                  <SheetTitle className="text-left text-base font-semibold">
                    {t("brand.name")}
                  </SheetTitle>
                  <SheetDescription className="text-left">{t("tagline")}</SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <nav className="flex flex-col" aria-label={t("mobile.navigationAriaLabel")}>
                    {publicNavigationGroups.map((group) => {
                      const active = isGroupActive(localizedPathname, group);

                      if (!group.items) {
                        return (
                          <SheetClose asChild key={group.key}>
                            <NextLink
                              href={group.href}
                              className={cn(
                                "flex items-center justify-between border-b border-border/60 py-4 text-base font-medium transition-colors",
                                active
                                  ? "text-foreground"
                                  : "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              <span>{t(`groups.${group.key}.title`)}</span>
                              <ArrowRight className="h-4 w-4" />
                            </NextLink>
                          </SheetClose>
                        );
                      }

                      const open = openGroups[group.key] ?? false;

                      return (
                        <Collapsible
                          key={group.key}
                          open={open}
                          onOpenChange={(nextOpen) => setGroupOpen(group.key, nextOpen)}
                          className="border-b border-border/60"
                        >
                          <CollapsibleTrigger
                            className="flex w-full items-center justify-between py-4 text-left"
                            aria-expanded={open}
                          >
                            <span
                              className={cn(
                                "text-base font-medium",
                                active ? "text-foreground" : "text-muted-foreground",
                              )}
                            >
                              {t(`groups.${group.key}.title`)}
                            </span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                                open && "rotate-180",
                              )}
                            />
                          </CollapsibleTrigger>

                          <CollapsibleContent className="pb-4">
                            <div className="space-y-2">
                              <SheetClose asChild>
                                <NextLink
                                  href={group.href}
                                  className="block rounded-2xl border border-border bg-muted/30 px-4 py-3"
                                >
                                  <div className="text-sm font-semibold text-foreground">
                                    {t("mobile.overviewLabel")}
                                  </div>
                                  <div className="mt-1 text-sm leading-5 text-muted-foreground">
                                    {t(`groups.${group.key}.summary`)}
                                  </div>
                                </NextLink>
                              </SheetClose>

                              {group.items.map((item) => {
                                const Icon = item.icon;
                                const itemKey = getItemTranslationKey(item);

                                return (
                                  <SheetClose asChild key={item.href}>
                                    <NextLink
                                      href={item.href}
                                      className={cn(
                                        "flex gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-muted/40",
                                        isPathActive(localizedPathname, item.href) &&
                                          "bg-accent/50",
                                      )}
                                    >
                                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background">
                                        <Icon className="h-4 w-4" />
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block text-sm font-semibold text-foreground">
                                          {t(`groups.${group.key}.items.${itemKey}.title`)}
                                        </span>
                                        <span className="mt-1 block text-sm leading-5 text-muted-foreground">
                                          {t(
                                            `groups.${group.key}.items.${itemKey}.description`,
                                          )}
                                        </span>
                                      </span>
                                    </NextLink>
                                  </SheetClose>
                                );
                              })}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    })}
                  </nav>
                </div>

                <div className="border-t border-border px-5 py-5">
                  <div className="flex flex-col gap-3">
                    <SheetClose asChild>
                      <NextLink
                        href={appRoutes.signIn}
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "w-full justify-center rounded-full",
                        )}
                      >
                        {t("actions.signIn")}
                      </NextLink>
                    </SheetClose>
                    <SheetClose asChild>
                      <NextLink
                        href={appRoutes.dashboard}
                        className={cn(
                          buttonVariants({ variant: "default" }),
                          "w-full justify-center rounded-full",
                        )}
                      >
                        {t("actions.dashboard")}
                        <ArrowRight className="h-4 w-4" />
                      </NextLink>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
