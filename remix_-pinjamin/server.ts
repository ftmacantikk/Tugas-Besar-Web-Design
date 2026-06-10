import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { apiRouter } from "./server/index";
import { seedDatabase } from "./server/seeder";

async function startServer() {
  // Run Supabase DB Check & Seed on startup
  await seedDatabase();

  const app = express();
  const PORT = Number(process.env.PORT) || 3001;

  // Add standard body parsers
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Register custom systematic backend APIs
  app.use("/api", apiRouter);

  // Integrate Vite dynamically based on environment mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static bundles
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
