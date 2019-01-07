import React from 'react'
import {connect} from 'react-redux'

class Header extends React.Component {
  render(){
    return (
      <nav className='navbar navbar-expand-md navbar-dark'>
        HEADER
        <div className='collapse navbar-collapse'>

        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({...state})

export default connect(mapStateToProps)(Header)