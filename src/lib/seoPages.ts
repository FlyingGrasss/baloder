export type SeoSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoPage = {
  title: string;
  description: string;
  intro: string;
  updatedAt: string;
  updatedLabel: string;
  sections: SeoSection[];
  faqs: SeoFaq[];
};

export const SEO_PAGES: Record<string, SeoPage> = {
  "bornova-anadolu-lisesi": {
    title: "Bornova Anadolu Lisesi Hakkında | BALÖDER",
    description:
      "Bornova Anadolu Lisesi hakkında okulun eğitim yapısı, yabancı dil bölümleri, kampüsü, adresi ve öğrenci yaşamı bilgileri.",
    intro:
      "Bornova Anadolu Lisesi (BAL), İzmir'in Bornova ilçesinde bulunan, yabancı dil eğitimi ve köklü okul kültürüyle tanınan bir devlet Anadolu lisesidir. Bu sayfa, BAL hakkında temel bilgileri kaynak odaklı ve güncel tutulmaya çalışılan bir özet halinde sunar.",
    updatedAt: "2026-07-12",
    updatedLabel: "Temmuz 2026",
    sections: [
      {
        title: "Okulun eğitim yapısı",
        paragraphs: [
          "Bornova Anadolu Lisesi, hazırlık sınıfı bulunan bir Anadolu lisesidir. Hazırlık sınıfının yeniden açılmasıyla birlikte eğitim süresi hazırlık dahil beş yıl olmuştur: bir yıl hazırlık ve dört yıl lise eğitimi.",
          "Okulda İngilizce, Almanca ve Fransızca bölümleri bulunur. 2026–2027 eğitim-öğretim yılından itibaren Fransızca bölümüne yeni öğrenci kabul edilmeyecek; mevcut BAL'30 Fransızca öğrencileri bu bölümün son mezunları olacaktır.",
        ],
      },
      {
        title: "Adres ve iletişim",
        paragraphs: [
          "Bornova Anadolu Lisesi'nin tam resmi adresi Mevlana Mahallesi, Ord. Prof. Dr. Muhiddin Erel Caddesi, Bornova Anadolu Lisesi Blok No: 15A, Bornova / İzmir'dir.",
          "Okulun telefon numarası 0232 388 10 39, resmi web sitesi ise izmirbal.meb.k12.tr adresidir.",
        ],
      },
      {
        title: "Resmîlik ve bilgi sınırları",
        paragraphs: [
          "BALÖDER ve BAL Asistan, okul idaresi veya Millî Eğitim Bakanlığı adına resmî işlem yapan kurumlar değildir. Kayıt, nakil, kontenjan, sınav ve benzeri idari konularda okulun ve MEB'in güncel duyuruları esas alınmalıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Bornova Anadolu Lisesi kaç yıllık?",
        answer:
          "Bornova Anadolu Lisesi hazırlık dahil beş yıllık eğitim verir: bir yıl hazırlık ve dört yıl lise.",
      },
      {
        question: "Bornova Anadolu Lisesi'nin tam adresi nedir?",
        answer:
          "Mevlana Mahallesi, Ord. Prof. Dr. Muhiddin Erel Caddesi, Bornova Anadolu Lisesi Blok No: 15A, Bornova / İzmir.",
      },
      {
        question: "Bornova Anadolu Lisesi hangi yabancı dil bölümlerine sahip?",
        answer:
          "İngilizce, Almanca ve Fransızca bölümleri bulunur; 2026–2027 yılından itibaren Fransızca bölümüne yeni öğrenci kabul edilmeyecektir.",
      },
    ],
  },
  "bal-asistan": {
    title: "BAL Asistan | Bornova Anadolu Lisesi Yapay Zeka Asistanı",
    description:
      "BAL Asistan, Bornova Anadolu Lisesi hakkında kaynaklı bilgi sunan BALÖDER destekli yapay zeka asistanıdır.",
    intro:
      "BAL Asistan, Bornova Anadolu Lisesi hakkında öğrencilerin, velilerin ve okulu merak edenlerin bilgiye daha hızlı ulaşabilmesi için hazırlanmış bağımsız bir öğrenci projesidir. Asistana soru sorabilir veya aşağıdaki konu sayfalarından doğrudan bilgi alabilirsiniz.",
    updatedAt: "2026-07-12",
    updatedLabel: "Temmuz 2026",
    sections: [
      {
        title: "Nasıl çalışır?",
        paragraphs: [
          "Asistan, Bornova Anadolu Lisesi için hazırlanmış kaynak veri setinde ilgili bölümleri arar ve soruya göre yanıt oluşturur. Proje kendi yapay zeka modelini eğitmez; yanıt üretiminde öncelikli olarak Gemini modellerinden yararlanır.",
          "Kaynak metni okulun akademik yapısı, kampüsü, gelenekleri, ulaşımı, öğrenci yaşamı, kulüpleri ve sık sorulan sorularla ilgili bilgiler içerir. Veri seti yeni bilgiler geldikçe düzenlenip yeniden indekslenebilir.",
        ],
      },
      {
        title: "Bilgi kullanırken dikkat edilmesi gerekenler",
        paragraphs: [
          "Yapay zeka yanıtları eksik, hatalı veya güncel olmayan bilgiler içerebilir. Kayıt, nakil, sınav, kontenjan, devamsızlık, burs, pansiyon ve diğer resmî konularda okul idaresi, e-Okul, MEB ve okulun resmî duyuruları esas alınmalıdır.",
          "BAL Asistan hukuki, tıbbi, psikolojik, mali veya resmî danışmanlık vermez. Kişisel ve hassas bilgilerin sisteme gönderilmemesi gerekir.",
        ],
      },
      {
        title: "Teknoloji",
        paragraphs: [
          "Web sitesi Next.js ile geliştirilmiştir. BAL Asistan, BALÖDER bünyesinde yürütülen öğrenci çalışmalarıyla geliştirilmektedir; proje verilerinin hazırlanmasında Burak Güldilek ve Emre Bozkurt katkı sağlamıştır.",
        ],
      },
    ],
    faqs: [
      {
        question: "BAL Asistan resmî bir MEB sistemi mi?",
        answer:
          "Hayır. BAL Asistan, BALÖDER bünyesinde geliştirilmiş bağımsız bir öğrenci projesidir ve okul idaresi veya MEB adına resmî işlem yapmaz.",
      },
      {
        question: "BAL Asistan hangi yapay zeka modelini kullanıyor?",
        answer:
          "Yanıt üretiminde öncelikli olarak Gemini modellerinden yararlanır ve Bornova Anadolu Lisesi'ne özel kaynak veri setini kullanır.",
      },
    ],
  },
  "lgs-taban-puanlari": {
    title: "Bornova Anadolu Lisesi LGS Taban Puanları | BALÖDER",
    description:
      "Bornova Anadolu Lisesi 2025 LGS taban puanları, bölüm bilgileri ve 2026 verilerinin açıklanma durumu.",
    intro:
      "Bornova Anadolu Lisesi'nin LGS taban puanları yabancı dil bölümüne göre değişir. Elimizdeki en güncel kesin veriler 2025 yerleştirme sonuçlarına aittir; 2026 LGS taban puanları henüz açıklanmamıştır.",
    updatedAt: "2026-07-12",
    updatedLabel: "Temmuz 2026",
    sections: [
      {
        title: "2025 bölüm bazlı taban puanları",
        paragraphs: [
          "2025 LGS yerleştirme sonuçlarına göre Bornova Anadolu Lisesi'nin bölüm bazlı taban puanları aşağıdaki gibidir:",
        ],
        bullets: [
          "Almanca bölümü: 484,1567",
          "Fransızca bölümü: 480,1748",
          "İngilizce bölümü: 476,4021",
        ],
      },
      {
        title: "2026 sonuçları hakkında not",
        paragraphs: [
          "2026 LGS taban puanları açıklanmış değildir. Yeni sonuçlar ve tercih bilgileri yayımlandığında MEB'in yerleştirme sonuçları ile Bornova Anadolu Lisesi'nin resmî duyuruları kontrol edilmelidir.",
          "Taban puanlar yıllara, bölümlere ve yerleştirme sonuçlarına göre değişebilir. Geçmiş yıl puanları gelecekteki yerleştirmeyi garanti etmez.",
        ],
      },
    ],
    faqs: [
      {
        question: "Bornova Anadolu Lisesi 2026 LGS taban puanları açıklandı mı?",
        answer:
          "Hayır. Elimizdeki en güncel kesin veriler 2025 yerleştirme sonuçlarıdır; 2026 taban puanları henüz açıklanmamıştır.",
      },
      {
        question: "2025'te en yüksek Bornova Anadolu Lisesi taban puanı hangi bölümdeydi?",
        answer: "2025 verilerinde en yüksek taban puan 484,1567 ile Almanca bölümündeydi.",
      },
    ],
  },
  "hazirlik-sinifi": {
    title: "Bornova Anadolu Lisesi Hazırlık Sınıfı | BAL Asistan",
    description:
      "Bornova Anadolu Lisesi hazırlık sınıfı, yabancı dil bölümleri, seviye belirleme sınavı ve hazırlık atlama bilgileri.",
    intro:
      "Bornova Anadolu Lisesi'nde hazırlık sınıfı, öğrencilerin seçtikleri birinci yabancı dilde yoğun eğitim aldığı bir yıldır. Hazırlık sistemi okulun eğitim süresini hazırlık dahil beş yıla çıkarır.",
    updatedAt: "2026-07-12",
    updatedLabel: "Temmuz 2026",
    sections: [
      {
        title: "Hazırlık sınıfı ve yabancı dil bölümleri",
        paragraphs: [
          "Okulda İngilizce, Almanca ve Fransızca yabancı dil bölümleri bulunur. Öğrencinin birinci yabancı dili yerleştiği bölüme göre belirlenir. İkinci yabancı dil tercihi ise bölümle bağlantılı seçenekler arasından yapılır.",
          "İngilizce bölümü öğrencileri Almanca veya Fransızca; Almanca bölümü öğrencileri İngilizce veya Fransızca; Fransızca bölümü öğrencileri ise İngilizce veya Almanca seçebilir.",
        ],
      },
      {
        title: "Seviye belirleme ve hazırlığı atlama",
        paragraphs: [
          "Hazırlığın ilk haftasında öğrencinin yerleştiği bölümün birinci yabancı dilinde seviye belirleme/yeterlilik sınavı yapılır. Sınav performansı yeterli bulunan öğrenciler hazırlık sınıfını atlayarak doğrudan 9. sınıftan devam edebilir.",
          "Yeterli bulunmayan öğrenciler hazırlık eğitimine devam eder. Güncel sınav uygulaması ve okul içi takvim için okul duyuruları takip edilmelidir.",
        ],
      },
      {
        title: "BAL kuşakları ve hazırlık sisteminin etkisi",
        paragraphs: [
          "BAL öğrencileri mezun olacakları yılla anılır. Hazırlık sınıfının 2023 yılında yeniden açılması nedeniyle BAL'27 kuşağı bulunmaz; bu durum okulda 11. sınıf sorularının sorulmasına da neden olur.",
        ],
      },
    ],
    faqs: [
      {
        question: "Bornova Anadolu Lisesi hazırlık dahil kaç yıl?",
        answer: "Eğitim süresi hazırlık dahil beş yıldır: bir yıl hazırlık ve dört yıl lise.",
      },
      {
        question: "Hazırlık sınıfı nasıl atlanır?",
        answer:
          "Hazırlığın ilk haftasında yapılan yabancı dil seviye belirleme/yeterlilik sınavında yeterli performans gösteren öğrenciler hazırlığı atlayıp doğrudan 9. sınıfa geçebilir.",
      },
    ],
  },
  balkoop: {
    title: "BALKOOP Nedir? | BAL Öğrenci Kooperatifi",
    description:
      "BALKOOP, BALÖDER bünyesinde öğrenciler tarafından yürütülen BAL Öğrenci Kooperatifi'dir.",
    intro:
      "BALKOOP, BAL Öğrenci Kooperatifi'nin kısa adıdır. BALÖDER bünyesinde yer alan ve öğrenciler tarafından yürütülen bu oluşum, öğrencilere uygun fiyatlı, kaliteli ve güvenilir gıda ve içecekler sunmayı amaçlar.",
    updatedAt: "2026-07-12",
    updatedLabel: "Temmuz 2026",
    sections: [
      {
        title: "Kuruluşu ve amacı",
        paragraphs: [
          "BAL Öğrenci Kooperatifi 2023 yılında Ege Tanrıverdi tarafından kurulmuştur. Kooperatif, öğrencilerin günlük okul yaşamında uygun fiyatlı ve güvenilir gıda ile içeceklere erişebilmesini hedefler.",
          "BALKOOP, BALÖDER bünyesinde bulunan, öğrenciler tarafından yürütülen bir oluşumdur; okul idaresi veya MEB adına resmî işlem yapan bir kurum değildir.",
        ],
      },
      {
        title: "Güncel bilgi",
        paragraphs: [
          "Mevcut başkanı Emre Bozkurt'tur. Kooperatifin güncel çalışmaları ve iletişim bilgileri için BALÖDER'in balogrenci.org adresi takip edilebilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "BALKOOP neyin kısaltmasıdır?",
        answer: "BALKOOP, BAL Öğrenci Kooperatifi'nin kısa adıdır.",
      },
      {
        question: "BALKOOP'u kim kurdu?",
        answer: "BAL Öğrenci Kooperatifi 2023 yılında Ege Tanrıverdi tarafından kurulmuştur.",
      },
      {
        question: "BALKOOP'un mevcut başkanı kimdir?",
        answer: "BALKOOP'un mevcut başkanı Emre Bozkurt'tur.",
      },
    ],
  },
  "kulupler-ve-topluluklar": {
    title: "Bornova Anadolu Lisesi Kulüpleri ve Toplulukları",
    description:
      "Bornova Anadolu Lisesi kulüpleri ve öğrenci toplulukları, katılım süreci ve 2025–2026 listesi.",
    intro:
      "BAL'da sosyal yaşam kulüpler ve öğrenci topluluklarıyla şekillenir. Listede yer alan bir kulüp veya topluluğun her yıl düzenli olarak aktif faaliyet gösterdiği anlamına gelmediği unutulmamalıdır.",
    updatedAt: "2026-07-12",
    updatedLabel: "2025–2026 listesi",
    sections: [
      {
        title: "Faaliyet göstermiş kulüp ve topluluklar",
        paragraphs: [
          "2025–2026 eğitim-öğretim yılı için kayıtlı topluluklar ve okulda faaliyet göstermiş yapılar şunlardır:",
        ],
        bullets: [
          "Atatürkçü Gençlik Topluluğu",
          "BAL Genç Yeşilay",
          "BALTIMATE",
          "BAL Felsefe Topluluğu",
          "BAL Radyo",
          "BAL Yazılım Topluluğu",
          "Balösev",
          "Bornova Anadolu Lisesi Bando Takımı",
          "BAL Klasik Müzik Topluluğu",
          "İktisadi ve İdari Bilimler Topluluğu",
          "BAL Gastronomi Topluluğu",
          "Tanıtım Ekibi",
          "BAL FPS Topluluğu",
          "Astronomi Topluluğu",
          "BAL Animasyon ve Çizgi Roman",
          "BALFEST",
          "BAL Robotik",
          "BAL Mitoloji Topluluğu (BALMİT)",
          "BALART",
          "BAL Hip-Hop",
          "BAL Game Development",
          "BalDeutsch",
          "BAL Sinema ve Kısa Film Topluluğu",
          "Bornova Anadolu Lisesi Kamp Topluluğu",
          "Sosyal Sorumluluk Topluluğu",
        ],
      },
      {
        title: "Katılım nasıl olur?",
        paragraphs: [
          "Öğrenciler eğitim-öğretim yılının başında sınıf öğretmenleri aracılığıyla bir kulüp seçer. Bunun yanında diledikleri kadar topluluğa katılabilir ve yıl içinde topluluk değiştirebilirler. Toplulukların tanıtımları yıl başında yapılır.",
          "Kulüplerin ve toplulukların listede bulunması, hepsinin yıl boyunca aktif faaliyet gösterdiği anlamına gelmez. Güncel durum ve başvuru süreçleri okul duyuruları üzerinden takip edilmelidir.",
        ],
      },
    ],
    faqs: [
      {
        question: "BAL'da kaç kulüp ve topluluk var?",
        answer:
          "2025–2026 listesinde Sosyal Sorumluluk Topluluğu dahil 25 kulüp ve topluluk yer almaktadır.",
      },
      {
        question: "Öğrenciler kulüp ve topluluklara nasıl katılır?",
        answer:
          "Kulüp seçimi yıl başında sınıf öğretmenleri aracılığıyla yapılır; topluluklar ise yıl başındaki tanıtımlarla öğrencilere tanıtılır.",
      },
    ],
  },
  "adres-ulasim-ve-saatler": {
    title: "Bornova Anadolu Lisesi Adresi, Ulaşım ve Ders Saatleri",
    description:
      "Bornova Anadolu Lisesi'nin tam adresi, telefon numarası, ulaşım seçenekleri, ders giriş-çıkış ve yemek saatleri.",
    intro:
      "Bornova Anadolu Lisesi'ni ziyaret etmek veya okula ulaşmak isteyenler için tam adres, iletişim bilgileri ve okul gününün temel saatleri aşağıda yer alır.",
    updatedAt: "2026-07-12",
    updatedLabel: "Temmuz 2026",
    sections: [
      {
        title: "Tam adres ve telefon",
        paragraphs: [
          "Tam resmi adres: Mevlana Mahallesi, Ord. Prof. Dr. Muhiddin Erel Caddesi, Bornova Anadolu Lisesi Blok No: 15A, Bornova / İzmir.",
          "Telefon: 0232 388 10 39. Resmi okul web sitesi: izmirbal.meb.k12.tr.",
        ],
      },
      {
        title: "Ulaşım ve servisler",
        paragraphs: [
          "Okula İzmir'in birçok ilçesinden, örneğin Buca, Gaziemir, Karşıyaka, Mavişehir ve Menemen'den, ayrıca Manisa'dan servis ulaşımı sağlanabilmektedir. Servis güzergâhları, duraklar ve ücretler talebe ve döneme göre değişebilir.",
          "Güncel servis bilgileri ve randevu gibi ziyaret konuları için okul idaresi veya ilgili servis sağlayıcısıyla iletişime geçilmelidir.",
        ],
      },
      {
        title: "Ders ve yemek saatleri",
        paragraphs: [
          "Resmî okul günü 08:30'da başlar ve dersler 15:35'te sona erer. Bir ders 40 dakika, teneffüs ise 10 dakika sürer. Öğle yemeği 11:40–13:15 arasında servis edilir; hazırlık sınıfları öğle arasına daha erken çıkar.",
          "Kahvaltı 07:30–08:30, akşam yemeği ise 17:00–19:00 arasında servis edilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Bornova Anadolu Lisesi'nin tam adresi nedir?",
        answer:
          "Mevlana Mahallesi, Ord. Prof. Dr. Muhiddin Erel Caddesi, Bornova Anadolu Lisesi Blok No: 15A, Bornova / İzmir.",
      },
      {
        question: "Bornova Anadolu Lisesi'nde dersler saat kaçta bitiyor?",
        answer: "Ders günü 15:35'te sona erer.",
      },
      {
        question: "Bornova Anadolu Lisesi'nde öğle yemeği saat kaçta?",
        answer: "Öğle yemeği 11:40–13:15 arasında servis edilir.",
      },
    ],
  },
  "balev-bursu": {
    title: "BALEV Bursu Hakkında Bilgi | Bornova Anadolu Lisesi",
    description:
      "BALEV bursu, başvuru bilgileri ve Bornova Anadolu Lisesi öğrencilerine yönelik eğitim desteği hakkında genel bilgi.",
    intro:
      "BALEV, Bornova Anadolu Lisesi mezunları ve okul çevresinin oluşturduğu eğitim vakfıdır. BALEV bursları, maddi desteğe ihtiyaç duyan ve başarılı öğrencilerin eğitimlerini desteklemeyi amaçlar.",
    updatedAt: "2026-07-12",
    updatedLabel: "Temmuz 2026",
    sections: [
      {
        title: "Burs türleri",
        paragraphs: [
          "BALEV tarafından ortaöğretim, yükseköğretim ve özel başarı kategorilerinde burs desteği sağlanabilmektedir. 2024–2025 öğretim yılında 483 öğrencinin burs desteğinden yararlandığı bilgisi paylaşılmıştır.",
          "Burs koşulları, başvuru tarihleri ve istenen belgeler dönemsel olarak değişebilir. Kesin bilgi için BALEV'in resmî duyuruları takip edilmelidir.",
        ],
      },
      {
        title: "Başvuru",
        paragraphs: [
          "BALEV bursu hakkında güncel başvuru bilgileri balev.org.tr adresinde yayımlanır. BAL Asistan, burs başvurusu alan bir resmî kurum değildir ve başvuru sonucu hakkında karar veremez.",
        ],
      },
    ],
    faqs: [
      {
        question: "BALEV bursu nedir?",
        answer:
          "BALEV bursu, maddi desteğe ihtiyaç duyan ve başarılı öğrencilerin eğitimini desteklemeyi amaçlayan karşılıksız eğitim desteğidir.",
      },
      {
        question: "BALEV bursuna nereden başvurulur?",
        answer:
          "Güncel başvuru koşulları ve tarihler BALEV'in balev.org.tr adresindeki resmî duyurularından takip edilmelidir.",
      },
    ],
  },
};

export const SEO_SLUGS = Object.keys(SEO_PAGES);
