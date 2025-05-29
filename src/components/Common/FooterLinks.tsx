import Link from "next/link";
import classNames from "classnames";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  type?: "string" | "number";
  target?:string;
  ariaLabel?:string
}

const FooterLink = ({
  href,
  children,
  className,
  target,
  ariaLabel,
  type = "string",
}: FooterLinkProps) => {
  const combinedClassName = classNames(
    `${type === "string" ? "font-FreightNeoProLight" : "font-CandideCondensedNormal"} font-light text-base 2xl:text-2xl text-footerTextColor`,
    className,
  );

  return (
    <Link href={href} aria-label={ariaLabel} target={target ? "_blank" : ""} className={combinedClassName}>
      {children}
    </Link>
  );
};

export default FooterLink;
