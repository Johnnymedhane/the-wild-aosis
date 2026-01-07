import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "All", label: "All" },
          { value: "With-discount", label: "With discount" },
          { value: "No-discount", label: "No discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "sort by name (A-Z)" },
          { value: "name-dsc", label: "sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "sort by Price (low first)" },
          { value: "regularPrice-dsc", label: "sort by Price (high first)" },
          { value: "maxCapacity-asc", label: "sort by Capacity (low first)" },
          { value: "maxCapacity-dsc", label: "sort by Capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
