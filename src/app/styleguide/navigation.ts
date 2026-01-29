/**
 * Styleguide Navigation Configuration
 * 
 * Define a navegação lateral do styleguide.
 * Adicione novos itens aqui conforme novos componentes são criados.
 */

export interface NavItem {
    name: string;
    href: string;
    badge?: string; // Optional badge/tag, e.g., "iGreen"
}

export interface NavSection {
    title: string;
    items: NavItem[];
}

export const navigation: NavSection[] = [
    {
        title: "Guide",
        items: [
            {
                name: "Documentation",
                href: "/styleguide/documentation",
            },
        ]
    },
    {
        title: "Foundation",
        items: [
            {
                name: "Design Tokens",
                href: "/styleguide",
            },
            {
                name: "Colors",
                href: "/styleguide/colors",
            },
            {
                name: "Typography",
                href: "/styleguide/typography",
            },
            {
                name: "Sizes & Spacing",
                href: "/styleguide/sizes",
            },
            {
                name: "Shadows",
                href: "/styleguide/shadows",
            },
            {
                name: "Border Radius",
                href: "/styleguide/radius",
            },
        ]
    },
    {
        title: "Components",
        items: [
            // Core & Primitives
            {
                name: "Icon",
                href: "/styleguide/components/icons-library",
                badge: "iGreen"
            },
            {
                name: "Button",
                href: "/styleguide/components/button",
            },

            // Form Inputs & Text
            {
                name: "Label",
                href: "/styleguide/components/label",
            },
            {
                name: "Input",
                href: "/styleguide/components/input",
            },
            {
                name: "Input Group",
                href: "/styleguide/components/input-group",
            },
            {
                name: "Field",
                href: "/styleguide/components/field",
            },
            {
                name: "Input Text",
                href: "/styleguide/components/input-text",
                badge: "iGreen"
            },

            // Selection Controls
            {
                name: "Select",
                href: "/styleguide/components/select",
            },
            {
                name: "Accordion Select",
                href: "/styleguide/components/accordion-select",
                badge: "iGreen"
            },
            {
                name: "Checkbox",
                href: "/styleguide/components/checkbox",
            },
            {
                name: "Choice",
                href: "/styleguide/components/choice",
                badge: "iGreen"
            },
            {
                name: "ToggleCard",
                href: "/styleguide/components/togglecard",
                badge: "iGreen"
            },
            {
                name: "FileDropZone",
                href: "/styleguide/components/filedropzone",
                badge: "iGreen"
            },

            // Feedback & Overlays
            {
                name: "Alert",
                href: "/styleguide/components/alert",
            },
            {
                name: "Dialog Alert",
                href: "/styleguide/components/dialog-alert",
                badge: "iGreen"
            },
            {
                name: "Dialog",
                href: "/styleguide/components/dialog",
                badge: "iGreen"
            },

            // Navigation & Display
            {
                name: "Tabs",
                href: "/styleguide/components/tabspage",
            },
            {
                name: "Dropdown Menu",
                href: "/styleguide/components/dropdown-menu",
            },
            {
                name: "Text Collapse",
                href: "/styleguide/components/text-collapse",
                badge: "iGreen"
            },

        ]
    },
    {
        title: "Examples",
        items: [
            {
                name: "Initial Step",
                href: "/styleguide/examples/initial-step",
                badge: "New"
            }
        ]
    }
];
