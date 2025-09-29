import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { Award, CheckCircle, MapPin, Phone, TrendingUp, Users2, ChevronUp, Instagram, Youtube, Container, Building, Layers, Zap } from 'lucide-react';
import logo from '@/images/logo.png'
import telegram_l from '@/images/icons8-telegram-48.png'

interface AnimationVariants {
    fadeInLeft: any;
    fadeInRight: any;
    fadeInUp: any;
    stagger: any;
    scaleIn: any;
}

interface SectionHeaderProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'accent';
}

interface InfoCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'gradient' | 'accent' | 'glass' | 'dark';
}

// ScrollToTop Button Component
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-3xl shadow-2xl hover:shadow-cyan-300/25 transition-all duration-300 ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
        >
            <ChevronUp className="w-6 h-6" />
        </motion.button>
    );
};

// Animated Background Component
const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900"></div>
            <motion.div
                className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-teal-400/10 to-cyan-400/5 rounded-full blur-3xl"
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.4, 1],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div
                className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-cyan-400/8 to-teal-400/5 rounded-full blur-3xl"
                animate={{
                    rotate: [360, 0],
                    scale: [1.2, 1, 1.2],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full bg-[linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>
        </div>
    );
};

// Components
const SectionHeader: React.FC<SectionHeaderProps> = ({
    children,
    className = "",
    variant = 'primary'
}) => {
    const variants = {
        primary: 'text-white font-light tracking-wide',
        secondary: 'bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent font-light tracking-wider',
        accent: 'text-teal-400 font-medium tracking-wide'
    };

    return (
        <motion.h2
            className={`text-3xl md:text-4xl lg:text-5xl text-center mb-16 ${variants[variant]} ${className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {children}
        </motion.h2>
    );
};

const InfoCard: React.FC<InfoCardProps> = ({
    children,
    className = "",
    variant = 'default'
}) => {
    const baseClasses = "transition-all duration-700 hover:scale-[1.01] rounded-2xl";

    const variantClasses = {
        default: "bg-slate-800/90 backdrop-blur-sm shadow-2xl hover:shadow-teal-500/10 border border-slate-700/50 p-8",
        gradient: "bg-gradient-to-br from-slate-800/95 via-gray-800/90 to-slate-900/95 backdrop-blur-md shadow-2xl hover:shadow-cyan-500/15 border border-slate-600/30 p-4 lg:p-8",
        accent: "bg-gradient-to-br from-teal-900/80 to-slate-800/90 backdrop-blur-sm shadow-2xl hover:shadow-teal-400/20 border border-teal-700/30 p-4",
        glass: "bg-slate-800/30 backdrop-blur-xl shadow-2xl border border-slate-600/20 hover:bg-slate-800/40 p-4",
        dark: "bg-gradient-to-br from-gray-900 to-slate-900 text-white shadow-2xl hover:shadow-emerald-900/20 p-10 border border-gray-700/50"
    };

    return (
        <motion.div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
};

// CTA Button Component
const CTAButton: React.FC<{
    href: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'social' | 'telegram' | 'youtube' | 'pick';
}> = ({ href, children, icon, variant = 'primary' }) => {
    const variants = {
        primary: "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-xl hover:shadow-teal-300/30 hover:from-teal-600 hover:to-cyan-600",
        secondary: "bg-gradient-to-r from-slate-700 to-gray-700 text-white shadow-xl hover:shadow-slate-300/30 hover:from-slate-800 hover:to-gray-800",
        outline: "border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900 bg-slate-800/50 backdrop-blur-sm",
        social: "bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white shadow-xl hover:shadow-cyan-300/40",
        pick: "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white hover:opacity-90",
        telegram: "bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg hover:shadow-red-200",
        youtube: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-pink-200"
    };

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-300 ${variants[variant]}`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
        >
            {icon && <span className="w-6 h-6">{icon}</span>}
            <span>{children}</span>
        </motion.a>
    );
};

const createAnimationVariants = (prefersReducedMotion: boolean): AnimationVariants => ({
    fadeInLeft: {
        initial: { opacity: 0, x: prefersReducedMotion ? 0 : -80 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: prefersReducedMotion ? 0.1 : 1.2, ease: 'easeOut' }
    },
    fadeInRight: {
        initial: { opacity: 0, x: prefersReducedMotion ? 0 : 80 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: prefersReducedMotion ? 0.1 : 1.2, ease: 'easeOut' }
    },
    fadeInUp: {
        initial: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: prefersReducedMotion ? 0.1 : 1, ease: 'easeOut' }
    },
    scaleIn: {
        initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: prefersReducedMotion ? 0.1 : 0.9, ease: 'easeOut' }
    },
    stagger: {
        animate: {
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.2
            }
        }
    }
});

const COMPANY_ADVANTAGES = [
    'Ilg\'or texnologiya - zamonaviy kontainer dizayni va ishlab chiqarish usullari',
    'Maksimal samaradorlik - qisqa muddatda yuqori sifatli natijalar',
    'Moslashuvchan narxlar - har qanday loyiha byudjeti uchun optimal yechimlar',
    'Ekspert jamoa - kontainer sanoatidagi yetakchi mutaxasislar',
    'Uzaytirilgan kafolat - barcha mahsulotlar uchun keng qamrovli himoya',
    'Mijoz markazli xizmat - har bir talabga individual yondashuv',
    'Yuqori malakali ishchi kuchi - tajribali va sertifikatlangan mutaxasislar',
    'To\'liq sifat nazorati - ishlab chiqarishning har bir bosqichida tekshirish'
];

const KEY_FEATURES = [
    {
        icon: Container,
        title: 'Modulli Tizim',
        description: 'Zamonaviy modulli kontainer tizimi orqali istalgan o\'lcham va konfiguratsiyada qurilish. Kelajakda oson kengaytirish va o\'zgartirish imkoniyati.',
        color: 'from-teal-500 to-cyan-500'
    },
    {
        icon: Building,
        title: 'Struktural Mustahkamlik',
        description: 'Yuqori sifatli po\'lat va kompozit materiallardan yasalgan kontainerlar har qanday ob-havo sharoitlariga bardosh beradi. 50+ yil xizmat muddati.',
        color: 'from-slate-600 to-gray-600'
    },
    {
        icon: Layers,
        title: 'Ko\'p Qatlamli Yechim',
        description: 'Vertikal va gorizontal kengaytirish imkoniyati bilan modulli qurilish. Maydon tejash va maksimal samaradorlik ta\'minlash.',
        color: 'from-cyan-400 to-teal-500'
    },
    {
        icon: Zap,
        title: 'Tez Qurilish',
        description: 'Tayyor modullar yordamida an\'anaviy qurilishdan 90% tezroq natija. Professional o\'rnatish va ishga tushirish xizmati.',
        color: 'from-emerald-500 to-teal-600'
    }
] as const;

const SERVICES = [
    'Tijorat kontainerlari - savdo va biznes markazlari uchun zamonaviy yechimlar',
    'Turar joy komplekslari - modulli va energiya tejovchi uy-joy loyihalari',
    'Sanoat majmualari - zavod va ishlab chiqarish korxonalari uchun kontainerlar',
    'Ta\'lim muassasalari - maktab va universitet kampuslari uchun modulli binolar',
    'Tibbiyot markazlari - klinika va shifoxonalar uchun maxsus kontainerlar',
    'Maxsus loyihalar - noyob talablar asosida individual kontainer yechimlari'
];

function KonteynerCity() {
    const prefersReducedMotion = !!useReducedMotion();
    const variants = useMemo(() => createAnimationVariants(prefersReducedMotion), [prefersReducedMotion]);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    return (
        <div className='w-full min-h-screen relative text-white' style={{
            '--teal-700': '#0f766e',
            '--teal-800': '#115e59',
            '--cyan-600': '#0891b2'
        } as React.CSSProperties}>
            <AnimatedBackground />
            <ScrollToTop />

            <div className="container mx-auto relative z-10 px-3">
                {/* Hero Section */}
                <motion.div
                    className="text-center py-24 mt-8"
                    initial={variants.fadeInUp.initial}
                    animate={variants.fadeInUp.animate}
                    transition={variants.fadeInUp.transition}
                >
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, scale: 0.6, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <div className='flex items-center justify-center mb-8'>
                            <div className="relative">
                                <img src={logo} alt="Kontainer City Logo" className='w-52 h-52 rounded-2xl shadow-2xl border-2 border-teal-400/30' />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1.2 }}
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light mb-12 tracking-wider">
                            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                                KONTAINER
                            </span>
                            <br />
                            <span className="text-teal-400 font-thin text-5xl md:text-7xl lg:text-8xl">
                                CITY
                            </span>
                        </h1>

                        <div className="flex justify-center items-center space-x-4 mb-12">
                            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent to-teal-400"></div>
                            <Container className="w-12 h-12 text-teal-400" />
                            <div className="w-24 h-0.5 bg-gradient-to-l from-transparent to-teal-400"></div>
                        </div>
                    </motion.div>

                    <motion.p
                        className="text-2xl md:text-3xl text-teal-300 font-light mb-8 tracking-wide"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        Zamonaviy kontainer arkitekturasining birinchi raqamli kompaniyasi
                    </motion.p>

                    <motion.p
                        className="text-lg md:text-xl text-gray-600 mb-20 max-w-4xl mx-auto font-light leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                    >
                        O'zbekistonda modulli kontainer qurilishi sohasidagi mutloq lider.
                        Innovatsion yechimlar, professional jamoa va 8 yillik tajriba.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-8 justify-center"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 1 }}
                    >
                        <CTAButton href="tel:+998787777557" variant="primary">
                            <div className='flex items-center gap-1'>
                                <Phone className="w-6 h-6" />
                                Loyiha boshlash
                            </div>
                        </CTAButton>
                        <CTAButton href="https://t.me/kontainer_city" variant="outline">
                            Ko'proq bilish
                        </CTAButton>
                    </motion.div>
                </motion.div>

                {/* Process Steps */}
                <motion.section className="py-24">
                    <SectionHeader variant="secondary">
                        Professional loyiha jarayoni
                    </SectionHeader>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            {
                                title: 'Strategik Maslahat',
                                desc: 'Professional arxitektor va muhandislar sizning g\'oyangizni batafsil tahlil qilib, eng optimal yechimni ishlab chiqadi.',
                                step: '01'
                            },
                            {
                                title: '3D Loyihalash',
                                desc: 'Zamonaviy dasturlar yordamida sizning kontainer loyihangizning to\'liq 3D vizualizatsiyasini yaratamiz.',
                                step: '02'
                            },
                            {
                                title: 'Yuqori Sifatli Ishlab Chiqarish',
                                desc: 'Evropa standartlariga javob beruvchi modern uskunalar yordamida pretsizion ishlab chiqarish.',
                                step: '03'
                            },
                            {
                                title: 'Professional Yetkazish',
                                desc: 'Maxsus transport va malakali o\'rnatish jamoasi orqali loyihangizni kalit taslim topshirish.',
                                step: '04'
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 1 }}
                                viewport={{ once: true }}
                            >
                                <InfoCard variant="glass" className="h-full text-center relative overflow-hidden">
                                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center opacity-20">
                                        <span className="text-white font-light text-2xl">{step.step}</span>
                                    </div>
                                    {/* <div className="text-8xl mb-8 filter drop-shadow-lg">{step.icon}</div> */}
                                    <h3 className="text-2xl font-light mb-6 text-teal-500 tracking-wide">{step.title}</h3>
                                    <p className='text-white leading-relaxed text-base font-light'>{step.desc}</p>
                                </InfoCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Social Media Section */}
                <motion.section className="py-10">
                    <InfoCard variant="dark">
                        <SectionHeader className="text-white mb-12">
                            Bizning ijtimoiy sahifalatimiz
                        </SectionHeader>
                        <div className="flex flex-wrap justify-center gap-8">
                            <CTAButton href="https://www.youtube.com/@KontainerCityUz" variant="youtube">
                                <div className='flex items-center gap-1 text-white'>
                                    <Youtube className="w-6 h-6" />
                                    YouTube
                                </div>
                            </CTAButton>

                            <div className='flex gap-7'>
                                <CTAButton href="https://www.instagram.com/kontainer_city.uz?igsh=eTN2amw1cDM1MGNv&utm_source=qr" variant="pick">
                                    <div className='flex items-center gap-1 text-white'>
                                        <Instagram className="w-6 h-6" />
                                        Instagram
                                    </div>

                                </CTAButton>
                                <CTAButton href="https://t.me/kontainer_city" variant="telegram">
                                    <div className='flex items-center gap-1 text-white'>
                                        <img src={telegram_l} alt="telegram logo" className='w-7 h-7' />
                                        Telegram
                                    </div>
                                </CTAButton>
                            </div>
                        </div>
                    </InfoCard>
                </motion.section>

                {/* Company Advantages */}
                <motion.section className="py-10">
                    <InfoCard variant="default">
                        <SectionHeader variant="secondary" className="flex items-center justify-center gap-6">
                            <Award className="w-20 h-20 text-teal-400" />
                            Nima uchun KONTAINER CITY?
                        </SectionHeader>

                        <div className="grid md:grid-cols-2 gap-10">
                            {COMPANY_ADVANTAGES.map((advantage, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start space-x-5 p-6 rounded-2xl hover:bg-slate-700/30 transition-all duration-500 border border-slate-600/20"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.02, x: 10 }}
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <CheckCircle className="w-6 h-6 text-slate-900" />
                                    </div>
                                    <span className="text-gray-200 leading-relaxed text-lg font-light">{advantage}</span>
                                </motion.div>
                            ))}
                        </div>
                    </InfoCard>
                </motion.section>

                {/* Key Features */}
                <motion.section className="py-10">
                    <InfoCard variant="accent">
                        <SectionHeader variant="primary" className="flex items-center justify-center gap-6">
                            <TrendingUp className="w-20 h-20 text-teal-300" />
                            KONTAINER CITY ning texnologik ustunliklari
                        </SectionHeader>

                        <div className="grid md:grid-cols-2 gap-16">
                            {KEY_FEATURES.map((feature, index) => {
                                // const IconComponent = feature.icon;
                                return (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.3, duration: 1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -15 }}
                                    >
                                        <InfoCard variant="glass" className="h-full border-2 border-teal-500/20">
                                            <div className="flex items-start space-x-8">
                                                <div className="flex-1">
                                                    <h4 className="text-3xl font-light text-teal-300 mb-3 tracking-wide">
                                                        {feature.title}
                                                    </h4>
                                                    <p className="text-gray-300 leading-relaxed text-lg font-light">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </InfoCard>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </InfoCard>
                </motion.section>

                {/* FAQ Section */}
                <motion.section className="py-10">
                    <InfoCard variant="gradient">
                        <SectionHeader variant="secondary">Muhim savollar va javoblar</SectionHeader>
                        <div className="space-y-10">
                            {[
                                {
                                    q: "Kontainer City ning asosiy farqi nimada?",
                                    a: "Biz O'zbekistonda modulli kontainer arxitekturasining kashshofi sifatida 8 yil davomida innovatsion yechimlar yaratib kelmoqdamiz."
                                },
                                {
                                    q: "Bizning xizmatlarimizning asosiy afzalligi nima?",
                                    a: "Modulli tizim orqali an'anaviy qurilishdan 5-7 marta arzon va 10 marta tezroq natijaga erishamiz."
                                },
                                {
                                    q: "Loyihalarni kim amalga oshiradi?",
                                    a: "Barcha loyihalar yuqori malakali arxitektor, muhandis va tajribali ishchi kuchi tomonidan bajariladi."
                                },
                                {
                                    q: "Sifat kafolati qanday ta'minlanadi?",
                                    a: "Evropa standartlaridagi materiallar va 25 yillik kafolat bilan har bir loyihaning sifati ta'minlanadi."
                                }
                            ].map((faq, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-slate-800/60 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-slate-600/30"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2, duration: 0.8 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <h3 className="text-2xl font-light text-teal-300 mb-6 flex items-start tracking-wide">
                                        {/* <span className="text-teal-400 mr-4 text-4xl font-light">S:</span> */}
                                        {faq.q}
                                    </h3>
                                    <p className="text-gray-300 ml-4 leading-relaxed text-lg font-light">
                                        {/* <span className="text-cyan-400 mr-4 text-4xl font-light">J:</span> */}
                                        {faq.a}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </InfoCard>
                </motion.section>

                {/* About Section */}
                <motion.section className="py-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-6xl font-light mb-16 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent tracking-wider">
                                KONTAINER CITY HAQIDA
                            </h2>

                            <div className="space-y-10 text-gray-300 leading-relaxed text-lg">
                                {[
                                    "Modulli kontainer arxitekturasi - bu kelajakning qurilish texnologiyasi. Bizning innovatsion yondashuvimiz orqali eng murakkab loyihalarni ham oddiy va samarali tarzda amalga oshirish mumkin.",
                                    "Har bir kontainer maxsus loyihalashtiriladi va professional jihoz bilan jihozlanadi. Energiya samaradorligi, ekologik toza materiallar va zamonaviy dizayn tamoyillarini birlashtirgan holda loyihalar yaratamiz.",
                                    "Bizning modulli tizimimiz orqali istagan vaqtda binolarni kengaytirish, qayta konfiguratsiya qilish yoki hatto boshqa joyga ko'chirish mumkin. Bu sizning investitsiyangizning uzoq muddatli qiymatini ta'minlaydi."
                                ].map((text, index) => (
                                    <motion.p
                                        key={index}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.4, duration: 1 }}
                                        viewport={{ once: true }}
                                        className="p-8 bg-slate-800/40 rounded-2xl border-l-4 border-teal-400 shadow-lg font-light"
                                    >
                                        {text}
                                    </motion.p>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2 }}
                            viewport={{ once: true }}
                        >
                            <InfoCard variant="dark">
                                <h3 className="text-4xl font-light text-white mb-12 text-center tracking-wide">
                                    Kontainer City <span className='text-5xl italic text-teal-300 font-light'>Professional Xizmatlar</span>
                                </h3>

                                <div className="space-y-8">
                                    {SERVICES.map((service, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-start space-x-5 p-5 rounded-2xl hover:bg-slate-700/30 transition-all duration-500"
                                            initial={{ opacity: 0, x: -40 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.15, duration: 0.8 }}
                                            viewport={{ once: true }}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-300 to-cyan-300 flex items-center justify-center flex-shrink-0 shadow-lg">
                                                <CheckCircle className="w-5 h-5 text-slate-900" />
                                            </div>
                                            <span className="text-gray-200 text-lg leading-relaxed font-light">{service}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </InfoCard>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Statistics */}
                <motion.section className="py-10">
                    <InfoCard variant="gradient">
                        <SectionHeader variant="secondary">
                            Bizning <span className="text-teal-400">Professional Natijalar</span>
                        </SectionHeader>

                            {/* <div className="grid md:grid-cols-3 gap-12 mb-20">
                                {[
                                    { icon: TrendingUp, label: "Yillik o'sish", value: "35%+", color: "from-teal-400 to-cyan-400" },
                                    { icon: Award, label: "2025 loyihalar", value: "1500+", color: "from-slate-500 to-gray-500" },
                                    { icon: Users2, label: "Mutaxassis jamoa", value: "150+", color: "from-emerald-400 to-teal-400" }
                                ].map((stat, index) => {
                                    const IconComponent = stat.icon;
                                    return (
                                        <motion.div
                                            key={stat.label}
                                            className="text-center p-12 bg-slate-800/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-600/30"
                                            initial={{ opacity: 0, scale: 0.6 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.3, duration: 1 }}
                                            viewport={{ once: true }}
                                            whileHover={{ scale: 1.05, y: -10 }}
                                        >
                                            <div className={`w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-2xl`}>
                                                <IconComponent className="w-12 h-12 text-white" />
                                            </div>
                                            <div className="text-6xl font-light text-white mb-6">{stat.value}</div>
                                            <div className="text-teal-300 font-light text-xl tracking-wide">{stat.label}</div>
                                        </motion.div>
                                    );
                                })}
                            </div> */}

                        <motion.div
                            className="space-y-10 text-gray-300 leading-relaxed text-lg"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1.2 }}
                            viewport={{ once: true }}
                        >
                            {[
                                "Bizning ishlab chiqarish quvvatimiz kuniga 35 kv.m, oyiga 1050 kv.m va yiliga 12,600+ kv.m tashkil etadi.",
                                "O'zbekistonning barcha hududlarida 150 dan ortiq yuqori malakali arxitektor va muhandislarimiz faoliyat ko'rsatadi.",
                                "Zamonaviy texnologiyalar yordamida kuniga 5 tagacha to'liq tayyor kontainer modulini ishlab chiqaramiz.",
                                "O'zbekiston kontainer sanoatining asoschilaridan biri sifatida 8 yil davomida sohani rivojlantirishga ulkan hissa qo'shganmiz."
                            ].map((text, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2, duration: 1 }}
                                    viewport={{ once: true }}
                                    className="p-10 bg-slate-800/50 rounded-3xl shadow-2xl border-l-8 border-teal-400 hover:shadow-teal-500/10 transition-all duration-500"
                                >
                                    <div className="flex items-start space-x-6">
                                        <div className="w-12 h-12 hidden lg:flex rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 items-center justify-center flex-shrink-0 mt-2 shadow-lg">
                                            <span className="text-slate-900 font-light text-xl">{index + 1}</span>
                                        </div>
                                        <p className="text-gray-300 font-light">{text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </InfoCard>
                </motion.section>

                {/* Contact Section */}
                <motion.section className="py-24">
                    <InfoCard variant="default">
                        <SectionHeader variant="primary" className="flex items-center justify-center gap-6">
                            <Phone className="w-10 h-10 text-teal-400" />
                            Professional aloqa
                        </SectionHeader>

                        <div className="max-w-6xl mx-auto">
                            <motion.p
                                className="text-gray-300 text-2xl leading-relaxed text-center mb-20 font-light tracking-wide"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                viewport={{ once: true }}
                            >
                                Innovatsion kontainer arxitekturasi orqali sizning g'oyalaringizni haqiqatga aylantirish vaqti keldi.
                                Professional jamoa va ilg'or texnologiyalar bilan eng murakkab loyihalarni ham amalga oshiramiz.
                            </motion.p>

                            <div className="grid lg:grid-cols-2 gap-14">
                                <motion.div
                                    initial={{ opacity: 0, x: -60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <InfoCard variant="accent" className="h-full">
                                        <h3 className="text-4xl font-light text-teal-300 mb-7 text-center tracking-wide">
                                            Aloqa ma'lumotlari
                                        </h3>

                                        <div className="space-y-8">
                                            <motion.a
                                                href="tel:+998787777557"
                                                className="flex items-center gap-6 p-5 bg-slate-700/50 rounded-3xl hover:bg-slate-600/50 transition-all duration-500 group shadow-2xl border border-teal-500/20"
                                                whileHover={{ scale: 1.02, x: 15 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <div className="hidden lg:inline-flex p-5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-3xl shadow-2xl">
                                                    <Phone className="w-10 h-10 text-slate-900" />
                                                </div>
                                                <div>
                                                    <p className="font-light text-teal-300 text-2xl mb-2">Telefon aloqasi</p>
                                                    <p className="text-white font-light text-2xl">+998 78 777 75 57</p>
                                                </div>
                                            </motion.a>
                                        </div>
                                    </InfoCard>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <InfoCard variant="accent" className="h-full">
                                        <h3 className="text-4xl font-light text-teal-300 mb-7 text-center tracking-wide">
                                            Bizning manzilimiz
                                        </h3>

                                        <div className="flex items-start gap-6 p-5 bg-slate-700/50 rounded-3xl shadow-2xl border border-teal-500/20">
                                            <div className="hidden lg:inline-flex p-5 bg-gradient-to-r from-slate-500 to-gray-500 rounded-3xl flex-shrink-0 shadow-2xl">
                                                <MapPin className="w-10 h-10 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-light text-teal-300 mb-6 text-2xl">Ishlab chiqarish markazi</p>
                                                <div className="text-gray-300 leading-relaxed space-y-1 font-light text-lg">
                                                    <p className="font-medium text-xl">Toshkent shahar, Yangihayot tumani</p>
                                                    <p>Metro: Turon bekat</p>
                                                    <p>Index bozor chorraxasi</p>
                                                    <p>Sofdil ko'chasi</p>
                                                </div>
                                            </div>
                                        </div>
                                    </InfoCard>
                                </motion.div>
                            </div>

                            {/* Final CTA */}
                            <motion.div
                                className="text-center mt-24"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-4xl font-light text-teal-300 mb-12 tracking-wide">
                                    Kontainer loyihangizni bugunoq boshlang
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-10 justify-center">
                                    <CTAButton href="tel:+998787777557" variant="primary">
                                        <div className='flex items-center gap-1'>
                                            <Phone className="w-6 h-6" />
                                            Loyiha boshlash
                                        </div>

                                    </CTAButton>
                                    <CTAButton href="https://t.me/kontainer_city" variant="outline">
                                        Bepul maslahat
                                    </CTAButton>
                                </div>
                            </motion.div>
                        </div>
                    </InfoCard>
                </motion.section>

                {/* Footer */}
                <motion.footer
                    className="py-8 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="space-y-5">
                        <motion.h3
                            className="text-6xl font-light bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent tracking-wider"
                            whileHover={{ scale: 1.05 }}
                        >
                            KONTAINER CITY
                        </motion.h3>
                        <div className="flex justify-center items-center space-x-6">
                            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent to-teal-400"></div>
                            <Container className="w-16 h-16 text-teal-400" />
                            <div className="w-32 h-0.5 bg-gradient-to-l from-transparent to-teal-400"></div>
                        </div>
                        <p className="text-gray-500 text-xl font-light tracking-wide">
                            O'zbekistonning innovatsion kontainer arxitektura kompaniyasi
                        </p>
                        <p className="text-sm text-gray-500 font-light">
                            © 2025 Kontainer City. Barcha huquqlar himoyalangan.
                        </p>
                    </div>
                </motion.footer>
            </div>
        </div>
    );
}

export default KonteynerCity;