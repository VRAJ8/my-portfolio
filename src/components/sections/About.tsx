import { motion } from 'framer-motion';
import AnimatedText from '../ui/AnimatedText';
import SkillPill from '../ui/SkillPill';
import { skills } from '../../data/skills';

const About = () => {
  const categoryNames = {
    frontend: 'Frontend',
    backend: 'Backend'
  } as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  
  return (
    <section id="about" className="py-16 md:py-20 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <AnimatedText 
            text="About Me"
            className="section-title text-text-primary-light dark:text-white inline-block"
            delay={0.2}
          />
          <motion.div
            className="h-1 bg-accent mt-4 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Bio */}
          <motion.div
            className="glass-panel dark:glass-panel rounded-card p-8 border border-text-primary-light/10 dark:border-white/10 shadow-glass-light dark:shadow-glass hover:border-accent/30 dark:hover:border-accent/30 transition-all duration-300 h-full"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
          >
            <motion.h3 
              className="text-2xl font-bold mb-6 text-text-primary-light dark:text-white group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Who I Am
              <motion.span 
                className="block h-0.5 bg-accent mt-2"
                initial={{ width: 0 }}
                whileInView={{ width: "33%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
            </motion.h3>
            <motion.div 
              className="space-y-4 text-text-primary-light/80 dark:text-white/80"
              variants={itemVariants}
            >
              <p>
                👋 Hi, I'm Vraj — a Computer Science Engineering student with a passion for solving real-world problems through technology. I enjoy crafting clean, functional, and user-friendly digital experiences.
              </p>
              <p>
                I'm constantly learning and growing as a developer, with a strong interest in full-stack development and modern web technologies. My approach combines logic with creativity, and I take pride in writing code that's both efficient and elegant.
              </p>
              <p>
                When I'm not immersed in code, you'll probably find me following basketball, cricket, or football — sports that fuel my competitive spirit and inspire teamwork in everything I do.
              </p>
              <p>
                I'm driven, curious, and always up for the next big challenge.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Skills */}
          <motion.div
            className="glass-panel dark:glass-panel rounded-card p-8 border border-text-primary-light/10 dark:border-white/10 shadow-glass-light dark:shadow-glass hover:border-accent/30 dark:hover:border-accent/30 transition-all duration-300 h-full"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
          >
            <motion.h3 
              className="text-2xl font-bold mb-6 text-text-primary-light dark:text-white group"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              My Skills
              <motion.span 
                className="block h-0.5 bg-accent mt-2"
                initial={{ width: 0 }}
                whileInView={{ width: "33%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
            </motion.h3>
            
            <div className="space-y-6">
              {Object.entries(categoryNames).map(([category, title], categoryIndex) => (
                <motion.div 
                  key={category} 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 * categoryIndex }}
                >
                  <h4 className="text-lg font-medium text-text-primary-light dark:text-white group">
                    {title}
                    <motion.span 
                      className="block h-0.5 bg-accent/50 mt-1"
                      initial={{ width: 0 }}
                      whileInView={{ width: "25%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 * categoryIndex }}
                    />
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skills
                      .filter(skill => skill.category === category)
                      .map((skill, index) => (
                        <SkillPill key={skill.name} skill={skill} index={index} />
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Experience Section */}
        <div className="mt-12">
          <motion.h3 
            className="text-2xl font-bold mb-4 text-text-primary-light dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Professional Experience
          </motion.h3>
          
          <motion.div 
            className="glass-panel dark:glass-panel rounded-card p-6 border border-text-primary-light/10 dark:border-white/10 shadow-glass-light dark:shadow-glass"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h4 className="text-xl font-semibold text-text-primary-light dark:text-white">Software Development Intern</h4>
                <p className="text-accent">Techomax Solutions, Bharuch</p>
              </div>
              <span className="text-sm text-text-primary-light/80 dark:text-white/80">2024</span>
            </div>
            <p className="text-text-primary-light/80 dark:text-white/80">
              During my internship at Techomax Solutions, I applied my PHP and Laravel training to real-world projects. 
              I developed a luxury car rental website inspired by Big Boy Toyz, implementing features like vehicle listings, 
              booking management, and user authentication. This project helped me strengthen my understanding of Laravel's 
              MVC architecture and modern web development practices. I also collaborated with the development team on 
              various company tasks, gaining hands-on experience in full-stack development and agile methodologies.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;