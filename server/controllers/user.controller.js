import { User } from "../models/user.model.js";
import { emailQueue } from "../services/email/emailQueue.js";

const getWelcomeEmailHtml = (userName) => {
  // The new, professionally designed HTML template
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Welcome to EasyEats!</title>
        <style>
            /* Base Styles */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f1f3f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
        </style>
    </head>
    <body style="background-color: #f1f3f6; margin: 0 !important; padding: 0 !important;">

        <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
            Your culinary adventure starts now. Let's find your first delicious meal!
        </div>

        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" style="padding: 20px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        
                        <tr>
                            <td align="center" style="padding: 20px 0;">
                                <h1 style="font-size: 32px; font-weight: 700; color: #FF6347; margin: 0;">EasyEats</h1>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 40px;">
                                    
                                    <tr>
                                        <td align="center" style="padding-bottom: 20px;">
                                            <h2 style="font-size: 28px; font-weight: 600; color: #212529; margin: 0;">Welcome to the family!</h2>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="left" style="color: #495057; font-size: 16px; line-height: 26px;">
                                            <p style="margin: 0 0 20px 0;">Hi ${userName},</p>
                                            <p style="margin: 0;">We're absolutely thrilled you've joined EasyEats! You're now part of a community that loves discovering delicious food from the best local restaurants, all in one place.</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="center" style="padding: 30px 0;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 8px;" bgcolor="#FF6347">
                                                        <a href="https://food-delivery-frontend-831b.onrender.com/" target="_blank" style="display: inline-block; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px;">Explore Restaurants Now</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                      <td align="center" style="padding: 0 0 20px 0;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                          <tr><td height="1" style="background-color:#dee2e6; line-height:1px;">&nbsp;</td></tr>
                                        </table>
                                      </td>
                                    </tr>

                                    <tr>
                                        <td align="left" style="color: #495057; font-size: 16px; line-height: 26px;">
                                            <p style="margin: 0;">Ready to find your new favorite dish? Just click the button above to get started.</p>
                                            <p style="margin: 15px 0 0 0;">Happy eating,<br>The EasyEats Team</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="padding: 30px 10px 20px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    
                                    <tr>
                                      <td align="center" style="padding-bottom: 20px;">
                                        <a href="#" target="_blank" style="text-decoration: none; margin: 0 10px;"><img src="https://i.ibb.co/Lzcw52g/twitter-icon.png" alt="Twitter" width="24"></a>
                                        <a href="#" target="_blank" style="text-decoration: none; margin: 0 10px;"><img src="https://i.ibb.co/MZYd2rW/instagram-icon.png" alt="Instagram" width="24"></a>
                                        <a href="#" target="_blank" style="text-decoration: none; margin: 0 10px;"><img src="https://i.ibb.co/3k5nXZ8/facebook-icon.png" alt="Facebook" width="24"></a>
                                      </td>
                                    </tr>

                                    <tr>
                                        <td align="center" style="color: #868e96; font-size: 12px; line-height: 18px;">
                                            <p style="margin: 0 0 10px 0;">You received this email because you signed up for an account at EasyEats.</p>
                                            <p style="margin: 0;">EasyEats Inc, 123 Flavor Street, Foodie City, 12345</p>
                                            <p style="margin: 10px 0 0 0;"><a href="#" target="_blank" style="color: #868e96; text-decoration: underline;">Unsubscribe</a></p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
  return htmlTemplate;
};

const createUser = async (req, res) => {
  try {
    const { auth0Id, email } = req.body;

    if (!auth0Id || !email) {
      return res
        .status(400)
        .json({ message: "auth0Id and email are required" });
    }

    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send(); //send the existing user if needed : TODO
    }

    const newUser = await User.create({ auth0Id, email });

    const html = getWelcomeEmailHtml(email.split("@")[0]);

    // Add welcome email job to queue
    console.log("sending notification to the user");
    await emailQueue.add("send-welcome-email", {
      to: email,
      subject: "Welcome to EasyEats! Your Culinary Adventure Begins.",
      html,
    });

    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, address, country, city } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.address = address;
    user.country = country;
    user.city = city;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error updating user" });
  }
};

const getUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });

    if (!currentUser) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ user: currentUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export { createUser, updateUser, getUser };
