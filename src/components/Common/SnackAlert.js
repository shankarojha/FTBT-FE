import React, { useState, useEffect } from "react"

import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useSelector } from "react-redux"
import * as commonAction from "store/actions"
import { useDispatch } from "react-redux"

export default function SnackAlert() {
  const dispatch = useDispatch()
  const alert = useSelector(state => state.common.alert)

  const clearAlertMessage = () => {
    dispatch(commonAction.clearSnackAlert())
  }
  toastr.options = {
    positionClass: "toast-top-right",
    timeOut: "5000",
    extendedTimeOut: "1000",
    closeButton: false,
    debug: false,
    progressBar: false,
    preventDuplicates: true,
    newestOnTop: false,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    showDuration: "300",
    hideDuration: "1000",
    onShown: function () {
      clearAlertMessage()
    },
  }

  if (alert.message) {
    switch (alert.type) {
      case "info":
        toastr.info(alert.message, alert.title)
        break
      case "warning":
        toastr.warning(alert.message, alert.title)
        break
      case "success":
        toastr.success(alert.message, alert.title)
        break
      case "error":
        toastr.error(alert.message, alert.title)
        break
      default:
        toastr.error("Something went wrong!!", "Please try Again")
        break
    }
  }

  return null
}
