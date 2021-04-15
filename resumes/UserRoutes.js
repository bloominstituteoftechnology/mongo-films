const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const nodemailer = require("nodemailer");
const base64url = require("base64url");
const crypto = require("crypto");

const websiteName = require("../config/keys").site_name;
const secretKey = require("../config/keys").secret_key;
const secret = require("../config/keys").secret;
const stripe = require("stripe")(secretKey);
const User = require("./UserModel.js");
const Resume = require("../resume/ResumeModel");
const EmailConfirmation = require("../email/EmailConfirmationModel.js");
const { changeStatus } = require("../helpers/Stripe");

// GET users/:username
// Route to find if a username is already in use
router.get("/usernamecheck/:username", (req, res) => {
  User.findOne({ username: req.params.username })
    .then(user => {
      res.status(200).json(user.username);
    })
    .catch(err => {
      res.status(400).json({
        errorMessage: "Could not find user with that username.",
        error: err
      });
    });
});

// GET users/emailcheck/:email
// Route to find if an email is already in use
router.get("/emailcheck/:email", (req, res) => {
  User.findOne({ email: req.params.email })
    .then(user => {
      res.status(200).json(user.email);
    })
    .catch(err => {
      res.status(400).json({
        errorMessage: "Could not find user with that email.",
        error: err
      });
    });
});

// GET users/currentuser
// Route to find id, username and email of current user
router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { user } = req;
    user.password = null;
    if (user.membership) {
      const query = Resume.find({ user: user.id });
      query.then(resumes => {
        res.json({ user, resumes });
      });
    } else {
      const query = Resume.findOne({ user: user.id });
      query.then(resume => {
        const resumes = [];
        resumes.push(resume);
        res.status(200).json({ user, resumes });
      });
    }
    // req.user.password = null;
    // res.status(200).json(req.user);
  }
);

// GET users (TEST ROUTE --- WILL REMOVE)
// Should get all the users
router.get("/", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(400).json({ errorMessage: "Get unsuccessful.", error: err });
    });
});

// POST users/register
// Register a new user
// Make sure to send confirmation email
router.post("/register", (req, res) => {
  // Write req.body to userData in this way to avoid any fields other than these 3 (such as the confirmemail one) from being inserted
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  console.log("WE GOT CALLED to make user", userData);
  User.findOne({ email: userData.email })
    .then(user => {
      if (user) {
        res.status(400).json({
          errorMessage:
            "This email is already in use. Please choose the forgot password option to reset your password."
        });
      } else {
        // pseudo random seed to make each hash different
        const random = crypto.randomBytes(20).toString("hex");
        // creates a hash
        const hash = crypto.createHash("sha256");
        // adds user id, secret and the randomly generated string to make a unique hash
        hash.update(userData.username + secret + random);

        // This creates a new email confirmation waiting to be fulfilled. Once it is accessed successfully it should be deleted and the user activated.
        const newEmailConfirmation = new EmailConfirmation({
          hash: base64url(hash.digest("hex")) + "$",
          userData: userData
        });
        newEmailConfirmation
          .save()
          .then(emailconfirmation => {
            // This is if ethereal doesn't work or you don't want to test with real emails
            console.log(
              "Link to activate account:\n",
              `${req.get("host")}${req.baseUrl}/confirmemail/${
                newEmailConfirmation.hash
              }`
            );
            // This sends a test email that can set user.active to true, thus allowing them to use the sites functions.
            nodemailer.createTestAccount((err, account) => {
              if (err) {
                console.log({
                  errorMessage:
                    "Error creating/logging into an account for nodemailer.",
                  error: err
                });
              }
              // create reusable transporter object using the default SMTP transport
              let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: account.user, // generated ethereal user
                  pass: account.pass // generated ethereal password
                }
              });
              // how to get link we need to go to: ${req.get("host")}/confirmemail/${newEmailConfirmation.hash}
              let mailOptions = {
                from: `"Fredegar Fu 👻" <signup@${websiteName}>`,
                to: `${userData.email}`,
                subject: `Confirm your registration to ${websiteName}!`,
                text: `Thank you for signing up! Please go to this address to confirm your registration: ${
                  req.body.path
                }?/users/confirmemail/${newEmailConfirmation.hash}`,
                html: `Thank you for signing up! Please click this <a href=${
                  req.body.path
                }?/users/confirmemail/${newEmailConfirmation.hash}>link</a>.`
              };

              transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                  console.log({
                    errorMessage: "Could not send email.",
                    error: err
                  });
                  return res.status(400).json({
                    errorMessage: "Could not send email.",
                    error: err
                  });
                }
                console.log("Message sent: %s", info.messageId);
                console.log(
                  "Preview URL: %s",
                  nodemailer.getTestMessageUrl(info)
                );
                res.status(200).json({
                  message: "Email confirmation saved and email sent."
                });
              });
            });
          })
          .catch(err => {
            console.log({
              errorMessage: "Could not save email confirmation.",
              error: err
            });
            res.status(400).json({
              errorMessage: "Could not save email confirmation.",
              error: err
            });
          });
        // If you put a response here the time for response to a register request will be 100-200ms
        // instead of 2000-4000, but they won't get error messages from the backend.
        // res.status(200).json(userData.email);
      }
    })
    .catch(err => {
      return res.status(400).json({
        errorMessage:
          "There was an error in account creation, please try again.",
        error: err
      });
    });
});

// POST users/login
// Login with a registered user
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ errorMessage: "Invalid credentials." });
      }

      if (user.membership) {
        stripe.subscriptions.retrieve(user.subscription, (err, sub) => {
          if (err) console.log(err);
          if (
            sub.status === "canceled" ||
            sub.status === "past_due" ||
            sub.status === "unpaid"
          ) {
            stripe.subscriptions.del(user.subscriptions, (err, success) => {
              if (err) console.log(err);
              else console.log(success);
            });
            if (changeStatus(email, { subscription: null, membership: false }))
              console.log("Success");
            else console.log("Error");
          }
        });
      }

      user
        .checkPassword(password)
        .then(verified => {
          if (verified) {
            const payload = {
              id: user._id,
              email: user.email,
              password: user.password
            };
            const token = jwt.sign(payload, secret, {
              expiresIn: "7d"
            });
            user.password = null;
            if (user.membership) {
              const query = Resume.find({ user: user.id });
              query.then(resumes => {
                res.json({ token, user, resumes });
              });
            } else {
              const query = Resume.findOne({ user: user.id });
              query.then(resume => {
                const resumes = [];
                resumes.push(resume);
                res.status(200).json({ token, user, resumes });
              });
            }
          } else
            return res
              .status(401)
              .json({ errorMessage: "Invalid credentials." });
        })
        .catch(err => {
          res
            .status(400)
            .json({ errorMessage: "Could not log in.", error: err });
        });
    })
    .catch(err => {
      res.status(400).json({ errorMessage: "Could not log in.", error: err });
    });
});

// DELETE users/:id
// Make sure to send confirmation email for deleting
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;
    if (id === req.user.id) {
      User.findByIdAndRemove(id)
        .then(user => {
          res.status(200).send({ message: "User successfully deleted." });
        })
        .catch(err => {
          res.status(400).json({
            errorMessage: "Could not find and delete user.",
            error: err
          });
        });
    } else {
      res
        .status(400)
        .json({ errorMessage: "You do not have access to this user!" });
    }
  }
);

// PUT users/info/:id
// Update user information
router.put(
  "/info/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("REQ.BODY:", req.body);
    const id = req.params.id;
    if (id === req.user.id) {
      delete req.body.username;
      // This is to allow editing the email if the password requirements are met
      // and the inputted email is different from the user email stored in the database
      const email = req.body.email;
      delete req.body.email;
      delete req.body.active;
      // Delete this to ensure the password isn't changed manually
      delete req.body.password;

      const changes = req.body;
      const options = {
        new: true
        // runValidators: true
      };

      User.findByIdAndUpdate(id, changes, options)
        .then(user => {
          if (!user) {
            return res
              .status(400)
              .json({ errorMessage: "No user with that id could be found." });
          } else {
            if (req.body.oldpassword) {
              user
                .checkPassword(req.body.oldpassword)
                .then(verified => {
                  if (verified) {
                    // If the password was changed then return a new token as well
                    // If the user edited their email, then this if statement sends an email confirmation to their new email to make sure
                    if (email && email !== req.user.email) {
                      // ======= Comment out the block below to disable prechecking email validity
                      User.findOne({ email: email })
                        .then(emailInUse => {
                          if (emailInUse) {
                            console.log({
                              errorMessage: "This email is already in use."
                            });
                          } else {
                            // ==================
                            // pseudo random seed to make each hash different
                            const random = crypto
                              .randomBytes(20)
                              .toString("hex");
                            // creates a hash
                            const hash = crypto.createHash("sha256");
                            // adds user id, secret and the randomly generated string to make a unique hash
                            hash.update(user.id + secret + random);

                            // This creates a new email confirmation waiting to be fulfilled. Once it is accessed successfully it should be deleted and the user activated.
                            const newEmailConfirmation = new EmailConfirmation({
                              hash: base64url(hash.digest("hex")) + "!",
                              user: user._id,
                              newemail: email
                            });
                            newEmailConfirmation
                              .save()
                              .then(emailconfirmation => {
                                // This is if ethereal doesn't work or you don't want to test with real emails
                                console.log(
                                  "Link to change email:\n",
                                  `${req.get("host")}${
                                    req.baseUrl
                                  }/changeemail/${newEmailConfirmation.hash}`
                                );
                                // This sends a test email that can set user.active to true, thus allowing them to use the sites functions.
                                nodemailer.createTestAccount((err, account) => {
                                  // create reusable transporter object using the default SMTP transport
                                  let transporter = nodemailer.createTransport({
                                    host: "smtp.ethereal.email",
                                    port: 587,
                                    secure: false, // true for 465, false for other ports
                                    auth: {
                                      user: account.user, // generated ethereal user
                                      pass: account.pass // generated ethereal password
                                    }
                                  });
                                  let mailOptions = {
                                    from: `"Fredegar Fu 👻" <changemail@${websiteName}>`,
                                    to: `${req.user.email}`,
                                    subject: `Confirm your account email change for ${websiteName}!`,
                                    text: `Please go to this link to make this your new account email address: ${
                                      req.body.path
                                    }?/users/changeemail/${
                                      newEmailConfirmation.hash
                                    }`,
                                    html: `Please click this <a href=${
                                      req.body.path
                                    }?/users/changeemail/${
                                      newEmailConfirmation.hash
                                    }>link</a> to make this your new account email address..`
                                  };

                                  transporter.sendMail(
                                    mailOptions,
                                    (err, info) => {
                                      if (err) {
                                        console.log(err);
                                      } else {
                                        console.log(
                                          "Message sent: %s",
                                          info.messageId
                                        );
                                        console.log(
                                          "Preview URL: %s",
                                          nodemailer.getTestMessageUrl(info)
                                        );
                                      }
                                    }
                                  );
                                });
                              })
                              .catch(err => {
                                console.log({
                                  errorMessage:
                                    "Could not save email confirmation.",
                                  error: err
                                });
                              });
                            // ======= Comment out the block below to disable prechecking email validity
                          }
                        })
                        .catch(err => {
                          console.log({
                            errorMessage:
                              "Unable to check if the requested email is in use.",
                            error: err
                          });
                        });
                      // ======
                    }
                    if (req.body.newpassword && req.body.newpassword != "") {
                      user.password = req.body.newpassword;
                      user.save(function(err) {
                        if (err) {
                          user.password = null;
                          res.status(200).json({
                            user,
                            errorMessage: "Could not save new password.",
                            error: err
                          });
                        } else {
                          const payload = {
                            id: user._id,
                            email: user.email,
                            password: user.password
                          };
                          const token = jwt.sign(payload, secret, {
                            expiresIn: "7d"
                          });
                          user.password = null;
                          res.json({ token, user });
                        }
                      });
                    } else {
                      user.password = null;
                      res.status(200).json({ user });
                    }
                  } else {
                    user.password = null;
                    res.status(200).json({
                      errorMessage:
                        "The password you entered was invalid. To update your email or password please enter your current password.",
                      user
                    });
                  }
                })
                .catch(err => {
                  user.password = null;
                  res.status(200).json({
                    errorMessage: "Unable to verify password.",
                    error: err,
                    user
                  });
                });
            } else {
              user.password = null;
              res.status(200).json({ user });
            }
          }
        })
        .catch(err => {
          res
            .status(400)
            .json({ errorMessage: "Could not update.", error: err });
        });
    } else {
      res
        .status(400)
        .json({ errorMessage: "You do not have access to this user!" });
    }
  }
);

// PUT users/email/:id
// Update user email
router.get("/changeemail/:hash", (req, res) => {
  const hash = req.params.hash;
  const options = {
    new: true
  };

  EmailConfirmation.findOne({ hash: hash })
    .then(emailconfirmation => {
      if (emailconfirmation && emailconfirmation.newemail) {
        User.findOneAndUpdate(
          { _id: emailconfirmation.user },
          { email: emailconfirmation.newemail, active: true },
          options
        )
          .then(user => {
            if (user !== null) {
              const payload = {
                id: user._id,
                email: user.email,
                password: user.password
              };
              const token = jwt.sign(payload, secret, {
                expiresIn: "7d"
              });
              res.status(200).json({
                token,
                message: "You have successfully changed your email address!",
                email: emailconfirmation.oldemail
              });
            } else
              res.status(200).json({
                errorMessage:
                  "Your email could not be changed for some reason. Please try again."
              });
          })
          .catch(err => {
            res.status(200).json({
              errorMessage:
                "Your email could not be changed for some reason. Please try again.",
              error: err
            });
          });
      } else
        res.status(200).json({
          errorMessage:
            "Your email could not be changed for some reason. Please try again."
        });
    })
    .catch(err => {
      res.status(200).json({
        errorMessage:
          "Email confirmation could not be found. Please try again.",
        error: err
      });
    });
});

// PUT users/confirmemail/:hash
// Confirm user signup with an email
router.get("/confirmemail/:hash", (req, res) => {
  const hash = req.params.hash;
  EmailConfirmation.findOne({ hash: hash })
    .then(emailconfirmation => {
      if (emailconfirmation) {
        // The password stored in the emailconfirmation is encrypted so it has to be decrypted here
        const decipher = crypto.createDecipher("aes256", secret);
        let decrypted = decipher.update(
          emailconfirmation.userData.password,
          "hex",
          "utf8"
        );
        decrypted += decipher.final("utf8");
        // Now the emailconfirmation password is set to the decrypted version so a user can be made
        emailconfirmation.userData.password = decrypted;

        const newUser = new User(emailconfirmation.userData);
        newUser
          .save()
          .then(user => {
            const payload = {
              id: user._id,
              email: user.email,
              password: user.password
            };
            const token = jwt.sign(payload, secret, {
              expiresIn: "7d"
            });
            user.password = null;
            res.status(201).json({ token, user });
          })
          .catch(err => {
            res.status(200).json({
              errorMessage:
                "There was an error in account creation, please try again.",
              error: err
            });
          });
      } else
        res.status(200).json({
          errorMessage:
            "Your account has already been activated or does not exist."
        });
    })
    .catch(err =>
      res.status(200).json({
        errorMessage: "Could not find email confirmation in database.",
        error: err
      })
    );
});

// PUT users/forgotpassword/:id
// Create a temporary password if the user forgot theirs
router.put("/forgotpassword", (req, res) => {
  const email = req.body.email;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ errorMessage: "Invalid credentials." });
      }

      // pseudo random seed to make each hash different
      const random = crypto.randomBytes(20).toString("hex");
      // creates a hash
      const hash = crypto.createHash("sha256");
      // adds user id, secret and the randomly generated string to make a unique hash
      hash.update(user.id + secret + random);

      // This creates a new email confirmation waiting to be fulfilled. Once it is accessed successfully it should be deleted and the user activated.
      const newEmailConfirmation = new EmailConfirmation({
        hash: base64url(hash.digest("hex")) + "!",
        user: user._id
      });
      newEmailConfirmation
        .save()
        .then(emailconfirmation => {
          // This is if ethereal doesn't work or you don't want to test with real emails
          console.log(
            "Link to reset password:\n",
            `${req.get("host")}${req.baseUrl}/resetpassword/${
              newEmailConfirmation.hash
            }`
          );
          // This sends a test email that can set user.active to true, thus allowing them to use the sites functions.
          nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
              }
            });
            let mailOptions = {
              from: `"Fredegar Fu 👻" <forgotpassword@${websiteName}>`,
              to: `${user.email}`,
              subject: `Confirm your password change for ${websiteName}!`,
              text: `Please go to this link to reset your password: ${
                req.body.path
              }?/users/resetpassword/${newEmailConfirmation.hash}`,
              html: `Please click this <a href=${
                req.body.path
              }?/users/resetpassword/${newEmailConfirmation.hash}
              }>link</a> to reset your password.`
            };

            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                return res
                  .status(400)
                  .json({ errorMessage: "Could not send email.", error: err });
              }
              console.log("Message sent: %s", info.messageId);
              console.log(
                "Preview URL: %s",
                nodemailer.getTestMessageUrl(info)
              );
              return res
                .status(200)
                .json({ message: "Email confirmation saved and email sent." });
            });
          });
        })
        .catch(err => {
          console.log({
            errorMessage: "Could not save email confirmation.",
            error: err
          });
        });
      // Having this here means the response time is 175ms rather than 2000-3000 as it is
      // if the response has to wait to be sent until the res in transporter.sendMail above!
      res.status(200).json(user.email);
    })
    .catch(err => {
      res.status(400).json({
        errorMessage: "Could not change password. Please try again.",
        error: err
      });
    });
});

// PUT users/info/:id
// Update user information
router.get("/resetpassword/:hash", (req, res) => {
  EmailConfirmation.findOne({ hash: req.params.hash })
    .then(emailconfirmation => {
      if (emailconfirmation) {
        User.findById(emailconfirmation.user)
          .then(user => {
            if (user !== null) {
              // pseudo random seed to make each hash different
              const random = crypto.randomBytes(20).toString("hex");
              // creates a hash
              const hash = crypto.createHash("sha256");
              // adds user id, secret and the randomly generated string to make a unique hash
              hash.update(req.params.hash + secret + random);
              const newPassword = base64url(hash.digest("hex")) + "!";
              user.password = newPassword;
              user.active = true;
              user.save(function(err) {
                if (err) {
                  res.status(200).json({
                    errorMessage:
                      "There was an error setting a temporary password. Please try again.",
                    error: err
                  });
                } else res.status(200).json({ message: "Temporary password set successfully!", password: newPassword });
              });
            } else
              res.status(200).json({
                errorMessage:
                  "You already changed your password or you took to long to confirm your password change. Please try again and click the emailed link within 30 minutes."
              });
          })
          .catch(err => {
            res.status(200).json({
              errorMessage:
                "You already changed your password or you took to long to confirm your password change. Please try again and click the emailed link within 30 minutes.",
              error: err
            });
          });
      } else
        res.status(200).json({
          errorMessage:
            "You already changed your password or you took to long to confirm your password change. Please try again and click the emailed link within 30 minutes."
        });
    })
    .catch(err => {
      res.status(200).json({
        errorMessage: "Your password could not be reset for some reason.",
        error: err
      });
    });
});

module.exports = router;
