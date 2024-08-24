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
      let name = [];
      let website = [];
      let about = [];
      let products = [];
      let address = [];
      let singleImages = [];

      const nameBusiness = $("h1.fs-3").text().trim();
      name.push(nameBusiness);

      const websiteBusiness = $("a[rel='nofollow']").attr("href");
      website.push(websiteBusiness);

      // About information is not present in the provided HTML block
      about.push("Not available");

      // Extract contact information
      const contactName = $(".contact_infomation .light_gray_bg:nth-child(2) small").text().trim();
      name.push(contactName);

      const phoneBusiness = $(".contact_infomation .light_gray_bg:nth-child(4) a").text().trim();
      phone.push(phoneBusiness);

      const emailBusiness = $("#email_contact").text().trim();
      email.push(emailBusiness);

      const addressBusiness = $(".logo_lisitng_address .pc_display").first().text().trim();
      address.push(addressBusiness);

      $(".product_list li").each(function () {
        const productsBusiness = $(this).find("a").text().trim();
        if (productsBusiness) {
          products.push(productsBusiness);
        }
      });

      $("img[class=listing_detail_product_showcase_frame]").each(function () {
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
        error: "Oops, something went wrong..." + e.message,
      });
    }
  }
}