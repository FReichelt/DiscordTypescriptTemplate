import config from '../../data/config/config.json';
import { GuildDocument } from '../models/Guild';
import { MemberDocument } from '../models/Member';
import { UserDocument } from '../models/User';

export default interface IData {
    config?: typeof config;
    guild?: GuildDocument;
    member?: MemberDocument;
    user?: UserDocument;
}
