import React, { FunctionComponent, useState, useEffect } from 'react';
import { TableItem } from './TableItem';
import "./Table.scss";
import API from '../../api/queries';
import { toast } from 'react-toastify';
import { NewTableForm } from './newTableFrom';


export interface IDataItem {
    field: string,
    value: string,
    type: string
}

export const Table: FunctionComponent = () => {
    const [data, pushDataToState] = useState([]);
    const [newFormIsOpen, toggleForm] = useState<boolean>(false);
    const [lastId, setLastId] = useState<number>(0);

    useEffect(() => {
        API.getTableData().then(res => {
            pushDataToState(res);
            setLastId(res[res.length - 1][0].value)
        })
    }, []);

    const deleteItem = async (id: string | number) => {
        const res: any = await API.deleteTableItem(id);
        if (res.status === 200) {
            const newData = data.filter((item: IDataItem[]) => {
                return item[0].value !== id;
            })
            pushDataToState(newData);
            toast.success('Удалено');
        } else {
            toast.error("Ошибка");
            throw new Error();
        }
    }

    const editeItem = async (id: number | string, name: string, age: string, phone: string, email: string) => {
        const res: any = await API.editTableItem(id, name, age, phone, email);
        if (res.status === 200) {
            toast.success('Отредактировано')
        } else {
            toast.error("Ошибка");
            throw new Error();
        }
    }

    const addItem = async (id: number | string, name: string, age: string, phone: string, email: string) => {
        const res: any = await API.createTableItem(id, name, age, phone, email);
        if (res.status === 200) {
            const newData = [
                ...data,
                [
                    { field: "ID", value: id, type: "integer" },
                    { field: "Name", value: name, type: "string" },
                    { field: "Age", value: age, type: "integer" },
                    { field: "Phone", value: phone, type: "string" },
                    { field: "E-mail", value: email, type: "string" }
                ]
            ]
            //@ts-ignore
            pushDataToState(newData);
            toast.success('Создано');
        } else {
            toast.error("Ошибка");
            throw new Error();
        }
    }

    return <>
        <div className="table">
            <div className="table-row table-fields">
                <div className="table-cell small">ID</div>
                <div className="table-cell big">Name</div>
                <div className="table-cell small">Age</div>
                <div className="table-cell big">Phone</div>
                <div className="table-cell big">E-mail</div>
            </div>
            {!!data.length && data.map((item: IDataItem[]) => {
                return item.length && <TableItem
                    key={item[0].value}
                    item={item}
                    deleteItem={deleteItem}
                    editeItem={editeItem}
                />
            })}
            <span className="table-counter">Всего: {data.length}</span>
        </div>
        <button onClick={(e) => {
            e.preventDefault();
            toggleForm(true);
        }} className="add-new-item">+</button>
        {newFormIsOpen && <NewTableForm addItem={addItem} lastId={lastId} toggleForm={toggleForm} />}
    </>
}
