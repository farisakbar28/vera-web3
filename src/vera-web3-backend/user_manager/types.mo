// src/vera-web3-backend/user_manager/types.mo
import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";

module {
    public type UserRole = {
        #Admin;
        #AidProvider;
        #VerifiedRecipient;
        #UnverifiedUser;
    };

    public type UserProfile = {
        principal_id : Principal;
        role : UserRole;
        registered_at : Nat64;
    };
}
