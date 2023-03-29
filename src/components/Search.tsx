import styles from "./Search.module.scss";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

export const Search: React.FC = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector(
        (state: RootState) => state.filter.searchValue
    );
    const inputRef = useRef<HTMLInputElement>(null);

    const onClearClick = () => {
        dispatch(setSearchValue(""));
        inputRef.current?.focus();
    };

    return (
        <div className={styles.input}>
            <svg className={styles.icon} viewBox='0 0 32 32'>
                <path
                    d='M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z'
                    id='XMLID_223_'
                />
            </svg>
            <input
                ref={inputRef}
                type='text'
                value={searchValue}
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
                placeholder='Поиск пиццы...'
            />
            {searchValue && (
                <svg
                    className={styles.closeIcon}
                    onClick={onClearClick}
                    viewBox='0 0 24 24'
                >
                    <g id='grid_system' />
                    <g id='_icons'>
                        <path d='M8.3,15.7C8.5,15.9,8.7,16,9,16s0.5-0.1,0.7-0.3l2.3-2.3l2.3,2.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l2.3-2.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L9.7,8.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l2.3,2.3l-2.3,2.3C7.9,14.7,7.9,15.3,8.3,15.7z' />
                        <path d='M12,21c5,0,9-4,9-9s-4-9-9-9s-9,4-9,9S7,21,12,21z M12,5c3.9,0,7,3.1,7,7s-3.1,7-7,7s-7-3.1-7-7S8.1,5,12,5z' />
                    </g>
                </svg>
            )}
        </div>
    );
};
