import React, { PropTypes, Component } from 'react'

import { connect } from 'react-redux'
import { registerApp } from '../../utils/api'
import { registerApp as registerAppAction } from '../../actions/config'
import Routes from '../../components/routes'
import { translate } from 'react-i18next'

class App extends Component {
	componentDidMount () {
		const { setToken, isRegistered } = this.props

		if (!isRegistered) {
			registerApp()
				.catch(e => {
					// How to handle this?
					// Just display a failed page and don't do anything?
					// Suggest to relaunch the app?
					console.error(e)
					throw e
				})
				.then(setToken)
		}
	}

	render () {
		const { t, isRegistered } = this.props

		if (!isRegistered) {
			return <div>
				{t('loading')}
			</div>
		}

		return <Routes />
	}
}

App.propTypes = {
	isRegistered : PropTypes.bool.isRequired,
	setToken : PropTypes.func.isRequired
}

const stateToProps = (state) => {
	return {
		isRegistered: state.config.isRegistered
	}
}

const dispatchToProps = (dispatch) => {
	return {
		setToken: (token) => {
			dispatch(registerAppAction(token))
		}
	}
}

export default connect(
	stateToProps,
	dispatchToProps
)(translate()(App))

/*
class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			credentials: null,
			timeline: null
		}

		this._handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		Promise.resolve(localStorage.getItem('credentials'))
			.then(credentials => {
				if (!credentials) {
					return registerApp()
						.then(JSON.stringify)
						.then(credentials => {
							localStorage.setItem('credentials', credentials)
							return credentials
						})
				}
				return credentials
			})
			.then(credentials => {
				this.setState(() => {
					return {
						credentials
					}
				})
			})
	}

	handleSubmit(e) {
		e.preventDefault()

		const { client_id, client_secret } = JSON.parse(this.state.credentials)

		let data = new FormData(e.target)
		data.append('client_id', client_id)
		data.append('client_secret', client_secret)
		data.append('grant_type', 'password')

		login(data)
			.then(timeline)
			.then((timeline) => {
				this.setState(() => ({
					timeline
				}))
			})
	}

	render() {
		const { credentials, timeline } = this.state

		if (!credentials) {
			return <div>
				Loading...
			</div>
		}

		if (!timeline) {
			return <form onSubmit={this._handleSubmit}>
				<p>
					<label htmlFor="username">Username</label>
					<input id="username" type="text" name="username" />
				</p>
				<p>
					<label htmlFor="password">Password</label>
					<input id="password" type="password" name="password" />
				</p>
				<p>
					<label htmlFor="instance">Instance</label>
					<input id="instance" type="text" name="instance" value="https://mastodon.social" />
				</p>
				<input type="submit" value="Submit" />
			</form>
		}

		return <section>
			{timeline.map((toot, index) => {
				const content = (toot.reblog && toot.reblog.content) || toot.content

				return <div key={index}>
					<div>
						{content}
					</div>
					<hr />
				</div>
			})}
		</section>
	}
}

export default App*/
