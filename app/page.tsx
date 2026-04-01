import Hero from "@/components/home/Hero";
import QuickLinks from "@/components/home/QuickLinks";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-[#f4f7f9] pb-24 max-sm:pb-12">
      <Hero user={user} />
      <QuickLinks user={user} />

      {/* Additional homepage content can go here (Stats, News preview, etc.) */}
      <section className="max-w-7xl mx-auto px-6 pt-24 max-sm:pt-12 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-dark-gray mb-8 md:mb-12 tracking-tight">Değişime Ortak Olun</h2>
        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto mb-16">
          BALÖDER olarak okulumuzun geleceğini öğrencilerimizle birlikte şekillendiriyoruz.
          Siz de bu yolculukta bize katılın.
        </p>
        <div className="w-24 h-1 bg-bordeaux mx-auto rounded-full"></div>
      </section>
    </main>
  );
}