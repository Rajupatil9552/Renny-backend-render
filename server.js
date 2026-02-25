import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
//import 'dotenv/config';
import { globalErrorHandler } from './middlewares/errorHandler.js';
import blogRoutes from './routes/blogRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
// 1. Import the new Investor Relations routes
import financialRoutes from './routes/financialRoutes.js';
import industryReportRoutes from './routes/industryreportRoutes.js';
import ipoDocumentsRoutes from './routes/ipoDocumentsRoutes.js';
import shareholdingRoutes from './routes/shareholdingRoutes.js';
import policiesRoutes from './routes/policiesRoutes.js';
import ipoAvRoutes from './routes/ipoAvRoutes.js';
import governanceRoutes from './routes/governanceRoutes.js';
import sustainabilityRoutes from './routes/sustainabilityRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import { protectAdmin } from './middlewares/authMiddleware.js';
const app = express();

connectDB();

// Middlewares
app.use(cors({
    origin: '*', // Adjust the origin as per your client URL and port
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
// PUBLIC APIs - Used by the main website to get content
app.use('/api/blogs', blogRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/contact", contactRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/financials', financialRoutes);
app.use('/api/industry-report', industryReportRoutes);
app.use('/api/ipo-documents', ipoDocumentsRoutes);
app.use('/api/shareholding-pattern', shareholdingRoutes);
app.use('/api/policies', policiesRoutes);
app.use('/api/ipo-av', ipoAvRoutes);
app.use('/api/governance', governanceRoutes);
app.use('/api/sustainability', sustainabilityRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/newsletter', newsletterRoutes);

// CMS Auth API
app.use('/cms/auth', adminAuthRoutes);

// Protect all CMS routes below
app.use('/cms', protectAdmin);

// CMS APIs -> crud operations - Used by your Admin Panel
app.use('/cms/blogs', blogRoutes);
app.use('/cms/news', newsRoutes);
app.use('/cms/events', eventRoutes);
app.use("/cms/contact", contactRoutes);
app.use('/cms/career', careerRoutes);
app.use('/cms/financials', financialRoutes);
app.use('/cms/industry-report', industryReportRoutes);
app.use('/cms/ipo-documents', ipoDocumentsRoutes);
app.use('/cms/policies', policiesRoutes);
app.use('/cms/shareholding-pattern', shareholdingRoutes);
app.use('/cms/ipo-av', ipoAvRoutes);
app.use('/cms/governance', governanceRoutes);
app.use('/cms/sustainability', sustainabilityRoutes);
app.use('/cms/certificates', certificateRoutes);
app.use('/cms/upload', uploadRoutes);
app.use('/cms/newsletter', newsletterRoutes);
// Health check
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// Global error handler
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

export default app;
