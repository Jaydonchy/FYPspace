export interface nav_item {
    display_name: string,
    router_link: string[],
    childItem?: nav_item[],
    icon?: string,
}

export interface nav_itemConfig {
    left_nav_items: nav_item[],
    mid_nav_items: nav_item[],
    right_nav_items: nav_item[],
}

export function getNavItems():nav_itemConfig {
    return {
        left_nav_items:[home],
        mid_nav_items:[match],
        right_nav_items:[about,faq,login,register,editProfile,logout]
    }
}


const home: nav_item = {
    display_name: "Home",
    router_link: ["/Home"],
    icon: "home",
}

const match: nav_item =
{
    display_name: "Match",
    router_link: ["/matching"],
    icon: "supervisor_account",
};

const about: nav_item = {
    display_name: "About",
    router_link: ["/about"],
}
const faq: nav_item = {
    display_name: "FAQs",
    router_link: [""],
    childItem: [
        {
            display_name: "FAQs for RMCT | FYP Students",
            router_link: ['/FAQ', 'student'],
        },
        {
            display_name: "FAQ for FYP Supervisors",
            router_link: ['/FAQ', 'supervisor'],
        },
        {
            display_name: "FAQ for FYP Administrator",
            router_link: ['/FAQ', 'admin'],
        }
    ]
}

const login: nav_item = {
    display_name: "Login",
    router_link: ["/login"],
}
const register: nav_item = {
    display_name: "Register",
    router_link: ["/register"],
}
const editProfile: nav_item = {
    display_name: "Edit Profile",
    router_link: ["/user", "edit"],
    icon:'manage_accounts'
}
const logout: nav_item = {
    display_name: "Log out",
    router_link: ["/logout"],
    icon:'logout'
}
