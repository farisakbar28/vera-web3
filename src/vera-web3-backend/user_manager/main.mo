import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Map "mo:base/HashMap";
import Option "mo:base/Option";

actor {
  type UserRole = {
    #Admin;
    #VerifiedUser;
    #UnverifiedUser;
  };

  type UserProfile = {
    principal_id : Principal;
    role : UserRole;
    registered_at : Nat64;
  };

  var users : Map.HashMap<Principal, UserProfile> = Map.HashMap<Principal, UserProfile>(
    0,
    Principal.equal,
    Principal.hash
  );

  var authorized_admin_principal : ?Principal = null;

  public shared ({ caller }) func init_admin() : async () {
    if (authorized_admin_principal == null) {
      authorized_admin_principal := ?caller;
      Debug.print("Initial admin set to: " # debug_show(caller));
    } else {
      Debug.print("Admin already initialized. Cannot change.");
    };
  };

  private func assert_is_admin(caller : Principal) {
    switch (authorized_admin_principal) {
      case null {
        Debug.trap("Admin belum diinisialisasi.");
      };
      case (?admin) {
        if (caller != admin) {
          Debug.trap("Unauthorized: Only authorized admin can perform this action.");
        };
      };
    };
  };

  public shared ({ caller }) func register_user() : async UserProfile {
    switch (users.get(caller)) {
      case (?existing_user) {
        return existing_user;
      };
      case null {
        let new_user_profile : UserProfile = {
          principal_id = caller;
          role = #UnverifiedUser;
          registered_at = Nat64.fromIntWrap(Time.now());
        };
        users.put(caller, new_user_profile);
        return new_user_profile;
      };
    };
  };

  public shared ({ caller }) func set_user_role(principal_id : Principal, new_role : UserRole) : async ?UserProfile {
    assert_is_admin(caller);

    switch (users.get(principal_id)) {
      case null {
        return null;
      };
      case (?profile) {
        let updated = {
          principal_id = profile.principal_id;
          role = new_role;
          registered_at = profile.registered_at;
        };
        users.put(principal_id, updated);
        return ?updated;
      };
    };
  };

  public query func get_all_users() : async [UserProfile] {
    return Iter.toArray(users.vals());
  };

  // Tambahan: fungsi untuk mendapatkan profil user berdasarkan principal
  public query func get_user_profile(principal_id : Principal) : async ?UserProfile {
    return users.get(principal_id);
  };
}
