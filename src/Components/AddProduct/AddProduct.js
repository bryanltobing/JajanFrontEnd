import React from 'react'
import S3FileUpload from 'react-s3'

const config = {
  bucketName: 'jajanapps',
  dirName: 'product' /* optional */,
  region: 'ap-southeast-1',
  accessKeyId: 'AKIAI37BIPGSZMDOZ4IA',
  secretAccessKey: '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',
}

const AddProduct = (props) => {
  const upload = (e) => {
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {
        console.log(data.location)
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div>
      <h3>Upload an image</h3>
      <input type="file" onChange={upload} />
    </div>
  )
}

export default AddProduct
