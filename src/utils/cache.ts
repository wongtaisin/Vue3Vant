// 定义存储类型接口
interface StorageType {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
}

// 创建通用缓存类
class Cache {
  private storage: StorageType;

  constructor(storage: StorageType) {
    this.storage = storage;
  }

  set(key: string, value: string): void {
    if (!this.storage || !key || !value) return;
    this.storage.setItem(key, value);
  }

  get(key: string): string | null {
    if (!this.storage || !key) return null;
    return this.storage.getItem(key);
  }

  setJSON<T>(key: string, value: T): void {
    if (!value) return;
    this.set(key, JSON.stringify(value));
  }

  getJSON<T>(key: string): T | null {
    const value = this.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    if (!this.storage || !key) return;
    this.storage.removeItem(key);
  }
}

// 创建会话存储和本地存储实例
const sessionCache = new Cache(sessionStorage);
const localCache = new Cache(localStorage);

export default {
  session: sessionCache, // 会话级缓存
  local: localCache // 本地缓存
}
