import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SEO_PAGES, SEO_SLUGS } from "@/src/lib/seoPages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = "https://balogrenci.org";

export const dynamicParams = false;

export function generateStaticParams() {
  return SEO_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = SEO_PAGES[slug];
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: `/asistan/bilgi/${slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE_URL}/asistan/bilgi/${slug}`,
      siteName: "BALÖDER",
      locale: "tr_TR",
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default async function SeoInfoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = SEO_PAGES[slug];
  if (!page) notFound();

  const canonicalUrl = `${SITE_URL}/asistan/bilgi/${slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: page.title,
        description: page.description,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${SITE_URL}#website` },
        dateModified: page.updatedAt,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "BALÖDER",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "BAL Asistan",
            item: `${SITE_URL}/asistan`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.title.split("|")[0].trim(),
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f4f7f9] px-4 pb-20 pt-28 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="mx-auto max-w-4xl">
        <nav aria-label="Sayfa yolu" className="mb-8 text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-bordeaux">
            BALÖDER
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <Link href="/asistan" className="hover:text-bordeaux">
            BAL Asistan
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-gray-700">Bilgi</span>
        </nav>

        <header className="rounded-[2rem] border border-red-100 bg-white p-7 shadow-sm sm:p-10">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-bordeaux">
            BAL Asistan bilgi sayfası
          </p>
          <h1 className="max-w-3xl text-3xl font-black tracking-tight text-dark-gray sm:text-5xl">
            {page.title.split("|")[0].trim()}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {page.intro}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-500">
            <time dateTime={page.updatedAt}>Son güncelleme: {page.updatedLabel}</time>
            <span aria-hidden="true">•</span>
            <Link href="/asistan" className="text-bordeaux hover:underline">
              BAL Asistan&apos;a soru sor
            </Link>
          </div>
        </header>

        <div className="mt-7 space-y-6">
          {page.sections.map((section) => (
            <section
              className="rounded-[1.5rem] border border-gray-100 bg-white p-7 shadow-sm sm:p-9"
              key={section.title}
            >
              <h2 className="text-2xl font-black tracking-tight text-dark-gray">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-[1.05rem] leading-8 text-gray-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-5 grid gap-2 border-l-4 border-bordeaux/30 pl-5 text-base font-semibold leading-7 text-gray-700 sm:grid-cols-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-6 rounded-[1.5rem] border border-red-100 bg-red-50/70 p-7 sm:p-9">
          <h2 className="text-2xl font-black tracking-tight text-dark-gray">
            Sık sorulan sorular
          </h2>
          <div className="mt-5 divide-y divide-red-100">
            {page.faqs.map((faq) => (
              <div className="py-5 first:pt-0 last:pb-0" key={faq.question}>
                <h3 className="text-lg font-extrabold text-dark-gray">{faq.question}</h3>
                <p className="mt-2 leading-7 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <nav aria-label="Diğer BAL Asistan bilgi sayfaları" className="mt-8">
          <h2 className="text-xl font-black text-dark-gray">Diğer BAL bilgi sayfaları</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {SEO_SLUGS.filter((item) => item !== slug).map((item) => (
              <Link
                className="rounded-full border border-red-100 bg-white px-4 py-2 text-sm font-bold text-bordeaux shadow-sm transition hover:border-bordeaux"
                href={`/asistan/bilgi/${item}`}
                key={item}
              >
                {SEO_PAGES[item].title.split("|")[0].trim()}
              </Link>
            ))}
          </div>
        </nav>

        <footer className="mt-10 border-t border-gray-200 pt-6 text-sm leading-6 text-gray-500">
          Bu sayfa, BALÖDER bünyesindeki bağımsız BAL Asistan öğrenci projesinin
          kaynak veri setine dayanır. Resmî işlemlerde okul idaresi, MEB ve okulun
          güncel duyuruları esas alınmalıdır.
        </footer>
      </article>
    </main>
  );
}
