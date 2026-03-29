import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MeditationSession, MoodEntry } from "../backend.d";
import { useActor } from "./useActor";

export function useRandomAffirmation() {
  const { actor, isFetching } = useActor();
  return useQuery<string | null>({
    queryKey: ["affirmation"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRandomAffirmation();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRandomHealthTip() {
  const { actor, isFetching } = useActor();
  return useQuery<string | null>({
    queryKey: ["healthTip"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRandomHealthTip();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMeditationHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<MeditationSession[]>({
    queryKey: ["meditationHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMeditationHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTotalMeditationMinutes() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["totalMeditationMinutes"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getTotalMeditationMinutes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMoodHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<MoodEntry[]>({
    queryKey: ["moodHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMoodHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLogMeditation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      duration,
      sessionType,
    }: { duration: bigint; sessionType: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.logMeditation(duration, sessionType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meditationHistory"] });
      queryClient.invalidateQueries({ queryKey: ["totalMeditationMinutes"] });
    },
  });
}

export function useLogMood() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      score,
      note,
    }: { score: bigint; note: string | null }) => {
      if (!actor) throw new Error("No actor");
      return actor.logMood(score, note);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moodHistory"] });
    },
  });
}
