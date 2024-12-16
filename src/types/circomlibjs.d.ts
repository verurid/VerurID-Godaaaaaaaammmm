declare module 'circomlibjs' {
  export function buildPoseidon(): Promise<{
    F: any;
    hash: (inputs: any[]) => Uint8Array;
  }>;
}