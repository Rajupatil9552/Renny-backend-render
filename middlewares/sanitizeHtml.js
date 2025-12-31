import sanitize from "sanitize-html";

export const sanitizeContent = (req, res, next) => {
  if (req.body.content) {
    req.body.content = sanitize(req.body.content, {
      allowedTags: [
        "b", "i", "em", "strong",
        "p", "ul", "ol", "li",
        "h1", "h2", "h3",
        "a", "br", "blockquote"
      ],
      allowedAttributes: {
        a: ["href", "target"]
      }
    });
  }

  if (req.body.faqs) {
    req.body.faqs = req.body.faqs.map(faq => ({
      question: sanitize(faq.question, { allowedTags: [] }),
      answer: sanitize(faq.answer)
    }));
  }

  next();
};
