import clientApi from "./clientApi";
//import EmpolyeeRole from '../../constants/EmployeeRole'



export async function createAccount(coffeeShopId, values) {
 try {
      const response = await clientApi.post(`api/employees/`, {...values, coffeeShopId});

      return response;
    } catch (error) {
      console.log(error);
    }
}