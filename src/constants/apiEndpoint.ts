const BASE_API = "https://esms.hoanghy.space";

const API = {
    baseUrl: BASE_API,
    authentication: {
        signIn: `${BASE_API}/auth/authenticate`,
    },
    staff: {
        getStaffProfile: `${BASE_API}/staff/profile`,
    },
};

export default API;