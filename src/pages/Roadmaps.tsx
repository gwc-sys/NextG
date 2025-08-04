// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// type Roadmap = {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   duration: string;
//   level: 'Beginner' | 'Intermediate' | 'Advanced';
//   popularity: number;
//   isNew?: boolean;
//   image: string;
//   skills: string[];
// };

// const Roadmaps = () => {
//   const { isAuthenticated } = useAuth();
//   const [activeCategory, setActiveCategory] = useState<string>('all');
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   const categories = [
//     'all',
//     'frontend',
//     'backend',
//     'devops',
//     'mobile',
//     'data',
//     'cybersecurity',
//     'blockchain'
//   ];

//   const roadmaps: Roadmap[] = [
//     {
//       id: '1',
//       title: 'Frontend Developer',
//       description: 'Master modern frontend development with React, Vue, and Angular',
//       category: 'frontend',
//       duration: '6 months',
//       level: 'Beginner',
//       popularity: 95,
//       isNew: false,
//       image: 'https://cdn-icons-png.flaticon.com/512/226/226269.png',
//       skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript']
//     },
//     {
//       id: '2',
//       title: 'Backend Developer (Node.js)',
//       description: 'Become proficient in server-side development with Node.js and Express',
//       category: 'backend',
//       duration: '5 months',
//       level: 'Intermediate',
//       popularity: 85,
//       isNew: true,
//       image: 'https://cdn-icons-png.flaticon.com/512/919/919825.png',
//       skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Authentication']
//     },
//     {
//       id: '3',
//       title: 'DevOps Engineer',
//       description: 'Learn CI/CD, Docker, Kubernetes and cloud infrastructure',
//       category: 'devops',
//       duration: '8 months',
//       level: 'Advanced',
//       popularity: 78,
//       isNew: false,
//       image: 'https://cdn-icons-png.flaticon.com/512/6125/6125000.png',
//       skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform']
//     },
//     {
//       id: '4',
//       title: 'Mobile Developer (React Native)',
//       description: 'Build cross-platform mobile apps with React Native',
//       category: 'mobile',
//       duration: '4 months',
//       level: 'Intermediate',
//       popularity: 72,
//       isNew: false,
//       image: 'https://cdn-icons-png.flaticon.com/512/1183/1183672.png',
//       skills: ['React Native', 'JavaScript', 'Redux', 'Mobile UI', 'APIs']
//     },
//     {
//       id: '5',
//       title: 'Data Scientist',
//       description: 'Master Python, ML algorithms and data analysis',
//       category: 'data',
//       duration: '9 months',
//       level: 'Advanced',
//       popularity: 88,
//       isNew: true,
//       image: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
//       skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Data Visualization']
//     },
//     {
//       id: '6',
//       title: 'Cybersecurity Specialist',
//       description: 'Learn ethical hacking and system security',
//       category: 'cybersecurity',
//       duration: '7 months',
//       level: 'Advanced',
//       popularity: 65,
//       isNew: false,
//       image: 'https://cdn-icons-png.flaticon.com/512/2489/2489717.png',
//       skills: ['Network Security', 'Penetration Testing', 'Cryptography', 'Firewalls']
//     },
//     {
//       id: '7',
//       title: 'Blockchain Developer',
//       description: 'Build decentralized applications with Ethereum and Solidity',
//       category: 'blockchain',
//       duration: '6 months',
//       level: 'Intermediate',
//       popularity: 70,
//       isNew: true,
//       image: 'https://cdn-icons-png.flaticon.com/512/2593/2593798.png',
//       skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js']
//     },
//     {
//       id: '8',
//       title: 'Full Stack Developer',
//       description: 'Complete path for full stack development with MERN stack',
//       category: 'frontend',
//       duration: '10 months',
//       level: 'Intermediate',
//       popularity: 92,
//       isNew: false,
//       image: 'https://cdn-icons-png.flaticon.com/512/2282/2282188.png',
//       skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Authentication']
//     }
//   ];

//   const filteredRoadmaps = roadmaps
//     .filter(roadmap => 
//       (activeCategory === 'all' || roadmap.category === activeCategory) &&
//       (roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//        roadmap.description.toLowerCase().includes(searchQuery.toLowerCase()))
//     )
//     .sort((a, b) => b.popularity - a.popularity);

//   const getLevelColor = (level: string) => {
//     switch (level) {
//       case 'Beginner': return 'bg-green-100 text-green-800';
//       case 'Intermediate': return 'bg-blue-100 text-blue-800';
//       case 'Advanced': return 'bg-purple-100 text-purple-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6">Developer Roadmaps</h1>
//           <p className="text-xl mb-8 max-w-2xl mx-auto">
//             Structured learning paths to guide you through mastering various tech domains and becoming a proficient developer.
//           </p>
//           <div className="flex justify-center gap-4">
//             <Link 
//               to={isAuthenticated ? "/my-roadmaps" : "/login"}
//               className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
//             >
//               {isAuthenticated ? 'My Learning Paths' : 'Get Started'}
//             </Link>
//             <button className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:bg-opacity-10 transition duration-300">
//               How It Works
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           {/* Filters */}
//           <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//               <div className="flex flex-wrap gap-2">
//                 {categories.map(category => (
//                   <button
//                     key={category}
//                     onClick={() => setActiveCategory(category)}
//                     className={`px-4 py-2 rounded-full text-sm capitalize ${activeCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//                   >
//                     {category === 'all' ? 'All Roadmaps' : category}
//                   </button>
//                 ))}
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search roadmaps..."
//                 className="w-full md:w-64 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Roadmaps Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredRoadmaps.map(roadmap => (
//               <div key={roadmap.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
//                 <div className="relative">
//                   <div className="h-48 bg-gray-200 flex items-center justify-center">
//                     <img 
//                       src={roadmap.image} 
//                       alt={roadmap.title} 
//                       className="h-24 w-24 object-contain"
//                     />
//                   </div>
//                   {roadmap.isNew && (
//                     <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
//                       New
//                     </span>
//                   )}
//                 </div>
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-xl font-bold">{roadmap.title}</h3>
//                     <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(roadmap.level)}`}>
//                       {roadmap.level}
//                     </span>
//                   </div>
//                   <p className="text-gray-600 mb-4">{roadmap.description}</p>
//                   <div className="flex items-center text-sm text-gray-500 mb-4">
//                     <span className="mr-4">⏱️ {roadmap.duration}</span>
//                     <span>⭐ {roadmap.popularity}% recommended</span>
//                   </div>
//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {roadmap.skills.slice(0, 4).map(skill => (
//                       <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
//                         {skill}
//                       </span>
//                     ))}
//                     {roadmap.skills.length > 4 && (
//                       <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
//                         +{roadmap.skills.length - 4} more
//                       </span>
//                     )}
//                   </div>
//                   <Link
//                     to={`/roadmaps/${roadmap.id}`}
//                     className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
//                   >
//                     View Roadmap
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Empty State */}
//           {filteredRoadmaps.length === 0 && (
//             <div className="text-center py-16">
//               <div className="text-5xl mb-4">🔍</div>
//               <h3 className="text-xl font-semibold mb-2">No roadmaps found</h3>
//               <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
//               <button 
//                 onClick={() => {
//                   setActiveCategory('all');
//                   setSearchQuery('');
//                 }}
//                 className="text-blue-600 hover:underline"
//               >
//                 Reset filters
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-16 bg-gray-100">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">What Developers Say</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 quote: "These roadmaps helped me transition from mechanical engineering to frontend development in just 6 months!",
//                 author: "Priya K., Frontend Developer",
//                 role: "Former Mechanical Engineer"
//               },
//               {
//                 quote: "The structured learning path made it easy to know exactly what to learn next without feeling overwhelmed.",
//                 author: "Rahul M., Backend Developer",
//                 role: "Computer Science Student"
//               },
//               {
//                 quote: "I doubled my salary after completing the DevOps roadmap and getting certified in AWS and Kubernetes.",
//                 author: "Ananya S., DevOps Engineer",
//                 role: "Former System Administrator"
//               }
//             ].map((testimonial, index) => (
//               <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
//                 <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
//                 <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
//                 <div>
//                   <p className="font-semibold">{testimonial.author}</p>
//                   <p className="text-sm text-gray-500">{testimonial.role}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-16 bg-blue-600 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Ready to start your developer journey?</h2>
//           <div className="flex flex-wrap justify-center gap-4">
//             <Link 
//               to={isAuthenticated ? "/my-roadmaps" : "/signup"}
//               className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
//             >
//               {isAuthenticated ? 'Continue Learning' : 'Sign Up for Free'}
//             </Link>
//             <Link 
//               to="/community" 
//               className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:bg-opacity-10 transition duration-300"
//             >
//               Join Developer Community
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Roadmaps;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Import icons (you can use react-icons or custom SVGs)
import { FaCode, FaLaptopCode, FaProjectDiagram, FaBook, FaVideo, FaSearch, FaRocket, FaUsers, FaStar, FaRegClock } from 'react-icons/fa';
import { SiJavascript, SiPython, SiReact, SiNodedotjs, SiDocker, SiKubernetes, SiPostgresql, SiHiveBlockchain } from 'react-icons/si';

type Roadmap = {
  id: string;
  title: string;
  type: 'role' | 'skill' | 'project' | 'guide' | 'video';
  category?: string;
  duration?: string;
  isNew?: boolean;
  format?: 'textual' | 'questions';
  length?: string;
  icon?: React.ReactNode;
};

const Roadmaps = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'role' | 'skill' | 'project' | 'guide' | 'video'>('role');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Icon mapping function
  const getIconForRoadmap = (title: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Frontend': <FaLaptopCode className="text-blue-500" size={24} />,
      'Backend': <FaCode className="text-green-500" size={24} />,
      'DevOps': <SiDocker className="text-purple-500" size={24} />,
      'Full Stack': <FaCode className="text-yellow-500" size={24} />,
      'AI Engineer': <FaRocket className="text-pink-500" size={24} />,
      'Data Analyst': <FaBook className="text-red-500" size={24} />,
      'Blockchain': <SiHiveBlockchain className="text-indigo-500" size={24} />,
      'Cyber Security': <FaUsers className="text-cyan-500" size={24} />,
      'React': <SiReact className="text-blue-400" size={24} />,
      'JavaScript': <SiJavascript className="text-yellow-400" size={24} />,
      'Python': <SiPython className="text-blue-600" size={24} />,
      'Node.js': <SiNodedotjs className="text-green-600" size={24} />,
      'Docker': <SiDocker className="text-blue-400" size={24} />,
      'Kubernetes': <SiKubernetes className="text-blue-600" size={24} />,
      'PostgreSQL': <SiPostgresql className="text-blue-700" size={24} />,
    };

    return iconMap[title] || <FaStar className="text-gray-500" size={24} />;
  };

  // Roadmap data with icons
  const roleBasedRoadmaps: Roadmap[] = [
    { id: '1', title: 'Frontend', type: 'role', icon: getIconForRoadmap('Frontend') },
    { id: '2', title: 'Backend', type: 'role', icon: getIconForRoadmap('Backend') },
    { id: '3', title: 'DevOps', type: 'role', icon: getIconForRoadmap('DevOps') },
    { id: '4', title: 'Full Stack', type: 'role', icon: getIconForRoadmap('Full Stack') },
    { id: '5', title: 'AI Engineer', type: 'role', isNew: true, icon: getIconForRoadmap('AI Engineer') },
    { id: '6', title: 'Data Analyst', type: 'role', icon: getIconForRoadmap('Data Analyst') },
    { id: '7', title: 'AI and Data Scientist', type: 'role', icon: getIconForRoadmap('AI Engineer') },
    { id: '8', title: 'Android', type: 'role', icon: getIconForRoadmap('Android') },
    { id: '9', title: 'iOS', type: 'role', icon: getIconForRoadmap('iOS') },
    { id: '10', title: 'PostgreSQL', type: 'role', icon: getIconForRoadmap('PostgreSQL') },
    { id: '11', title: 'Blockchain', type: 'role', icon: getIconForRoadmap('Blockchain') },
    { id: '12', title: 'QA', type: 'role', icon: getIconForRoadmap('QA') },
    { id: '13', title: 'Software Architect', type: 'role', icon: getIconForRoadmap('Software Architect') },
    { id: '14', title: 'Cyber Security', type: 'role', icon: getIconForRoadmap('Cyber Security') },
    { id: '15', title: 'UX Design', type: 'role', icon: getIconForRoadmap('UX Design') },
    { id: '16', title: 'Game Developer', type: 'role', icon: getIconForRoadmap('Game Developer') },
    { id: '17', title: 'Technical Writer', type: 'role', icon: getIconForRoadmap('Technical Writer') },
    { id: '18', title: 'MLOps', type: 'role', icon: getIconForRoadmap('MLOps') },
    { id: '19', title: 'Product Manager', type: 'role', icon: getIconForRoadmap('Product Manager') },
    { id: '20', title: 'Engineering Manager', type: 'role', icon: getIconForRoadmap('Engineering Manager') },
    { id: '21', title: 'Developer Relations', type: 'role', icon: getIconForRoadmap('Developer Relations') },
    { id: '22', title: 'Create your own Roadmap', type: 'role', icon: <FaRocket className="text-indigo-500" size={24} /> }
  ];

  const skillBasedRoadmaps: Roadmap[] = [
    { id: 's1', title: 'SQL', type: 'skill', icon: getIconForRoadmap('SQL') },
    { id: 's2', title: 'Computer Science', type: 'skill', icon: getIconForRoadmap('Computer Science') },
    { id: 's3', title: 'React', type: 'skill', icon: getIconForRoadmap('React') },
    { id: 's4', title: 'Vue', type: 'skill', icon: getIconForRoadmap('Vue') },
    { id: 's5', title: 'Angular', type: 'skill', icon: getIconForRoadmap('Angular') },
    { id: 's6', title: 'JavaScript', type: 'skill', icon: getIconForRoadmap('JavaScript') },
    { id: 's7', title: 'Node.js', type: 'skill', icon: getIconForRoadmap('Node.js') },
    { id: 's8', title: 'TypeScript', type: 'skill', icon: getIconForRoadmap('TypeScript') },
    { id: 's9', title: 'Python', type: 'skill', icon: getIconForRoadmap('Python') },
    { id: 's10', title: 'System Design', type: 'skill', icon: getIconForRoadmap('System Design') },
    { id: 's11', title: 'API Design', type: 'skill', icon: getIconForRoadmap('API Design') },
    { id: 's12', title: 'ASP.NET Core', type: 'skill', icon: getIconForRoadmap('ASP.NET Core') },
    { id: 's13', title: 'Java', type: 'skill', icon: getIconForRoadmap('Java') },
    { id: 's14', title: 'C++', type: 'skill', icon: getIconForRoadmap('C++') },
    { id: 's15', title: 'Flutter', type: 'skill', icon: getIconForRoadmap('Flutter') },
    { id: 's16', title: 'Spring Boot', type: 'skill', icon: getIconForRoadmap('Spring Boot') },
    { id: 's17', title: 'Go Roadmap', type: 'skill', icon: getIconForRoadmap('Go Roadmap') },
    { id: 's18', title: 'Rust', type: 'skill', icon: getIconForRoadmap('Rust') },
    { id: 's19', title: 'GraphQL', type: 'skill', icon: getIconForRoadmap('GraphQL') },
    { id: 's20', title: 'Design and Architecture', type: 'skill', icon: getIconForRoadmap('Design and Architecture') },
    { id: 's21', title: 'Design System', type: 'skill', icon: getIconForRoadmap('Design System') },
    { id: 's22', title: 'React Native', type: 'skill', icon: getIconForRoadmap('React Native') },
    { id: 's23', title: 'AWS', type: 'skill', icon: getIconForRoadmap('AWS') },
    { id: 's24', title: 'Code Review', type: 'skill', icon: getIconForRoadmap('Code Review') },
    { id: 's25', title: 'Docker', type: 'skill', icon: getIconForRoadmap('Docker') },
    { id: 's26', title: 'Kubernetes', type: 'skill', icon: getIconForRoadmap('Kubernetes') },
    { id: 's27', title: 'Linux', type: 'skill', icon: getIconForRoadmap('Linux') },
    { id: 's28', title: 'MongoDB', type: 'skill', icon: getIconForRoadmap('MongoDB') },
    { id: 's29', title: 'Prompt Engineering', type: 'skill', icon: getIconForRoadmap('Prompt Engineering') },
    { id: 's30', title: 'Terraform', type: 'skill', icon: getIconForRoadmap('Terraform') },
    { id: 's31', title: 'Data Structures & Algorithms', type: 'skill', icon: getIconForRoadmap('Data Structures & Algorithms') },
    { id: 's32', title: 'Git and GitHub', type: 'skill', icon: getIconForRoadmap('Git and GitHub') },
    { id: 's33', title: 'Redis', type: 'skill', icon: getIconForRoadmap('Redis') },
    { id: 's34', title: 'PHP', type: 'skill', icon: getIconForRoadmap('PHP') },
    { id: 's35', title: 'Cloudflare', type: 'skill', isNew: true, icon: getIconForRoadmap('Cloudflare') },
    { id: 's36', title: 'AI Agents', type: 'skill', isNew: true, icon: getIconForRoadmap('AI Agents') },
    { id: 's37', title: 'AI Red Teaming', type: 'skill', isNew: true, icon: getIconForRoadmap('AI Red Teaming') },
    { id: 's38', title: 'Create your own Roadmap', type: 'skill', icon: <FaRocket className="text-indigo-500" size={24} /> }
  ];

  // ... (rest of your roadmap data arrays with added icons)

  // Guides and Questions arrays
  const guides: Roadmap[] = [
    { id: 'g1', title: 'How to Learn React', type: 'guide', format: 'textual', icon: <FaBook className="text-blue-500" size={24} /> },
    { id: 'g2', title: 'Backend Best Practices', type: 'guide', format: 'textual', icon: <FaBook className="text-green-500" size={24} /> },
    { id: 'g3', title: 'DevOps for Beginners', type: 'guide', format: 'textual', icon: <FaBook className="text-purple-500" size={24} /> }
  ];

  const questions: Roadmap[] = [
    { id: 'q1', title: 'React Interview Questions', type: 'guide', format: 'questions', icon: <FaBook className="text-blue-400" size={24} /> },
    { id: 'q2', title: 'Node.js Interview Questions', type: 'guide', format: 'questions', icon: <FaBook className="text-green-400" size={24} /> }
  ];

  // Add a sample projectIdeas array
  const projectIdeas: Roadmap[] = [
    { id: 'p1', title: 'Portfolio Website', type: 'project', icon: <FaProjectDiagram className="text-blue-500" size={24} /> },
    { id: 'p2', title: 'E-commerce App', type: 'project', icon: <FaProjectDiagram className="text-green-500" size={24} /> },
    { id: 'p3', title: 'Chat Application', type: 'project', icon: <FaProjectDiagram className="text-purple-500" size={24} /> },
    { id: 'p4', title: 'Blog Platform', type: 'project', icon: <FaProjectDiagram className="text-yellow-500" size={24} /> },
    { id: 'p5', title: 'Create your own Project', type: 'project', icon: <FaRocket className="text-indigo-500" size={24} /> }
  ];

  // Sample videos array
  const videos: Roadmap[] = [
    { id: 'v1', title: 'React Crash Course', type: 'video', length: '1h 30m', icon: <FaVideo className="text-blue-500" size={24} /> },
    { id: 'v2', title: 'Node.js Tutorial', type: 'video', length: '2h 10m', icon: <FaVideo className="text-green-500" size={24} /> },
    { id: 'v3', title: 'DevOps Basics', type: 'video', length: '45m', icon: <FaVideo className="text-purple-500" size={24} /> },
    { id: 'v4', title: 'Design Patterns', type: 'video', length: '1h 5m', icon: <FaVideo className="text-yellow-500" size={24} /> }
  ];

  const getCurrentRoadmaps = () => {
    switch (activeTab) {
      case 'role': return roleBasedRoadmaps;
      case 'skill': return skillBasedRoadmaps;
      case 'project': return projectIdeas;
      case 'guide': return [...guides, ...questions];
      case 'video': return videos;
      default: return roleBasedRoadmaps;
    }
  };

  const filteredRoadmaps = getCurrentRoadmaps().filter(roadmap =>
    roadmap.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Developer Roadmaps</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-fade-in delay-100">
            roadmap.sh is a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in delay-200">
            <Link 
              to={isAuthenticated ? "/my-roadmaps" : "/signup"}
              className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              {isAuthenticated ? 'My Roadmaps' : 'Get Started'}
            </Link>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:bg-opacity-10 transition duration-300 transform hover:scale-105">
              Contribute
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 -mt-10">
        {/* Floating Card */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8 max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {[
              { id: 'role', title: 'Role-based', icon: <FaCode className="mr-2" /> },
              { id: 'skill', title: 'Skill-based', icon: <FaLaptopCode className="mr-2" /> },
              { id: 'project', title: 'Projects', icon: <FaProjectDiagram className="mr-2" /> },
              { id: 'guide', title: 'Guides', icon: <FaBook className="mr-2" /> },
              { id: 'video', title: 'Videos', icon: <FaVideo className="mr-2" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-6 py-3 whitespace-nowrap font-medium text-sm rounded-lg mr-2 transition-all ${activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={`Search ${activeTab.replace('-', ' ')}...`}
              className="w-full pl-10 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRoadmaps.map(roadmap => (
            <div 
              key={roadmap.id} 
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg transform hover:-translate-y-1 ${hoveredCard === roadmap.id ? 'ring-2 ring-blue-500' : ''}`}
              onMouseEnter={() => setHoveredCard(roadmap.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-blue-50 mr-4">
                    {roadmap.icon || getIconForRoadmap(roadmap.title)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold truncate">{roadmap.title}</h3>
                    {roadmap.isNew && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
                
                {roadmap.format === 'textual' && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                    Guide
                  </span>
                )}
                
                {roadmap.format === 'questions' && (
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-3">
                    Interview Questions
                  </span>
                )}
                
                {roadmap.type === 'video' && (
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FaRegClock className="mr-1" />
                    <span>{roadmap.length}</span>
                  </div>
                )}
                
                <Link
                  to={`/roadmaps/${roadmap.type}/${roadmap.id}`}
                  className="mt-4 inline-flex items-center justify-center w-full text-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 text-sm"
                >
                  {roadmap.type === 'video' ? 'Watch Video' : 'View Details'}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRoadmaps.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No {activeTab.replace('-', ' ')} found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search query</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-blue-600 hover:underline font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        {/* View All Buttons */}
        {filteredRoadmaps.length > 0 && (
          <div className="mt-12 text-center">
            <Link 
              to={`/${activeTab}`} 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
            >
              View All {activeTab === 'role' ? 'Role-based' : activeTab === 'skill' ? 'Skill-based' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Roadmaps
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to accelerate your learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have leveled up their skills with our roadmaps.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to={isAuthenticated ? "/my-roadmaps" : "/signup"}
              className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              {isAuthenticated ? 'Continue Learning' : 'Start for Free'}
            </Link>
            <Link 
              to="/community" 
              className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:bg-opacity-10 transition duration-300 transform hover:scale-105"
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Roadmaps;