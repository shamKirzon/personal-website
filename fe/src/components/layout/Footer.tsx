const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mx-auto max-w-[760px] px-5 pb-14">
      <div className="border-t border-[var(--line-hairline)] pt-6 text-center">
        <p className="text-[14px] text-[var(--ink-mid)]">
          © {year} Shammy Kierson Suyat. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
