const jwt = require('jsonwebtoken')


// Validation
const generateToken = (id) => {

  return jwt.sign({id},"aman", {
    expiresIn:'300d'
  })

}

module.exports = generateToken;
