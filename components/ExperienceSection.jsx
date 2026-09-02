'use client';

import { useState } from 'react';

const CATEGORIES = [
  { id: 'all', label: 'الكل / All' },
  { id: 'management', label: 'الإدارة والعمليات / Operations' },
  { id: 'sales', label: 'المبيعات والحجوزات / Sales' },
  { id: 'legal', label: 'الاستشارات / Consultancy' },
  { id: 'tech', label: 'الأنظمة والحلول / Tech Solutions' },
];

export default function ExperienceSection({ experiences }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredExperiences = experiences.filter((exp) => {
    if (activeFilter === 'all') return true;
    return exp.tags && exp.tags.includes(activeFilter);
  });

  return (
    <section className="py-12 bg-slate-900 text-white dir-rtl">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
          الخبرات المهنية والإنجازات
        </h2>

        {/* فلاتر التخصص التفاعلية */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* قائمة الخبرات المفلترة */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredExperiences.map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="bg-slate-800/80 border border-slate-700 p-6 rounded-xl shadow-md hover:border-blue-500/50 transition-all"
            >
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <p className="text-blue-400 text-sm">{exp.company}</p>
                </div>
                <span className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full">
                  {exp.period}
                </span>
              </div>

              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                {exp.description}
              </p>

              {/* وسم الإنجاز والمجال الفعلي */}
              {exp.achievements && (
                <div className="mt-4 pt-3 border-t border-slate-700/60">
                  <span className="text-xs text-blue-300 font-semibold block mb-1">
                    أبرز الإنجازات والأنظمة:
                  </span>
                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
