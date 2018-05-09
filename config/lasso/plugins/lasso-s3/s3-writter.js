const AWS = require('aws-sdk');
const mime = require('mime');

const createBucketIfNotExist = require('./util/createBucketIfNotExist');
const readBundle = require('./util/readBundle');
const readResource = require('./util/readResource');
const uploadFile = require('./util/uploadFile');


module.exports = (pluginConfig) => {
  let {
    awsConfig,
    s3,
    s3Config,
    bucket,
    calculateKey,
    readTimeout,
  } = pluginConfig || {};

  let bucketConfig;

  if (typeof bucket === 'object') {
    bucketConfig = bucket;
  } else {
    bucketConfig = { Bucket: 'marko-test-jesus' };
  }
  bucket = bucketConfig.Bucket;

  if (awsConfig) AWS.config.update(awsConfig);
  s3 = s3 || new AWS.S3(s3Config);

  return {
    async init(lassoContext) {
      await createBucketIfNotExist(s3, bucketConfig);
    },
    /**
     * This will be called for JS and CSS bundles
     */
    async writeBundle (reader, lassoContext, callback) {
      try {
        const bundle = lassoContext.bundle;
        console.time(`[Lasso Bundle] ${bundle.name}`);
        const contentType = mime.getType(bundle.contentType);
        console.time(`[Lasso Bundle Read] ${bundle.name}`);
        const file = await readBundle(reader, bundle, readTimeout);
        console.timeEnd(`[Lasso Bundle Read] ${bundle.name}`);
        console.time(`[Lasso Bundle Upload] ${bundle.name}`);
        const url = await uploadFile({ s3, bucket, file, contentType, calculateKey });
        console.timeEnd(`[Lasso Bundle Upload] ${bundle.name}`);
        bundle.url = url;
        console.timeEnd(`[Lasso Bundle] ${bundle.name}`);
        if (callback) return callback();
      } catch (err) {
        if (callback) return callback(err);
        throw err;
      }
    },
    /**
     * This will be called for front-end assets such as images, fonts, etc.
     */
    async writeResource (reader, lassoContext, callback) {
      try {
        // console.time(`[Lasso Resource] ${bundle.name}`);
        const path = lassoContext.path;
        const contentType = mime.getType(path);
        // console.time(`[Lasso Resource Read] ${bundle.name}`);
        const file = await readResource(reader, path, readTimeout);
        // console.time(`[Lasso Resource Read] ${bundle.name}`);
        // console.time(`[Lasso Resource Upload] ${bundle.name}`);
        const url = await uploadFile({ s3, bucket, file, contentType, calculateKey });
        // console.timeEnd(`[Lasso Resource Upload] ${bundle.name}`);
        // console.timeEnd(`[Lasso Resource] ${bundle.name}`);
        if (callback) return callback(null, { url });
        return { url };
      } catch (err) {
        if (callback) return callback(err);
        throw err;
      }
    }
  };
};
