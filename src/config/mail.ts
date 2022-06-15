export default {
  host: process.env.MAIL_HOST_DEV,
  port: process.env.MAIL_PORT_DEV,
  auth: {
    user: process.env.MAIL_USER_DEV,
    pass: process.env.MAIL_PASSWORD_DEV,
  },
};
