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

  const searchQuery = req.body.searchQuery;
  const page = req.body.page;
  let finalSearchQuery;

  if (page === 1) {
    finalSearchQuery = searchQuery;
  } else {
    finalSearchQuery = searchQuery.concat(`?page=${page}`);
  }

  if (req.method === "POST") {
    try {
      const response = await fetch(finalSearchQuery);
      const html = await response.text();
      const $ = cheerio.load(html);

      let businessImages = [];

      $("img[class=picCore]").each(function () {
        const image = $(this).attr("src");
        if (!image) {
          return businessImages.push("Not found");
        }
        businessImages.push(image);
      });

      res.statusCode = 200;
      return res.json({ businessImages });
    } catch (e) {
      res.statusCode = 404;
      return res.json({
        error: "Oops, something went wrong...",
      });
    }
  }
}
