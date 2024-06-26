import {TooltipProvider} from "@radix-ui/react-tooltip";
import {useWindowWidth} from "@react-hook/window-size";
import {ChevronRight, LayoutDashboard, Map, UserRound, UsersRound} from "lucide-react";
import {useState} from "react";

import {Button} from "./button";
import {Nav} from "./nav";

export default function Sidebar() {
    const [isCollapsed, setisCollapsed] = useState(false);

    const onlyWidth = useWindowWidth();
    const mobileWidth = onlyWidth < 768;

    const toggleCollapse = () => {
        setisCollapsed(!isCollapsed);
    };

    return (
        <TooltipProvider>
            <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
                {!mobileWidth && (
                    <div className="absolute right-[-20px] top-7">
                        <Button
                            aria-label="Toggle Sidebar Collapse"
                            className="p-2 rounded-full"
                            variant="secondary"
                            onClick={toggleCollapse}
                        >
                            <ChevronRight
                                className={`${isCollapsed ? "" : "rotate-180"} transition-all duration-300`}
                            />
                        </Button>
                    </div>
                )}
                <Nav
                    isCollapsed={mobileWidth ? true : isCollapsed}
                    links={[
                        {
                            title: "Dashboard",
                            icon: LayoutDashboard,
                            variant: "default",
                            href: "/",
                        },
                        {
                            title: "Clientes",
                            icon: UsersRound,
                            variant: "ghost",
                            href: "/clientes",
                        },
                        {
                            title: "Promotores",
                            icon: UserRound,
                            variant: "ghost",
                            href: "/promotores",
                        },
                        {
                            title: "Localidades",
                            icon: Map,
                            variant: "ghost",
                            href: "/localidades",
                        },
                    ]}
                />
            </div>
        </TooltipProvider>
    );
}
