import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";

public type ApplicationStatus = {
    #Pending;
    #Verified;
    #Rejected;
};

public type RecipientApplication = {
    application_id : Principal;
    user_principal : Principal;
    application_data_encrypted : Text;
    status : ApplicationStatus;
    submitted_at : Nat64;
    verified_at : ?Nat64;
};