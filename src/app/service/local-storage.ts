

export class LocalStorage {
    init(): Promise<void> {
        return Promise.resolve();
    }

    get(name: string): any {
    const value = localStorage.getItem(name);
        return JSON.parse(value);
    }

    add(name: string, values: any): Promise<any> {
        localStorage.setItem(name, JSON.stringify(values));
        return Promise.resolve();
    }

    update(name: string, values: any): Promise<any> {
        return this.add(name, values);
    }

    clear(key: string): Promise<any> {
        localStorage.removeItem(key);
        return Promise.resolve();
    }
}
