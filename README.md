# Medical Tourism Cost Comparison App

A comprehensive web application that allows users to compare medical procedure costs between the United States and international destinations. The app features an interactive world map, procedure selection, and detailed cost comparisons.

## Features

- **Interactive World Map**: Visual representation of available medical tourism destinations
- **Procedure Selection**: Browse medical procedures by category (cosmetic, dental, imaging)
- **Cost Comparison**: Side-by-side comparison of US vs. international costs
- **Real-time Updates**: Dynamic highlighting of countries based on selected procedures
- **Responsive Design**: Modern, mobile-friendly interface

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework

## Project Structure

```
medical-tourism-app/
├── backend/                 # Backend server
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── server.js           # Main server file
│   ├── seedData.js         # Database seeder
│   └── package.json        # Backend dependencies
├── frontend/               # Frontend application
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   ├── types/              # TypeScript definitions
│   └── package.json        # Frontend dependencies
├── package.json            # Root package.json
└── README.md               # This file
```

## Prerequisites

- Node.js 18+ 
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medical-tourism-app
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cd backend
   cp config.env .env
   # Edit .env with your MongoDB connection string
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Seed the database**
   ```bash
   cd backend
   node seedData.js
   ```

## Running the Application

### Development Mode
```bash
# Run both frontend and backend concurrently
npm run dev

# Or run separately:
npm run server    # Backend on port 5000
npm run client    # Frontend on port 3000
```

### Production Mode
```bash
# Build frontend
npm run build

# Start production server
npm start
```

## API Endpoints

### Countries
- `GET /api/countries` - Get all countries
- `GET /api/countries/:id` - Get country by ID

### Procedures
- `GET /api/procedures` - Get all procedures
- `GET /api/procedures/category/:category` - Get procedures by category
- `GET /api/procedures/:id` - Get procedure by ID

### Costs
- `GET /api/costs` - Get all cost comparisons
- `GET /api/costs/procedure/:procedureId` - Get costs by procedure
- `GET /api/costs/country/:countryId` - Get costs by country
- `GET /api/costs/compare/:procedureId/:countryId` - Get specific comparison

## Available Countries

- 🇨🇴 Colombia
- 🇲🇽 Mexico
- 🇹🇷 Turkey
- 🇮🇳 India
- 🇰🇷 South Korea
- 🇻🇳 Vietnam

## Available Procedures

### Cosmetic (Non-Invasive)
- Botox Injection
- Lip Filler
- Dermal Fillers
- Chemical Peel
- Laser Hair Removal

### Dental
- Dental Cleaning
- Dental Crown
- Dental Implant
- Teeth Whitening
- Root Canal

### Imaging
- MRI Scan
- CT Scan
- X-Ray
- Ultrasound

## Usage

1. **Select a Procedure**: Choose from the left panel by browsing categories or searching
2. **View Available Destinations**: Countries on the world map will highlight when a procedure is selected
3. **Select Destination**: Click on a highlighted country to see detailed cost comparison
4. **Compare Costs**: View side-by-side comparison of US vs. international costs

## Customization

### Adding New Countries
Edit `backend/seedData.js` and add new country objects with coordinates and flag emojis.

### Adding New Procedures
Add new procedures to the procedures array in `backend/seedData.js`.

### Modifying Cost Data
Update the cost generation logic in `backend/seedData.js` to reflect real-world pricing.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or issues, please open an issue in the repository or contact the development team.

## Disclaimer

This application is for informational purposes only. Medical costs are estimates and may vary significantly. Always consult with healthcare providers for accurate pricing and medical advice before making healthcare decisions.


