import { Elysia, t } from "elysia";
import { isAuthenticated } from "../../middleware/authen";


// เตรีัยมของ หั่นผัก validate ข้อมูล
// ลงกระทะ business logic
// ผัด ต่อ db
export const report = new Elysia()
    .use(isAuthenticated)
    .get("/get-report",
        async function SignInHttpHandler({
            set,
            customerDecrypt,
        }) {

            if (!customerDecrypt || !customerDecrypt.customerId) {
                set.status = 401
                return {
                    msg: "Unauthorized"
                }
            }

            

        },
    );
