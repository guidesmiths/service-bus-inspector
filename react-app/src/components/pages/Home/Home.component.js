import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../commons/NavBar/NavBar';
import CommonDropdown from '../../commons/Dropdown/Dropdown';
import Table from '../../commons/Table/Table';
import Toaster from '../../commons/Toaster/Toaster.container';
import LoadingBar from 'react-redux-loading-bar';
import './Home.css';


const Home = ({
    getTopics,
    topics,
    toastMessage,
    namespaces,
    getNamespaces,
    selectNamespace,
    selectedNamespace,
    loading,
    ...props
}) => {
    const [nameSpace, setNameSpace] = useState('');
    const [isTokenValid, setToken] = useState('');

    useEffect(() => {
        checkToken();
        if(isTokenValid === true) {
            getNamespaces();
            if(namespaces.length > 0 && selectedNamespace === '') {
                setNameSpace(namespaces[0].name);
            } else if (namespaces.length > 0 && selectedNamespace !== '') {
                selectNamespace(selectedNamespace);
            }
        } else if (isTokenValid === false) {
            props.history.push('/login')
        }
    }, [isTokenValid])

    useEffect(() => {
        if(namespaces.length > 0 && selectedNamespace === '') {
            setNameSpace(namespaces[0].name);
            onSelectNameSpace(namespaces[0].name);
        } else if (namespaces.length > 0 && selectedNamespace !== '') {
            selectNamespace(selectedNamespace);
        }
    }, [namespaces])

    const onSelectNameSpace = (nameSpaceSelected) => {
        setNameSpace(nameSpaceSelected);
        selectNamespace(nameSpaceSelected);
        const wholeNamespace = namespaces.filter(namespace => namespace.name === nameSpaceSelected);
        if(wholeNamespace.length > 0) {
            const splittedId = wholeNamespace[0].id.split('resourceGroups/');
            const resourceGroup = splittedId[1].substr(0, splittedId[1].indexOf('/'));
            if(resourceGroup !== undefined) {
                getTopics({ namespace: nameSpaceSelected, resourceGroup: resourceGroup });
            }
        }
    };

    const checkToken = async () => {
        const response = await axios({
            method: 'get',
            url: 'http://10.121.16.206/tokenhealth',
            headers: {
              Authorization: localStorage.getItem('token'),
             },
          });
          setToken(response.data);
          return response.data;
    };

    return (
        <>
            <NavBar />
            <LoadingBar className="loadingBar" />

            <div className='homeContainer'>
                <div className="dropdownContainer">
                    {toastMessage !== [] &&
                        toastMessage.map((element, index) => (
                            <Toaster
                                key={index}
                                message={element.message}
                                action={element.action}
                            />)
                        )
                    }
                    <span>Select Bus: </span>
                    <CommonDropdown items={namespaces} itemSelected={onSelectNameSpace} selectedNamespace={selectedNamespace}/>
                </div>
                {nameSpace !== undefined && topics.length > 0 && loading === 0 ?
                    <div className="tableContainer">
                        <Table topics={topics} namespace={nameSpace}/>
                    </div> : nameSpace !== undefined && topics.length === 0 && loading === 0 ? 
                    <div className="loading">No topics for this namespace</div>
                    : <div className="loading"><div className="loading-dots">
                        Loading
                    <div className="loading-dots--dot"></div>
                    <div className="loading-dots--dot"></div>
                    <div className="loading-dots--dot"></div>
                  </div></div>
                }
            </div>
        </>
    );
};

export default withRouter(Home);