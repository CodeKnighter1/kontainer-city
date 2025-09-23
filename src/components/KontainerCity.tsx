import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { Award, CheckCircle, Clock, CpuIcon, HeartIcon, MapPin, Phone, TrendingUp, UserCheck, Users2, ChevronUp, Play, Instagram, Youtube } from 'lucide-react';
import logo from '@/images/logo.png'


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
    gradient?: boolean;
}

interface InfoCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'gradient' | 'accent' | 'glass';
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
            className={`fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
                isVisible ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            whileHover={{ scale: 1.1 }}
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
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
            <motion.div
                className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-red-100/30 to-blue-100/30 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-red-100/20 rounded-full blur-3xl"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
};

// Components
const SectionHeader: React.FC<SectionHeaderProps> = ({
    children,
    className = "",
    gradient = false
}) => (
    <motion.h2 
        className={`text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 ${gradient
            ? 'bg-gradient-to-r from-red-600 via-slate-700 to-red-600 bg-clip-text text-transparent'
            : 'text-slate-800'
        } ${className}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
    >
        {children}
    </motion.h2>
);

const InfoCard: React.FC<InfoCardProps> = ({
    children,
    className = "",
    variant = 'default'
}) => {
    const baseClasses = "p-6 md:p-8 mb-8 transition-all duration-500 hover:scale-[1.02]";

    const variantClasses = {
        default: "bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl border border-white/20",
        gradient: "bg-gradient-to-br from-white/90 via-red-50/30 to-blue-50/30 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-3xl border border-white/30",
        accent: "bg-gradient-to-br from-red-50/80 to-blue-50/80 backdrop-blur-sm shadow-lg hover:shadow-xl rounded-2xl border border-red-100/30",
        glass: "bg-white/10 backdrop-blur-md shadow-xl border border-white/20 rounded-3xl hover:bg-white/20"
    };

    return (
        <motion.div 
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
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
    variant?: 'primary' | 'secondary' | 'pick';
}> = ({ href, children, icon, variant = 'primary' }) => {
    const variants = {
        primary: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-200",
        secondary: "bg-[#0088cc] text-white hover:bg-[#006699] shadow-lg hover:shadow-slate-200",
        pick: "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white hover:opacity-90"
    };

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${variants[variant]}`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
        >
            {icon && <span className="w-5 h-5">{icon}</span>}
            <span>{children}</span>
        </motion.a>
    );
};

const createAnimationVariants = (prefersReducedMotion: boolean): AnimationVariants => ({
    fadeInLeft: {
        initial: { opacity: 0, x: prefersReducedMotion ? 0 : -60 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: prefersReducedMotion ? 0.1 : 0.8, ease: 'easeOut' }
    },
    fadeInRight: {
        initial: { opacity: 0, x: prefersReducedMotion ? 0 : 60 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: prefersReducedMotion ? 0.1 : 0.8, ease: 'easeOut' }
    },
    fadeInUp: {
        initial: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: prefersReducedMotion ? 0.1 : 0.6, ease: 'easeOut' }
    },
    scaleIn: {
        initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: prefersReducedMotion ? 0.1 : 0.5, ease: 'easeOut' }
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
    'Sifat va mustahkamlik – ishlatiladigan materiallar yuqori darajali va bardoshli.',
    'Tezkorlik – qisqa vaqt ichida qurilish va o\'rnatish ishlari yakunlanadi.',
    'Hamyonbop narxlar – byudjetingizga mos keladigan yechimlar taklif qilamiz.',
    'Professional jamoa: Bizning jamoamiz malakali va tajribali mutaxasislardan iborat.',
    'Kafolat – har bir qurilgan konstruksiya kafolat bilan topshiriladi.',
    'Mijozlarga yo\'naltirilgan yondashuv: Biz mijozlarimizning ehtiyojlarini tushunishga va ularga mos yechimlar taklif qilishga intilamiz.',
    'Bizda oddiy ustalar emas, balki o\'z ishining haqiqiy mutaxasislari xizmat ko\'rsatadi.',
    'Ishlab chiqarishning barcha bosqichlari nazorat ostida amalga oshiriladi.',
];

const KEY_FEATURES = [
    {
        icon: Clock,
        title: 'Qurilish tezligi',
        description: 'An\'anaviy g\'isht yoki beton binolarga qaraganda, metall konstruksiya qismlari oldindan tayyorlanadi va joyida tez yig\'iladi. Bu vaqt va mehnatni tejaydi.',
        color: 'from-red-500 to-red-600'
    },
    {
        icon: UserCheck,
        title: 'Mustahkamlik va chidamlilik',
        description: 'Metall konstruksiyalar zilzilaga, shamolga va boshqa tashqi ta\'sirlarga bardoshli. Yillar davomida shaklini yo\'qotmaydi.',
        color: 'from-slate-600 to-slate-700'
    },
    {
        icon: CpuIcon,
        title: 'Arzonroq xarajat',
        description: 'Qurilish materiali va vaqt kam sarflangani uchun umumiy narx ham nisbatan past bo\'ladi. Uzoq muddatda ta\'mirlash xarajatlari ham kamroq bo\'ladi.',
        color: 'from-blue-500 to-blue-600'
    },
    {
        icon: HeartIcon,
        title: 'Ko\'chirish va kengaytirish imkoniyati',
        description: 'Metall konstruksiya modulli bo\'lgani uchun keyinchalik do\'konni kattalashtirish yoki boshqa joyga ko\'chirish osonroq.',
        color: 'from-red-400 to-pink-500'
    }
] as const;

const SERVICES = [
    'Do\'kon va savdo nuqtalari – qisqa vaqt ichida qurib, foydalanishga tayyor qilib beramiz.',
    'Omborxonalar – katta maydonli, keng va xavfsiz konstruksiyalar.',
    'Angarlar – qishloq xo\'jaligi, ishlab chiqarish yoki texnika saqlash uchun qulay variant.',
    'Avtoturargohlar – transport vositalaringiz uchun mustahkam va ishonchli joy.',
    'Pavilyon va ustaxonalar – kichik biznes va servis xizmatlari uchun ideal yechim.',
    'Individual buyurtmalar – siz o\'ylagan maxsus metal konstruksiyani loyihalab, sifatli qilib yasab beramiz.'
];

function KonteynerCity() {
    const prefersReducedMotion = !!useReducedMotion();
    const variants = useMemo(() => createAnimationVariants(prefersReducedMotion), [prefersReducedMotion]);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    return (
        <div className='w-full min-h-screen relative'>
            <AnimatedBackground />
            <ScrollToTop />
            
            <div className="container mx-auto relative z-10 px-4">
                {/* Hero Section */}
                <motion.div
                    className="text-center py-16 mt-3"
                    initial={variants.fadeInUp.initial}
                    animate={variants.fadeInUp.animate}
                    transition={variants.fadeInUp.transition}
                >
                    {/* Logo placeholder - bu yerga logo qo'shiladi */}
                    <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className='flex items-center justify-center'>
                            <img src={logo} alt="" />
                        </div>
                        {/* <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-500 to-slate-700 rounded-2xl flex items-center justify-center shadow-2xl">
                            <span className="text-white font-bold text-lg">LOGO</span>
                        </div> */}
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <span className="bg-gradient-to-r from-red-600 via-slate-800 to-red-600 bg-clip-text text-transparent">
                            "KONTAINER" CITY
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-slate-700 mt-8 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        Mijoz uchun sifat, biz uchun mas'uliyat!
                    </motion.p>

                    <motion.p
                        className="text-base md:text-lg text-slate-600 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        O'zbekistondagi eng ilg'or kontainerlar fabrikasi.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    >
                        <CTAButton href="tel:+998787777557" variant="primary">
                            <Phone className="w-5 h-5" />
                            Hozir Qo'ng'iroq
                        </CTAButton>
                        <CTAButton href="https://t.me/kontainer_city" variant="secondary">
                            Batafsil Ma'lumot
                        </CTAButton>
                    </motion.div>
                </motion.div>

                {/* Process Steps */}
                <motion.section className="py-16">
                    <SectionHeader>
                        Buyurtmangiz sizgacha ushbu jarayonlardan o'tadi
                    </SectionHeader>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '📞', title: 'Birinchi bosqichda', desc: 'Bizning xush muomala menejerlarimiz sizdan buyurtmani qabul qilishadi.' },
                            { icon: '📝', title: 'Ikkinchi bosqichda', desc: 'Sizning buyurtmangiz yo\'nalishi bo\'yicha o\'z ishining mutahasislari tomonidan yasaladi.' },
                            { icon: '⚙️', title: 'Uchinchi bosqichda', desc: 'Qurib bitkazilgan mahsulot sifat nazoratidan o\'tkaziladi. Ushbu jarayon bizning fabrikamiz uchun muhim jarayon hisoblanadi!' },
                            { icon: '🚚', title: 'To\'rtinchi bosqichda', desc: 'Sifat nazoratidan o\'tgan mahsulotingiz siz aytgan joyga yetkazib beriladi.' }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <InfoCard variant="glass" className="h-full text-center">
                                    <div className="text-5xl mb-4">{step.icon}</div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-800">{step.title}</h3>
                                    <p className='text-slate-600 leading-relaxed'>{step.desc}</p>
                                </InfoCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Social Media Links */}
                <motion.section className="py-16">
                    <InfoCard variant="gradient" className="max-w-4xl mx-auto text-center">
                        <SectionHeader gradient className='mb-5'>Bizni ijtimoiy tarmoqlarda kuzatib boring</SectionHeader>
                        <div className="flex flex-wrap justify-center gap-4">
                            <CTAButton href="https://www.youtube.com/@KontainerCityUz" variant="primary">
                                <Youtube className="w-5 h-5 text-white" />
                                <span className='text-white'>YouTube</span>
                            </CTAButton>
                            <CTAButton href="https://www.instagram.com/kontainer_city.uz?igsh=eTN2amw1cDM1MGNv&utm_source=qr" variant="pick">
                                <Instagram className="w-5 h-5 text-white" />
                                <span className='text-white'>Instagram</span>
                            </CTAButton>
                            <CTAButton href="https://t.me/kontainer_city" variant="secondary">
                                <span className='text-white'>Telegram</span>
                            </CTAButton>
                        </div>
                    </InfoCard>
                </motion.section>

                {/* Company Advantages */}
                <motion.section className="py-16">
                    <InfoCard variant="default">
                        <SectionHeader className="flex items-center justify-center gap-3">
                            <Award className="w-12 h-12 text-red-500" />
                            NEGA <span className="text-red-600">"KONTAINER CITY"</span>
                        </SectionHeader>

                        <div className="grid md:grid-cols-2 gap-6">
                            {COMPANY_ADVANTAGES.map((advantage, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start space-x-3 p-4 rounded-xl hover:bg-red-50/50 transition-colors"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-700 leading-relaxed">{advantage}</span>
                                </motion.div>
                            ))}
                        </div>
                    </InfoCard>
                </motion.section>

                {/* FAQ Section */}
                <motion.section className="py-16">
                    <InfoCard variant="accent">
                        <SectionHeader gradient>SAVOL - JAVOBLAR</SectionHeader>
                        <div className="space-y-6">
                            {[
                                {
                                    q: "Nega aynan Kontainer City?",
                                    a: "Bizdagi kontainerdan qurilgan loyihalar narx jihatidan bozordagi boshqalardan sezilarli darajada arzonroq."
                                },
                                {
                                    q: "Bizdan xarid qilishingizni nima qulayliklar bor?",
                                    a: "Boshlang'ich va o'rta bizneslar uchun qimmat ijara yoki qimmat qurilish xarajatlari muammo. Biz esa ular uchun biznesni boshlash yoki kengaytirishning arzon va qulay yechimini taklif qilamiz."
                                },
                                {
                                    q: "Buyurtmani kim tayyorlaydi?",
                                    a: "Buyurtmalarni oddiy ustalar emas, balki haqiqiy professionallar bajaradi. Biz faqat sifatli materiallardan foydalanamiz."
                                },
                                {
                                    q: "Bizga nima uchun ishonishingiz kerak?",
                                    a: "Bizning fabrikamiz O'zbekiston bo'yicha birinchi ochilgan va birinchi raqmli fabrika hisoblanadi va 8 yildan buyon faoliyatda!"
                                }
                            ].map((faq, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border-l-4 border-red-500"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-start">
                                        <span className="text-red-500 mr-2">❓</span>
                                        {faq.q}
                                    </h3>
                                    <p className="text-slate-600 ml-7 leading-relaxed">
                                        <span className="text-red-500 mr-2">👉</span>
                                        {faq.a}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </InfoCard>
                </motion.section>

                {/* Key Features */}
                <motion.section className="py-16">
                    <InfoCard variant="default">
                        <SectionHeader className="flex items-center justify-center gap-3">
                            <TrendingUp className="w-12 h-12 text-red-500" />
                            KONTAINER CITY <span className="text-red-600">AFZALLIKLARI</span>
                        </SectionHeader>

                        <div className="grid md:grid-cols-2 gap-8">
                            {KEY_FEATURES.map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1, duration: 0.6 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <InfoCard variant="glass" className="h-full">
                                            <div className="flex items-start space-x-4">
                                                <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                                                    <IconComponent className="w-7 h-7 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-xl font-bold text-slate-800 mb-3">
                                                        {feature.title}
                                                    </h4>
                                                    <p className="text-slate-600 leading-relaxed">
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

                {/* About Section */}
                <motion.section className="py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-red-600 to-slate-700 bg-clip-text text-transparent text-center lg:text-left">
                                KONTAINER CITY HAQIDA
                            </h2>
                            
                            <div className="space-y-6 text-slate-600 leading-relaxed">
                                {[
                                    "Metal konstruksiyadan qurilgan do'konlar bugungi kunda eng samarali va zamonaviy yechim hisoblanadi. Bunday inshootlar nafaqat mustahkam va ishonchli, balki iqtisodiy jihatdan ham foydali.",
                                    "Tez quriladi – qisqa muddat ichida do'koningizni ishga tushirishingiz mumkin. Arzonroq – an'anaviy g'isht yoki beton qurilishidan ancha tejamkor. Ko'chma imkoniyat – kerak bo'lsa, konstruksiyani boshqa joyga ko'chirib o'rnatish mumkin.",
                                    "Moslashuvchan dizayn – savdo do'konlari, ombor yoki xizmat ko'rsatish shoxobchalari uchun qulay. Uzoq muddatli xizmat – sifatli metall materiallar zangga qarshi maxsus himoya bilan qoplanadi."
                                ].map((text, index) => (
                                    <motion.p
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2, duration: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        {text}
                                    </motion.p>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <InfoCard variant="gradient">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                                    Kontainer City <span className='text-3xl italic text-red-600'>Xizmatlarimiz</span>
                                </h3>
                                
                                <div className="space-y-4">
                                    {SERVICES.map((service, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1, duration: 0.6 }}
                                            viewport={{ once: true }}
                                        >
                                            <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-700">{service}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </InfoCard>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Statistics */}
                <motion.section className="py-16">
                    <InfoCard variant="default">
                        <SectionHeader>
                            "QO'SHIMCHA" <span className="text-red-600">MA'LUMOTLAR</span>
                        </SectionHeader>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {[
                                { icon: TrendingUp, label: "Yillik o'sish", value: "15-20%" },
                                { icon: Award, label: "2025-yilgi reja", value: "800-1000" },
                                { icon: Users2, label: "Viloyatlar bo'yicha mutaxasislarimiz", value: "100+" }
                            ].map((stat, index) => {
                                const IconComponent = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.label}
                                        className="text-center p-6 bg-gradient-to-br from-white/80 to-red-50/50 rounded-2xl shadow-lg"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1, duration: 0.6 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <IconComponent className="w-10 h-10 text-red-500 mx-auto mb-4" />
                                        <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                                        <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <motion.div 
                            className="space-y-6 text-slate-600 leading-relaxed"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            {[
                                "Bizning ishlab chiqarish quvvatimiz har kuni 20 kv, oyiga 610 kv va yiliga 7300 kv tashkil etadi.",
                                "Viloyatlar miqyosida 100 dan ko'proq mutaxasislarimiz faoliyat yuritadi.",
                                "Ishlab chiqarish quvvatimiz kuniga ikkita do'konni tayyor holga keltirishga imkon beradi.",
                                                                "Bizning fabrikamiz O‘zbekiston bo‘yicha birinchi ochilgan va birinchi raqamli fabrika hisoblanadi. Eng asosiysi 8 yildan beri faoliyatda!"
                            ].map((text, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="p-4 bg-white/50 rounded-lg border-l-4 border-red-200"
                                >
                                    {text}
                                </motion.p>
                            ))}
                        </motion.div>
                    </InfoCard>
                </motion.section>

                {/* Contact Section */}
                <motion.section className="py-16">
                    <InfoCard variant="gradient">
                        <SectionHeader gradient className="flex items-center justify-center gap-4">
                            <Phone className="w-10 h-10 text-red-500" />
                            BIZ BILAN ALOQA
                        </SectionHeader>

                        <div className="max-w-4xl mx-auto">
                            <motion.p 
                                className="text-slate-700 text-lg leading-relaxed text-center mb-12"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                Biznes — birinchi qadamdan boshlanadi. Bizning metal konstruksiyadan qurilgan 
                                ko'chma do'konlarimiz bilan sizning birinchi qadamingiz mustahkam, ishonchli va 
                                hamyonbop bo'lishini ta'minlaymiz.
                            </motion.p>

                            <div className="grid md:grid-cols-2 gap-8">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <InfoCard variant="glass" className="h-full">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                                            Murojat uchun
                                        </h3>
                                        
                                        <div className="space-y-4">
                                            <motion.a
                                                href="tel:+998787777557"
                                                className="flex items-center gap-4 p-4 bg-white/70 rounded-xl hover:bg-white/90 transition-all duration-300 group"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
                                                    <Phone className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800">Telefon raqami</p>
                                                    <p className="text-red-600 font-medium">+998 78 777 75 57</p>
                                                </div>
                                            </motion.a>
                                        </div>
                                    </InfoCard>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <InfoCard variant="glass" className="h-full">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                                            Bizning manzil
                                        </h3>
                                        
                                        <div className="flex items-start gap-4 p-4 bg-white/70 rounded-xl">
                                            <div className="p-3 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex-shrink-0">
                                                <MapPin className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800 mb-2">Fabrika manzili</p>
                                                <p className="text-slate-600 leading-relaxed">
                                                    Toshkent shahar, Yangihayot tumani<br />
                                                    Metro: Turon bekat<br />
                                                    Index bozor chorraxasi
                                                </p>
                                            </div>
                                        </div>
                                    </InfoCard>
                                </motion.div>
                            </div>

                            {/* Final CTA */}
                            <motion.div 
                                className="text-center mt-12"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-semibold text-slate-800 mb-6">
                                    Biznesingizni boshlash uchun tayyor bo'lsangiz?
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <CTAButton href="tel:+998787777557" variant="primary">
                                        <Phone className="w-5 h-5" />
                                        <span className='text-white'>Hozir Buyurtma Bering</span>
                                    </CTAButton>
                                    <CTAButton href="https://t.me/kontainer_city" variant="secondary">
                                        <span className='text-white'>Bepul Maslahat Oling</span>
                                    </CTAButton>
                                </div>
                            </motion.div>
                        </div>
                    </InfoCard>
                </motion.section>

                {/* Footer */}
                <motion.footer 
                    className="py-12 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-slate-700 bg-clip-text text-transparent">
                            KONTAINER CITY
                        </h3>
                        <p className="text-slate-600">
                            O'zbekistondagi eng ishonchli kontainer fabrikasi
                        </p>
                        <p className="text-sm text-slate-500">
                            © 2025 Kontainer City. Barcha huquqlar himoyalangan.
                        </p>
                    </div>
                </motion.footer>
            </div>
        </div>
    );
}

export default KonteynerCity;