import { useState, useEffect } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [Data, setData] = useState<Array<IItem>>([]);
    useEffect(() => {
        if (props.sorting === 'DESC')
            setData([...props.initialData].sort((a, b) => b.id - a.id));
        if (props.sorting === 'ASC')
            setData([...props.initialData].sort((a, b) => a.id - b.id));
    }, [props.initialData, props.sorting]);

    return (
        <>
            {Data.map((item) => {
                return <Elem key={item.id} item={item} />;
            })}
        </>
    );
}
function Elem(props: { item: IItem }) {
    const [value, setValue1] = useState(props.item.name);
    const [isEdit, setIsEdit] = useState(false);
    const [value2, setValue2] = useState(value);

    let element;

    if (!isEdit) {
        element = (
            <div key={props.item.id} onClick={() => setIsEdit(true)}>
                {value}
            </div>
        );
    } else {
        element = (
            <input
                key={props.item.id}
                value={value2}
                onKeyDown={(e) => {
                    if (e.keyCode == 13) {
                        setValue1(value2);
                        setIsEdit(false);
                    } else if (e.keyCode == 27) {
                        setValue2(value);
                        setIsEdit(false);
                    }
                }}
                onChange={(event) => setValue2(event.target.value)}
            />
        );
    }

    return element;
}
