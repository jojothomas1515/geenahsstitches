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
    <main className="bg-background text-basic">
      <section
        className="h-[70lvh] sm:h-[90lvh] bg-no-repeat bg-bottom sm:bg-center bg-cover "
        style={{ backgroundImage: `url(/main.jpg)` }}
      >
        <div className="h-full container"></div>
      </section>

      <section className="welcome bg-neutral dark:bg-neutral-dark">
        <div className="p-10">
          <h1 className="text-2xl text-center">
            WELCOME TO THE WORLD OF GEENAH&apos;S STITCHES
          </h1>
          <h1 className="text-2xl text-center">
            WHERE EVERY PIECE IS MADE WITH LOVE
          </h1>
         
        </div>
      </section>

    
    </main>
  );
}
