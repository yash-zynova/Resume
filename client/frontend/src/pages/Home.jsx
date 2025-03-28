import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResumeForm from '../components/ResumeForm';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Create Your Resume</h1>
        <ResumeForm />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
