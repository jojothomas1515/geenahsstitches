
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Collection | Admin Dashboard",
    description: "Add a new collection to Geenah's Stitches",
};

export default function AddCollectionPage() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Add New Collection</h1>
            <form className="flex flex-col gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Collection Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        placeholder="e.g., Asoebi"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        placeholder="A brief description of the collection."
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-300">
                        Collection Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
                    >
                        Add Collection
                    </button>
                </div>
            </form>
        </div>
    );
}
