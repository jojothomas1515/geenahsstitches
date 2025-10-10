import Image from "next/image";
import Link from "next/link";
import Image1 from "@/public/IMG_4673.jpg";

import { FaFacebookSquare, FaInstagramSquare, FaTiktok } from "react-icons/fa";

const About = () => {
  return (
    <main>
      <section className="header">
        <div className="container flex flex-col items-center md:flex-row md:justify-around">
          <div className="flex flex-col gap-2 p-4 md:max-w-[400px] m-auto mt-2">
            <div className="w-full ">
              <Image alt="Regina Thomas" src={Image1} />
            </div>
            <div className="info flex flex-col gap-2">
              <h1 className="text-2xl">Regina Thomas</h1>
              <i>Fashion Designer</i>
              <div className="social-links flex gap-1">
                <Link
                  href={"https://www.instagram.com/geenahs__stitches/"}
                  about="Geenah's stitches instagram page"
                >
                  <FaInstagramSquare />
                </Link>
                <Link
                  href={
                    "https://web.facebook.com/profile.php?id=100054223071005"
                  }
                  about="Geenah's Stitches facebook page"
                >
                  <FaFacebookSquare />
                </Link>

                <Link
                  href={"https://www.tiktok.com/@geenahs_stitches"}
                  about="Geenah's Stitches tiktok page"
                >
                  <FaTiktok />
                </Link>
              </div>
            </div>
          </div>
          <div className="content flex flex-col gap-4 p-4 md:w-100">
            <b>Where Elegance Meets Artistry – Welcome to Geenah’s Stitches</b>
            <p>
              At Geenah’s Stitches, we are more than just a bespoke fashion
              house – we are storytellers weaving elegance, sophistication, and
              individuality into every stitch. Since starting our journey in
              2015, we have become renowned for our unparalleled craftsmanship,
              specializing in creating one-of-a-kind luxury dresses that
              transcend trends and celebrate timeless beauty.
            </p>
            <p>
              Every garment we create is a masterpiece, meticulously designed to
              reflect the essence of the wearer’s unique personality. From the
              initial sketch to the final fitting, we pour our passion and
              precision into every detail, ensuring that each creation embodies
              a harmonious blend of artistry and luxury.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
