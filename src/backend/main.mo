import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

actor {
  type MoodEntry = {
    timestamp : Time.Time;
    score : Nat;
    note : ?Text;
  };

  module MoodEntry {
    public func compare(entry1 : MoodEntry, entry2 : MoodEntry) : Order.Order {
      Int.compare(entry2.timestamp, entry1.timestamp);
    };
  };

  type MeditationSession = {
    timestamp : Time.Time;
    duration : Nat;
    sessionType : Text;
  };

  module MeditationSession {
    public func compare(session1 : MeditationSession, session2 : MeditationSession) : Order.Order {
      Int.compare(session2.timestamp, session1.timestamp);
    };
  };

  let moodEntries = List.empty<MoodEntry>();
  let meditationSessions = List.empty<MeditationSession>();
  let affirmations = List.fromArray([
    "You are worthy of love and happiness.",
    "Every day is a new beginning.",
    "You have the strength to overcome challenges.",
    "Your thoughts create your reality.",
    "Take things one step at a time.",
  ]);
  let healthTips = List.fromArray([
    "Drink plenty of water.",
    "Take deep breaths during stressful times.",
    "Get enough sleep for a healthy mind.",
    "Practice mindfulness daily.",
    "Exercise regularly for mental clarity.",
  ]);

  public shared ({ caller }) func logMood(score : Nat, note : ?Text) : async () {
    if (score < 1 or score > 5) { Runtime.trap("Mood score must be between 1 and 5") };
    let entry : MoodEntry = {
      timestamp = Time.now();
      score;
      note;
    };
    moodEntries.add(entry);
  };

  public shared ({ caller }) func logMeditation(duration : Nat, sessionType : Text) : async () {
    let session : MeditationSession = {
      timestamp = Time.now();
      duration;
      sessionType;
    };
    meditationSessions.add(session);
  };

  public query ({ caller }) func getMoodHistory() : async [MoodEntry] {
    moodEntries.toArray().sort().sliceToArray(0, 30);
  };

  public query ({ caller }) func getMeditationHistory() : async [MeditationSession] {
    meditationSessions.toArray().sort().sliceToArray(0, 30);
  };

  public query ({ caller }) func getTotalMeditationMinutes() : async Nat {
    var total = 0;
    for (session in meditationSessions.values()) {
      total += session.duration;
    };
    total;
  };

  public query ({ caller }) func getRandomAffirmation() : async ?Text {
    let size = affirmations.size();
    if (size == 0) { return null };
    let index = Int.abs((Time.now() % size.toInt())) % size;
    ?affirmations.at(index);
  };

  public query ({ caller }) func getRandomHealthTip() : async ?Text {
    let size = healthTips.size();
    if (size == 0) { return null };
    let index = Int.abs((Time.now() % size.toInt())) % size;
    ?healthTips.at(index);
  };

  public shared ({ caller }) func addAffirmation(affirmation : Text) : async () {
    affirmations.add(affirmation);
  };

  public shared ({ caller }) func addHealthTip(tip : Text) : async () {
    healthTips.add(tip);
  };
};
