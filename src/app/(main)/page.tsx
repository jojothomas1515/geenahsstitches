import Link from "next/link";
import Image from "next/image";
import Cat1 from "@/public/IMG_1004-scaled.jpg";
import Cat2 from "@/public/IMG_8050-scaled.jpg";
import Cat3 from "@/public/IMG_R_2348-scaled.jpg";
import Cat4 from "@/public/Snapinsta.app_465564792_18136445497367481_4508641791635045191_n_1080.jpg";
import Cat5 from "@/public/Snapinsta.app_468807924_18138671200367481_7220958232310374237_n_1080-820x1024.jpg";
import Cat6 from "@/public/Snapinsta.app_468936096_18138678037367481_8269139110164864126_n_1080-819x1024.jpg";
import CarouselCollection from "@/components/CarouselCollection";

const ImageCatalog = [
  { src: Cat1, alt: "Catalog Image 1" },
  { src: Cat2, alt: "Catalog Image 2" },
  { src: Cat3, alt: "Catalog Image 3" },
  { src: Cat4, alt: "Catalog Image 4" },
  { src: Cat5, alt: "Catalog Image 5" },
  { src: Cat6, alt: "Catalog Image 6" },
];

export default function Home() {
  return (
    <main>
      <section
        className="h-lvh bg-no-repeat bg-bottom sm:bg-center bg-cover"
        style={{ backgroundImage: `url(/main.jpg)` }}
      >
        <div className="h-full container">
          <div className=" flex flex-col gap-10 items-center md:items-start p-3 md:justify-center h-full ">
            <h1 className="text-white text-4xl w-max md:text-5xl">
              Geenah’s Stitches
            </h1>
            <p className="text-white text-center md:text-start md:w-2xl md:text-2xl opacity-90">
              Crafting bespoke, luxury dresses with timeless elegance and
              exceptional craftsmanship since 2015.{" "}
            </p>
            {/* <Link
              href={"/collections"}
              className="w-max p-3 uppercase text-[var(--primary)] hover:bg-white! transition-colors"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
            >
              {" "}
              Shop Now
            </Link> */}
          </div>
        </div>
      </section>

      <section className="welcome bg-white">
        <div className="p-10">
          <h1 className="text-2xl text-center">
            WELCOME TO THE WORLD OF GEENAH&apos;S STITCHES
          </h1>
          <h1 className="text-2xl text-center">
            WHERE EVERY PIECE IS MADE WITH LOVE
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea
            doloribus nam, nemo accusamus officiis provident voluptate corrupti
            distinctio id, assumenda quo sunt consequuntur placeat. Quidem ea
            labore consectetur aut veniam accusantium dolorum ab, suscipit,
            eligendi, rerum fugit deleniti harum mollitia nihil! Accusantium
            numquam fuga quos, voluptatibus accusamus sint expedita perspiciatis
            repellendus ipsa maiores, neque doloribus illum nesciunt et sed. Eum
            sequi sed omnis, similique temporibus aliquid sint explicabo
           
          </p>
        </div>
      </section>

      {/* <section className="mini-catalog bg-white">
        <div className="h-full py-7">
          <h1 className="text-2xl text-center">Featured</h1>
          <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-around m-auto p-10">
            {ImageCatalog.map((image) => {
              return <Image src={image.src} alt={image.alt} key={image.alt} />;
            })}
          </div>
        </div>
      </section> */}

      <section
        className="appointment h-[70vh] bg-cover bg-no-repeat bg-right-bottom"
        // style={{ backgroundImage: "url(/banner.png)" }}
      >
        <div className="h-full">
          <div className="container m-auto h-full flex flex-col md:justify-center p-10 md:p-20 lg:p-30 items-center gap-10">
            <h1
              className="mt-10 md:mt-0 text-center uppercase text-2xl font-bold md:text-3xl lg:text-4xl 
            "
            >
              Book an appointment with us today
            </h1>
            <Link
              href="contact"
              className="uppercase p-3 bg-black text-white hover:text-white hover:bg-gray-800 transition-colors"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>
      {/* <CarouselCollection /> */}
    </main>
  );
}
