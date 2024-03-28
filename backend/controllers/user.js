const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel, validateUser, serializeUser } = require("../models/user");
const { encrypt, decrypt } = require("../utils/confirmation");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

exports.signup = async (req, res, next) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }
    const { error: validationError } = validateUser(req.body);
    if (validationError) {
      return res.status(400).send(validationError.details[0].message);
    }

    const { firstName, lastName, username, email, password } = req.body;
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      return res.status(400).send("User already exists. Please login.");
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      firstName,
      lastName,
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Send the email verification link
    return sendEmail({ email, username, res });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res) => {
  try {
    // Get user data
    const { emailOrUsername, password } = req.body;

    // Validate user data
    if (!(emailOrUsername && password)) {
      return res.status(400).send("All data is required");
    }

    // A regex expression to test if the given value is an email or username
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const data = regexEmail.test(emailOrUsername)
      ? {
          email: emailOrUsername,
        }
      : {
          username: emailOrUsername,
        };

    const user = await UserModel.findOne(data);

    if (!user) {
      return res.status(400).send("Invalid Credentials. Please try again.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send("Invalid Credentials. Please try again.");
    }

    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(200).json(serializeUser(user));
  } catch (err) {
    console.error(err);
    return res.status(400).send(err.message);
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    // Get the confirmation token
    const { confirmationToken } = req.params;

    // Decrypt the username
    const username = decrypt(confirmationToken);

    // Check if there is anyone with that username
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.status(409).send("User Not Found");
    }

    // If there is anyone, mark them as confirmed account
    user.isEmailVerified = true;
    await user.save();

    const token = jwt.sign(
      { userID: user._id, email: user.email },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    delete user.password;
    user.token = token;

    console.log({ user });

    // Return the created user data
    res.status(201).json({
      message: "User verified successfully",
      data: serializeUser(user),
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
};

const {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
  GMAIL_EMAIL,
} = process.env;

const createTransporter = async () => {
  const oauth2Client = new google.auth.OAuth2({
    clientId: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    redirectUri: "https://developers.google.com/oauthplayground",
  });

  oauth2Client.setCredentials({
    refresh_token: OAUTH_REFRESH_TOKEN,
  });

  /* const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  }); */

  // const { token: accessToken, res } = await oauth2Client.getAccessToken();

  const Transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: GMAIL_EMAIL,
      accessToken: process.env.OAUTH_ACCESS_TOKEN,
      clientId: OAUTH_CLIENT_ID,
      clientSecret: OAUTH_CLIENT_SECRET,
      refreshToken: OAUTH_REFRESH_TOKEN,
    },
  });

  return Transport;
};

const sendEmail = async ({ email, username, res }) => {
  // Create a unique confirmation token
  const confirmationToken = encrypt(username);

  const defaultVerifURL = `http://localhost:${
    process.env.FRONT_PORT || 5000
  }/verify-account`;

  const verificationURL =
    process.env.VERIFY_ACCOUNT_FRONT_URL || defaultVerifURL;

  // Initialize the Nodemailer with your Gmail credentials
  /* const Transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  }); */
  const Transport = await createTransporter();

  // Configure the email options
  const mailOptions = {
    from: "Educative Fullstack NodeJS Course",
    to: email,
    subject: "Email Confirmation",
    html: `Press the following link to verify your email: <a href=${verificationURL}/${confirmationToken}>Verification Link</a>`,
  };

  // Send the email
  Transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).json({
        message: "Account created successfully, please verify your email.",
      });
    }
  });
};
