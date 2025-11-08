import Image from "next/image";
import Link from "next/link";
import Image1 from "@/public/IMG_4673.jpg";
import QuoteIcon from "@/public/quote.png";

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
      <section className="next">
        <div className="container flex flex-col items-center md:flex-row md:justify-around">
          <div className="p-4">
            <Image
              src={QuoteIcon}
              alt="Quote icon"
              width={20}
              height={20}
              className=" h-7.5 w-7.5!"
            />
            <p className="text-[#3e4754]">
              {" "}
              Fashion is the silent language of confidence, a canvas where
              individuality meets timeless elegance.
            </p>
          </div>
        </div>
      </section>
      <section className="last">
        <div className="container flex flex-col items-center md:justify-around m-auto gap-5 pb-4 p-4 ">
          <p>
            At the heart of Geenah’s Stitches is an unwavering commitment to
            excellence. Every fabric, embellishment, and silhouette is carefully
            curated to elevate your experience, making you feel as exceptional
            as the dress you wear. Whether it’s an enchanting gown for a
            red-carpet moment, a wedding dress for your most cherished day, or
            an elegant ensemble for an unforgettable occasion, we promise to
            bring your vision to life with unmatched finesse.
          </p>
          <p>
            Step into a world where fashion meets art, and let Geenah’s Stitches
            transform your style into an extraordinary expression of you.
            Because at Geenah’s Stitches, we believe every woman deserves to
            wear a dress as remarkable as she is.
          </p>
        </div>
        <div className="container flex flex-col md:flex-row md:justify-between m-auto p-4 gap-3 pb-5">
          <h2 className="font-bold text-2xl">The Philosophy</h2>
          <p className="md:w-[70%]">Our philosophy is rooted in understanding our clients on a profound level – their desires, dreams, and distinctive style. This enables us to craft garments that not only fit perfectly but also tell a story of individuality, confidence, and grace.</p>
        </div>

      </section>
    </main>
  );
};

export default About;
