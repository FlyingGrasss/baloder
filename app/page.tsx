import Hero from "@/components/home/Hero";
import QuickLinks from "@/components/home/QuickLinks";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f7f9] pb-24">
      <Hero />
      <QuickLinks />
      
      {/* Additional homepage content can go here (Stats, News preview, etc.) */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
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