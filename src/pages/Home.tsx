import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Youtube, Brain, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Transform Your Learning Experience
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Turn any educational YouTube video into interactive summaries, quizzes and RoadMaps powered by AI
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Youtube,
              title: 'Input Video',
              description: 'Paste any educational YouTube video URL',
            },
            {
              icon: Brain,
              title: 'AI Processing',
              description: 'Our AI analyzes and extracts key information',
            },
            {
              icon: Sparkles,
              title: 'Learn Better',
              description: 'Get summaries and interactive quizzes',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-lg border border-gray-700"
            >
              <feature.icon className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <Link
          to="/summary"
          className="inline-flex items-center px-6 py-3 text-lg font-medium rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;