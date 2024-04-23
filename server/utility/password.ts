import jwt from 'jsonwebtoken'

const APP_SECRET = 'app_secret'

export const GetToken = ({ id, email }) => {
  return jwt.sign(
    {
      id,
      email,
    },
    APP_SECRET,
    {
      expiresIn: '30d',
    },
  )
}

export const VerifyToken = async (token: string) => {
  try {
    if (token !== '') {
      const payload = await jwt.verify(token.split(' ')[1], APP_SECRET)
      return payload
    }
    return false
  } catch (error) {
    console.error(error)
    return false
  }
}
