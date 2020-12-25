import React, { FunctionComponent, useState, Dispatch, SetStateAction } from 'react';

interface IProps {
    lastId: number
    toggleForm: Dispatch<SetStateAction<boolean>>
    addItem: (id: number | string, name: string, age: string, phone: string, email: string) => void
}

export const NewTableForm: FunctionComponent<IProps> = ({ lastId, toggleForm, addItem }) => {
    const [id] = useState<number>(lastId + 1);
    const [name, changeName] = useState<string>('');
    const [age, changeAge] = useState<string>('');
    const [phone, changePhone] = useState<string>('');
    const [email, changeEmail] = useState<string>('');

    const formValidation = () => {
        const checkName = () => name.length > 2;
        const checkAge = () => !!age.length && typeof Number(age) === 'number';
        const checkPhone = () => {
            const phoneReg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
            return phoneReg.test(phone)
        }
        const emailCheck = () => {
            const emailReg = /^.+@.+\..{2,}$/
            return emailReg.test(email);
        }
        return checkName() && checkAge() && checkPhone() && emailCheck();
    }

    return <>
        <div className="form-wrapper">
            <form className="new-item-form">
                <input onChange={(e) => changeName(e.target.value)} placeholder="Name" value={name} type="text" />
                <input onChange={(e) => changeAge(e.target.value)} placeholder="Age" value={age} type="number" />
                <input onChange={(e) => changePhone(e.target.value)} placeholder="Phone" value={phone} type="text" />
                <input onChange={(e) => changeEmail(e.target.value)} placeholder="Email" value={email} type="email" />
                <div className="form-buttons">
                    <button onClick={() => toggleForm(false)}>Cancel</button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        addItem(id, name, age, phone, email);
                        toggleForm(false);
                    }} 
                    disabled={!formValidation()} style={!formValidation() ? { cursor: "not-allowed", background: "#ff8787" } : { cursor: "pointer" }} type="submit">Submit</button>
                </div>
            </form>
        </div>
        <div className="form-overlay" onClick={() => toggleForm(false)} />
    </>
}
