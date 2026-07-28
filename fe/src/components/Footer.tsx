import { socials } from "@/data/GetInTouch-data";

const Footer = () => {
  return (
    <footer className="py-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <p className="font-mono text-xs text-text-hint">
          © 2026 shammy kierson suyat
        </p>
        <div className="flex gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-text-hint hover:text-muted-foreground transition-colors"
            >
              {social.name.toLowerCase()}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
