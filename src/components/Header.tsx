
import Image from "next/image";
import Logo from "@/public/geenah_stitches_logo_no_bg.png";
import Link from "next/link";
import MobileNav from "./header/MobileNav";
import DesktopNav from "./header/DesktopNav";

const NavLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  // { name: "Our Academy", href: "/academy" },
  { name: "Consultation", href: "/consultation" },
  { name: "Our Store", href: "/store" },
  { name: "Contact Us", href: "/contact" },
  { name: "About", href: "/about" },
];

const Header = () => {

  return (
    <>
      <header className="sticky top-0">
        <div className="bg-white w-full px-5 md:px-20 py-5 sm:py-5 sm:px-10  shadow-md z-10">
          <div className="flex justify-center items-center md:justify-between w-full">
            <div className="logo-container  w-[200px]">
              <Link href={"/"}>
                <Image src={Logo} alt="Geenah's Stitches Logo" />
              </Link>
            </div>
            <DesktopNav NavLinks={NavLinks} />
            <MobileNav NavLinks={NavLinks} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
