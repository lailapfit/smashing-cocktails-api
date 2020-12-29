module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL:
      process.env.DATABASE_URL || 'postgres://sskvnbwvifstqu:efce5156cd8fcd06891369edacbd2b767c15aa7360e27110e8ed6f47ff65faf8@ec2-54-144-109-253.compute-1.amazonaws.com:5432/d4crbe3nlmeg06',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgres://sskvnbwvifstqu:efce5156cd8fcd06891369edacbd2b767c15aa7360e27110e8ed6f47ff65faf8@ec2-54-144-109-253.compute-1.amazonaws.com:5432/d4crbe3nlmeg06'
  }