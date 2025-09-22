import Link from "next/link";
import Image from "next/image";
import Cat1 from "@/public/IMG_1004-scaled.jpg";
import Cat2 from "@/public/IMG_8050-scaled.jpg";
import Cat3 from "@/public/IMG_R_2348-scaled.jpg";
import Cat4 from "@/public/Snapinsta.app_465564792_18136445497367481_4508641791635045191_n_1080.jpg";
import Cat5 from "@/public/Snapinsta.app_468807924_18138671200367481_7220958232310374237_n_1080-820x1024.jpg";
import Cat6 from "@/public/Snapinsta.app_468936096_18138678037367481_8269139110164864126_n_1080-819x1024.jpg";
export default function Home() {
  return (
    <main>
      <section
        className="h-[calc(100dvh-200px)] md:h-dvh  bg-cover bg-no-repeat bg-right-bottom"
        style={{ backgroundImage: "url(/banner.png)" }}
      >
        <div className="h-full container">
          <div className=" flex flex-col gap-10 items-center md:items-start p-3 md:justify-center h-full ">
            <h1 className="text-amber-100 text-4xl w-max md:text-5xl">
              Geenah’s Stitches
            </h1>
            <p className="text-white text-center md:text-start md:w-2xl md:text-2xl opacity-90">
              Crafting bespoke, luxury dresses with timeless elegance and
              exceptional craftsmanship since 2015.{" "}
            </p>
            <Link
              href={"/collections"}
              className="bg-amber-100 w-max p-3 uppercase text-[var(--primary)]"
            >
              {" "}
              View Collections
            </Link>
          </div>
        </div>
      </section>

      <section className="mini-catalog bg-amber-100">
        <div className="h-full">
          <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-around m-auto p-10">
            <Image src={Cat1} alt="catalog image 1" />
            <Image src={Cat2} alt="catalog image 2" />
            <Image src={Cat3} alt="catalog image 3" />
            <Image src={Cat4} alt="catalog image 4" />
            <Image src={Cat5} alt="catalog image 5" />
            <Image src={Cat6} alt="catalog image 6" />
          </div>
        </div>
      </section>

      <section
        className="appointment h-[70vh] bg-cover bg-no-repeat bg-right-bottom"
        style={{ backgroundImage: "url(/banner.png)" }}
      >
        <div className="h-full">
          <div className="container m-auto h-full flex flex-col md:justify-center p-10 md:p-20 lg:p-30 items-center gap-10">
            <h1
              className="mt-10 md:mt-0 text-center uppercase text-2xl font-bold md:text-3xl lg:text-4xl text-amber-100 
            "
            >
              Book an appointment with us today
            </h1>
            <Link
              href="contact"
              className="uppercase p-3 bg-amber-100 text-black hover:text-amber-100 hover:bg-amber-800 transition-colors "
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
