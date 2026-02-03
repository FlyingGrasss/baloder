import Link from "next/link";

export default function Hakkimizda() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
      <div className="max-w-3xl space-y-12">
        <section className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">Hakkımızda</h1>
          <p className="text-lg lg:text-xl leading-relaxed text-white/80 font-medium">
            BAL Öğrenci Derneği, 2024 yılında Bornova Anadolu Lisesi öğrencilerinin sesini 
            duyurmak ve okul kültürünü modern bir vizyonla birleştirmek amacıyla kurulmuştur.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Misyonumuz</h2>
            <p className="text-white/55 leading-relaxed">
              Öğrenciler arası yardımlaşmayı kurumsallaştırmak, sosyal sorumluluk projeleri üretmek 
              ve BAL mezunları ile mevcut öğrenciler arasında kopmaz bir köprü kurmak.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Vizyonumuz</h2>
            <p className="text-white/55 leading-relaxed">
              Türkiye&apos;nin en köklü eğitim kurumlarından biri olan okulumuzun değerlerini, 
              dijital çağa uygun projelerle geleceğe taşımak ve her BAL öğrencisinin 
              potansiyelini desteklemek.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}