import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface MeditationSession {
    duration: bigint;
    sessionType: string;
    timestamp: Time;
}
export interface MoodEntry {
    note?: string;
    score: bigint;
    timestamp: Time;
}
export interface backendInterface {
    addAffirmation(affirmation: string): Promise<void>;
    addHealthTip(tip: string): Promise<void>;
    getMeditationHistory(): Promise<Array<MeditationSession>>;
    getMoodHistory(): Promise<Array<MoodEntry>>;
    getRandomAffirmation(): Promise<string | null>;
    getRandomHealthTip(): Promise<string | null>;
    getTotalMeditationMinutes(): Promise<bigint>;
    logMeditation(duration: bigint, sessionType: string): Promise<void>;
    logMood(score: bigint, note: string | null): Promise<void>;
}
