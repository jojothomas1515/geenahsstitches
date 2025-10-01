"use client";
import Cat1 from "@/public/IMG_1004-scaled.jpg";
import Cat2 from "@/public/IMG_8050-scaled.jpg";
import Cat3 from "@/public/IMG_R_2348-scaled.jpg";
import Cat4 from "@/public/Snapinsta.app_465564792_18136445497367481_4508641791635045191_n_1080.jpg";
import Cat5 from "@/public/Snapinsta.app_468807924_18138671200367481_7220958232310374237_n_1080-820x1024.jpg";
import Cat6 from "@/public/Snapinsta.app_468936096_18138678037367481_8269139110164864126_n_1080-819x1024.jpg";
import Image from "next/image";
import { MouseEvent } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ImageCatalog = [
  { src: Cat1, alt: "Catalog Image 1" },
  { src: Cat2, alt: "Catalog Image 2" },
  { src: Cat3, alt: "Catalog Image 3" },
  { src: Cat4, alt: "Catalog Image 4" },
  { src: Cat5, alt: "Catalog Image 5" },
  { src: Cat6, alt: "Catalog Image 6" },
];

const CarouselCollection = () => {
  function moveLeft(ev: MouseEvent<HTMLButtonElement>) {
    const carousel = ev.currentTarget.parentElement
      ?.lastChild as HTMLDivElement;
    const imageItem = carousel.firstChild as HTMLImageElement;
    if (!(carousel.scrollLeft <= 0))
      carousel.scrollBy({ left: -(imageItem.width + 2) });
  }
  function moveRight(ev: MouseEvent<HTMLButtonElement>) {
    const carousel = ev.currentTarget.parentElement
      ?.lastChild as HTMLDivElement;
    const imageItem = carousel.firstChild as HTMLImageElement;
    console.log("scrollWidth", carousel.scrollWidth);
    if (!(carousel.scrollLeft + imageItem.width >= carousel.scrollWidth))
      carousel.scrollBy({ left: imageItem.width + 2 });
  }
  return (
    <section className="collection h-[80vh] bg-amber-100 border-8 border-[var(--primary)] p-2">
      <div className="h-full  relative border-8 border-[var(--primary)] flex align-center justify-center p-2">
        <button
          id="scroll-left"
          onClick={moveLeft}
          className="rounded-2xl font-bolder text-2xl  flex justify-center items-center shadow shadow-amber-100 text-amber-100 absolute inset-y-1/2 left-5 bg-[var(--primary)]
            w-8 h-8 right-auto cursor-pointer"
        >
          <FaArrowLeft />
        </button>
        <button
          id="scroll-right"
          onClick={moveRight}
          className="rounded-2xl font-bolder text-2xl   flex justify-center items-center shadow shadow-amber-100 text-amber-100 absolute inset-y-1/2 right-5 bg-[var(--primary)]
            w-8 h-8  cursor-pointer"
        >
          <FaArrowRight />
        </button>
        <div className=" carousel h-max flex overflow-x-auto scroll-smooth border-8 border-[var(--primary)]">
          {ImageCatalog.map((image) => {
            return <Image src={image.src} alt={image.alt} key={image.alt} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default CarouselCollection;
