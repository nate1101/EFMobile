//import { SET_AGENDA, SET_AGENDA_SUCCESS, SET_AGENDA_FAILURE } from '../actions/agenda';

const initialState = {
    agendaItems: [],
    agendaItemsSet: false,
    myAgendaItemsLoaded: false
};

export default (state = initialState, action) => {
    if (__DEV__) {
        if (typeof console.dir === 'function') {
            console.dir(action);
        }
    }

    switch (action.type) {
        case 'SET_AGENDA':
            return {
                ...state
            };
        case 'SET_AGENDA_SUCCESS':
            return {
                ...state,
                agendaItems: action.agendaItems,
                agendaStartDate: action.agendaStartDate,
                agendaItemsSet: true
            };
        case 'SET_AGENDA_FAILURE':
            console.log('Error while fetching agenda');
            return {
                ...state,
                agendaItemsSet: false,
                error: 'Error while fetching agenda'
            };
        case 'SET_MYAGENDA':
            return {
                ...state
            };
        case 'SET_MYAGENDA_SUCCESS':
            return {
                ...state,
                myAgendaItems: action.myAgendaItems,
                myAgendaStartDate: action.myAgendaStartDate,
                myAgendaItemsSet: true,
                myAgendaItemsLoaded: true
            };
        case 'SET_MYAGENDA_EMPTY':
            return {
                _persist: state._persist
                //...state,
                //myAgendaItems: [],
                //myAgendaStartDate: action.myAgendaStartDate,
                //myAgendaItemsSet: true,
                //myAgendaItemsLoaded: true
            };
        case 'SET_MYAGENDA_FAILURE':
            return {
                ...state,
                myAgendaItemsSet: false,
                error: 'Error while fetching agenda'
            };
        case 'SET_TRACKS':
            return {
                ...state
            };
        case 'SET_TRACKS_SUCCESS':
            console.log('TRACKS');
            console.log(action.tracks);
            return {
                ...state,
                tracks: action.tracks
            };
        case 'SET_TRACKS_FAILURE':
            return {
                ...state,
                error: 'Error while fetching tracks'
            };
        case 'SET_ISMYAGENDA':
            return {
                ...state,
                isMyAgenda: action.isMyAgenda
            };
        default:
            return state;
    }
};
