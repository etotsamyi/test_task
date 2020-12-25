import axios from 'axios';

export default class API {
    static getTableData = async () => {
        const res = await axios.get('https://frontend-test.netbox.ru/');
        return res.data
    }

    static deleteTableItem = async (id: number | string) => {
        try {
            const res = await axios.post(`https://frontend-test.netbox.ru?method=delete&id=${id.toString()}`);
            return res
        } catch (err) {
            console.log(err);
        }
    }

    static editTableItem = async (id: number | string, name: string, age: string, phone: string, email: string) => {
        try {
            const res = await axios.post(`https://frontend-test.netbox.ru?method=update&id=${id.toString()}&name=${name}&age=${age}&phone=${phone}&email=${email}`);
            return res
        } catch (err) {
            console.log(err);
        }
    }

    static createTableItem = async (id: number | string, name: string, age: string, phone: string, email: string) => {
        try {
            const res = await axios.post(`https://frontend-test.netbox.ru?method=update&id=${id.toString()}&name=${name}&age=${age}&phone=${phone}&email=${email}`);
            return res
        } catch (err) {
            console.log(err);
        }
    }
}
