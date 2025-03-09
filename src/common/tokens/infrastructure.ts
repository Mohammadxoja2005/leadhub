export const Infrastructure = {
    Repository: {
        Contact: Symbol.for("ContactRepository"),
        Deal: Symbol.for("DealRepository"),
        Lead: Symbol.for("LeadRepository"),
        User: Symbol.for("UserRepository"),
    },
    Auth: {
        Google: Symbol.for("AuthGoogleStrategy"),
    },
};
