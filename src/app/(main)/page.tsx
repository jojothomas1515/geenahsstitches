import { prisma } from "@/lib/prisma";
import FeaturedCollections from "@/components/main/FeaturedCollections";
import { Collection } from "@/interfaces";

export default async function Home() {
  const collections = await prisma.collection.findMany({
    take: 10,
    include: {
      products: {
        include: {
          productImages: true,
        },
        take: 3, // Only need first few for display
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="bg-background text-basic">
      <section
        className="h-[70lvh] sm:h-[90lvh] bg-no-repeat bg-bottom sm:bg-center bg-cover "
        style={{ backgroundImage: `url(/main.jpg)` }}
      >
        <div className="h-full container"></div>
      </section>

      <section className="welcome bg-neutral dark:bg-neutral-dark border-b border-background-dark">
        <div className="p-20 py-32">
          <h1 className="text-5xl font-black text-center mb-4 tracking-tighter">
            WELCOME TO THE WORLD OF GEENAH&apos;S STITCHES
          </h1>
          <p className="text-xl text-center text-muted font-medium italic">
            Where every piece is made with love and traditional craftsmanship
          </p>
        </div>
      </section>

      <FeaturedCollections collections={collections as unknown as Collection[]} />
    </main>
  );
}
