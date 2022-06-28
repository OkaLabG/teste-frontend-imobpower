export class Api {

    public static async get(url): Promise<any> {
        var data = await fetch(url).then((res) => res.json())
        return data;
    }

}
