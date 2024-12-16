const DateRangeZod = {
  refineData: ({
    dateStartName,
    dateEndName,
  }: {
    dateStartName: string
    dateEndName: string
  }) => {
    return {
      dateStartFunction: (data: { [x: string]: string | any }) => {
        if (data[dateStartName] != "") {
          if (data[dateEndName] == "") return false
        }
        return true
      },
      dateStartDestinty: {
        message: "La fecha fin debe ser llenada.",
        path: [dateEndName],
      },
      dateEndFunction: (data: { [x: string]: string | any }) => {
        if (data[dateEndName] != "") {
          if (data[dateStartName] == "") return false
        }
        return true
      },
      dateEndDestinty: {
        message: "La fecha fin debe ser llenada.",
        path: [dateStartName],
      },
      dateValidateFunction: (data: { [x: string]: string }) => {
        if (data[dateEndName] != "") {
          if (data[dateStartName] == "") return false
        }
        return true
      },
      dateValidateDestinty: {
        message: "La fecha fin debe ser llenada.",
        path: [dateStartName],
      },
    }
  },
}

export default DateRangeZod
