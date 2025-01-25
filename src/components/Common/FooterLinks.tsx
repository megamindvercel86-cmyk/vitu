import Link from "next/link";
import classNames from "classnames";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const FooterLink = ({ href, children, className }: FooterLinkProps) => {
  const combinedClassName = classNames(
    "font-FreightNeoProLight font-light text-base text-footerTextColor",
    className,
  );

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
};

export default FooterLink;
