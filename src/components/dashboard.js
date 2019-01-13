import React from 'react'
import {connect} from 'react-redux'
import ReactTable from 'react-table'
import Modal from 'react-modal'

import {addNewDevice, editDevice, exportExcel, fetchListDevice} from "../actions/device";

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: {
        isOpen: false,
        type: 0, //0: add 1: edit
        data: {
          name: '',
          type: 1,
          serialNumber: '',
          importedAt: '',
          status: '',
          id: ''
        },
      },
      table: {
        device: {
          columns: [
            {
              Header: 'id',
              accessor: 'id',
              maxWidth: 50,
            },
            {
              Header: 'name',
              accessor: 'name'
            },
            {
              Header: 'serialNumber',
              accessor: 'serialNumber'
            },
            {
              Header: 'department',
              accessor: 'department'
            },
            {
              Header: 'assignment',
              accessor: 'assignment'
            },
            {
              Header: 'note',
              accessor: 'note'
            },
            {
              Header: 'importedAt',
              accessor: 'importedAt'
            },
            {
              Header: 'lastUpdate',
              accessor: 'lastUpdate'
            },
            {
              Header: 'Action',
              filterable: false,
              sortable: false,
              maxWidth: 100,
              Cell: row => {
                return (
                  <div className='btn-group'>
                    <button className='btn btn-info'
                            onClick={(e) => this.handleOnOpenEditDeviceModal(e, row.original)}>Sửa
                    </button>
                  </div>
                )
              }
            }
          ]
        }
      },
      excel: {
        data: [
          // ["Mã thiết bị", ]
        ]
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchListDevice())
  }

  render() {
    console.log('DASHBOARD STATE', this.state)
    console.log('DASHBOARD PROPS', this.props)

    return (
      <div className='content-wrapper'>
        <div className='page-header page-header-light'>
          <div className="page-header-content header-elements-md-inline">
            <div className="page-title d-flex">
              <h4><i className="icon-arrow-left52"></i> <span className="font-weight-semibold">Home</span> - Dashboard
              </h4>
            </div>

            <div className="header-elements d-none">
              <div className="d-flex justify-content-center">
                <button type='button'
                        className='btn btn-outline bg-primary text-primary-800 btn-icon btn-float'
                        onClick={() => this.handleOnOpenAddNewDeviceModal()}>
                  <i className='icon-plus2'></i>
                  <span>Add</span>
                </button>
              </div>
              <div className="d-flex justify-content-center">
                <button type='button'
                        className='btn btn-outline bg-primary text-primary-800 btn-icon btn-float'
                        onClick={() => this.handleOnExportExcel()}>
                  <i className='icon-database-export'></i>
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          <ReactTable
            className={'text-center m-1'}
            filterable={true}
            columns={this.state.table.device.columns}
            data={this.props.device.items}/>

        </div>
        <Modal isOpen={this.state.modal.isOpen}
               onRequestClose={() => this.handleOnCloseModal()}
               style={{zIndex: '999'}}
               className='modal-lg'
               ariaHideApp={false}
               shouldCloseOnEsc={true}
               className='modal-dialog modal-lg'>
          <div className="modal-content">
            <div className="modal-header">
              <h4>Add New Device</h4>
              <button className="close icon-x"
                      type="button"
                      data-dismiss="modal"
                      onClick={() => this.handleOnCloseModal()}/>
            </div>

            {this.renderModalBody()}

            {this.renderModalFooter()}

          </div>
        </Modal>
      </div>
    )
  }

  renderModalBody() {
    switch (this.state.modal.type) {
      case 0:
        return (
          <div className="modal-body">
            <form>
              <div className='form-group row'>
                <label className='col-md-3 col-form-label'>Mã thiết bị</label>
                <div className='col-md-9'>
                  <input type='text' className='form-control' value={this.state.modal.data.id}
                         onChange={(e) => this.handleOnChangeInput(e, 'id')}/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='col-md-3 col-form-label'>Tên</label>
                <div className='col-md-9'>
                  <input type='text' className='form-control' value={this.state.modal.data.name}
                         onChange={(e) => this.handleOnChangeInput(e, 'name')}/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='col-md-3 col-form-label'>Loại</label>
                <div className='col-md-9'>
                  <select className='form-control' value={this.state.modal.data.type}
                          onChange={(e) => this.handleOnChangeInput(e, 'type')}>
                    <option value={1}>Tài sản cố định</option>
                    <option value={2}>Công cụ dụng cụ</option>
                  </select>
                </div>
              </div>

              <div className='form-group row'>
                <label className='col-md-3 col-form-label'>Serial Number</label>
                <div className='col-md-9'>
                  <input type='text' className='form-control' value={this.state.modal.data.serialNumber}
                         onChange={(e) => this.handleOnChangeInput(e, 'serialNumber')}/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='col-md-3 col-form-label'>Ngày nhập về</label>
                <div className='col-md-9'>
                  <input type='date' className='form-control' value={this.state.modal.data.importedAt}
                         onChange={(e) => this.handleOnChangeInput(e, 'importedAt')}/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='col-md-3 col-form-label'>Tình trạng</label>
                <div className='col-md-9'>
                  <input type='number' className='form-control' value={this.state.modal.data.status}
                         onChange={(e) => this.handleOnChangeInput(e, 'status')}/>
                </div>
              </div>
            </form>
          </div>
        )
      case 1:
        return (
          <div className="modal-body">
            <form>
              <div className='form-group row'>
                <label className='col-md-3 col-form-label'>Mã thiết bị</label>
                <div className='col-md-9'>
                  <input type='text' className='form-control' value={this.state.modal.data.id} disabled={true}/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='col-md-3 col-form-label'>Tên thiết bị</label>
                <div className='col-md-9'>
                  <input type='text' className='form-control' value={this.state.modal.data.name} disabled={true}/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='col-md-3 col-form-label'>Phòng ban quản lý</label>
                <div className='col-md-9'>
                  <input type='text' className='form-control' value={this.state.modal.data.department}
                         onChange={(e) => this.handleOnChangeInput(e, 'department')}/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='col-md-3 col-form-label'>Người sử dụng</label>
                <div className='col-md-9'>
                  <input type='text' className='form-control' value={this.state.modal.data.assignment}
                         onChange={(e) => this.handleOnChangeInput(e, 'assignment')}/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='col-md-3 col-form-label'>Note</label>
                <div className='col-md-9'>
                  <input type='text' className='form-control' value={this.state.modal.data.note}
                         onChange={(e) => this.handleOnChangeInput(e, 'note')}/>
                </div>
              </div>
            </form>
          </div>
        )
    }
  }

  renderModalFooter() {
    switch (this.state.modal.type) {
      case 0:
        return (
          <div className='modal-footer'>
            <div className='btn-group'>
              <button className='btn btn-primary' onClick={() => this.handleOnAddNewDevice()}>Tạo mới</button>
              <button className='btn btn-danger' onClick={() => this.handleOnCloseModal()}>Hủy tạo</button>
            </div>
          </div>
        )
      case 1:
        return (
          <div className='modal-footer'>
            <div className='btn-group'>
              <button className='btn btn-primary' onClick={() => this.handleOnEditDevice()}>Cập nhật</button>
              <button className='btn btn-danger' onClick={() => this.handleOnCloseModal()}>Hủy sửa</button>
            </div>
          </div>
        )
    }
  }

  handleOnCloseModal() {
    let tmpState = this.state
    tmpState.modal.isOpen = false
    this.setState(tmpState)
  }

  handleOnOpenEditDeviceModal(e, rowData) {
    console.log(e.target, rowData)
    let tmpState = this.state
    tmpState.modal.data = rowData
    tmpState.modal.isOpen = true
    tmpState.modal.type = 1
    this.setState(tmpState)
  }

  handleOnChangeInput(e, type) {
    let tmpState = this.state
    if (type === 'status') {
      if (Number.parseInt(e.target.value) <= 100 || e.target.value === '') {
        tmpState.modal.data[type] = e.target.value
        this.setState(tmpState)
      }
    } else {
      tmpState.modal.data[type] = e.target.value
      this.setState(tmpState)
    }
  }

  handleOnOpenAddNewDeviceModal() {
    let tmpState = this.state
    tmpState.modal.isOpen = true
    tmpState.modal.type = 0
    tmpState.modal.data = {
      "type": 1,
      "name": "a32ht0982gh nf92hf09",
      "serialNumber": "12071205791",
      "importedAt": "2018-02-26",
      "status": 69,
      // "department": "Oagi",
      // "assignment": "Maiden",
      // "note": "note",
      // "lastUpdate": "2018-11-17T23:10:02-08:00",
      "id": 101
    }
    this.setState(tmpState)
  }

  handleOnAddNewDevice() {
    this.props.dispatch(addNewDevice(this.state.modal.data))
  }

  handleOnEditDevice() {
    this.props.dispatch(editDevice(this.state.modal.data))
  }

  handleOnExportExcel() {
    this.props.dispatch(exportExcel(this.props.device.items))
  }
}

const mapStateToProps = state => ({...state})

export default connect(mapStateToProps)(Dashboard)