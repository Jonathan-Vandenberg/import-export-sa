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
    const searchQuery = req.body.searchQuery;

    try {
      const response = await fetch(searchQuery);
      const html = await response.text();
      const $ = cheerio.load(html);

      let phone = [];
      let email = [];
      let address = [];
      let name = [];
      let website = [];
      let about = [];
      let products = [];
      let singleImages = [];

      const searchParams = {
        address:
          'p[style="padding-top:2px; line-height:18px; padding-bottom:6px"]',
        phoneNumbers:
          'p[style="padding-top:3px; line-height:19px; font-size:15px; font-weight:700; padding-bottom:6px; color:#333"]',
        url: 'p[style="padding-top:5px; font-size:13px;"]',
        companyName:
          'h1[style="font-size:18px; font-weight:bold; color: #222; text-align: left; text-transform: capitalize; margin-bottom: 3px;"]',
        email: 'a[style="color:#3B65A7"]',
        about: 'p[style="color:#111; font-size:13px; line-height:23px"]',
        products: ".tensanphamdichvu_name",
      };

      const phoneBusiness = $(searchParams.phoneNumbers, html)
        .text()
        .match(/[0-9]/gi)
        .join("")
        .slice(-11);
      phone.push(`+84 ${phoneBusiness}`);

      const emailBusiness = $(searchParams.email, html).attr("href");
      email.push(emailBusiness);

      const nameBusiness = $(searchParams.companyName, html).text();
      name.push(nameBusiness);

      const websiteBusiness = $(searchParams.url, html).find("a").attr("href");
      website.push(websiteBusiness);

      const addressBusiness = $(searchParams.address, html).text();
      address.push(addressBusiness);

      const aboutBusiness = $(searchParams.about, html).text();
      about.push(aboutBusiness);

      $(searchParams.products, html).each(function () {
        const productsBusiness = $(this).find("a").attr("title");
        products.push(productsBusiness);
      });

      $("img[class=picCore]").each(function () {
        const productImages = $(this).attr("src");
        if (!productImages) {
          return singleImages.push("Not found");
        }
        singleImages.push(productImages);
      });

      res.statusCode = 200;
      return res.json({
        website,
        name,
        email,
        phone,
        address,
        about,
        products,
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
