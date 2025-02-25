import Link from "next/link";
import classNames from "classnames";
import { HTMLAttributeAnchorTarget } from "react";


interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: boolean;
  onClick?: () => void;
}

const NavLink = ({ href, children, className, target = false, onClick }: NavLinkProps) => {
  const combinedClassName = classNames(
    "lg:gap-[86px] lg:text-[20px] lg2:text-[24px] gap-[56px] xl:text-[26px] text-black font-freightNeoMedium cursor:pointer",
    className,
  );

  const linkTarget = target ? "_blank" : "_self"; // Set target to "_blank" if true, otherwise undefined

  return (
    <Link href={href} className={combinedClassName} target={linkTarget} rel="noopener noreferrer" onClick={onClick}>
      {children}
    </Link>
  );
};

export default NavLink;
