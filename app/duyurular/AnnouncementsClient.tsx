'use client'

import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"

export default function AnnouncementsClient({ initialAnnouncements }: { initialAnnouncements: any[] }) {
  return (
    <div className="pt-32 pb-24 bg-[#f4f7f9]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-dark-gray mb-6 tracking-tight border-l-8 border-bordeaux pl-8 uppercase">
            Duyurular
          </h1>
          <p className="text-xl text-gray-500 font-medium">Okulumuz ve derneğimizden en güncel haberler.</p>
        </div>

        <div className="space-y-10">
          {initialAnnouncements.map((ann, idx) => (
            <motion.div 
              key={ann.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-bordeaux/5 text-bordeaux rounded-lg">
                  <Calendar size={16} />
                </div>
                <span className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">{new Date(ann.createdAt).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl font-bold text-dark-gray mb-4 group-hover:text-bordeaux transition-colors">{ann.title}</h2>
              <p className="text-gray-500 font-medium leading-relaxed mb-6">{ann.excerpt}</p>
              {ann.content && (
                <div className="mt-4 pt-4 border-t border-gray-100/50">
                  <p className="text-gray-700 whitespace-pre-wrap">{ann.content}</p>
                </div>
              )}
            </motion.div>
          ))}
          {initialAnnouncements.length === 0 && (
             <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest text-sm italic">
                Henüz bir duyuru bulunmuyor.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
