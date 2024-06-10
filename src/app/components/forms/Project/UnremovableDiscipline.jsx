function UnremovableDiscipline({ unremovableDisciplines }) {
    return (
        <div>
            <p>
                The below disciplines cannot be removed since they are already assigned to one or more phases:
            </p>
            <ol className="list-decimal px-4 my-4">
                {unremovableDisciplines.map((discipline, index) => (
                    <li key={index}>{discipline.discipline}</li>
                ))}
            </ol>
        </div>
    );
}

export default UnremovableDiscipline;