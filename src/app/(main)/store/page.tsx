import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import ProductCard from "@/components/main/ProductCard";
import CatalogFilters from "@/components/main/CatalogFilters";
import Pagination from "@/components/main/Pagination";
import { Package } from "lucide-react";
import { Product } from "@/interfaces";

interface StorePageProps {
  searchParams: {
    q?: string;
    collection?: string;
    sort?: string;
    page?: string;
  };
}

export default async function StorePage({ searchParams }: StorePageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const collectionId = params.collection || "all";
  const sort = params.sort || "newest";
  const page = Number(params.page) || 1;
  const pageSize = 12;

  // Build where clause
  const where: Prisma.ProductWhereInput = {};
  
  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  if (collectionId !== "all") {
    where.collections = { some: { id: collectionId } };
  }

  // Build order clause
  let orderBy: Prisma.ProductOrderByWithRelationInput = { name: "asc" };
  if (sort === "price-asc") orderBy = { price: "asc" };
  if (sort === "price-desc") orderBy = { price: "desc" };
  if (sort === "name-asc") orderBy = { name: "asc" };

  // Fetch collections for filter
  const collections = await prisma.collection.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  // Fetch products and total count
  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { productImages: true },
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <main className="bg-background-dark min-h-screen">
      <section className="bg-basic text-white py-40 px-6 sm:px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/20 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto relative">
            <div className="space-y-6">
                <div className="inline-block px-4 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.4em] border border-primary/20">
                   Boutique
                </div>
                <h1 className="text-7xl sm:text-9xl font-black mb-4 tracking-tighter uppercase leading-[0.85]">Store <br /> <span className="text-primary">Catalog</span></h1>
                <p className="text-xl sm:text-2xl text-white/50 italic font-medium max-w-xl border-l-4 border-primary pl-8">
                    Explore our complete range of artisanal fashion, tailored to perfection.
                </p>
            </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-10">
        <div className="container mx-auto">
          {/* Filters Section */}
          <CatalogFilters collections={collections} />

          {/* Results Info */}
          <div className="flex justify-between items-end mb-10">
             <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Live Inventory</p>
                <h2 className="text-2xl font-black text-basic uppercase">
                   {totalCount} {totalCount === 1 ? 'Product' : 'Products'} Found
                </h2>
             </div>
          </div>

          {/* Grid */}
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product as unknown as Product} />
                ))}
              </div>
              <Pagination currentPage={page} totalPages={totalPages} />
            </>
          ) : (
            <div className="py-40 text-center bg-background border border-background-dark border-dashed flex flex-col items-center justify-center">
               <Package size={60} className="text-muted mb-6 opacity-20" strokeWidth={1} />
               <h3 className="text-2xl font-bold text-basic mb-2">No Matching Products</h3>
               <p className="text-muted italic max-w-md mx-auto">
                 Try adjusting your search filters or browse our collections for inspiration.
               </p>
               {(query || collectionId !== "all") && (
                 <a href="/store" className="mt-8 text-primary font-bold text-sm uppercase border-b-2 border-primary/20 hover:border-primary transition-all pb-1">
                    Clear All Filters
                 </a>
               )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export const metadata = {
  title: "Catalog | Geenahs Stitches",
  description: "Browse our complete collection of bespoke fashion and artisanal designs.",
};
