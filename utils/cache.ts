

export class Cache {
  public static keyValues: any = {};

  public static get<T>(key: string): T {
    return Cache.keyValues[key] || undefined;
  }

  public static set<T>(key: string, value: T): void {
    Cache.keyValues[key] = value;
  }
}