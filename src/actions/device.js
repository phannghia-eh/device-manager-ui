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
        console.log(error.response)
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
        console.log('EDIT DEVICE DATA', response.data)
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
    console.log(data)

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

    const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
    downloadXlsx(wbout, new Date());
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