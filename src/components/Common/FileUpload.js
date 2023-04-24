import React from "react"
import PropTypes from "prop-types"
import { Card, Col, Row } from "reactstrap"
import { Link } from "react-router-dom"
import Dropzone from "react-dropzone"

function FileUpload(props) {
  const {
    uploadFiles,
    removeSelectedFiles,
    selectedFiles,
    fileType,
    dropFilesText,
    multiple,
  } = props
  return (
    <React.Fragment>
      <Dropzone
        multiple={multiple}
        onDrop={acceptedFiles => {
          uploadFiles(acceptedFiles)
        }}
        //accept={fileType}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone">
            <div className="dz-message needsclick" {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="dz-message needsclick">
                <div className="mb-3">
                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                </div>
                <h4>Drop Files Here</h4>
              </div>
            </div>
          </div>
        )}
      </Dropzone>
      <div className="dropzone-previews mt-3" id="file-previews">
        {selectedFiles.map((file, index) => {
          return (
            <Card
              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
              key={index + "-file"}
            >
              <div className="p-2">
                <Row className="align-items-center" style={{ display: "flex" }}>
                  <Col className="col-auto">
                    <img
                      data-dz-thumbnail=""
                      height="80"
                      className="avatar-sm rounded bg-light"
                      alt={file.name}
                      src={file.preview}
                    />
                  </Col>
                  <Col>
                    <Link
                      to={file.preview}
                      className="text-muted font-weight-bold"
                    >
                      {file.name}
                    </Link>
                    {file && file.formattedSize && (
                      <p className="mb-0">
                        <strong>{file.formattedSize}</strong>
                      </p>
                    )}
                  </Col>
                  <Col style={{ justifySelf: "flex-end" }}>
                    <i
                      onClick={() => {
                        removeSelectedFiles(file)
                      }}
                      className="mdi mdi-close-circle font-size-20 align-middle mr-2"
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          )
        })}
      </div>
    </React.Fragment>
  )
}

FileUpload.propTypes = {
  uploadFiles: PropTypes.func,
  removeSelectedFiles: PropTypes.func,
  selectedFiles: PropTypes.array,
  fileType: PropTypes.array,
  dropFilesText: PropTypes.string,
  multiple: PropTypes.bool,
}

FileUpload.defaultProps = {
  selectedFiles: [],
  //fileType: ["image/png", "image/jpeg", "image/jpg"],
  dropFilesText: "",
  multiple: true,
}

export default FileUpload
