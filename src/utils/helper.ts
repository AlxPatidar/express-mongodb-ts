import _ from "lodash"
import Jwt from "jsonwebtoken"

const randomString = (length) => {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

const createJwtAuthToken = user => {
  const contents = {
    _id: _.get(user, "_id", ""),
    firstName: _.get(user, "firstName", ""),
    lastName: _.get(user, "lastName", ""),
    createdAt: Date.now()
  }
  const options = {
    key: "JWT_TOKEN_KEY",
    expires: "1m",
    verifyOptions: { algorithms: ["HS256"] }
  }

  const token = Jwt.sign(contents, options.key, {
    algorithm: options.verifyOptions.algorithms[0],
    expiresIn: options.expires
  })

  return token
}

const verifyToken = token => {
  try {
    const decodedToken = Jwt.verify(token, "JWT_TOKEN_KEY")
    console.log({ decodedToken })
    return decodedToken
  } catch(error) {
    console.log({error})
    return false
  }
}
const helper = { randomString, isEmpty, createJwtAuthToken, verifyToken }
export default helper