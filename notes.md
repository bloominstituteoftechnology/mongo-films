Review

- users <  > roles 

- users 1 <--> * user_roles <--> 1 roles

user_roles
- id
- user_id
- role_id

user = {
  username,
  roles: [ref]
}

roles = {
  name,
  users: [ref],
}

normalizing -> normal forms, most systems aim for the third normal form.

Courtesy of John Pelley: _A SQL Server walks into a bar, walks up to 2 tables and says **May I join you?**_

Custom Validators: [docs](http://mongoosejs.com/docs/validation.html)

```js
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
    unique: true
  },
  password: {
    type: String,
    required: true,
    validate: paswordLengthValidator, // step 2
    msg: 'Password must be at least 10 characters long' // step 3
  }
});

function passwordLengthValidator(password) { // step 1
  return password.length >= 10 && !badPasswords.contains(password);
}
```

```js
const TimeSheetSchema = new Schema({
  workday: { 
    type: String, 
    validate: { 
      validator: /^(mon|tues|wednes|thurs|fri)day$/i, 
      msg: 'No work on weekends!' 
    }
});
```

```js
const validateLength = [passwordLengthValidator, 'Password Too short'];

// now we can use it here
const ProfileSchema = new Schema({
  name: { type: String, required: true, validate: validateLength },
});

// and here
const UserSchema = new Schema({
  userName: { type: String, validate: validateLength },
});
```

```js
userSchema = {
  username: String,
  roles: [ // 1324jpoejfl;ejr3o2423w
    { type: ObjectId, ref: 'Role' }
  ]
}

roleSchema = {
  _id,
  name,
  driver: { type: ObjectId, ref: 'User' }
}

User.find().populate('roles');

// /users/:id/roles

// find all the roles where driver = user._id

```

user.find({ name: { $regex: match, $options: 'i' }})

## Virtual

```js
// after defining the UserSchema

UserSchema.virtual('fullName')
  .get(function() {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function(fullName) {
    const [first, last] = fullName.split(' ');
    this.firstName = first;
    this.lastName = last;
  }); 

user.fullName;

user.fullName = 'joe eames';
user.save();
```

## [Middleware](http://mongoosejs.com/docs/middleware.html)

Also called `pre` and `post` hooks or lifecycle hooks. All middleware support both.

They are functions specified at the schema level and useful for adding extra functionality. Useful for things like:

*   cascading updates or deletes.
*   hashing passwords.
*   complex validation.
*   asynchronous operations.

Four types:

*   document.
*   model.
*   aggregate.
*   query.

## Document Middleware

In document middleware `this` refers to the document. Do NOT use arrow functions.

Supported document functions:

*   init.
*   validate.
*   save.
*   remove.

## Query Middleware

Supported _Model_ and _Query_ functions:

*   count.
*   find.
*   findOne.
*   findOneAndUpdate.
*   findOneAndRemove.
*   update.

## Pre Hooks

There are two types:

*   serial
*   parallel.

### Serial

Executed in the order they are defined, when each middleware calls `next`.

```js
userSchema.pre('save', function(next) {
    // encrypt password, don't be like t-mobile
    next();
});

// new in v 5
userSchema.pre('save', async function(next) {
    // encrypt password, don't be like t-mobile
    await encryptPassword();

    next();
});
```

### Paralell

Provides more control.

```js
userSchema.pre('save', function(next, true, done) {
    // encrypt password, don't be like t-mobile
    next();
});
```