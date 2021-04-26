import { URLS } from '../config';
import axios from 'axios';

export function setAgendaItems(eventId, userId, token) {
    return dispatch => {
        dispatch(getAgendaItems());
        const api = `${URLS.agendaItems}/${eventId}/${userId}`;
        //console.log(api);
        //console.log(eventId);
        //console.log(userId);
        axios
            .get(api, { headers: { Authorization: `Bearer ${token}` } })
            .then(function(response) {
                return dispatch(getAgendaItemsSuccess(response.data));
            })
            .catch(err => dispatch(getAgendaItemsFailure(err)));
    };
}

export const getAgendaItems = () => ({
    type: 'SET_AGENDA'
});

export const getAgendaItemsSuccess = data => ({
    type: 'SET_AGENDA_SUCCESS',
    agendaItems: data,
    agendaStartDate: data[0].startDate
});

export const getAgendaItemsFailure = err => ({
    type: 'SET_AGENDA_FAILURE'
});

//#############################################################################
export function setMyAgendaItems(eventId, userId, token) {
    return dispatch => {
        dispatch(getMyAgendaItems());
        const api = `${URLS.myAgendaItems}/${eventId}/${userId}`;
        console.log(api);
        console.log('HITTING MY AGENDA ITEMS API');
        axios
            .get(api, { headers: { Authorization: `Bearer ${token}` } })
            .then(function(response) {
                console.log('SET MY AGENDA API CALL');
                console.log(response);
                if (response.data) {
                    return dispatch(getMyAgendaItemsSuccess(response.data));
                } else {
                    return dispatch(setMyAgendaItemsEmpty());
                }
            })
            .catch(err => dispatch(getMyAgendaItemsFailure(err)));
    };
}

export const getMyAgendaItems = () => ({
    type: 'SET_MYAGENDA'
});

export const setMyAgendaItemsEmpty = () => ({
    type: 'SET_MYAGENDA_EMPTY',
    myAgendaItems: [],
    myAgendaStartDate: null,
    myAgendaItemsLoaded: true
});

export const getMyAgendaItemsSuccess = data => ({
    type: 'SET_MYAGENDA_SUCCESS',
    myAgendaItems: data,
    myAgendaStartDate: '03/07/2019', //data[0].startDate,
    myAgendaItemsLoaded: true
});

export const getMyAgendaItemsFailure = err => ({
    type: 'SET_MYAGENDA_FAILURE'
});

export const setIsMyAgenda = isMyAgenda => ({
    type: 'SET_ISMYAGENDA',
    isMyAgenda: isMyAgenda
});

//#############################################################################
export function setTracks(eventId, token) {
    return dispatch => {
        dispatch(getTracks());
        const api = `${URLS.tracks}/${eventId}`;
        //console.log(api);
        axios
            .get(api, { headers: { Authorization: `Bearer ${token}` } })
            .then(function(response) {
                //console.log(response.data);
                return dispatch(getTracksSuccess(response.data));
            })
            .catch(err => dispatch(getTracksFailure(err)));
    };
}

export const getTracks = () => ({
    type: 'SET_TRACKS'
});

export const getTracksSuccess = data => ({
    type: 'SET_TRACKS_SUCCESS',
    tracks: data
});

export const getTracksFailure = err => ({
    type: 'SET_TRACKS_FAILURE'
});
