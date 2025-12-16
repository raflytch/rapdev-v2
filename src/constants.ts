/**
 * Application constants and configuration
 */

/** Base API URL from environment variables */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URI || '';

/** Site metadata */
export const SITE_METADATA = {
  title: 'Rafly Aziz Abdillah - Resume',
  description: 'Professional resume and portfolio of Rafly Aziz Abdillah (raflytch)',
  keywords: [
    'Rafly Aziz Abdillah',
    'Rafly Aziz',
    'Rafly',
    'raflytch',
    'Resume',
    'Portfolio',
    'Software Engineer',
    'Web Developer',
    "Backend Developer",
    "Fullstack Developer",
    "Fullstack Engineer",
    "Fullstack",
    "Mobile Developer"
  ],
  author: 'Rafly Aziz Abdillah',
  url: 'https://raflyazizabdillah.tech',
};

/** About section data */
export const ABOUT_DATA = {
  name: 'Rafly Aziz Abdillah',
  title: 'Software Engineer',
  description: 'A motivated and dedicated Software Engineer with hands-on experience gained through intensive bootcamp training and real-world projects. Experienced in managing software development projects end-to-end, from planning and development to deployment. Strong communication and leadership skills support effective collaboration, teamwork, and high performance.',
  skills: [
    { name: 'Software Engineer', icon: 'Code2' },
    { name: 'Full Stack Developer', icon: 'Layers' },
    { name: 'Backend Developer', icon: 'Server' },
    { name: 'Frontend Developer', icon: 'Monitor' },
    { name: 'Mobile Developer', icon: 'Smartphone' },
  ],
  techStack: [
    { name: 'JavaScript', icon: 'SiJavascript' },
    { name: 'TypeScript', icon: 'SiTypescript' },
    { name: 'React.js', icon: 'SiReact' },
    { name: 'Next.js', icon: 'SiNextdotjs' },
    { name: 'React Native', icon: 'SiReact' },
    { name: 'Expo', icon: 'SiExpo' },
    { name: 'Redux', icon: 'SiRedux' },
    { name: 'Tailwind CSS', icon: 'SiTailwindcss' },
    { name: 'Express.js', icon: 'SiExpress' },
    { name: 'Nest.js', icon: 'SiNestjs' },
    { name: 'PostgreSQL', icon: 'SiPostgresql' },
    { name: 'Git', icon: 'SiGit' },
    { name: 'Jest', icon: 'SiJest' },
    { name: 'Docker', icon: 'SiDocker' },
  ],
};

/** Contact section data */
export const CONTACT_DATA = {
  email: 'raflyazizabdillah30@gmail.com',
  linkedin: 'https://www.linkedin.com/in/raflyazizabdillah/',
  github: 'https://github.com/raflytch',
  location: 'Jakarta, Indonesia',
};




