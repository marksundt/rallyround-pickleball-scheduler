# RallyRound: Pickleball Scheduler

A visually stunning round-robin scheduler for doubles pickleball, designed to create balanced and varied matchups for any number of players and courts.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/marksundt/rallyround-pickleball-scheduler)

RallyRound is a single-page web application designed to effortlessly generate round-robin schedules for doubles pickleball. Users can input a list of player names and specify the number of available courts. The application's core logic then calculates and displays a balanced schedule, ensuring players are rotated to play with and against different opponents across multiple rounds. For scenarios with more players than court capacity, the scheduler intelligently assigns 'byes' (sit-out rounds) to players, ensuring everyone gets fair playing time. The interface is designed to be intuitive, clean, and highly interactive, providing a seamless experience from player entry to viewing the final, beautifully rendered schedule.

## ✨ Key Features

- **Dynamic Player Management**: Easily add and remove players from the list.
- **Court Configuration**: Set the number of available courts for scheduling.
- **Automatic Schedule Generation**: Instantly create a round-robin schedule with a single click.
- **Intelligent Bye Assignment**: Automatically handles byes for an odd number of players or limited courts.
- **Responsive Design**: Flawless experience on desktop, tablet, and mobile devices.
- **Visually Polished UI**: A clean, modern, and interactive interface built with shadcn/ui and Tailwind CSS.
- **Client-Side Logic**: All scheduling is performed instantly in the browser, no server-side waiting.

## 🛠️ Technology Stack

- **Frontend**: React, Vite, TypeScript
- **UI**: Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Deployment**: Cloudflare Workers & Pages
- **Backend Framework**: Hono (for the underlying template structure)

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [Bun](https://bun.sh/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd rallyround_scheduler
    ```

2.  **Install dependencies:**
    This project uses Bun for package management.
    ```bash
    bun install
    ```

### Running the Development Server

To start the local development server, run the following command:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

## 🏗️ Project Structure

- `src/`: Contains all the frontend React application code.
  - `pages/HomePage.tsx`: The main and only page for the application.
  - `components/`: Reusable React components.
  - `store/`: Zustand store for global state management.
  - `lib/`: Utility functions, including the core scheduling logic.
- `worker/`: Contains the Cloudflare Worker backend code provided by the template. Note: This application is fully client-side, so the worker primarily serves the built assets.
- `shared/`: TypeScript types shared between the frontend and worker.
- `wrangler.jsonc`: Configuration file for the Cloudflare Worker.

## 🚀 Deployment

This application is designed to be deployed seamlessly to the Cloudflare network.

1.  **Login to Wrangler:**
    Ensure you are logged into your Cloudflare account via the Wrangler CLI.
    ```bash
    wrangler login
    ```

2.  **Build and Deploy:**
    The `deploy` script in `package.json` handles building the application and deploying it using Wrangler.
    ```bash
    bun run deploy
    ```

This command will build the Vite frontend, then deploy the application and the associated worker to your Cloudflare account.

Alternatively, you can deploy your own version of this project with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/marksundt/rallyround-pickleball-scheduler)

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the application, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.