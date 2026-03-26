import { prisma } from "@/lib/prisma";
import FeaturedCollections from "@/components/main/FeaturedCollections";
import { Collection } from "@/interfaces";
import Link from "next/link";

export default async function Home() {
  const collections = await prisma.collection.findMany({
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
    <main className="bg-background-dark text-basic overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative h-[85lvh] sm:h-[95lvh] flex items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-no-repeat bg-center bg-cover scale-105 animate-slow-zoom"
          style={{ backgroundImage: `url(/main.jpg)` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-basic/40 via-basic/20 to-basic/80" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            <p className="text-basic/80 font-bold uppercase tracking-[0.4em] text-xs sm:text-sm animate-fade-in-down">
              The Art of Bespoke Tailoring
            </p>
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-basic leading-[0.85] tracking-tighter uppercase animate-fade-in-up">
              Geenah&apos;s <br />
              <span className="text-transparent border-t-white/30 border-t pt-4" style={{ WebkitTextStroke: '1px white' }}>
                Stitches
              </span>
            </h1>
            <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in">
                <Link href="/store" className="group relative px-10 py-5 bg-white text-basic font-black uppercase text-sm tracking-widest overflow-hidden transition-all hover:bg-primary hover:text-basic">
                   <span className="relative z-10 italic">Shop Collection</span>
                </Link>
                <Link href="/collections" className="px-10 py-5 border border-white/30 text-basic font-black uppercase text-sm tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm">
                   View Catalog
                </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-50">
           <div className="w-px h-12 bg-linear-to-b from-white/0 to-white" />
        </div>
      </section>

      {/* Welcome Section */}
      <section className="relative py-40 bg-background overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/2 opacity-5 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-20">
             <div className="w-full md:w-1/2 space-y-8">
                <div className="inline-block px-4 py-2 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.3em] border-l-4 border-primary">
                   Established 2024
                </div>
                <h2 className="text-5xl sm:text-7xl font-black text-basic leading-[0.9] tracking-tighter uppercase">
                   Crafting <br />
                   <span className="text-primary">Tradition</span> <br />
                   Through Style
                </h2>
             </div>
             <div className="w-full md:w-1/2 space-y-6">
                <p className="text-2xl text-basic/80 font-medium italic leading-snug">
                  &quot;Every stitch tells a story of heritage, every fabric holds a promise of quality.&quot;
                </p>
                <div className="h-px w-20 bg-primary/30" />
                <p className="text-muted leading-relaxed text-lg">
                  Welcome to the world of Geenah&apos;s Stitches, where style meets artisanal craftsmanship. 
                  We specialize in bespoke tailoring that celebrates individuality while honoring timeless traditions.
                </p>
             </div>
          </div>
        </div>
      </section>

      <div className="bg-background-dark/30 py-10">
         <div className="container mx-auto px-10">
            <div className="h-px w-full bg-background-dark" />
         </div>
      </div>

      <FeaturedCollections collections={collections as unknown as Collection[]} />
    </main>
  );
}
