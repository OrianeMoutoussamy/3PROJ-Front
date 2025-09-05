export interface PlaylistPayload {
  name: string;
  channel: { id: number };
  videos?: number[];
}
