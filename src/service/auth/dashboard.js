import VerifyTemplate from "./api";
import QueryTemplate from "./queryTemplate";


const DashboardService = {
    async DahboardChart() {
        const response = await QueryTemplate.get("/dashboard");
        return response.data;
    },
}


export default DashboardService