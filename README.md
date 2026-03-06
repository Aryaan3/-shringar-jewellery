# Shringar — Premium Indian Jewellery

Shringar is a luxury e-commerce platform dedicated to handcrafted Indian jewellery, including Kundan, Meenakari, Temple, and Bridal collections.

## Features
- **Authentic Aesthetic**: Premium Indian design with a royal color palette (Maroon & Gold).
- **Comprehensive Catalog**: Wide range of necklaces, jhumkas, bangles, and more.
- **INR Pricing**: All products are priced in ₹.
- **Full-Stack MERN**: Built with MongoDB, Express, React, and Node.js.
- **Production Ready**: Optimized build with Vite.

## Installation

### Prerequisites
- Node.js
- MongoDB

### Steps
1. Clone the repository.
2. Install dependencies for both client and server:
   ```bash
   # Root directory
   npm install

   # Client directory
   cd client && npm install

   # Server directory
   cd ../server && npm install
   ```
3. Set up your `.env` file in the `server` directory.
4. Run the development environment:
   ```bash
   # From root
   ./START.bat
   ```

## Production Build
To create a production build:
```bash
cd client && npm run build
```
The server is configured to serve the build from `client/dist`.

## License
MIT
