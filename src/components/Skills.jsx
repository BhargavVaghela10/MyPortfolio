import { motion } from 'framer-motion';
import Section from './Section';

const skillsList = [
    "C", "JAVA", "HTML5", "CSS3", "JAVASCRIPT", "PYTHON", "GOOGLECLOUD", "FIREBASE", "VERCEL", "BOOTSTRAP", "TAILWINDCSS", "MYSQL", "MONGODB", "NUMPY", "PANDAS", "SCIKIT-LEARN", "LLM", "LANGCHAIN", "LANGGRAPH", "RAG-BASICS", "GIT", "GITHUB"
];

const Skills = () => {
    return (
        <Section
            id="skills"
            title="My Skills"
            subtitle="Technologies I work with"
        >
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto px-4 pt-10">
                {skillsList.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:border-blue-500 hover:text-blue-400 transition-all cursor-pointer font-bold tracking-wider text-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    >
                        {skill}
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Skills;
