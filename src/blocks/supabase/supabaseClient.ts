export interface SupabaseClientMap {
  [key: string]: any;
}

export const supabaseClientInstances : SupabaseClientMap = {};

export function getSupabaseClient(variable:any) : any {
  return supabaseClientInstances[variable];
}
