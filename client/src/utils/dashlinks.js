import {
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";

const links = [
    {
        label: "Dashboard",
        href: "#",
        icon: (
            <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "Profile",
        href: "#",
        icon: (
            <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "Settings",
        href: "#",
        icon: (
            <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
];

export default links;