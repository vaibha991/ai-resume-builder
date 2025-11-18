"use client";

import { motion } from "framer-motion";
import { FileText, Eye, Cpu, Layers, Download, Wand2 } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6">

      {/* HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          Powerful AI Features to Build Your Perfect Resume
        </h1>
        <p className="text-gray-300 text-lg">
          Every tool you need to create an ATS-friendly, professional resume — fast and easy.
        </p>
      </section>

      {/* FEATURES GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {/* FEATURES DATA */}
        {[
          {
            icon: <Cpu className="w-10 h-10 text-indigo-400 mb-4" />,
            title: "AI Resume Writer",
            desc: "Generate content instantly using advanced AI — summary, experience, projects & more.",
            delay: 0.5,
          },
          {
            icon: <Layers className="w-10 h-10 text-purple-400 mb-4" />,
            title: "50+ Professional Templates",
            desc: "Modern, clean & ATS-friendly templates designed to impress recruiters.",
            delay: 0.6,
          },
          {
            icon: <Eye className="w-10 h-10 text-pink-400 mb-4" />,
            title: "Real-Time Live Preview",
            desc: "Edit on the left, preview on the right — see changes instantly.",
            delay: 0.7,
          },
          {
            icon: <Wand2 className="w-10 h-10 text-blue-400 mb-4" />,
            title: "ATS Optimization",
            desc: "Boost your resume with AI keyword analysis & job-based improvements.",
            delay: 0.8,
          },
          {
            icon: <FileText className="w-10 h-10 text-yellow-400 mb-4" />,
            title: "Auto Formatting",
            desc: "Perfect spacing, alignment, fonts & bullets — automatically done for you.",
            delay: 0.9,
          },
          {
            icon: <Download className="w-10 h-10 text-green-400 mb-4" />,
            title: "HD PDF Export",
            desc: "Export high-quality PDF with clean margins and pixel-perfect layout.",
            delay: 1.0,
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: feature.delay }}
            className="
              bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl 
              transition-all duration-300 
              hover:bg-white/10 
              hover:scale-[1.05]
              hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]
              hover:border-white/20
              cursor-pointer
            "
          >
            {feature.icon}
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm">{feature.desc}</p>
          </motion.div>
        ))}

      </section>

      {/* CTA BUTTON */}
      <div className="text-center mt-24 mb-10">
        <motion.a
          href="/template"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="
            px-10 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl 
            text-lg font-semibold shadow-xl 
            hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]
            transition-all
          "
        >
          Start Creating Your Resume
        </motion.a>
      </div>

    </div>
  );
}
