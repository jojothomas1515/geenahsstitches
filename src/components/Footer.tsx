import Image from "next/image";
import Link from "next/link";
import FLogo from "@/public/Geenahs-Stitches_072957-300x43.png";
import { SiVisa } from "react-icons/si";
import { GrMastercard, GrVisa } from "react-icons/gr";
import {
  FaApplePay,
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container flex flex-col items-center gap-10 p-10 md:p-20 lg:p-30">
        <Link href="/" className="text-center m-auto inline-block ">
          <Image src={FLogo} alt="Geenah's Stitches" />
        </Link>
        <div className="w-full flex flex-col md:flex-row md:justify-around gap-10 text-white">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl uppercase mb-5">Information</h1>

            <Link href={"/about"} className="uppercase w-max">
              About Us
            </Link>
            <Link href="/contact" className="uppercase w-max">
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl uppercase mb-5">Discover</h1>

            <Link href={"/about"} className="uppercase w-max">
              Book an appointment
            </Link>
            <Link href="/contact" className="uppercase w-max">
              Our academy
            </Link>
          </div>
        </div>
      </div>
      <div className="border-gray-100 border-t text-white p-5 flex justify-between">
        <div>&copy; GEENAH'S STITCHES 2024</div>
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
