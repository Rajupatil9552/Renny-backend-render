import Industry from "../models/IndustryReportModel.js";
 * @desc    Get all Industry Reports for the frontend
 * @route   GET /api/industry-report
 */
export const getIndustryReports = async (req, res) => {
  try {
    // We search for the unique slug we defined in the model
    const pageData = await Industry.findOne({ slug: "industry-report" });

    // If the page doesn't exist in DB yet, return an empty array
    if (!pageData) {
      return res.status(200).json([]);
    }

    // Return only the reports array to the frontend
    res.status(200).json(pageData.reports);
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching industry reports", 
      error: error.message 
    });
  }
};
// 2. Add or Update a report (Record)
export const upsertIndustryReport = async (req, res) => {
  const { title, url, reportId } = req.body;
  const slug = "industry-report";

  try {
    const page = await Industry.findOneAndUpdate(
      { slug },
      { slug },
      { new: true, upsert: true }
    );

    if (reportId) {
      const report = page.reports.id(reportId);
      if (report) {
        report.title = title;
        report.url = url; // Updating with the new S3 URL
      }
    } else {
      page.reports.push({ title, url }); // Adding a new S3 URL record
    }

    await page.save();
    res.status(200).json(page);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Delete a Particular Record
export const deleteParticularReport = async (req, res) => {
  const { reportId } = req.params;
  try {
    const page = await Industry.findOne({ slug: "industry-report" });
    page.reports.pull({ _id: reportId }); // Removes only that specific PDF
    await page.save();
    res.status(200).json({ message: "Record deleted", page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
