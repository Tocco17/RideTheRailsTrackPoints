export default class LocalStorageUtility {
    public static playersKey = 'Players'
    public static roundKey = 'Round'
    
    static write = (key: string, object: any) => localStorage.setItem(key, JSON.stringify(object))    

    static read = (key: string) => JSON.parse(localStorage.getItem(key) as string)

}