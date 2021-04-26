const validation = {
  email: {
    presence: {
      message: "^Please enter an email address"
    },
    email: {
      message: "^Please enter a valid email address"
    }
  },

  password: {
    presence: {
      message: "^Please enter a password"
    },
    length: {
      minimum: 6,
      message: "^Your password must be at least 6 characters"
    }
  },

  firstName: {
    presence: {
      message: "^Please enter a first name"
    },
    length: {
      minimum: 1,
      message: "^Please enter a first name"
    }
  },

  lastName: {
    presence: {
      message: "^Please enter a last name"
    },
    length: {
      minimum: 1,
      message: "^Please enter a last name"
    }
  }
};

export default validation;
