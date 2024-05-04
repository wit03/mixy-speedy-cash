import { customAlphabet } from "nanoid"

export default function GenerateUniqueAccountId():string {
    const nanoid = customAlphabet(new Date().valueOf().toString(), 9)
    return nanoid()
}