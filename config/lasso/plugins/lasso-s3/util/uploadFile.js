const calculateChecksum = require('./calculateChecksum');
const getS3UrlIfExists = require('./getS3UrlIfExists');
const s3WriteFile = require('./s3WriteFile');

module.exports = async function uploadFile({ s3, bucket, file, contentType, calculateKey }) {
  const key = (calculateKey && calculateKey(file)) || calculateChecksum(file);
  const params = { Bucket: bucket, Key: key };

  console.time(`[Lasso File Exists] ${key}`);
  // Check whether the file already exists in S3
  let url = await getS3UrlIfExists(s3, params);
  console.timeEnd(`[Lasso File Exists] ${key}`);

  if (!url) {
    console.time(`[Lasso File Upload] ${key}`);
    url = await s3WriteFile(s3, {
      ...params,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    });
    console.timeEnd(`[Lasso File Upload] ${key}`);
  }

  return url;
};
