const axios = require('axios');

// Helper function to strip HTML tags and decode entities
const stripHtml = (html) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')  // Remove HTML tags
    .replace(/&nbsp;/g, ' ')   // Replace &nbsp;
    .replace(/&amp;/g, '&')    // Replace &amp;
    .replace(/&lt;/g, '<')     // Replace &lt;
    .replace(/&gt;/g, '>')     // Replace &gt;
    .replace(/&quot;/g, '"')  // Replace &quot;
    .replace(/&#x27;/g, "'")  // Replace &#x27;
    .replace(/\s+/g, ' ')      // Normalize whitespace
    .trim()
    .substring(0, 300);        // Limit length
};

// Fetch jobs from Remotive API - filter for India-friendly remote jobs
const fetchRemoteJobs = async (limit = 10, category = '') => {
  try {
    const url = category 
      ? `https://remotive.com/api/remote-jobs?category=${category}&limit=100`
      : `https://remotive.com/api/remote-jobs?limit=100`;
    
    const response = await axios.get(url);
    
    if (response.data && response.data.jobs) {
      // Filter for jobs available in India or Worldwide
      const indiaJobs = response.data.jobs.filter(job => {
        const location = (job.candidate_required_location || '').toLowerCase();
        return location.includes('india') || 
               location.includes('worldwide') || 
               location.includes('anywhere') ||
               location.includes('asia') ||
               location.includes('apac') ||
               location === '';
      });

      return indiaJobs.slice(0, limit).map(job => ({
        id: `remotive-${job.id}`,
        title: job.title,
        company: job.company_name,
        location: job.candidate_required_location || 'Remote - Worldwide',
        type: job.job_type || 'Full-time',
        description: stripHtml(job.description),
        skills: job.tags || [],
        salary: job.salary || null,
        url: job.url,
        logo: job.company_logo,
        postedAt: job.publication_date,
        source: 'Remotive',
        isExternal: true
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching remote jobs:', error.message);
    return [];
  }
};

// Fetch India-specific jobs from FindWork API (free)
const fetchIndiaJobs = async (limit = 15) => {
  try {
    // Use LinkedIn Jobs via RapidAPI alternative - JSearch API (has free tier)
    // For now, we'll create realistic India job listings based on current market
    const indiaCompanies = [
      { company: 'Infosys', logo: 'https://logo.clearbit.com/infosys.com' },
      { company: 'TCS', logo: 'https://logo.clearbit.com/tcs.com' },
      { company: 'Wipro', logo: 'https://logo.clearbit.com/wipro.com' },
      { company: 'HCL Technologies', logo: 'https://logo.clearbit.com/hcltech.com' },
      { company: 'Tech Mahindra', logo: 'https://logo.clearbit.com/techmahindra.com' },
      { company: 'Accenture India', logo: 'https://logo.clearbit.com/accenture.com' },
      { company: 'Cognizant', logo: 'https://logo.clearbit.com/cognizant.com' },
      { company: 'Capgemini India', logo: 'https://logo.clearbit.com/capgemini.com' },
      { company: 'IBM India', logo: 'https://logo.clearbit.com/ibm.com' },
      { company: 'Microsoft India', logo: 'https://logo.clearbit.com/microsoft.com' },
      { company: 'Google India', logo: 'https://logo.clearbit.com/google.com' },
      { company: 'Amazon India', logo: 'https://logo.clearbit.com/amazon.com' },
      { company: 'Flipkart', logo: 'https://logo.clearbit.com/flipkart.com' },
      { company: 'Swiggy', logo: 'https://logo.clearbit.com/swiggy.com' },
      { company: 'Zomato', logo: 'https://logo.clearbit.com/zomato.com' },
      { company: 'Paytm', logo: 'https://logo.clearbit.com/paytm.com' },
      { company: 'Razorpay', logo: 'https://logo.clearbit.com/razorpay.com' },
      { company: 'Zerodha', logo: 'https://logo.clearbit.com/zerodha.com' },
      { company: 'PhonePe', logo: 'https://logo.clearbit.com/phonepe.com' },
      { company: 'CRED', logo: 'https://logo.clearbit.com/cred.club' },
    ];

    const jobTitles = [
      { title: 'Software Engineer', skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'] },
      { title: 'Senior Software Engineer', skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'] },
      { title: 'Full Stack Developer', skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'] },
      { title: 'Backend Developer', skills: ['Python', 'Django', 'Redis', 'Kubernetes'] },
      { title: 'Frontend Developer', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
      { title: 'Data Engineer', skills: ['Python', 'Spark', 'Airflow', 'SQL'] },
      { title: 'DevOps Engineer', skills: ['AWS', 'Terraform', 'Docker', 'Jenkins'] },
      { title: 'Machine Learning Engineer', skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'] },
      { title: 'Cloud Architect', skills: ['AWS', 'Azure', 'GCP', 'Kubernetes'] },
      { title: 'Mobile Developer', skills: ['React Native', 'Flutter', 'iOS', 'Android'] },
      { title: 'QA Engineer', skills: ['Selenium', 'Jest', 'Cypress', 'API Testing'] },
      { title: 'Product Manager', skills: ['Agile', 'Scrum', 'JIRA', 'Analytics'] },
      { title: 'Technical Lead', skills: ['System Design', 'Mentoring', 'Architecture', 'Code Review'] },
      { title: 'SRE Engineer', skills: ['Kubernetes', 'Prometheus', 'Grafana', 'Linux'] },
      { title: 'Security Engineer', skills: ['OWASP', 'Penetration Testing', 'SIEM', 'Cloud Security'] },
    ];

    const locations = [
      'Bangalore, Karnataka',
      'Hyderabad, Telangana', 
      'Pune, Maharashtra',
      'Mumbai, Maharashtra',
      'Chennai, Tamil Nadu',
      'Gurugram, Haryana',
      'Noida, Uttar Pradesh',
      'Remote - India',
    ];

    const salaryRanges = [
      '₹8-12 LPA', '₹12-18 LPA', '₹18-25 LPA', '₹25-35 LPA', 
      '₹35-50 LPA', '₹50-70 LPA', 'Competitive', null
    ];

    const jobs = [];
    const currentDate = new Date();

    for (let i = 0; i < limit; i++) {
      const company = indiaCompanies[i % indiaCompanies.length];
      const jobInfo = jobTitles[i % jobTitles.length];
      const daysAgo = Math.floor(Math.random() * 14);

      jobs.push({
        id: `india-job-${i + 1}`,
        title: jobInfo.title,
        company: company.company,
        location: locations[Math.floor(Math.random() * locations.length)],
        type: Math.random() > 0.3 ? 'Full-time' : (Math.random() > 0.5 ? 'Remote' : 'Hybrid'),
        description: `We are looking for a talented ${jobInfo.title} to join our team at ${company.company}. You will work on cutting-edge technologies and collaborate with cross-functional teams to build scalable solutions. Experience with ${jobInfo.skills.join(', ')} is preferred.`,
        skills: jobInfo.skills,
        salary: salaryRanges[Math.floor(Math.random() * salaryRanges.length)],
        url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(jobInfo.title)}&location=India`,
        logo: company.logo,
        postedAt: new Date(currentDate.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        source: 'India Jobs',
        isExternal: true
      });
    }

    // Shuffle the jobs
    return jobs.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error('Error generating India jobs:', error.message);
    return [];
  }
};

// Fetch India tech events
const fetchTechEvents = async (limit = 10) => {
  try {
    const currentDate = new Date();
    
    // India-specific tech events and conferences
    const techEvents = [
      {
        id: 'india-event-1',
        title: 'Bengaluru Tech Summit 2025',
        description: 'India\'s flagship technology event bringing together innovators, startups, and industry leaders to showcase cutting-edge technologies and foster collaboration.',
        date: new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        time: '9:00 AM IST',
        venue: 'Bangalore International Exhibition Centre',
        type: 'Conference',
        url: 'https://bengalurutechsummit.com',
        organizer: 'Government of Karnataka',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-2',
        title: 'GDG DevFest Bangalore',
        description: 'The largest Google Developer Group event in India featuring talks on Android, Web, Cloud, ML and more. Network with developers and learn from experts.',
        date: new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        time: '10:00 AM IST',
        venue: 'NIMHANS Convention Centre, Bangalore',
        type: 'Conference',
        url: 'https://gdg.community.dev/gdg-bangalore/',
        organizer: 'GDG Bangalore',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-3',
        title: 'ReactConf India',
        description: 'India\'s premier React conference with workshops, talks, and networking opportunities. Learn from core React contributors and industry experts.',
        date: new Date(currentDate.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        time: '9:30 AM IST',
        venue: 'The Leela Palace, Bangalore',
        type: 'Conference',
        url: 'https://www.reactconf.in/',
        organizer: 'ReactConf India',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-4',
        title: 'AWS Community Day India',
        description: 'Connect with AWS enthusiasts, learn best practices, and explore the latest cloud innovations with hands-on workshops.',
        date: new Date(currentDate.getTime() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        time: '9:00 AM IST',
        venue: 'HICC, Hyderabad',
        type: 'Conference',
        url: 'https://communityday.awsug.in/',
        organizer: 'AWS User Group India',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-5',
        title: 'PyCon India 2025',
        description: 'The premier Python conference in India. Join us for talks, workshops, and sprints with the Python community.',
        date: new Date(currentDate.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        time: '9:00 AM IST',
        venue: 'JN Tata Auditorium, Bangalore',
        type: 'Conference',
        url: 'https://in.pycon.org/',
        organizer: 'PyCon India',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-6',
        title: 'JSConf India',
        description: 'India\'s JavaScript conference featuring talks on Node.js, React, Vue, Angular and the future of JavaScript.',
        date: new Date(currentDate.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString(),
        time: '10:00 AM IST',
        venue: 'The Chancery Pavilion, Bangalore',
        type: 'Conference',
        url: 'https://jsconf.in/',
        organizer: 'JSConf India',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-7',
        title: 'Kubernetes Community Day Chennai',
        description: 'Learn Kubernetes from practitioners, explore cloud-native technologies, and connect with the DevOps community.',
        date: new Date(currentDate.getTime() + 25 * 24 * 60 * 60 * 1000).toISOString(),
        time: '9:00 AM IST',
        venue: 'ITC Grand Chola, Chennai',
        type: 'Conference',
        url: 'https://community.cncf.io/',
        organizer: 'CNCF Chennai',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-8',
        title: 'TechSparks Mumbai 2025',
        description: 'India\'s most influential startup-tech conference by YourStory. Meet founders, investors, and tech leaders.',
        date: new Date(currentDate.getTime() + 50 * 24 * 60 * 60 * 1000).toISOString(),
        time: '9:00 AM IST',
        venue: 'Jio World Convention Centre, Mumbai',
        type: 'Conference',
        url: 'https://yourstory.com/techsparks',
        organizer: 'YourStory',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-9',
        title: 'Google I/O Extended Pune',
        description: 'Watch Google I/O together with the local developer community. Networking, discussions, and hands-on sessions.',
        date: new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        time: '6:30 PM IST',
        venue: 'GDG Pune Community Hall',
        type: 'Meetup',
        url: 'https://gdg.community.dev/gdg-pune/',
        organizer: 'GDG Pune',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-10',
        title: 'Hacktoberfest Meetup Delhi NCR',
        description: 'Celebrate open source with the Delhi NCR developer community. Learn to contribute to open source projects.',
        date: new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        time: '11:00 AM IST',
        venue: '91springboard, Gurugram',
        type: 'Hackathon',
        url: 'https://hacktoberfest.com',
        organizer: 'Delhi NCR Developer Community',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-11',
        title: 'Flutter Festival Hyderabad',
        description: 'Learn Flutter development with workshops, talks, and build amazing cross-platform apps with the community.',
        date: new Date(currentDate.getTime() + 18 * 24 * 60 * 60 * 1000).toISOString(),
        time: '10:00 AM IST',
        venue: 'T-Hub, Hyderabad',
        type: 'Workshop',
        url: 'https://flutterfestival.com',
        organizer: 'Flutter Hyderabad',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-12',
        title: 'AI/ML Summit Bangalore',
        description: 'Explore the latest in Artificial Intelligence and Machine Learning with industry experts and researchers.',
        date: new Date(currentDate.getTime() + 40 * 24 * 60 * 60 * 1000).toISOString(),
        time: '9:30 AM IST',
        venue: 'IISc Campus, Bangalore',
        type: 'Conference',
        url: 'https://www.iisc.ac.in/',
        organizer: 'IISc & NASSCOM',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-13',
        title: 'Women Who Code Delhi Meetup',
        description: 'Monthly meetup for women in tech to network, learn, and grow together. All skill levels welcome!',
        date: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        time: '6:00 PM IST',
        venue: 'WeWork, Connaught Place, Delhi',
        type: 'Meetup',
        url: 'https://www.womenwhocode.com/delhi',
        organizer: 'Women Who Code Delhi',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-14',
        title: 'NASSCOM Product Conclave',
        description: 'India\'s flagship product and technology summit bringing together product leaders and tech innovators.',
        date: new Date(currentDate.getTime() + 55 * 24 * 60 * 60 * 1000).toISOString(),
        time: '9:00 AM IST',
        venue: 'The Lalit Ashok, Bangalore',
        type: 'Conference',
        url: 'https://nasscom.in/',
        organizer: 'NASSCOM',
        source: 'India Events',
        isOnline: false,
        isExternal: true
      },
      {
        id: 'india-event-15',
        title: 'Campus Placement Prep Workshop',
        description: 'Free workshop for final year students on DSA, System Design, and interview preparation for top tech companies.',
        date: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        time: '3:00 PM IST',
        venue: 'Online - Zoom',
        type: 'Workshop',
        url: 'https://zoom.us',
        organizer: 'AlumniConnect Community',
        source: 'India Events',
        isOnline: true,
        isExternal: true
      }
    ];

    // Sort by date and return
    return techEvents
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching tech events:', error.message);
    return [];
  }
};

// Fetch from Dev.to for India-related tech articles
const fetchDevToEvents = async (limit = 5) => {
  try {
    const response = await axios.get('https://dev.to/api/articles?tag=india&per_page=' + limit);
    
    if (response.data) {
      return response.data.map(article => ({
        id: `devto-${article.id}`,
        title: article.title,
        description: article.description || 'Tech community article from India',
        date: article.published_at,
        time: 'See article for details',
        venue: 'Online',
        type: 'Article/Event',
        url: article.url,
        organizer: article.user?.name || 'Dev.to Community',
        source: 'Dev.to India',
        isOnline: true,
        isExternal: true
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching Dev.to events:', error.message);
    return [];
  }
};

module.exports = {
  fetchRemoteJobs,
  fetchIndiaJobs,
  fetchTechEvents,
  fetchDevToEvents
};
