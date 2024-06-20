import {LucideIcon} from "lucide-react";
import {Link} from "react-router-dom";

import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

interface NavProps {
    isCollapsed: boolean;
    links: {
        title: string;
        label?: string;
        icon: LucideIcon;
        variant: "default" | "ghost";
        href: string;
    }[];
}

export function Nav({links, isCollapsed}: NavProps) {
    const pathName = window.location.pathname;

    return (
        <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2" data-collapsed={isCollapsed}>
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    isCollapsed ? (
                        <Tooltip key={index} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link
                                    className={cn(
                                        buttonVariants({
                                            variant: link.href === pathName ? "default" : "ghost",
                                            size: "icon",
                                        }),
                                        "h-9 w-9",
                                        link.variant === "default" &&
                                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                                    )}
                                    to={link.href}
                                >
                                    <link.icon className="w-4 h-4" />
                                    <span className="sr-only">{link.title}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent className="flex items-center gap-4" side="right">
                                {link.title}
                                {link.label && <span className="ml-auto text-muted-foreground">{link.label}</span>}
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Link
                            key={index}
                            className={cn(
                                buttonVariants({
                                    variant: link.href === pathName ? "default" : "ghost",
                                    size: "sm",
                                }),
                                link.variant === "default" &&
                                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                "justify-start",
                            )}
                            to={link.href}
                        >
                            <link.icon className="w-4 h-4 mr-2" />
                            {link.title}
                            {link.label && (
                                <span
                                    className={cn(
                                        "ml-auto",
                                        link.variant === "default" && "text-background dark:text-white",
                                    )}
                                >
                                    {link.label}
                                </span>
                            )}
                        </Link>
                    ),
                )}
            </nav>
        </div>
    );
}
