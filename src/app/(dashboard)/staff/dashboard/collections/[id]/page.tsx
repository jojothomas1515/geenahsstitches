import { getCollectionById } from "@/actions/collection.actions";
import { notFound } from "next/navigation";
import CollectionDetails from "@/components/dashboard/shared/CollectionDetails";
import type { Collection } from "@/interfaces";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function StaffCollectionDetailPage({ params }: PageProps) {
    const { id } = await params;
    const collection = await getCollectionById(id);

    if (!collection) {
        notFound();
    }

    return (
        <main className="w-full h-dvh p-10 overflow-y-scroll bg-background-light/30">
            <div className="max-w-7xl mx-auto">
                <CollectionDetails 
                    collection={collection as Collection} 
                    backUrl="/staff/dashboard/collections" 
                />
            </div>
        </main>
    );
}
