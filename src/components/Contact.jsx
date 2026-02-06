import { useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Section from './Section';
import portfolioData from '../data/portfolio.json';

const Contact = () => {
    const { contact } = portfolioData;
    const [result, setResult] = useState("");
    const [status, setStatus] = useState("idle");

    const onSubmit = async (event) => {
        event.preventDefault();
        setStatus("loading");
        setResult("Sending....");

        const formData = new FormData(event.target);
        formData.append("access_key", contact.web3forms_access_key);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                setResult("Form Submitted Successfully!");
                event.target.reset();
            } else {
                setStatus("error");
                setResult(data.message);
            }
        } catch (error) {
            setStatus("error");
            setResult("Something went wrong. Please try again later.");
        }
    };

    return (
        <Section
            id="contact"
            title="Get in Touch"
            subtitle="Let's build something together"
        >
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-10 px-4">

                {/* Left Side - Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-10"
                >
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-white tracking-tight">Contact Information</h3>
                        <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-6">
                        {[
                            { icon: FaLinkedin, link: contact.socialLinks.linkedin, color: 'hover:text-blue-400' },
                            { icon: FaGithub, link: contact.socialLinks.github, color: 'hover:text-white' },
                            { icon: FaInstagram, link: contact.socialLinks.instagram, color: 'hover:text-pink-500' }
                        ].map((social, idx) => (
                            <motion.a
                                key={idx}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, scale: 1.1 }}
                                className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 shadow-xl backdrop-blur-sm`}
                            >
                                <social.icon size={28} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Right Side - Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
                >
                    {/* Background glow for form */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

                    <form onSubmit={onSubmit} className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Your Name"
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-600 transition-all duration-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="hello@example.com"
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-600 transition-all duration-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
                            <textarea
                                name="message"
                                required
                                rows="5"
                                placeholder="Tell me about your project..."
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-600 resize-none transition-all duration-300"
                            ></textarea>
                        </div>

                        {status !== "idle" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-sm font-medium px-4 py-2 rounded-lg ${status === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                                    status === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                                        "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                    }`}
                            >
                                {result}
                            </motion.div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={status === "loading"}
                            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-[0_10px_30px_rgba(59,130,246,0.3)] transition-all duration-300 ${status === "loading" ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0_15px_40px_rgba(59,130,246,0.5)] active:translate-y-1"
                                }`}
                        >
                            {status === "loading" ? "Sending..." : "Send Message"}
                        </motion.button>
                    </form>
                </motion.div>

            </div>
        </Section>
    );
};

export default Contact;
