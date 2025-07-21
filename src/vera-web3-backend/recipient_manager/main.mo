import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import TrieMap "mo:base/TrieMap";
import Int "mo:base/Int";

import UserManagerActor "canister:user_manager";

actor RecipientManager {

  // Tipe actor yang diimpor dari canister user_manager
  type UserManagerActor = actor {
    getPrincipalById : (Nat) -> async ?Principal;
  };

  // Tipe data penerima
  type Recipient = {
    id : Nat;
    name : Text;
    wallet : Text;
    userId : Nat;
  };

  // Penyimpanan data penerima
  var recipients = TrieMap.TrieMap<Nat, Recipient>(Nat.equal, Int.hash); // Ganti hash function-nya
  var currentId : Nat = 0;
  var user_manager_canister : ?UserManagerActor = null;

  // Mengatur actor user_manager (bisa diset dari luar)
  public func setUserManagerCanister(canister : UserManagerActor) : async () {
    user_manager_canister := ?canister;
  };

  // Menambahkan penerima baru
  public func addRecipient(name : Text, wallet : Text, userId : Nat) : async Nat {
    let id = currentId;
    let recipient : Recipient = {
      id = id;
      name = name;
      wallet = wallet;
      userId = userId;
    };
    recipients.put(id, recipient);
    currentId += 1;
    return id;
  };

  // Mengambil semua data penerima
  public query func getRecipients() : async [Recipient] {
    Iter.toArray(recipients.vals()); // ← Ganti .values() menjadi .vals()
  };

  // Mengambil principal dari userId melalui user_manager
  public func getUserPrincipal(userId : Nat) : async ?Principal {
    switch (user_manager_canister) {
      case null { return null };
      case (?canister) {
        let principal = await canister.getPrincipalById(userId);
        return principal;
      };
    };
  };
};
