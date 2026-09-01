'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Globe, Moon, Sun, Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export default function Resume() {
  const [lang, setLang] = useState('ar');
  const [darkMode, setDarkMode] = useState(true);
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCV() {
      const { data, error } = await supabase.from('cv_data').select('content').single();
      if (data) setCv(data.content);
      setLoading(false);
    }
    fetchCV();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;
  if (!cv) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Error loading CV data</div>;

  const isRtl = lang === 'ar';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header Controls */}
      <header className="max-w-4xl mx-auto p-6 flex justify-between items-center border-b border-slate-700/50">
        <div className="flex gap-2">
          {['ar', 'tr', 'en'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-full text-sm font-semibold uppercase transition ${
                lang === l ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 space-y-12">
        {/* Profile Info */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-blue-500">{cv.personal_info.full_name[lang]}</h1>
          <p className="text-xl font-medium text-slate-400">{cv.personal_info.title[lang]}</p>
          <p className="max-w-2xl mx-auto text-slate-300 leading-relaxed">{cv.personal_info.about[lang]}</p>

          <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Mail size={16} /> {cv.personal_info.contact.email}</span>
            <span className="flex items-center gap-2"><Phone size={16} /> {cv.personal_info.contact.phone}</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> {cv.personal_info.contact.location}</span>
          </div>
        </section>

        {/* Experience */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 border-b border-slate-700/50 pb-2 text-blue-400">
            <Briefcase size={22} /> {lang === 'ar' ? 'الخبرات المهنية' : lang === 'tr' ? 'İş Deneyimi' : 'Experience'}
          </h2>
          <div className="space-y-6">
            {cv.experiences.map((exp, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="font-bold text-lg text-slate-200">{exp.role[lang]}</h3>
                  <span className="text-xs bg-blue-950 text-blue-400 px-3 py-1 rounded-full">{exp.period}</span>
                </div>
                <p className="text-sm text-blue-400/80 font-medium">{exp.company}</p>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 pt-2">
                  {exp.details[lang].map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Skills */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 border-b border-slate-700/50 pb-2 text-blue-400">
              <GraduationCap size={22} /> {lang === 'ar' ? 'التعليم' : lang === 'tr' ? 'Eğitim' : 'Education'}
            </h2>
            {cv.education.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <h3 className="font-bold text-slate-200">{edu.degree[lang]}</h3>
                <p className="text-sm text-slate-400">{edu.institution} ({edu.year})</p>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 border-b border-slate-700/50 pb-2 text-blue-400">
              <Award size={22} /> {lang === 'ar' ? 'المهارات' : lang === 'tr' ? 'Beceriler' : 'Skills'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {cv.skills.map((skill, idx) => (
                <span key={idx} className="bg-slate-800 text-slate-300 text-sm px-3 py-1 rounded-lg border border-slate-700">
                  {skill[lang]}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
