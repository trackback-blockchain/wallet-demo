import React, { useReducer, useContext, Dispatch } from "react";

import { ApiPromise, WsProvider } from '@polkadot/api';
import { keyring } from '@polkadot/ui-keyring';

const INIT_STATE = {
    apiState: null,
    api: null,
    apiError: null,
};

type State = typeof INIT_STATE;

const reducer = (state:any, action:any) => {
    console.log(action.type)
    switch (action.type) {
        case 'CONNECT_INIT':
            return { ...state, apiState: 'CONNECT_INIT' };
      
          case 'CONNECT':
            return { ...state, api: action.payload, apiState: 'CONNECTING' };
      
          case 'CONNECT_SUCCESS':
            return { ...state, apiState: 'READY' };
      
          case 'CONNECT_ERROR':
            return { ...state, apiState: 'ERROR', apiError: action.payload };

        default:
            throw new Error(`Unknown type: ${action.type}`);
    }
}

function isKeyringLoaded() {
    try {
        return !!keyring.keyring;
    } catch {
        return false;
    }
}

const connect = async (state: State, dispatch:Dispatch<any>) => {
    const { apiState } = state;
    // We only want this function to be performed once
    if (apiState || isKeyringLoaded()) return;

    dispatch({ type: 'CONNECT_INIT' });

    const provider = new WsProvider('wss://trackback.dev/');
    const _api = await ApiPromise.create({ provider: provider });
    
    isKeyringLoaded() || keyring.loadAll({ ss58Format: 42, type: 'sr25519' });

    console.log('okfff', _api.genesisHash.toHex());

    dispatch({ type: 'CONNECT_SUCCESS' });

  
    // Set listeners for disconnection and reconnection event.
    // _api.on('connected', () => {
        
    //     dispatch({ type: 'CONNECT', payload: _api });
    //     // `ready` event is not emitted upon reconnection and is checked explicitly here.
    //     _api.isReady.then((_api) =>  dispatch({ type: 'CONNECT_SUCCESS' }));
    // });
    // _api.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }));
    // _api.on('error', err => dispatch({ type: 'CONNECT_ERROR', payload: err }));
};


const SubstrateContext = React.createContext({});

const SubstrateContextProvider: React.FC = (props) => {
    const initState = { ...INIT_STATE };

    const [state, dispatch] = useReducer(reducer, initState);

    connect(state, dispatch);

    return <SubstrateContext.Provider value={state}>
        {props.children}
    </SubstrateContext.Provider>;
};

const useSubstrate = () => ({ ...useContext(SubstrateContext) });

export { SubstrateContextProvider, useSubstrate };