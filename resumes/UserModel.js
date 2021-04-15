const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const ObjectId = mongoose.Schema.Types.ObjectId;
// const {
//   checkPasswordStrength,
//   validateEmail,
//   validatePhone,
//   validateLinkedIn,
//   validateGithub
// } = require("../helpers/Validation");

const User = new mongoose.Schema(
  {
    // This is to see if the user has confirmed their email
    active: {
      type: Boolean,
      required: true,
      default: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
      // validate: [checkPasswordStrength, "Password Too Weak"]
    },
    email: {
      type: String,
      required: true,
      unique: true
      // validate: [validateEmail, "Invalid Email"]
    },
    name: {
      firstname: {
        type: String,
        maxlength: 20,
        default: ""
      },
      middlename: {
        type: String,
        maxlength: 20,
        default: ""
      },
      lastname: {
        type: String,
        maxlength: 20,
        default: ""
      }
    },
    location: String,
    title: [
      {
        id: ObjectId,
        content: {
          type: String,
          default: ""
        }
      }
    ],
    phonenumber: {
      type: String,
      default: ""
      // validate: [validatePhone, "Invalid Phone Number"]
    },
    links: {
      linkedin: {
        type: String,
        default: ""
        // validate: [validateLinkedIn, "Invalid Linkedin"]
      },
      github: {
        type: String,
        default: ""
        // validate: [validateGithub, "Invalid GitHub"]
      },
      portfolio: {
        type: String,
        default: ""
      }
    },
    sections: {
      summary: [
        {
          id: ObjectId,
          content: {
            type: String,
            default: ""
          }
        }
      ],
      experience: [
        {
          id: ObjectId,
          title: {
            type: String,
            default: "title"
          },
          company: {
            type: String,
            default: ""
          },
          location: {
            type: String,
            default: ""
          },
          from: Date,
          to: Date,
          description: {
            type: String,
            default: ""
          }
        }
      ],
      education: [
        {
          id: ObjectId,
          school: {
            type: String,
            default: "school"
          },
          degree: {
            type: String,
            default: ""
          },
          fieldofstudy: {
            type: String,
            default: ""
          },
          from: Date,
          to: Date
        }
      ],
      skills: [
        {
          id: ObjectId,
          groupname: {
            type: String,
            default: ""
          },
          content: {
            type: String,
            default: ""
          }
        }
      ]
    },
    membership: {
      type: Boolean,
      default: false
    },
    subscription: String,
    resumes: [
      {
        type: ObjectId,
        ref: "Resume"
      }
    ]
  },
  { timestamps: true }
);

// User.pre("save", function(next) {
//   if (!this.isModified("password")) return next();
//   bcrypt.hash(this.password, 11, (err, hash) => {
//     if (err) return next(err);
//     this.password = hash;
//     next();
//   });
// });

// User.methods.checkPassword = function(passwordGuess) {
//   return bcrypt.compare(passwordGuess, this.password);
// };

module.exports = mongoose.model("User", User);
