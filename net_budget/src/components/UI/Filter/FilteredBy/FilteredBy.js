import './FilteredBy.css';

const FilteredBy = (props) => {
    const { type } = props;
    return (
        <>
            <p className="filtered-by">{type}</p>
        </>
    );
}

export default FilteredBy;