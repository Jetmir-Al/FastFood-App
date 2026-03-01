import type { IDashboardHeader } from "../../types/uiTypes";


const DashboardHeader = ({ tHeader1, tHeader2, tHeader3, tHeader4, tHeader5, tHeader6 }: IDashboardHeader) => {
    return (
        <thead>
            <tr>
                <th>{tHeader1}</th>
                <th>{tHeader2}</th>
                <th>{tHeader3}</th>
                <th>{tHeader4}</th>
                <th>{tHeader5}</th>
                <th>{tHeader6}</th>
                <th>Actions</th>
            </tr>
        </thead>
    );
}

export default DashboardHeader;