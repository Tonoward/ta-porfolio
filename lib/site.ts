//Site configuration mainly to be used by the navBar

export const siteConfig = {
  name: "Antonio Cruz",
  title: "Antonio Cruz | AI & Full-Stack Developer",
  description:
    "Welcome to my personal portfolio showcasing my work and projects in frontend, backend, and AI development.",
  url: "https://ta-tech.dev",
} as const;

export const navLinks = [
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "AI Lab", href: "/lab" },
  { name: "Contact", href: "/contact" },
] as const;

export const socialLinks = [
  { name: "GitHub", href: "https://github.com/Tonoward", icon: "github" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/antonio-cruz-pérez-020b81239", icon: "linkedin" },
] as const;
