const mongoose = require('mongoose');

// Import models
const College = require('./src/models/College');
const Country = require('./src/models/Country');

async function checkColleges() {
  try {
    // Read .env file manually
    const fs = require('fs');
    const envContent = fs.readFileSync('.env', 'utf8');
    const MONGODB_URI = envContent.split('\n').find(line => line.startsWith('MONGODB_URI=')).split('=')[1];
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Check countries
    const countriesCount = await Country.countDocuments();
    console.log(`Countries in database: ${countriesCount}`);
    
    if (countriesCount > 0) {
      const countries = await Country.find().limit(3);
      console.log('Sample countries:', countries.map(c => ({ name: c.name, slug: c.slug })));
    }
    
    // Check colleges
    const collegesCount = await College.countDocuments();
    console.log(`Colleges in database: ${collegesCount}`);
    
    if (collegesCount > 0) {
      const colleges = await College.find().populate('country_ref').limit(3);
      console.log('Sample colleges:', colleges.map(c => ({ 
        name: c.name, 
        slug: c.slug, 
        country: c.country_ref?.name 
      })));
    } else {
      console.log('No colleges found. Creating sample college...');
      
      // Create a sample college if country exists
      const country = await Country.findOne();
      if (country) {
        const sampleCollege = new College({
          name: 'Sample University',
          slug: 'sample-university',
          country_ref: country._id,
          exams: ['IELTS', 'TOEFL'],
          fees: 25000,
          duration: '4 years',
          establishment_year: '1990',
          ranking: '150',
          banner_url: 'https://picsum.photos/seed/university/800/400',
          about_content: 'A prestigious university offering world-class education and research opportunities.',
          is_active: true
        });
        
        await sampleCollege.save();
        console.log('Sample college created:', sampleCollege.name);
      } else {
        console.log('No countries found. Please create a country first.');
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkColleges();
