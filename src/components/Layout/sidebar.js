import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

class Sidebar extends React.Component {
  render() {
    return (
      <div className='sidebar sidebar-dark sidebar-main sidebar-expand-sm' style={{maxWidth:'15%'}}>
        <div className='sidebar-content'>
          <div className='card card-sidebar-mobile'>
            <div className='nav nav-sidebar'>
              {/*SIDEBAR ITEM*/}
              <li className="nav-item-header">
                <div className="text-uppercase font-size-xs line-height-xs">Main</div>
                <i className="icon-menu" title="Main"></i></li>

              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  <i className="icon-home4"></i>
                  <span>
									Dashboard
								</span>
                </Link>
              </li>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({...state})

export default connect(mapStateToProps)(Sidebar)