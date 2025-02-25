import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl w-full space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Privacy Policy
          </h1>
          <p className="mt-2 text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>
        
        <div className="prose prose-invert max-w-none space-y-8">
          {[
            {
              title: "1. Information We Collect",
              content: "We collect non-personal data from your interactions with our AI educational platform, including YouTube videos processed through our platform, interaction patterns, and usage statistics."
            },
            {
              title: "2. How We Use Your Information",
              content: "The collected data is used to train and improve our AI models, enhance the quality of our educational services, and develop new features."
            },
            {
              title: "3. Data Security",
              content: "We implement appropriate security measures to protect your data: Secure data storage with encryption, Limited access to data by authorized personnel only, Regular security audits and updates, Secure data transmission protocols."
            },
            {
              title: "4. Data Retention",
              content: "We retain the collected non-personal data for as long as necessary to improve our AI models and services, comply with legal obligations, and fulfill the purposes outlined in this privacy policy."
            },
            {
              title: "5. No Personal Data Collection",
              content: "We do not collect or store personally identifiable information. Our focus is solely on improving the educational AI system through anonymous interaction data."
            },
            {
              title: "6. Changes to Privacy Policy",
              content: "We may update this privacy policy from time to time. We will notify users of any material changes by posting the new privacy policy on this page."
            },
            {
              title: "7. Contact Us",
              content: "If you have any questions about this Privacy Policy, please contact us through our platform."
            }
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-200"
            >
              <h2 className="text-xl font-semibold text-purple-400 mb-4">{section.title}</h2>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 hover:text-purple-300 transition-all duration-200 hover:scale-105 transform"
            >
              Return to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy; 