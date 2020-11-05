import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../../commons/NavBar/NavBar';
import CommonDropdown from '../../commons/Dropdown/Dropdown';
import Table from '../../commons/Table/Table';
import Toaster from '../../commons/Toaster/Toaster.container';
import LoadingBar from 'react-redux-loading-bar';
import './Home.css';

const Home = ({ getTopicsData, topics, toastMessage, namespaces, getNamespaces, loading, hasValidToken, checkToken, isCheckingToken, ...props }) => {
	const [selectedNamespace, setSelectedNamespace] = useState(props.match.params.namespace);
	const [currentResourceGroup, setCurrentResourceGroup] = useState('');

	useEffect(() => {
		checkToken();
		if (hasValidToken) {
			getNamespaces()
		} else {
			props.history.push('/login');
		}
	}, [])

	useEffect(() => {
		if (!isCheckingToken && namespaces.length > 0) {
			!namespaces.some(namespace => namespace.name === selectedNamespace) && setSelectedNamespace(namespaces[0].name)
			const wholeNamespace = namespaces.filter(namespace => namespace.name === selectedNamespace);
			if (wholeNamespace.length > 0) {
				const splittedId = wholeNamespace[0].id.split('resourceGroups/');
				const resourceGroup = splittedId[1].substr(0, splittedId[1].indexOf('/'));
				setCurrentResourceGroup(resourceGroup);
				if (resourceGroup !== undefined) getTopicsData({
					namespace: selectedNamespace,
					resourceGroup: resourceGroup
				});
			}
		}
	}, [namespaces, selectedNamespace]);

	useEffect(() => {
		props.history.push(`/home/${selectedNamespace}`);
	}, [selectedNamespace])

	return (
		<>
			<NavBar/>
			<LoadingBar className="loadingBar"/>
			<div className="homeContainer">
				<div className="dropdownContainer">
					{toastMessage !== [] && toastMessage.map((element, index) =>
						<Toaster key={index}
						         message={element.message}
						         action={element.action}
						/>
					)}
					<span>Select Bus: </span>
					<CommonDropdown
						items={namespaces}
						itemSelected={setSelectedNamespace}
						selectedNamespace={selectedNamespace}
					/>
				</div>
				{selectedNamespace !== undefined && topics.length > 0 && loading === 0 ? (
					<div className="tableContainer">
						<Table
							topics={topics}
							namespace={selectedNamespace}
							namespaces={namespaces}
							resourceGroup={currentResourceGroup}
						/>
					</div>
				) : selectedNamespace !== undefined && topics.length === 0 && loading === 0 ? (
					<div className="loading">No topics for this namespace</div>
				) : (
					<div className="loading">
						<div className="loading-dots">
							Loading
							<div className="loading-dots--dot"></div>
							<div className="loading-dots--dot"></div>
							<div className="loading-dots--dot"></div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default withRouter(Home);
