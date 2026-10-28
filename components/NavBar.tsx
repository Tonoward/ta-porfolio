//NextJS
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="absolute top-0 left-0 w-full bg-primary/30 p-4 text-white shadow backdrop-blur-sm">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div>
          <Link className="text-xl font-bold" href="/">
            Antonio Cruz
          </Link>
        </div>
        {/* Navigation links */}
        <div className="flex flex-wrap gap-8">
          <Link className="text-lg" href="/about">
            About
          </Link>
          <Link className="text-lg" href="#work">
            Work
          </Link>
          <Link className="text-lg" href="/ai-lab">
            AI Lab
          </Link>
          <Link className="text-lg" href="/contact">
            Contact
          </Link>
        </div>
        {/* Social Media logos and theme switcher*/}
        <div className="flex flex-wrap gap-4">
          <div>
            <Link href="https://www.linkedin.com" target="_blank">
              LinkedIn
            </Link>
            <Link href="https://github.com" target="_blank">
              GitHub
            </Link>
          </div>
          <p className="text-lg">Theme</p>
        </div>
      </div>
    </nav>
  );
}
