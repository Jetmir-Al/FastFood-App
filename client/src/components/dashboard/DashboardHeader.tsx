import type { IDashboardHeader } from "../../types/uiTypes";


const DashboardHeader = ({ tHeader1, tHeader2, tHeader3, tHeader4, tHeader5, tHeader6 }: IDashboardHeader) => {
    return (
        <thead>
            <tr>
                <th scope="col">{tHeader1}</th>
                <th scope="col">{tHeader2}</th>
                <th scope="col">{tHeader3}</th>
                <th scope="col">{tHeader4}</th>
                <th scope="col">{tHeader5}</th>
                <th scope="col">{tHeader6}</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
    );
}

export default DashboardHeader;