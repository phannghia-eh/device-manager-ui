import React from 'react'
import {connect} from 'react-redux'
import ReactTable from 'react-table'
import Modal from 'react-modal'

import mockingData from '../mockingData'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: {
        add: {
          isOpen: false
        },
        data: {
          name: '',
          type: 1,
          serialNumber: '',
          importedAt: '',
          status: '',
          id: ''
        }
      },
      table: {
        device: {
          data: mockingData,
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
                            onClick={(e) => this.handleOnEditDevice(e, row.original)}>Sửa
                    </button>
                  </div>
                )
              }
            }
          ]
        }
      }
    }
  }

  render() {
    console.log('DASHBOARD STATE', this.state)

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
                        onClick={() => this.handleOnOpenModal('add')}>
                  <i className='icon-plus2'></i>
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          <ReactTable
            className={'text-center m-1'}
            filterable={true}
            columns={this.state.table.device.columns}
            data={this.state.table.device.data}/>

        </div>
        <Modal isOpen={this.state.modal.add.isOpen}
               onRequestClose={() => this.handleOnCloseModal('add')}
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
                      onClick={() => this.handleOnCloseModal('add')}/>
            </div>

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

            <div className='modal-footer'>
              <div className='btn-group'>
                <button className='btn btn-primary' onClick={() => this.handleOnAddNewDevice()}>Tạo mới</button>
                <button className='btn btn-danger' onClick={() => this.handleOnCloseModal('add')}>Hủy tạo</button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }

  handleOnCloseModal(modalType) {
    let tmpState = this.state
    tmpState.modal[modalType].isOpen = false
    this.setState(tmpState)
  }

  handleOnOpenModal(modalType) {
    let tmpState = this.state
    tmpState.modal[modalType].isOpen = true
    this.setState(tmpState)
  }

  handleOnEditDevice(e, rowData) {
    console.log(e.target, rowData)
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

  handleOnAddNewDevice() {
    console.log(this.state.modal.data)
  }
}

const mapStateToProps = state => ({...state})

export default connect(mapStateToProps)(Dashboard)