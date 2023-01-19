import React from "react"
import PropTypes from "prop-types"
import { Card, CardBody, CardTitle, Table } from "reactstrap"
import { Link } from "react-router-dom"
import { map } from "lodash"

const AttachedFiles = ({ files }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Attached Files</CardTitle>
        <div className="table-responsive">
          <Table className="table table-nowrap table-centered table-hover mb-0">
            <tbody>
              {map(files, (file, i) => (
                <tr key={"_file_" + i}>
                  <td style={{ width: "45px" }}>
                    <div className="avatar-sm">
                      <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-24">
                        <i className="bx bxs-file-doc" />
                      </span>
                    </div>
                  </td>
                  <td style={{ width: "100px" }}>
                    <h5 className="font-size-14 mb-1">
                      <Link to="#" className="text-dark">
                        {file.fileName}
                      </Link>
                    </h5>
                    <small>Path: {file.filePath}</small>
                  </td>
                  <td>
                    <h5 className="font-size-14 mb-1">Source</h5>
                    <small> {file.sourceLanguage}</small>
                  </td>
                  <td>
                    <h5 className="font-size-14 mb-1">Target</h5>
                    <small> {file.targetLanguage}</small>
                  </td>
                  <td>
                    <h5 className="font-size-14 mb-1">Word Count</h5>
                    <small>{file.wordCount}</small>
                  </td>
                  <td>
                    <div className="text-center">
                      <Link
                        to={{ pathname: file.filePath }}
                        target="_blank"
                        className="text-dark"
                      >
                        <i className="bx bx-download h3 m-0" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  )
}

AttachedFiles.propTypes = {
  files: PropTypes.array,
}

export default AttachedFiles
