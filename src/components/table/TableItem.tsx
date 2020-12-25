import React, { FunctionComponent, useState } from 'react';
import { CancelIcon } from './icons/cancelIcon';
import { DeleteIcon } from './icons/deleteIcon';
import { EditIcon } from './icons/editIcon';
import { SaveIcon } from './icons/saveIcon';
import { IDataItem } from './Table';

interface IProps {
    item: IDataItem[],
    deleteItem: (id: string | number) => void
    editeItem: (id: number | string, name: string, age: string, phone: string, email: string) => void
}

export const TableItem: FunctionComponent<IProps> = ({ item, deleteItem, editeItem }) => {

    const [isEditMode, changeMode] = useState<boolean>(false);
    const [id] = useState(item[0].value);
    const [name, changeName] = useState(item[1].value);
    const [age, changeAge] = useState(item[2].value);
    const [phone, changePhone] = useState(item[3].value);
    const [email, changeEmail] = useState(item[4].value);

    return <div className="table-wrapper">
        {!isEditMode ? <>
            <div className="table-row">
                <div className="table-cell small">{id}</div>
                <div className="table-cell big">{name.length > 25 ? name.substr(0, 25) + '...' : name}</div>
                <div className="table-cell small">{age}</div>
                <div className="table-cell big">{phone}</div>
                <div className="table-cell big">{email.length > 25 ? email.substr(0, 25) + '...' : email}</div>
            </div>
            <div className="buttons">
                <span onClick={() => deleteItem(item[0].value)}><DeleteIcon /></span>
                <span onClick={() => changeMode(true)}><EditIcon /></span>
            </div>
        </> : <>
                <div className="table-row">
                    <div className="table-cell small">{item[0].value}</div>
                    <div className="table-cell big"><input onChange={(e) => changeName(e.target.value)} value={name} type="text" /></div>
                    <div className="table-cell small"><input onChange={(e) => changeAge(e.target.value)} value={age} type="text" /></div>
                    <div className="table-cell big"><input onChange={(e) => changePhone(e.target.value)} value={phone} type="text" /></div>
                    <div className="table-cell big"><input onChange={(e) => changeEmail(e.target.value)} value={email} type="text" /></div>
                </div>
                <div className="buttons">
                    <span onClick={() => {
                        editeItem(id, name, age, phone, email);
                        changeMode(false);
                    }}><SaveIcon /></span>
                    <span onClick={() => {
                        changeName(item[1].value);
                        changeAge(item[2].value);
                        changePhone(item[3].value);
                        changeEmail(item[4].value);
                        changeMode(false);
                    }}><CancelIcon /></span>
                </div>
            </>}
    </div>
}
