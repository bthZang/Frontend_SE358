const BASE_API = "https://esms.hoanghy.space";

const API = {
    baseUrl: BASE_API,
    authentication: {
        signIn: `${BASE_API}/auth/authenticate`,
    },
    staff: {
        getStaffProfile: `${BASE_API}/staff/profile`,
    },
    importBill: {
        getDetail: (id: string) => `${BASE_API}/import/${id}`,
    },
    supplier: {
        getDetail: (id: string) => `${BASE_API}/supplier/${id}`,
    }
};

export default API;