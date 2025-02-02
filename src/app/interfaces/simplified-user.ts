import { Emoji } from "./emoji";

export interface SimplifiedUser {
    avatar:      string;
    url:         string;
    name:        string;
    id:          string;
    remoteId?:   string;
    emojis?:     Emoji[]
}
