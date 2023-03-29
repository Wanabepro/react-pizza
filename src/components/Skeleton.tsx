import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = () => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={466}
        viewBox='0 0 280 466'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
    >
        <circle cx='138' cy='131' r='120' />
        <rect x='1' y='267' rx='10' ry='10' width='280' height='30' />
        <rect x='1' y='316' rx='10' ry='10' width='280' height='90' />
        <rect x='126' y='419' rx='20' ry='20' width='150' height='45' />
        <rect x='9' y='429' rx='10' ry='10' width='91' height='25' />
    </ContentLoader>
);
