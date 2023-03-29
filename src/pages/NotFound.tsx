import styles from "./NotFound.module.scss";

export const NotFound = () => {
    return (
        <h1 className={styles.heading}>
            😞
            <br />
            Ничего не найдено
        </h1>
    );
};
