import React from 'react'
import {connect} from 'react-redux'
import {ToastContainer} from 'react-toastify'

class Header extends React.Component {
  render(){
    return (
      <nav className='navbar navbar-expand-md navbar-dark'>
        <ToastContainer/>
        HEADER
        <div className='collapse navbar-collapse'>

        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({...state})

export default connect(mapStateToProps)(Header)