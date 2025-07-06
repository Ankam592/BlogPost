import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

const projectId = conf.appwriteProjectId;
const client = new Client().setEndpoint(conf.appwriteUrl)
    .setProject(projectId); // Your project ID

const account = new Account(client);
const createUser = async (email, password) => {
    try {
        let newUser = await account.create(ID.unique(), email, password);
        if (newUser) {

            await loginuser(email, password);
            return newUser;
        }
        else {
            return newUser;
        }

    }
    catch (error) {
        console.log(error);
    }
}


const loginuser = async (email, password) => {
    try {  
              const accout_det = await account.createEmailPasswordSession(email, password);
        return accout_det

    } catch (error) {
        console.log(error)

    }
}

const getCurrentUser = async () => {
    try {
        const usr = await account.get();
            if (usr) {
            return usr;
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error)
    }
}
const Logout = async () => {
    try {
        console.log('logout_in')
        await account.deleteSessions()

    } catch (error) {
        console.log("error", error)
    }
}



export { loginuser, Logout, createUser, getCurrentUser };
