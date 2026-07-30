import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenCheck,
  Droplets,
  Eye,
  HeartHandshake,
  Newspaper,
  ShoppingBasket,
  UsersRound,
} from "lucide-react";

const NEXT_STEPS = [
  {
    icon: HeartHandshake,
    title: "Ücretsiz destek ağı",
    text: "BAL mezunu psikologlar ve psikoloji öğrencileriyle, ihtiyaç duyan öğrencileri ücretsiz destekle buluşturmak.",
  },
  {
    icon: BookOpenCheck,
    title: "Ortak bilgi merkezi",
    text: "Ders notlarını, sınav konularını ve öğrencinin işine yarayan akademik bilgileri tek yerde toplamak.",
  },
  {
    icon: UsersRound,
    title: "Her sınıftan bir ses",
    text: "Sınıf temsilcileri aracılığıyla sorunları düzenli biçimde dinlemek, kaydetmek ve ilgili ekibe taşımak.",
  },
];

export default function ImpactSection() {
  return (
    <section
      className="bg-[#f4f7f9] px-5 py-24 sm:px-6 lg:py-32"
      id="yaptiklarimiz"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-bordeaux">
              Laf değil, yapılan iş
            </p>
            <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.045em] text-dark-gray sm:text-6xl">
              Okul gününün içinde çalışan çözümler.
            </h2>
          </div>
          <p className="max-w-2xl text-lg font-medium leading-8 text-gray-600 lg:justify-self-end">
            BALÖDER, öğrencilerin her gün karşılaştığı çözülebilir sorunları
            yalnızca konuşmak için değil, imkânı ölçüsünde doğrudan çözmek için
            var. Aşağıdakiler niyet beyanı değil; yaptığımız işler.
          </p>
        </div>

        <div className="grid auto-rows-[minmax(220px,auto)] gap-5 lg:grid-cols-12">
          <article className="group relative overflow-hidden rounded-[2rem] bg-dark-gray text-white lg:col-span-8 lg:row-span-2">
            <div className="grid h-full min-h-[570px] md:grid-cols-[1fr_1.15fr] lg:grid-cols-2">
              <div className="relative z-10 flex flex-col justify-between p-8 sm:p-10">
                <div>
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                    <ShoppingBasket aria-hidden="true" size={26} />
                  </div>
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-white/50">
                    2025–2026 boyunca
                  </p>
                  <h3 className="text-4xl font-black leading-none tracking-tight md:text-[2.5rem] lg:text-5xl">
                    BAL Öğrenci Kooperatifi
                  </h3>
                  <p className="mt-6 max-w-xl text-base font-medium leading-7 text-white/70">
                    Öğrencilerin güvenilir yiyecek ve içeceğe daha erişilebilir
                    fiyatlarla ulaşabilmesi için kooperatifi yıl boyunca
                    işlettik. Fiyatları açıkça yayımladık; suyu 5 TL&apos;den
                    sunduk.
                  </p>
                </div>
                <Link
                  className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-black transition hover:bg-white hover:text-dark-gray"
                  href="/coop-menu.png"
                  target="_blank"
                >
                  Menüyü tam boy aç
                  <ArrowUpRight aria-hidden="true" size={17} />
                </Link>
              </div>

              <div className="relative min-h-[330px] overflow-hidden bg-[#9f1728] border-t border-white/10 md:min-h-0 md:border-l md:border-t-0">
                <Image
                  alt="BAL Öğrenci Kooperatifi fiyat listesi"
                  className="object-contain object-center transition duration-700 group-hover:scale-[1.02]"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  src="/coop-menu.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/80 via-transparent to-transparent md:bg-gradient-to-r md:from-dark-gray/35 md:to-transparent" />
                <div className="absolute bottom-6 left-6 rounded-2xl bg-[#10e733] px-5 py-4 text-dark-gray shadow-2xl">
                  <span className="block text-4xl font-black leading-none">5 TL</span>
                  <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.18em]">
                    Kooperatifte su
                  </span>
                </div>
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[2rem] bg-bordeaux p-8 text-white sm:p-10 lg:col-span-4">
            <Droplets
              aria-hidden="true"
              className="absolute -bottom-12 -right-10 text-white/10"
              size={210}
              strokeWidth={1.2}
            />
            <p className="text-7xl font-black leading-none tracking-[-0.06em] sm:text-8xl">
              1000+
            </p>
            <h3 className="mt-5 text-2xl font-black">şişe ücretsiz su</h3>
            <p className="relative z-10 mt-3 max-w-md font-medium leading-7 text-white/75">
              BAL&apos;26 öğrencilerinin 2026 mezuniyet töreninde, temel bir
              ihtiyacın ücret engeline takılmaması için binden fazla şişe su
              dağıttık.
            </p>
          </article>

          <article className="rounded-[2rem] border border-gray-200 bg-white p-8 sm:p-10 lg:col-span-4">
            <div className="flex items-start justify-between gap-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Newspaper aria-hidden="true" size={25} />
              </div>
              <Link
                aria-label="BAL Times sitesini aç"
                className="rounded-full border border-gray-200 p-3 text-gray-500 transition hover:border-bordeaux hover:text-bordeaux"
                href="https://baltimes.org"
                target="_blank"
              >
                <ArrowUpRight aria-hidden="true" size={18} />
              </Link>
            </div>
            <h3 className="mt-8 text-3xl font-black tracking-tight text-dark-gray">
              BAL Times
            </h3>
            <p className="mt-3 font-medium leading-7 text-gray-600">
              Okul ve dernek gündemini WhatsApp topluluğu ve web sitesi
              üzerinden paylaşıyor; öğrencilerin kendi okullarında ne olduğunu
              takip edebilmesini sağlıyoruz.
            </p>
          </article>

          <article className="rounded-[2rem] bg-[#e7dfd2] p-8 sm:p-10 lg:col-span-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-dark-gray text-white">
              <Eye aria-hidden="true" size={25} />
            </div>
            <h3 className="mt-8 text-3xl font-black tracking-tight text-dark-gray">
              Sorunları görünür kılmak
            </h3>
            <p className="mt-3 font-medium leading-7 text-gray-700">
              Şeffaflık bizim için yalnızca bütçe tablosu değil. Öğrenciyi
              etkileyen bir sorun varsa onu dinlemek, kayda geçirmek ve açıkça
              konuşulabilir hâle getirmek de derneğin işi.
            </p>
          </article>
        </div>

        <div className="mt-24 rounded-[2.25rem] bg-white p-7 shadow-sm sm:p-10 lg:p-14">
          <div className="grid gap-8 border-b border-gray-200 pb-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-bordeaux">
                Sıradaki işler
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-dark-gray">
                Üzerinde çalıştıklarımız
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-medium leading-8 text-gray-600 lg:justify-self-end">
              Bunları tamamlanmış proje gibi anlatmıyoruz. Kurmak istediğimiz
              yapılar bunlar; ilerlemeyi ve sonucu açıkça paylaşacağız.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {NEXT_STEPS.map((item) => (
              <article
                className="rounded-3xl border border-gray-100 bg-[#f7f7f5] p-7"
                key={item.title}
              >
                <item.icon aria-hidden="true" className="text-bordeaux" size={27} />
                <h3 className="mt-8 text-xl font-black text-dark-gray">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-6 text-gray-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-bordeaux px-7 py-4 text-sm font-black text-white transition hover:bg-bordeaux-light"
              href="/hakkimizda"
            >
              Bizi ve ekibi tanı
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-7 py-4 text-sm font-black text-dark-gray transition hover:border-dark-gray"
              href="/bagis"
            >
              Bağış ve mali şeffaflık
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
