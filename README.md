# PetSoft - Pet Daycare Management System

PetSoft is a subscription-based platform designed to streamline the management of pet daycare services. With features tailored for pet daycare centers, it provides an efficient and user-friendly solution for managing subscriptions, scheduling, and more.

## Features

- **Subscription Management:** Handle recurring subscriptions with Stripe integration.
- **User Authentication:** Secure authentication with NextAuth.
- **Scheduling and Booking:** Easily manage daycare schedules and bookings.
- **Responsive UI:** Modern and responsive interface built with TailwindCSS.
- **Theme Customization:** Support for light and dark themes via NextThemes.
- **Form Validation:** Robust forms powered by React Hook Form and Zod.

## Technologies Used

### Backend

- **Prisma:** Database ORM for managing relational data.
- **Next.js:** Framework for building the application.
- **Stripe:** Payment gateway for managing subscriptions.

### Frontend

- **React 18**: Component-based architecture.
- **TailwindCSS:** Utility-first CSS framework for styling.
- **Radix UI:** Accessible and customizable UI components.

### Utilities

- **React Hook Form:** Simplifies form handling and validation.
- **Zod:** Schema validation for forms and APIs.
- **Zustand:** Lightweight state management.
- **Sonner:** Elegant toast notifications.

### Development Tools

- **TypeScript:** Strongly typed language for better reliability.
- **ESLint:** Code linting and formatting.
- **PostCSS:** CSS transformations and optimizations.
- **Prisma:** Schema management and seeding for the database.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 16.x)
- npm or yarn
- A PostgreSQL database (or any supported Prisma database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/petsoft.git
   ```

2. Navigate to the project directory:

   ```bash
   cd petsoft
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary configuration. Refer to `.env.example` for required variables.

5. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

6. Seed the database:

   ```bash
   npm run prisma:seed
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Access the application at [http://localhost:3000](http://localhost:3000).

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

### Linting

Run the linter to check for code issues:

```bash
npm run lint
# or
yarn lint
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## Acknowledgments

- UI components by [Radix UI](https://www.radix-ui.com/)
- CSS utilities by [TailwindCSS](https://tailwindcss.com/)
- Payment integration by [Stripe](https://stripe.com/)

---

Enjoy managing your pet daycare with PetSoft! 🐾
