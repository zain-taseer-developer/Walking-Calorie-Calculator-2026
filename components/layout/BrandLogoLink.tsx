"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BrandLogoLinkProps {
  className: string;
  imageClassName: string;
  priority?: boolean;
}

export function BrandLogoLink({
  className,
  imageClassName,
  priority = false,
}: BrandLogoLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link href="/" onClick={handleClick} className={className}>
      <Image
        src="/walking-calories-logo.svg"
        alt="Walking Calories — Walking & Fitness Calculator"
        width={260}
        height={65}
        priority={priority}
        className={`${imageClassName} dark:hidden`}
      />
      <Image
        src="/walking-calories-logo-dark.svg"
        alt=""
        aria-hidden="true"
        width={260}
        height={65}
        priority={priority}
        className={`hidden ${imageClassName} dark:block`}
      />
    </Link>
  );
}
