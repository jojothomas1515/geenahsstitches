import Image from "next/image";
import Link from "next/link";
import FLogo from "@/public/Geenahs-Stitches_072957-300x43.png";
import {
  FaApplePay,
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container m-auto flex flex-col gap-10 p-10 md:p-20 lg:p-30 md:flex-row md:items-start font-extralight">
        <div>
          <Link href="/" className="text-center m-auto inline-block border" aria-label="Home">
            <Image src={FLogo} alt="Geenah's Stitches" />
          </Link>
        </div>
        <div
          className="w-full flex flex-col text-center items-center md:flex-row md:justify-around gap-10 text-white "
          style={{ fontSize: "clamp(.7rem, calc(.5rem + 1vw), 1rem)" }}
        >
          <div
            className="flex flex-col gap-2"
            aria-label="Information Links Container"
          >
            <h1
              className="uppercase mb-5"
              style={{ fontSize: "clamp(1rem, calc(.8rem + 1vw), 2rem)" }}
            >
              Information
            </h1>

            <Link href={"/about"} className="uppercase md:w-max">
              About Us
            </Link>
            <Link href="/contact" className="uppercase md:w-max">
              Contact Us
            </Link>
          </div>
          <div
            className="flex flex-col gap-2"
            aria-label="Discover links container"
          >
            <h1
              className="uppercase mb-5"
              style={{ fontSize: "clamp(1rem, calc(.8rem + 1vw), 2rem)" }}
            >
              Discover
            </h1>

            <Link href={"/about"} className="uppercase md:w-max">
              Book an appointment
            </Link>
            <Link href="/contact" className="uppercase md:w-max">
              Our academy
            </Link>
          </div>
        </div>
      </div>
      <div className="border-gray-100 border-t text-white p-5 flex justify-between opacity-70">
        <div className="">&copy; GEENAH&apos;S STITCHES 2024</div>
        <div className="flex gap-2 text-2xl md:text-3xl">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcDiscover />
          <FaApplePay />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
