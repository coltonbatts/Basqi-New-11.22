# Basqi - Fort Worth's Premiere Art Platform

A platform connecting local artists with art enthusiasts.

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/yourusername/basqi.git
cd basqi
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

4. Update the `.env` file with your Supabase credentials:
- Get your project URL and anon key from your Supabase project settings
- Replace the placeholder values in `.env`

5. Start the development server
```bash
npm run dev
```

## Environment Variables

The following environment variables are required:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase project's anon/public key

You can find these values in your Supabase project settings under Project Settings > API.

## Features

- Artist profiles and portfolios
- Artwork showcase and management
- User authentication
- Responsive design

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Supabase
- Vite

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.