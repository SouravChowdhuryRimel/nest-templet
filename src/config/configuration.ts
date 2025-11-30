export default () => ({
  port: parseInt(process.env.PORT as string, 10),
  node_env: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expired_in: process.env.JWT_EXPIRED_IN || '5m',
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  smtp_auth_user: process.env.SMTP_AUTH_USER,
  smtp_auth_pass: process.env.SMTP_AUTH_PASS,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  client_url: process.env.ClIENT_URL,
  stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
  redis_connection_url: process.env.REDIS_CONNECTION_URL,
  database: {
    url: process.env.DATABASE_URL
  }
});
