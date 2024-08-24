const cheerio = require("cheerio"); // 1
const Cors = require("cors");

export const config = {
  api: {
    bodyParser: "stream",
  },
};
// Initializing the cors middleware
const cors = Cors({
  methods: ["POST"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

//eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    const searchQuery = req.body.singleImagesUrl;
    const page = req.body.page;
    let finalSearchQuery;

    if (page === 1) {
      finalSearchQuery = searchQuery;
    } else {
      finalSearchQuery = searchQuery.concat(`?page=${page}`);
    }

    try {
      const response = await fetch(finalSearchQuery);
      const html = await response.text();
      const $ = cheerio.load(html);

      let singleImages = [];

      $("img[class=listing_detail_product_showcase_frame]").each(function () {
        const images = $(this).attr("src");
        if (!images) {
          return images.push("Not found");
        }
        singleImages.push(images);
      });

      res.statusCode = 200;
      return res.json({
        singleImages,
      });
    } catch (e) {
      res.statusCode = 404;
      return res.json({
        error: "Oops, something went wrong...",
      });
    }
  }
}
