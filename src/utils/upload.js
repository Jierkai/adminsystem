import COS from 'cos-js-sdk-v5'

export default function(params, progress) {
  return new Promise((resolve, reject) => {
    const cos = new COS({
      SecretId: 'AKIDzIYgcO2a2M2iU7XmqhZO7f1mMgjhzELD',
      SecretKey: 'hJ4EKGyRhlhcJkwtb7WgJgy2rUt4ziFX'
    })
    cos.putObject({
      Bucket: 'image-1304109489',
      Region: 'ap-beijing',
      Key: params.file.name,
      StorageClass: 'STANDARD',
      Body: params.file,
      onProgress: progress
    }, (err, data) => {
      if (err) return reject(err)
      if (data.statusCode === 200) {
        return resolve(data)
      }
    })
  })
}

