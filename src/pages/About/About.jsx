import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const stats = [
  { number: "10K+", label: "Happy Customers" },
  { number: "500+", label: "Curated Products" },
  { number: "50+", label: "Brand Partners" },
  { number: "4.9", label: "Average Rating" },
];

const values = [
  {
    icon: "✦",
    title: "Quality First",
    description:
      "Every product passes through our rigorous quality assessment before earning a place in our collection.",
  },
  {
    icon: "◈",
    title: "Sustainability",
    description:
      "We prioritize brands and artisans who share our commitment to ethical and sustainable practices.",
  },
  {
    icon: "❋",
    title: "Timeless Design",
    description:
      "We curate pieces that transcend trends and bring lasting value to your everyday life.",
  },
];

const team = [
  {
    name: "Alexandra Reed",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
  {
    name: "James Laurent",
    role: "Head of Curation",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
  {
    name: "Sofia Chen",
    role: "Creative Director",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  },
  {
    name: "Marcus Webb",
    role: "Brand Partnerships",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  },
];

const About = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  // GSAP Hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-tag", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.1,
        ease: "expo.out",
      });
      gsap.from(".about-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.25,
        ease: "expo.out",
      });
      gsap.from(".about-desc", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        delay: 0.5,
        ease: "expo.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // GSAP Stats counter
  useEffect(() => {
    if (!statsInView) return;
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "expo.out",
      });
    }, statsRef);

    return () => ctx.revert();
  }, [statsInView]);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden">
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="bg-gradient-to-br from-slate-100 to-blue-50 dark:from-slate-900 dark:to-slate-950 py-24 text-center relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <p className="about-tag text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400 mb-4">
            Our Story
          </p>
          <h1 className="about-title text-5xl font-bold text-gray-900 dark:text-slate-50 mb-6 max-w-2xl mx-auto leading-tight">
            Curating the World's Most Exceptional Everyday Essentials
          </h1>
          <p className="about-desc text-gray-500 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            A focus on minimalist luxury, timeless craftsmanship, and modern
            elegance since 2024.
          </p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400 mb-4"
            >
              Our Mission
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-6 leading-tight"
            >
              Redefining Modern Elegance
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed mb-4"
            >
              At LuxeRetail, we believe that everyday objects should inspire.
              Every product in our collection is hand-selected by our team of
              curators who share a passion for exceptional design and quality
              craftsmanship.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed"
            >
              We partner with artisans and brands who share our commitment to
              sustainability, ethical production, and timeless aesthetics that
              transcend seasonal trends.
            </motion.p>
          </div>

          {/* Mission Image */}
          <motion.div
            variants={fadeUp}
            className="relative h-80 rounded-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
              alt="Our Mission"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute bottom-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-xl px-4 py-3"
            >
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Established
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-slate-50">
                Since 2024
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section
        ref={statsRef}
        className="bg-blue-700 py-16 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={stat.label} className="stat-item">
                <p className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </p>
                <p className="text-blue-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400 mb-4"
          >
            What We Stand For
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-gray-900 dark:text-slate-50"
          >
            Our Values
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="bg-gray-50 dark:bg-slate-800/60 rounded-2xl p-8 text-center border border-transparent dark:border-slate-700/50 hover:shadow-lg dark:hover:shadow-black/30 transition-shadow"
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-700 dark:text-blue-400 text-xl"
              >
                {value.icon}
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-gray-50 dark:bg-slate-900 py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400 mb-4"
            >
              The People Behind LuxeRetail
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold text-gray-900 dark:text-slate-50"
            >
              Meet Our Team
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="text-center group"
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-transparent group-hover:border-blue-700 dark:group-hover:border-blue-500 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-blue-700/0 group-hover:bg-blue-700/10 transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-500">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-4"
          >
            Ready to Elevate Your Lifestyle?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 dark:text-slate-400 text-sm mb-8 max-w-md mx-auto"
          >
            Join thousands of curators who have discovered the art of refined
            living with LuxeRetail.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/shop"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors inline-block"
              >
                Shop Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 px-8 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors inline-block"
              >
                Join Us
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
