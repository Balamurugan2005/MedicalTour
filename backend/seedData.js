const mongoose = require('mongoose');
const Country = require('./models/Country');
const Procedure = require('./models/Procedure');
const Cost = require('./models/Cost');
require('dotenv').config();

// Sample data
const countries = [
  {
    name: 'Colombia',
    code: 'CO',
    coordinates: { lat: 4.5709, lng: -74.2973 },
    flag: '🇨🇴'
  },
  {
    name: 'Mexico',
    code: 'MX',
    coordinates: { lat: 23.6345, lng: -102.5528 },
    flag: '🇲🇽'
  },
  {
    name: 'Turkey',
    code: 'TR',
    coordinates: { lat: 38.9637, lng: 35.2433 },
    flag: '🇹🇷'
  },
  {
    name: 'India',
    code: 'IN',
    coordinates: { lat: 20.5937, lng: 78.9629 },
    flag: '🇮🇳'
  },
  {
    name: 'South Korea',
    code: 'KR',
    coordinates: { lat: 35.9078, lng: 127.7669 },
    flag: '🇰🇷'
  },
  {
    name: 'Vietnam',
    code: 'VN',
    coordinates: { lat: 14.0583, lng: 108.2772 },
    flag: '🇻🇳'
  }
];

const procedures = [
  // Cosmetic procedures
  {
    name: 'Botox Injection',
    category: 'cosmetic',
    description: 'Botulinum toxin injection for wrinkle reduction',
    isNonInvasive: true
  },
  {
    name: 'Lip Filler',
    category: 'cosmetic',
    description: 'Hyaluronic acid injection for lip enhancement',
    isNonInvasive: true
  },
  {
    name: 'Dermal Fillers',
    category: 'cosmetic',
    description: 'Injectable fillers for facial volume restoration',
    isNonInvasive: true
  },
  {
    name: 'Chemical Peel',
    category: 'cosmetic',
    description: 'Chemical exfoliation for skin rejuvenation',
    isNonInvasive: true
  },
  {
    name: 'Laser Hair Removal',
    category: 'cosmetic',
    description: 'Permanent hair reduction using laser technology',
    isNonInvasive: true
  },
  
  // Dental procedures
  {
    name: 'Dental Cleaning',
    category: 'dental',
    description: 'Professional teeth cleaning and examination',
    isNonInvasive: true
  },
  {
    name: 'Dental Crown',
    category: 'dental',
    description: 'Tooth restoration with ceramic or metal crown',
    isNonInvasive: false
  },
  {
    name: 'Dental Implant',
    category: 'dental',
    description: 'Surgical placement of artificial tooth root',
    isNonInvasive: false
  },
  {
    name: 'Teeth Whitening',
    category: 'dental',
    description: 'Professional teeth whitening treatment',
    isNonInvasive: true
  },
  {
    name: 'Root Canal',
    category: 'dental',
    description: 'Endodontic treatment for infected tooth',
    isNonInvasive: false
  },
  
  // Imaging procedures
  {
    name: 'MRI Scan',
    category: 'imaging',
    description: 'Magnetic Resonance Imaging for detailed body scans',
    isNonInvasive: true
  },
  {
    name: 'CT Scan',
    category: 'imaging',
    description: 'Computed Tomography for cross-sectional imaging',
    isNonInvasive: true
  },
  {
    name: 'X-Ray',
    category: 'imaging',
    description: 'Radiographic imaging for bone and tissue examination',
    isNonInvasive: true
  },
  {
    name: 'Ultrasound',
    category: 'imaging',
    description: 'Sound wave imaging for internal organ examination',
    isNonInvasive: true
  }
];

// Sample cost data (US vs other countries)
const generateCosts = (procedures, countries) => {
  const costs = [];
  
  procedures.forEach(procedure => {
    countries.forEach(country => {
      // Generate realistic cost variations
      const usCost = Math.floor(Math.random() * 5000) + 500; // $500 - $5500
      const localCost = Math.floor(usCost * (0.2 + Math.random() * 0.6)); // 20% - 80% of US cost
      
      // Generate realistic travel costs based on country
      const flightCost = Math.floor(Math.random() * 800) + 200; // $200 - $1000
      const hotelCost = Math.floor(Math.random() * 150) + 50; // $50 - $200 per night
      const visaCost = Math.floor(Math.random() * 100) + 20; // $20 - $120
      const insuranceCost = Math.floor(Math.random() * 200) + 50; // $50 - $250
      
      costs.push({
        procedure: procedure._id,
        country: country._id,
        usCost,
        localCost,
        flightCost,
        hotelCost,
        visaCost,
        insuranceCost,
        currency: 'USD'
      });
    });
  });
  
  return costs;
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical-tourism');
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Country.deleteMany({});
    await Procedure.deleteMany({});
    await Cost.deleteMany({});
    console.log('Cleared existing data');
    
    // Insert countries
    const insertedCountries = await Country.insertMany(countries);
    console.log(`Inserted ${insertedCountries.length} countries`);
    
    // Insert procedures
    const insertedProcedures = await Procedure.insertMany(procedures);
    console.log(`Inserted ${insertedProcedures.length} procedures`);
    
    // Generate and insert costs
    const costs = generateCosts(insertedProcedures, insertedCountries);
    const insertedCosts = await Cost.insertMany(costs);
    console.log(`Inserted ${insertedCosts.length} cost comparisons`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
