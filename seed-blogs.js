import { connectDB } from '../src/lib/db.js';
import Blog from '../src/models/Blog.js';

const sampleBlogs = [
  {
    title: "Study Abroad Guide 2024",
    slug: "study-abroad-guide-2024",
    category: "Study Tips",
    tags: ["study abroad", "international education", "2024"],
    content: `# Study Abroad Guide 2024

Studying abroad is a life-changing experience that offers countless opportunities for personal and academic growth. This comprehensive guide will help you navigate the process of studying abroad in 2024.

## Choosing the Right Country

When selecting a country for your studies, consider factors such as:
- Quality of education
- Cost of living
- Language requirements
- Post-graduation work opportunities
- Cultural fit

## Application Process

1. Research universities and programs
2. Prepare required documents
3. Submit applications
4. Apply for student visa
5. Arrange accommodation

## Popular Study Destinations

- United States: Home to world-renowned universities
- United Kingdom: Rich academic tradition
- Canada: Welcoming to international students
- Australia: High-quality education system
- Germany: Excellent education with low tuition fees

## Tips for Success

- Start planning early
- Improve your language skills
- Build a strong academic profile
- Seek scholarships and financial aid
- Connect with current international students

Remember that studying abroad is not just about academics - it's about personal growth, cultural immersion, and building a global network.`,
    image: "https://picsum.photos/seed/study-abroad/800/400",
    related_exams: ["IELTS", "TOEFL", "GRE"],
    is_active: true
  },
  {
    title: "How to Prepare for IELTS Exam",
    slug: "how-to-prepare-for-ielts-exam",
    category: "Exam Preparation",
    tags: ["IELTS", "English test", "exam tips"],
    content: `# How to Prepare for IELTS Exam

The International English Language Testing System (IELTS) is a crucial exam for students planning to study abroad. Here's a comprehensive guide to help you prepare effectively.

## Understanding IELTS Structure

IELTS consists of four sections:
1. Listening (30 minutes)
2. Reading (60 minutes)
3. Writing (60 minutes)
4. Speaking (11-14 minutes)

## Preparation Tips

### 1. Improve Your English Skills
- Read English newspapers and magazines
- Watch English movies and TV shows
- Practice speaking with native speakers
- Join English language clubs

### 2. Take Practice Tests
- Familiarize yourself with the test format
- Time yourself during practice
- Identify your weak areas
- Focus on improvement

### 3. Test Day Strategies
- Get enough sleep the night before
- Arrive at the test center early
- Stay calm and focused
- Manage your time wisely

## Scoring System

IELTS is scored on a band scale from 1 to 9:
- Band 9: Expert user
- Band 7-8: Very good user
- Band 6: Competent user
- Band 5-6: Modest user

Most universities require a minimum band score of 6.5-7.0 for admission.

## Resources for Preparation

- Official IELTS practice materials
- Online preparation courses
- Mobile apps for IELTS practice
- Study groups and forums

Remember, consistent practice and dedication are key to achieving your desired score!`,
    image: "https://picsum.photos/seed/ielts-prep/800/400",
    related_exams: ["IELTS", "TOEFL"],
    is_active: true
  },
  {
    title: "Scholarship Opportunities for International Students",
    slug: "scholarship-opportunities-international-students",
    category: "Financial Aid",
    tags: ["scholarships", "financial aid", "international students"],
    content: `# Scholarship Opportunities for International Students

Financing your education abroad can be challenging, but numerous scholarships are available to help international students achieve their dreams.

## Types of Scholarships

### 1. Government Scholarships
- Fulbright Program (USA)
- Chevening Scholarship (UK)
- Australia Awards (Australia)
- DAAD Scholarship (Germany)

### 2. University Scholarships
- Merit-based scholarships
- Need-based scholarships
- Department-specific awards
- Athletic scholarships

### 3. Private Scholarships
- Corporate scholarships
- Foundation grants
- Community organization awards
- Professional association scholarships

## How to Find Scholarships

1. **University Websites**: Check the financial aid section of your target universities
2. **Government Portals**: Visit official education ministry websites
3. **Scholarship Search Engines**: Use platforms like Fastweb, Scholarships.com
4. **Education Fairs**: Attend virtual or in-person education fairs

## Application Tips

### 1. Start Early
- Research scholarships 12-18 months in advance
- Prepare application materials well before deadlines
- Allow time for recommendation letters

### 2. Strong Personal Statement
- Highlight your academic achievements
- Explain your career goals
- Demonstrate financial need (if applicable)
- Show how you'll contribute to the community

### 3. Required Documents
- Academic transcripts
- Standardized test scores
- Letters of recommendation
- Personal statement/essay
- Proof of English proficiency

## Common Mistakes to Avoid

- Missing application deadlines
- Incomplete applications
- Generic personal statements
- Not following instructions
- Ignoring smaller scholarships

## Success Stories

Many international students have successfully funded their education through scholarships. With dedication and proper planning, you can too!

Remember: Apply for multiple scholarships to increase your chances of success. Every scholarship, no matter how small, helps reduce your financial burden.`,
    image: "https://picsum.photos/seed/scholarships/800/400",
    related_exams: ["SAT", "ACT", "GRE"],
    is_active: true
  }
];

async function seedBlogs() {
  try {
    await connectDB();
    
    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('Cleared existing blogs');
    
    // Insert sample blogs
    const insertedBlogs = await Blog.insertMany(sampleBlogs);
    console.log(`Successfully inserted ${insertedBlogs.length} blogs`);
    
    insertedBlogs.forEach(blog => {
      console.log(`- ${blog.title} (slug: ${blog.slug})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding blogs:', error);
    process.exit(1);
  }
}

seedBlogs();
