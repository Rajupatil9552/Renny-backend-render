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

// New specialized CMS and Page Section Routes
import pageSectionRoutes from './routes/pageSectionRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js';
import unitRoutes from './routes/unitRoutes.js';
import specificationRoutes from './routes/specificationRoutes.js';
import esgProjectRoutes from './routes/esgProjectRoutes.js';
import successStoryRoutes from './routes/successStoryRoutes.js';
import plantRoutes from './routes/plantRoutes.js';
import productContentRoutes from './routes/productContentRoutes.js';
import scaffoldingRoutes from './routes/scaffoldingRoutes.js';
import designCentreRoutes from './routes/designCentreRoutes.js';
import contactInfoRoutes from './routes/contactInfoRoutes.js';

const app = express();

connectDB();

// Middlewares
app.use(cors());
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
app.use('/api/upload', uploadRoutes);

// Dynamic Page Sections & Specialized Data Models
app.use('/api/page', pageSectionRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/specifications', specificationRoutes);
app.use('/api/esg-projects', esgProjectRoutes);
app.use('/api/success-stories', successStoryRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/product-content', productContentRoutes);
app.use('/api/scaffolding', scaffoldingRoutes);
app.use('/api/design-centre', designCentreRoutes);
app.use('/api/contact-info', contactInfoRoutes);


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

// Editor CMS routes for dynamic data
app.use('/cms/page', pageSectionRoutes);
app.use('/cms/timeline', timelineRoutes);
app.use('/cms/units', unitRoutes);
app.use('/cms/specifications', specificationRoutes);
app.use('/cms/esg-projects', esgProjectRoutes);
app.use('/cms/success-stories', successStoryRoutes);
app.use('/cms/plants', plantRoutes);
app.use('/cms/product-content', productContentRoutes);
app.use('/cms/scaffolding', scaffoldingRoutes);
app.use('/cms/design-centre', designCentreRoutes);
app.use('/cms/contact-info', contactInfoRoutes);

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