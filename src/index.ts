import { doPost } from './main'

declare const global: any;

// GAS において doPost() は特別な関数なので、global の名前は doPost にしておく必要がある
global.doPost = doPost;