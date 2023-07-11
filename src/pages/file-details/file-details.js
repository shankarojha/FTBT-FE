import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { ftbtgetFileDetails } from "store/actions"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import { Row, Col } from "reactstrap"

//Pie Chart
import { ChartTitleOptions } from "chart.js"
import { Pie } from "react-chartjs-2"

const FileDetails = ({ props }) => {
  //quotationid
  const { quotationId } = useParams()

  //backend data
  const ftbtFileDetails = useSelector(state => state.projects)
  const dispatch = useDispatch()
  useEffect(() => {
    //console.log(quotationId)
    dispatch(ftbtgetFileDetails(quotationId))
  }, [])
  //console.log(ftbtFileDetails)

  //Pie chart
  const pieChartData = []
  const [pieData, setPieData] = useState()
  const [filesPresent, setFilesPresent] = useState(false)

  useEffect(() => {
    if (ftbtFileDetails.projects.length > 0) {
      setFilesPresent(true)
      let cCount = 0
      let pCount = 0
      for (let i of ftbtFileDetails.projects) {
        if (i.status === "Completed") {
          cCount++
        } else if (i.status === "In Progress") {
          pCount++
        }
      }
      pieChartData.push(cCount, pCount)
      setPieData({
        datasets: [
          {
            data: pieChartData,
            backgroundColor: ["red", "blue"],
          },
        ],
        labels: ["Completed", "In Progress"],
      })
    }else{
      setFilesPresent(false)
    }
  }, [ftbtFileDetails.projects])

  //Table
  const { SearchBar, ClearSearchButton } = Search
  const columns = [
    {
      dataField: "fileId",
      text: "ID",
      formatter: (cell, row) => {
        return row.fileId ? row.fileId : null
      },
    },
    {
      dataField: "sourceLanguage",
      text: "Source Language",
      formatter: (cell, row) => {
        return row.sourceLanguage ? row.sourceLanguage : null
      },
    },
    {
      dataField: "targetLanguage",
      text: "Target Language",
      formatter: (cell, row) => {
        return row.targetLanguage ? row.targetLanguage : null
      },
    },
    {
      dataField: "processName",
      text: "Process Name",
      formatter: (cell, row) => {
        return row.processName ? row.processName : null
      },
    },
    {
      dataField: "status",
      text: "Status",
      formatter: (cell, row) => {
        return row.status ? row.status : null
      },
    },
    {
      dataField: "createdOn",
      text: "Created On",
      formatter: (cell, row) => {
        return row.createdOn ? row.createdOn : null
      },
    },
  ]

  return (
    <div className="page-content">
      <Row>
        <Col lg="12">
          <div className="">
            <div className="col-md-6 offset-md-3 mb-3">
              {filesPresent && <Pie data={pieData}></Pie>}
            </div>
            <PaginationProvider pagination={paginationFactory()}>
              {({ paginationProps, paginationTableProps }) => (
                <ToolkitProvider
                  keyField="_id"
                  data={
                    ftbtFileDetails.filteredData &&
                    ftbtFileDetails.filteredData.length >= 1
                      ? ftbtFileDetails.filteredData
                      : ftbtFileDetails.projects
                  }
                  columns={columns}
                  search
                >
                  {props => (
                    <div>
                      <BootstrapTable
                        responsive
                        {...props.baseProps}
                        {...paginationTableProps}
                      />
                    </div>
                  )}
                </ToolkitProvider>
              )}
            </PaginationProvider>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default FileDetails
