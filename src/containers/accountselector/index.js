import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router'

import './styles.css'

class Accountselector extends Component {

	render () {
		const { currentAccount } = this.props
		return <nav className="menu">
			<img className="menu-avatar" alt={currentAccount.user.display_name} src={currentAccount.user.avatar} />
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
		currentAccount: state.users.accounts[state.users.selected],
		users: state.users
	}
}

const translated = translate()(Accountselector)
const connected = connect(mapStateToProps)(translated)
const routed = withRouter(connected)

export default routed