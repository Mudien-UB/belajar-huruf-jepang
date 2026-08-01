import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Latihan Sambung Cocok Hiragana",
    description: "Uji kemampuan mengingat huruf Hiragana dengan latihan sambung-cocok yang menyenangkan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
