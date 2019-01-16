import axios from 'axios'
import {toast} from 'react-toastify'
import {config} from '../config'
import XLSX from 'xlsx'
import * as fileSaver from 'file-saver'

const DEVICE_API_V1_URL = config.BASE_API_V1_URL + 'device/'

export function addNewDevice(device) {
  return dispatch => {
    return axios
      .post(DEVICE_API_V1_URL, {device: device})
      .then(response => {
        dispatch(onAddNewDeviceSuccess(response.data.data))
        toast.success('ADD NEW DEVICE SUCCESS')
      })
      .catch(error => {
        if (error.response)
          toast.error(error.response.data.description)
        else
          toast.error(error.message)
      })
  }
}

export function fetchListDevice() {
  return dispatch => {
    return axios
      .get(DEVICE_API_V1_URL)
      .then(response => {
        dispatch(fetchListDeviceSuccess(response.data.data))
      })
      .catch(error => {
        if (error.response)
          toast.error(error.response.data.description)
        else
          toast.error(error.message)
      })
  }
}

export function editDevice(device) {
  return dispatch => {
    return axios
      .put(DEVICE_API_V1_URL + device.id, {device: device})
      .then(response => {
        dispatch(onEditDeviceSuccess(response.data.data))
        toast.success('EDIT DEVICE SUCCESS')
      })
      .catch(error => {
        if (error.response)
          toast.error(error.response.data.description)
        else
          toast.error(error.message)
      })
  }
}

export function exportExcel(devices) {
  return dispatch => {
    let data = [
      ["Mã Thiết Bị", "Loại Thiết Bị", "Têm Thiết Bị", 'Số Serial', 'Ngày nhập hàng', 'Tình Trạng', 'Phòng Ban', 'Người mượn', 'Ghi Chú', 'Lần Cập Nhật Cuối']
    ]
    const deviceDataItems = devices.map(i => {
      let item = []
      item.push(i.id)
      item.push(i.type)
      item.push(i.name)
      item.push(i.serialNumber)
      item.push(i.importedAt)
      item.push(i.status)
      item.push(i.department)
      item.push(i.assignment)
      item.push(i.note)
      item.push(i.lastUpdate)
      return item
    })
    data = [...data, ...deviceDataItems]

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

    const wbout = XLSX.write(wb, {type: 'binary', bookType: "xlsx"});
    downloadXlsx(wbout, new Date());
  }
}

export function importExcel(e, file) {
  return dispatch => {
    const reader = new FileReader();
    reader.onload = (e) => {
      let binary = "";
      const bytes = new Uint8Array(e.target.result);
      const length = bytes.byteLength;
      for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const wb = XLSX.read(binary, {type: "binary", cellDates: true, cellStyles: true});
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, {header: 1});
      data.shift()
      const devices = data.map(i => {
        return Object.assign({},
          {id: i[0]},
          {type: i[1]},
          {name: i[2]},
          {serialNumber: i[3]},
          {importedAt: i[4]},
          {status: i[5]},
          {department: i[6]},
          {assignment: i[7]},
          {note: i[8]},
          {lastUpdate: i[9]})
      })
      axios
        .post(DEVICE_API_V1_URL + 'import', {devices: devices})
        .then(response=>{
          toast.success(response.data.message)
        })
        .catch(error=>{
          if (error.response)
            toast.error(error.response.data.description)
          else
            toast.error(error.message)
        })
    }
    reader.readAsArrayBuffer(file);
  }
}

const s2ab = (s) => {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
}

const processFile = (e, file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    let binary = "";
    const bytes = new Uint8Array(e.target.result);
    const length = bytes.byteLength;
    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const wb = XLSX.read(binary, {type: "binary", cellDates: true, cellStyles: true});
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data = XLSX.utils.sheet_to_json(ws, {header: 1});
    this.setState({
      chosenFileName: file.name,
      data
    });
  }
  reader.readAsArrayBuffer(file);
}

const downloadXlsx = (wbout, name) => {
  fileSaver.saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), `${name}.xlsx`);
}

const fetchListDeviceSuccess = devices => ({
  type: 'FETCH_LIST_DEVICE_SUCCESS',
  payload: {items: devices}
})

const onAddNewDeviceSuccess = device => ({
  type: 'ADD_NEW_DEVICE_SUCCESS',
  payload: {device: device}
})

const onEditDeviceSuccess = device => ({
  type: 'EDIT_DEVICE_SUCCESS',
  payload: {device: device}
})