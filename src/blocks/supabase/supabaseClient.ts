export interface ISupabaseClientMap {
  [key: string]: any;
}

export const supabaseClientInstances : ISupabaseClientMap = {};

export function getSupabaseClient(variable:any) : any {
  return supabaseClientInstances[variable];
}
