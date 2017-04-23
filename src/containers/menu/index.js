import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router'

import Accounselector from '../accountselector'
import './styles.css'

class Menu extends Component {

	componentDidMount() {
		const { users, history } = this.props
		if (!users.accounts) {
			history.push('/login')
		}
	}

	render () {
		return <nav className="menu">
			<Accounselector />
			<NavLink activeClassName="menu-selected" to="/main/home">
				<i className="material-icons">reorder</i>
			</NavLink>
			<NavLink activeClassName="menu-selected" to="/main/public">
				<i className="material-icons">people</i>
			</NavLink>
			<NavLink activeClassName="menu-selected" to="/main/federated">
				<i className="material-icons">public</i>
			</NavLink>
			<NavLink activeClassName="menu-selected" to="/login">
				<i className="material-icons">add_box</i>
			</NavLink>
		</nav>
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

const translated = translate()(Menu)
const connected = connect(mapStateToProps)(translated)
const routed = withRouter(connected)

export default routed