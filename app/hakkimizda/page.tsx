"use client";

import { motion } from "framer-motion";
import {
  ArrowDownRight,
  BookOpenCheck,
  Droplets,
  Eye,
  HeartHandshake,
  Newspaper,
  ShoppingBasket,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

const completedWork = [
  {
    icon: ShoppingBasket,
    label: "2025–2026 eğitim öğretim yılı",
    title: "BAL Öğrenci Kooperatifi",
    text: "2025–2026 Eğitim Öğretim Yılında öğrencilere uygun fiyatlı gıda sağladık. Güncel menü ve fiyat listesini açıkça yayımladık; uygun fiyatlı içecekler sunduk ve suyu 5 TL'den sattık.",
  },
  {
    icon: Droplets,
    label: "2026 · BAL'26",
    title: "Binden fazla ücretsiz su",
    text: "BAL'26 öğrencilerinin mezuniyet töreninde 1.000'in üzerinde şişe su dağıttık. Suya erişimin o gün kimse için ücret meselesi olmamasını istedik.",
  },
  {
    icon: Newspaper,
    label: "WhatsApp + web",
    title: "BAL Times",
    text: "Okul ve dernek gündemini öğrencilerle paylaşmak için BAL Times WhatsApp topluluğunu ve web sitesini kullanıyoruz.",
  },
  {
    icon: Eye,
    label: "Sürekli",
    title: "Görünürlük ve şeffaflık",
    text: "Öğrenciyi etkileyen konuları sessizce geçiştirmemeyi; dinlemeyi, kayda geçirmeyi ve konuşulur hâle getirmeyi görevimiz sayıyoruz.",
  },
];

const goals = [
  {
    icon: HeartHandshake,
    title: "Psikolojik destek ağı",
    text: "BAL mezunu psikologlar ve psikoloji öğrencilerinin gönüllü desteğini, ihtiyaç duyan öğrencilerle ücretsiz biçimde buluşturmak.",
  },
  {
    icon: BookOpenCheck,
    title: "Akademik paylaşım merkezi",
    text: "Notları, sınav konularını ve sınıfların işine yarayan akademik bilgileri dağınık mesajlardan çıkarıp ortak bir merkezde toplamak.",
  },
  {
    icon: UsersRound,
    title: "Sınıf temsilciliği",
    text: "Her sınıfın sorunlarını düzenli biçimde iletebileceği bir temsilci ağı kurmak ve takibi ilgili çalışma ekibiyle yapmak.",
  },
];

const secretariats = [
  // ["Kampüs Sekreterliği", "Boş"],
  ["Dijitalleşme Sekreterliği", "Emre Bozkurt"],
  ["Finans Sekreterliği", "Emine Hazal Şahan"],
  // ["Halkla İlişkiler Sekreterliği", "Boş"],
  ["Kooperatif Sekreterliği", "Emre Bozkurt"],
  // ["Sandık Sekreterliği", "Boş"],
  // ["Organizasyon Sekreterliği", "Boş"],
  // ["Girişim Sekreterliği", "Boş"],
  // ["Yurtdışı Eğitim Sekreterliği", "Boş"],
  // ["İnsan Hakları Sekreterliği", "Boş"],
  ["Hariciye ve Mezun İlişkileri Sekreterliği", "Noyan Önder"],
  // ["Kültür ve Sanat Sekreterliği", "Boş"],
  // ["Spor Sekreterliği", "Boş"],
  // ["İçişleri Sekreterliği", "Boş"],
];

const processSteps = [
  ["01", "Dinle", "Sorunu yaşayan öğrenciden doğrudan dinleriz."],
  ["02", "Kaydet", "Konuyu somutlaştırır, kapsamını ve önceliğini belirleriz."],
  ["03", "Sorumluluk ver", "İlgili çalışma ekibi işi üstlenir."],
  ["04", "Sonucu paylaş", "Yapılanı, yapılamayanı ve nedeni açıkça anlatırız."],
];

export default function AboutPage() {
  return (
    <main className="bg-[#f4f7f9] pb-24 pt-16">
      <section className="overflow-hidden bg-dark-gray px-5 pb-20 pt-24 text-white sm:px-6 sm:pb-28 sm:pt-28">
        <div className="mx-auto max-w-7xl">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-black uppercase tracking-[0.24em] text-[#ff7b88]"
            initial={{ opacity: 0, y: 12 }}
          >
            Bornova Anadolu Lisesi Öğrenci Derneği
          </motion.p>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-5xl text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 25 }}
            transition={{ delay: 0.08, duration: 0.65 }}
          >
            Bizim tarafımız
            <span className="block text-[#ff7b88]">öğrenci.</span>
          </motion.h1>
          <motion.div
            animate={{ opacity: 1 }}
            className="mt-12 grid gap-8 border-t border-white/10 pt-9 lg:grid-cols-[1.25fr_0.75fr]"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.22, duration: 0.6 }}
          >
            <p className="max-w-3xl text-xl font-medium leading-9 text-white/70 sm:text-2xl">
              BALÖDER, Bornova Anadolu Lisesi öğrencilerinin sosyal, kültürel ve
              akademik gelişimini desteklemek; haklarını savunmak ve okul
              içindeki dayanışmayı güçlendirmek için kurulmuş, kâr amacı
              gütmeden çalışan bir öğrenci derneğidir.
            </p>
            <div className="flex flex-wrap content-start gap-2 lg:justify-end">
              {["Şeffaf", "Katılımcı", "Yenilikçi", "BAL'a ait"].map((value) => (
                <span
                  className="rounded-full border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/60"
                  key={value}
                >
                  {value}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-bordeaux">
              Neden varız?
            </p>
            <h2 className="mt-5 text-4xl font-black leading-none tracking-tight text-dark-gray sm:text-5xl">
              Çözülebilecek sorunlar öğrencinin yükü olarak kalmasın diye.
            </h2>
          </div>
          <div className="space-y-7 text-lg font-medium leading-8 text-gray-600">
            <p>
              Okul hayatında küçük görünen meseleler her gün tekrarlandığında
              öğrencinin bütçesini, zamanını ve enerjisini tüketir. Pahalı su,
              güvenilir yiyeceğe erişim, sınıfın sesini duyuramaması veya önemli
              bilginin dağınık kalması bunlardan bazıları.
            </p>
            <p>
              Her şeyi tek başımıza çözeceğimizi söylemiyoruz. Yapabildiğimiz
              yerde doğrudan çözüm üretiyor; yetkimizin yetmediği yerde sorunu
              görünür kılıyor, takip ediyor ve öğrencinin sesini ilgili yere
              taşıyoruz.
            </p>
            <div className="grid gap-4 pt-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-7">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-bordeaux">
                  Vizyonumuz
                </p>
                <p className="mt-4 leading-7 text-dark-gray">
                  Dijitalleşen dünyada öğrenci birliğini çağdaş araçlarla
                  güçlendirmek ve BAL ruhunu gelecek kuşaklara taşımak.
                </p>
              </div>
              <div className="rounded-3xl bg-white p-7">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-bordeaux">
                  Ölçümüz
                </p>
                <p className="mt-4 leading-7 text-dark-gray">
                  Bir karar öğrencinin okul hayatını gerçekten iyileştiriyor mu?
                  Her işte önce bunu soruyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 border-b border-gray-200 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-bordeaux">
                Tamamladığımız ve sürdürdüğümüz işler
              </p>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-dark-gray sm:text-6xl">
                Ne yaptık?
              </h2>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-black text-bordeaux"
              href="#hedefler"
            >
              Hedeflerimize geç
              <ArrowDownRight aria-hidden="true" size={18} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {completedWork.map((item, index) => (
              <motion.article
                className="rounded-[2rem] border border-gray-200 p-8 sm:p-10"
                initial={{ opacity: 0, y: 20 }}
                key={item.title}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bordeaux text-white">
                    <item.icon aria-hidden="true" size={25} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.17em] text-gray-400">
                    {item.label}
                  </span>
                </div>
                <h3 className="mt-9 text-3xl font-black tracking-tight text-dark-gray">
                  {item.title}
                </h3>
                <p className="mt-4 font-medium leading-7 text-gray-600">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e7dfd2] px-5 py-24 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-bordeaux">
                Çalışma biçimimiz
              </p>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-dark-gray sm:text-5xl">
                Bir sorun bize geldiğinde ne olur?
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[2rem] bg-dark-gray/10 sm:grid-cols-2">
              {processSteps.map(([number, title, text]) => (
                <article className="bg-[#f3ede4] p-7 sm:p-8" key={number}>
                  <span className="text-xs font-black text-bordeaux">{number}</span>
                  <h3 className="mt-8 text-2xl font-black text-dark-gray">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-gray-600">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-6 lg:py-32" id="hedefler">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-bordeaux">
                Henüz tamamlanmadı
              </p>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-dark-gray sm:text-6xl">
                Sıradaki hedeflerimiz
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-medium leading-8 text-gray-600 lg:justify-self-end">
              Bir fikri yalnızca yazmak onu yapılmış kılmaz. Bu başlıklar şu an
              üzerinde çalıştığımız hedefler; ilerledikçe somut durumlarını
              paylaşacağız.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {goals.map((goal) => (
              <article
                className="rounded-[2rem] bg-dark-gray p-8 text-white"
                key={goal.title}
              >
                <goal.icon aria-hidden="true" className="text-[#ff7b88]" size={28} />
                <h3 className="mt-12 text-2xl font-black">{goal.title}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-white/60">
                  {goal.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-[2rem] bg-bordeaux p-8 text-white sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55">
                Başkan · 2026–2027
              </p>
              <p className="mt-10 text-4xl font-black tracking-tight">
                Ali Heval Korkut&apos;29
              </p>
            </article>
            <article className="rounded-[2rem] bg-dark-gray p-8 text-white sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Başkan Yardımcısı · 2026–2027
              </p>
              <p className="mt-10 text-4xl font-black tracking-tight">
                Emre Bozkurt&apos;28
              </p>
            </article>
          </div>

          <div className="mt-16 flex flex-col gap-5 border-b border-gray-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-bordeaux">
                Organizasyon
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-dark-gray">
                Sekreterlikler ve sorumlular
              </h2>
            </div>
            <p className="text-sm font-medium text-gray-500">
              Boş görevleri de saklamıyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {secretariats.map(([title, name]) => {
              const vacant = name === "Boş";
              return (
                <article
                  className="border-b border-gray-200 py-7 md:px-6 md:first:pl-0 lg:border-r lg:[&:nth-child(3n)]:border-r-0"
                  key={title}
                >
                  <h3 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400">
                    {title}
                  </h3>
                  <p
                    className={`mt-3 text-lg font-black ${
                      vacant ? "text-amber-600" : "text-dark-gray"
                    }`}
                  >
                    {name}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-14 flex flex-col gap-4 rounded-[2rem] bg-[#f4f7f9] p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-dark-gray">
                Bu takımın içinde yer almak ister misin?
              </h2>
              <p className="mt-2 font-medium text-gray-600">
                Üyelik başvurusu yapabilir veya doğrudan fikrini bize
                iletebilirsin.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="rounded-2xl bg-bordeaux px-6 py-4 text-center text-sm font-black text-white"
                href="/auth/signup"
              >
                Üyelik başvurusu
              </Link>
              <Link
                className="rounded-2xl border border-gray-300 px-6 py-4 text-center text-sm font-black text-dark-gray"
                href="/iletisim"
              >
                İletişime geç
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
