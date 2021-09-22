export const Types = {
    SET_CLINICS: 'clinics/SET_CLINICS',
    SET_CLINIC: 'clinic/SET_CLINIC',
};

const initialState = {
    clinics: [],
    clinicSelected: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_CLINICS:
            return { ...state, clinics: action.payload };
        case Types.SET_CLINIC:
            return { ...state, clinicSelected: action.payload };    
        default:
            return state;
    }

};

export function setClinics(clinics) {
    return {
        type: Types.SET_CLINICS,
        payload: clinics,
    };
}

export function setClinic(clinic) {
    return {
        type: Types.SET_CLINIC,
        payload: clinic,
    };
}