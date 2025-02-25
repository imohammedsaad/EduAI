import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Terms = () => {
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
            Terms of Service
          </h1>
          <p className="mt-2 text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>
        
        <div className="prose prose-invert max-w-none space-y-8">
          {[
            {
              title: "1. Acceptance of Terms",
              content: "By accessing and using this educational AI platform, you agree to be bound by these Terms of Service and all applicable laws and regulations."
            },
            {
              title: "2. Service Description",
              content: "We provide an AI-powered educational assistance platform designed to help users with their learning needs. Our service includes interactive summaries, quizzes, and roadmaps generated from educational YouTube videos."
            },
            {
              title: "3. Data Collection and Usage",
              content: "We collect and store non-personal interaction data to improve our AI models and enhance the quality of our services. This data is used for: Training and improving our AI models, Enhancing the accuracy and relevance of responses, Developing new educational features, Service optimization and quality assurance."
            },
            {
              title: "4. User Obligations",
              content: "Users agree to: Provide accurate information when using the service, Not use the service for any illegal or unauthorized purpose, Not attempt to harm or disrupt the service or its security."
            },
            {
              title: "5. Modifications to Service",
              content: "We reserve the right to modify or discontinue the service at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service."
            },
            {
              title: "6. Limitation of Liability",
              content: 'We provide the service "as is" without any warranty. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.'
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

export default Terms; 