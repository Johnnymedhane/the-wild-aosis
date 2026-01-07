
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";






function CabinTable() {
  
// const {
//   isLoading,
 
//   data: cabins,
  
// } = useQuery({
//   queryKey: ['cabins'],
//   queryFn: getCabins,
// })

const {  isLoading, cabins } = useCabins();
const [searchParams] = useSearchParams();

if(isLoading)   return <Spinner />;

if(cabins.length === 0) return <Empty resourceName="cabins" />;

// 1 FILTER
const filterValue = searchParams.get("discount") || "All";

let filteredCabins;

if (filterValue === "With-discount") {
  filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
}

if (filterValue === "No-discount") {
  filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
}

if (filterValue === "All") {
  filteredCabins = cabins;
}

// 2 SORTING
const sortBy = searchParams.get("sortBy") || "startDate-asc";

const [sortField, direction] = sortBy.split("-");
const modifier = direction === "asc" ? 1 : -1;
const sortedCabins = filteredCabins.sort((a, b) => (a[sortField] - b[sortField]) * modifier);

  return (
    <Menus>
        <Table columns= "0.6fr 1.8fr 2.2fr 1fr 1fr 1fr" >
          <Table.Header role="row">
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>
          <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
          />
        </Table>
     </Menus>
  )
}

export default CabinTable
