import { Link } from "react-router-dom";
import { GithubWhite, LinkedIn } from "../assets/icons/Icons";

const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border-subtle -mx-4 px-4">
      <div className="max-w-3xl mx-auto h-14 flex items-center justify-between">
        <Link
          to="/#profile"
          className="font-mono text-sm font-medium text-foreground"
        >
          shammy<span className="text-primary">.</span>
        </Link>

        <ul className="hidden sm:flex gap-6">
          <li>
            <Link
              to="/#about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              about
            </Link>
          </li>
          <li>
            <Link
              to="/#projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              projects
            </Link>
          </li>
          <li>
            <Link
              to="/#experience"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              experience
            </Link>
          </li>
          <li>
            <Link
              to="/#contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              contact
            </Link>
          </li>
        </ul>

        <div className="flex gap-3.5 items-center">
          <a
            href="https://github.com/shamKirzon"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <GithubWhite width="18" />
          </a>
          <a
            href="https://www.linkedin.com/in/shammy-kierson-suyat/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <LinkedIn width="18" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
