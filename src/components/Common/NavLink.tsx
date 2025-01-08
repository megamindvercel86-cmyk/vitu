import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className = "" }: NavLinkProps) => {
  // Combine the default classes with any additional classes passed via props
  const combinedClassName = `lg:gap-[86px] lg:text-[24px] gap-[56px] xl:text-[26px] text-black font-freightNeoMedium ${className}`;

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
};

export default NavLink;
