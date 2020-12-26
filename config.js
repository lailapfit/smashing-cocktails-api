module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL:
      process.env.DATABASE_URL || 'postgres://noprdastxecfkk:904e8a14ff25714e11351073c3c6014f6472fdc02f71749eb0d3367e4d7ba5a9@ec2-54-211-210-149.compute-1.amazonaws.com:5432/dbehsg9sgqo3s8',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgres://noprdastxecfkk:904e8a14ff25714e11351073c3c6014f6472fdc02f71749eb0d3367e4d7ba5a9@ec2-54-211-210-149.compute-1.amazonaws.com:5432/dbehsg9sgqo3s8'
  }