import Hero from "@/components/home/Hero";
import ImpactSection from "@/components/home/ImpactSection";
import PurposeStatement from "@/components/home/PurposeStatement";
import QuickLinks from "@/components/home/QuickLinks";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BALÖDER | Bornova Anadolu Lisesi Öğrenci Derneği",
  description:
    "BALÖDER'in öğrenci kooperatifi, ücretsiz su dayanışması, BAL Times ve Bornova Anadolu Lisesi öğrencileri için yürüttüğü çalışmalar.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="baloder-page-bg min-h-screen">
      <Hero user={user} />
      <PurposeStatement />
      <ImpactSection />
      <QuickLinks user={user} />

      <section className="bg-bordeaux px-5 py-24 text-white sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/55">
              Bize ulaş
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl">
              Okul hayatında çözülmesini istediğin bir sorun mu var?
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/70">
              Anlat. Dinleyelim, kayda geçirelim ve doğru çalışma ekibine
              taşıyalım.
            </p>
          </div>
          <Link
            className="inline-flex w-fit items-center justify-center rounded-2xl bg-white px-8 py-4 text-sm font-black text-bordeaux transition hover:-translate-y-0.5 hover:bg-gray-100"
            href="/iletisim"
          >
            Sorunu veya fikrini paylaş
          </Link>
        </div>
      </section>
    </main>
  );
}
