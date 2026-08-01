import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Latihan Menulis Hiragana",
    description: "Tingkatkan kemampuan menulis huruf Hiragana dengan latihan interaktif berdasarkan level.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
