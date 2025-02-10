import Link from "next/link";
import classNames from "classnames";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className }: NavLinkProps) => {
  const combinedClassName = classNames(
    "lg:gap-[86px] lg:text-[20px] lg2:text-[24px] gap-[56px] xl:text-[26px] text-black font-freightNeoMedium",
    className,
  );

  return (
    <Link href={href} className={combinedClassName} target="_blank">
      {children}
    </Link>
  );
};

export default NavLink;
