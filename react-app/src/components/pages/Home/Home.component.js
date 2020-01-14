import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../../commons/NavBar/NavBar';
import CommonDropdown from '../../commons/Dropdown/Dropdown';
import Table from '../../commons/Table/Table';
import Toaster from '../../commons/Toaster/Toaster.container';
import LoadingBar from 'react-redux-loading-bar';
import './Home.css';

const Home = ({ getTopics, topics, toastMessage, namespaces, getNamespaces, selectNamespace, selectedNamespace, loading, hasValidToken, checkToken, isCheckingToken, ...props }) => {
  const [nameSpace, setNameSpace] = useState('');

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  useEffect(() => {
    if (!isCheckingToken) {
      if (hasValidToken === true) {
        getNamespaces();
        if (namespaces.length > 0 && selectedNamespace === '') {
          setNameSpace(namespaces[0].name);
        } else if (namespaces.length > 0 && selectedNamespace !== '') {
          selectNamespace(selectedNamespace);
        }
      } else if (hasValidToken === false) {
        props.history.push('/login');
      }
    }
  }, [hasValidToken, isCheckingToken]);

  useEffect(() => {
    if (!isCheckingToken) {
      if (namespaces.length > 0 && selectedNamespace === '') {
        setNameSpace(namespaces[0].name);
        onSelectNameSpace(namespaces[0].name);
      } else if (namespaces.length > 0 && selectedNamespace !== '') {
        selectNamespace(selectedNamespace);
      }
    }
  }, [namespaces, isCheckingToken]);

  const onSelectNameSpace = nameSpaceSelected => {
    setNameSpace(nameSpaceSelected);
    selectNamespace(nameSpaceSelected);
    const wholeNamespace = namespaces.filter(namespace => namespace.name === nameSpaceSelected);
    if (wholeNamespace.length > 0) {
      const splittedId = wholeNamespace[0].id.split('resourceGroups/');
      const resourceGroup = splittedId[1].substr(0, splittedId[1].indexOf('/'));
      if (resourceGroup !== undefined) {
        getTopics({ namespace: nameSpaceSelected, resourceGroup: resourceGroup });
      }
    }
  };

  return (
    <>
      <NavBar />
      <LoadingBar className="loadingBar" />

      <div className="homeContainer">
        <div className="dropdownContainer">
          {toastMessage !== [] && toastMessage.map((element, index) => <Toaster key={index} message={element.message} action={element.action} />)}
          <span>Select Bus: </span>
          <CommonDropdown items={namespaces} itemSelected={onSelectNameSpace} selectedNamespace={selectedNamespace} />
        </div>
        {nameSpace !== undefined && topics.length > 0 && loading === 0 ? (
          <div className="tableContainer">
            <Table topics={topics} namespace={nameSpace} />
          </div>
        ) : nameSpace !== undefined && topics.length === 0 && loading === 0 ? (
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
