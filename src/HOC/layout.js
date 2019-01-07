import React from 'react'
import {connect} from 'react-redux'

import Header from '../components/Layout/header'
import Sidebar from '../components/Layout/sidebar'

export default function Layout(Component) {
  class LayoutComponent extends React.Component {

    render() {
      return (
        <div className='dashboard'>
          <Header/>
          <div className='page-content'>
            <Sidebar/>
            <Component {...this.props}/>
          </div>
        </div>
      )
    }
  }

  const mapStateToProps = state => ({...state})

  return connect(mapStateToProps)(LayoutComponent)
}