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

      let urlBusiness = [];

      $(".ten_sodienthoai_div").each(function () {
        const url = $(this).find("a").attr("href");
        urlBusiness.push(url);
      });

      res.statusCode = 200;
      return res.json({ urlBusiness });
    } catch (e) {
      res.statusCode = 404;
      return res.json({
        error: "Oops, something went wrong...",
      });
    }
  }
}
