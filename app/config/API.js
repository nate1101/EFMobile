const URLS = {
    token: 'https://api.eventbx.com/api/v1/Auth/GetAccessToken',
    currentEvents: 'https://api.eventbx.com/api/v1/Events/GetCurrentEvents',
    event: 'https://api.eventbx.com/api/v1/Events/GetEventById',
    agendaItems: 'https://api.eventbx.com/api/v1/Agenda/GetAgendaItems',
    myAgendaItems: 'https://api.eventbx.com/api/v1/Agenda/GetMyAgendaItems',
    agendaItem: 'https://api.eventbx.com/api/v1/Agenda/GetAgendaItem',
    authenticateUser: 'https://api.eventbx.com/api/v1/Auth/CreateToken',
    registerUser: 'https://api.eventbx.com/api/v1/Auth/Register',
    forgotPassword: 'https://admin.eventbx.com/account/appforgotpassword',
    addUserAgendaItem:
        'https://api.eventbx.com/api/v1/Agenda/AddUserAgendaItem',
    removeUserAgendaItem:
        'https://api.eventbx.com/api/v1/Agenda/RemoveUserAgendaItem',
    myAgendaReminders:
        'https://api.eventbx.com/api/v1/agenda/getmyagendareminders',
    speaker: 'https://api.eventbx.com/api/v1/speakers/GetSpeakerById',
    speakers: 'https://api.eventbx.com/api/v1/speakers/GetSpeakersByEventId',
    tracks: 'https://api.eventbx.com/api/v1/Agenda/GetTracks',
    exhibitor: 'https://api.eventbx.com/api/v1/Exhibitor/GetExhibitorById',
    exhibitors:
        'https://api.eventbx.com/api/v1/Exhibitor/GetExhibitorsByEventId',
    sponsors: 'https://api.eventbx.com/api/v1/Events/GetSponsorsByEventId',
    sponsor: 'https://api.eventbx.com/api/v1/Events/GetSponsorById',
    createPushSubscription:
        'https://api.eventbx.com/api/v1/App/CreatePushSubscription',
    isNotificationActive:
        'https://api.eventbx.com/api/v1/App/IsNotificationActive',
    updatePushSubscription:
        'https://api.eventbx.com/api/v1/App/UpdatePushSubscription'
};

export default URLS;
