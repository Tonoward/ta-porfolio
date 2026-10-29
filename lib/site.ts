//Site configuration mainly to be used by the navBar

export const siteConfig = {
  // Names are not translated. Title and description are in i18n/messages/*.json.
  name: "Antonio Cruz",
  url: "https://ta-tech.dev",
} as const;

// `key` is the label's key in the dictionary (dict.nav[key]). Hrefs have no
// language prefix: add it with localizePath().
export const navLinks = [
  { key: "about", href: "/about" },
  { key: "work", href: "/work" },
  { key: "lab", href: "/lab" },
  { key: "contact", href: "/contact" },
] as const;

export const socialLinks = [
  { name: "GitHub", href: "https://github.com/Tonoward", icon: "github" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/antonio-cruz-pérez-020b81239",
    icon: "linkedin",
  },
] as const;
