'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const BRURSection = () => {
  // University facts data
  const facts = [
    { number: 25, title: 'Departments' },
    { number: 15000, title: 'Students' },
    { number: 500, title: 'Faculty Members' },
    { number: 2005, title: 'Established' }
  ];

  // Academic departments
const departments = [
  // Science and Engineering
  'Computer Science & Engineering',
  'Electrical & Electronics Engineering',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Statistics',
  'Environmental Science',
  
  // Arts and Humanities
  'Bangla',
  'English',
  'History',
  'Philosophy',
  'Islamic Studies',
  'Islamic History & Culture',
  
  // Social Sciences
  'Economics',
  'Political Science',
  'Sociology',
  'Social Work',
  'Public Administration',
  'International Relations',
  
  // Business Studies
  'Accounting & Information Systems',
  'Management Studies',
  'Marketing',
  'Finance & Banking',
  'Tourism & Hospitality Management',
  
  // Life Sciences
  'Botany',
  'Zoology',
  'Biochemistry & Molecular Biology',
  'Psychology',
  'Geography & Environmental Studies'
];


  return (
    <div className="bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-96 overflow-hidden"
      >
        <Image
          src="https://oldweb.brur.ac.bd/wp-content/uploads/2019/02/glance-2.1.png" // Replace with actual BRUR image
          alt="BRUR Campus"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Begum Rokeya University
            </h1>
            <p className="text-xl md:text-2xl">
              Excellence in Education Since 2008
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* University Overview */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-6">About BRUR</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                Begum Rokeya University, Rangpur (BRUR) is a public university in Bangladesh 
                established in 2008. Named after the feminist writer and social worker Begum Rokeya, 
                the university is committed to providing quality education and research opportunities.
              </p>
              <p className="text-lg text-gray-700">
                Located in Rangpur, the university offers undergraduate and graduate programs 
                across various disciplines with modern facilities and a vibrant campus life.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-64 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4noRRkNro9q2gSP2aYpKUIXw-NWl21-SN2HX2pG3W1dh2bopiRGZ5fiRUNb1npndewKJoXK4IlZV2wAXxGG4g0s5e3DyIR3x6eYspS4S9J_nuCcz_xbHuRehPFBr1Lqg-nBcGOqn=s680-w680-h510-rw" // Replace with actual image
                alt="BRUR Academic Building"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-16"
        >
          <h3 className="text-2xl font-bold text-center text-blue-900 mb-10">
            University at a Glance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <p className="text-4xl font-bold text-blue-600 mb-2">
                  {fact.number.toLocaleString()}+
                </p>
                <p className="text-gray-600">{fact.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Academic Departments */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="my-16"
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-8 text-center">
            Academic Departments
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ backgroundColor: '#1E40AF', color: 'red' }}
                className="bg-white p-4 rounded-lg shadow-sm text-center cursor-pointer transition-colors border border-gray-200"
              >
                {dept}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Campus Life */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="my-16"
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-8">Campus Life</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Library',
                description: 'Modern library with 50,000+ books and digital resources',
                image: 'https://oldweb.brur.ac.bd/wp-content/uploads/2019/02/glance-9.jpg'
              },
              {
                title: 'Sports',
                description: 'Excellent sports facilities including cricket, football, and tennis',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkkKqb3HiLWFOI2F4BEOHXYetHyCXKXImOwWnkMbzK29OiD5WgqzTAxhbB35fpWaGcLBw&usqp=CAU'
              },
              {
                title: 'Cultural Activities',
                description: 'Regular cultural programs and student organizations',
                image: 'https://internetsociety.org.bd/images/gallery/brur1.jpg'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-md"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default BRURSection;