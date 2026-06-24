export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-paper">
            <div className="w-64 h-2 bg-sakura/20 rounded-full overflow-hidden">
                <div className="h-full bg-sakura animate-progress"></div>
            </div>
            <div className="mt-4 font-serif text-navy text-xl overflow-hidden whitespace-nowrap border-r-2 border-navy animate-typing w-[10ch]">
                belajar...
            </div>
        </div>
    );
}
