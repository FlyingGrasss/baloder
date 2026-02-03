import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 max-sm:my-22 lg:py-32">
      <div className="max-w-3xl space-y-6 lg:space-y-8">
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-3 lg:mb-4 text-white tracking-tight">
            BAL Öğrenci Derneği
          </h2>
          <h3 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 text-white/90">
            Geleceği Birlikte İnşa Ediyoruz
          </h3>
          <p className="text-base lg:text-lg leading-relaxed mb-4 text-white/55">
            BAL ruhunu yaşatmak, öğrenciler arası dayanışmayı güçlendirmek ve 
            okulumuzun köklü geleneklerini geleceğe taşımak için çalışan 
            resmi öğrenci oluşumuyuz.
          </p>
          <p className="text-sm lg:text-base text-white/55">
            Projelerimize destek olun, Bornova Anadolu Lisesi mirasını hep 
            birlikte daha ileriye taşıyalım.
          </p>
        </div>

        <div className="flex flex-row gap-3 sm:gap-5 pt-2">
          <Link 
            href="/bagis" 
            className="flex-1 sm:flex-none bg-white text-[#A21A2A] px-4 py-3 sm:px-10 sm:py-4 rounded-xl font-black text-sm sm:text-xl hover:bg-gray-100 transition shadow-xl border-2 border-white text-center whitespace-nowrap"
          >
            Bağış Yap
          </Link>
          <Link 
            href="/hakkimizda" 
            className="flex-1 sm:flex-none bg-transparent border-2 border-white/20 text-white px-4 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-sm sm:text-lg hover:bg-white/10 transition text-center whitespace-nowrap"
          >
            Hakkımızda
          </Link>
        </div>
      </div>
    </div>
  );
}