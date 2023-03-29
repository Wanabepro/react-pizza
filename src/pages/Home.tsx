import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/Skeleton";

import { ISort, setFilters } from "../redux/slices/filterSlice";
import { fetchItems } from "../redux/slices/pizzasSlice";
import { RootState } from "../redux/store";

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const order = useSelector((state: RootState) => state.filter.order);
    const categoryId = useSelector(
        (state: RootState) => state.filter.categoryId
    );
    const sortCategory = useSelector(
        (state: RootState) => state.filter.sortCategory
    );
    const items = useSelector((state: RootState) => state.pizzas.items);
    const status = useSelector((state: RootState) => state.pizzas.status);
    const searchValue = useSelector(
        (state: RootState) => state.filter.searchValue
    );

    const isSearch = useRef(false);

    const fetchPizzas = async (
        order: boolean,
        categoryId: number,
        sortProperty: string
    ) => {
        const sortOrder = order ? "desc" : "asc";

        dispatch(
            fetchItems({
                categoryId,
                sortProperty,
                sortOrder,
            })
        );
    };

    useEffect(() => {
        if (window.location.search) {
            const stringParams = qs.parse(window.location.search.substring(1));
            const params: {
                categoryId: number;
                order: boolean;
                sortCategory: ISort;
            } = {
                categoryId: Number(stringParams.categoryId),
                order: stringParams.order === "true" ? true : false,
                sortCategory: stringParams.sortCategory as unknown as ISort,
            };
            dispatch(setFilters(params));
            isSearch.current = true;
        }
    }, [dispatch]);

    useEffect(() => {
        if (!isSearch.current)
            fetchPizzas(order, categoryId, sortCategory.sortProperty);

        isSearch.current = false;
    }, [categoryId, sortCategory, order]);

    useEffect(() => {
        const queryString = qs.stringify({
            sortCategory,
            categoryId,
            order,
        });
        navigate(`?${queryString}`);
    }, [sortCategory, categoryId, order, navigate]);

    const skeletons = [...new Array(4)].map((_, ind) => <Skeleton key={ind} />);
    const pizzas = items
        .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((item) => <PizzaBlock key={item.id} {...item} />);

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories />
                <Sort />
            </div>

            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {status === "loading" && skeletons}
                {status === "success" && pizzas}
            </div>
            {status === "error" && <h2>Ошибка, не удалось загрузить пиццы</h2>}
        </div>
    );
};
