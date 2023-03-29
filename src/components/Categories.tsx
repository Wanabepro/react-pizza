import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
];

export const Categories: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const categoryId = useSelector(
        (state: RootState) => state.filter.categoryId
    );

    return (
        <div className='categories'>
            <ul>
                {categories.map((category, ind) => {
                    return (
                        <li
                            key={ind}
                            className={categoryId === ind ? "active" : ""}
                            onClick={() => dispatch(setCategoryId(ind))}
                        >
                            {category}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});
