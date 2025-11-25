import Image from "next/image";
import Link from "next/link";
import Img1 from "@/public/IMG_1022-scaled.jpg";
import Img2 from "@/public/asoebi_1.jpg";
import Img3 from "@/public/IMG_R_2348-scaled.jpg";

const Collection = () => {
  return (
    <main>
      <section className="header bg-black p-5">
        <h1 className="md:font-bold md:text-2xl text-white">Collections</h1>
      </section>
      <section className="aseobi p-4">
        <div className="container p-4 m-auto">
          <div className="imgs-con m-auto  columns-1 md:columns-2 lg:columns-3 gap-x-0">
            <Image className=" object-cover" src={Img1} alt="aseobi 1" />
            <Image className=" object-cover" src={Img2} alt="aseobi 2" />
            <Image className=" object-cover" src={Img3} alt="aseobi 3" />
          </div>
          <div className="info mt-5">
            <h2 className="text-3xl font-bold mb-4">Premium Aseobi</h2>
            <p className="text-[#313131]">
              At <strong>Geenah’s Stitches</strong>, we believe that asoebi is
              more than just a fabric—it’s a statement. With a deep respect for
              Nigerian tradition and an eye for contemporary elegance, we craft
              custom, head-turning silhouettes that allow you to stand out while
              celebrating in solidarity. From the first fitting to the final
              slay, every stitch is a testament to our commitment to creating
              magic.
            </p>
            <Link className={"btn w-max mt-3"} href={"/collections/aseobi"}>VIEW COLLECTION</Link>
          </div>
        </div>
      </section>
      <section className="bridal p-4">
        <div className="container p-4 m-auto">

        </div>
      </section>
    </main>
  );
};

export default Collection;
