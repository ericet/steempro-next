export const RewardTypes: Payout[] = [
  { title: "Decline Payout", shortTitle: "Declined", payout: 0 },
  { title: "50% SBD / 50% SP", shortTitle: "50/50", payout: 50 },
  { title: "Power Up 100%", shortTitle: "100%", payout: 100 },
];

export const Minute = 1000 * 60;

export const AppLink = "https://www.steempro.com";

export const SignupLink = "https://signup.steemit.com/";
export const MObileAppLink =
  "https://play.google.com/store/apps/details?id=com.steempro.mobile";

export const GitHubLink = "https://github.com/faisalamin9696/steempro-next";
export const DiscordServerLink = "https://discord.gg/SXpWY8FGCB";
export const FeedBodyLength = 500;
export const FeedFetchLimit = 1000;

// export const isDev = false;

export var FeedLastScroll: { endPoint: string; items: number }[] = [];

export let CurrentSetting: Setting = {
  lang: { code: "en", title: "English" },
  nsfw: "Always warn",
  feedStyle: "list",
  rpc: "https://api.steemit.com",
  theme: "system",
  readMore: true,
  voteOptions: {
    remember: true,
    value: 100,
  },
  longPressVote: {
    enabled: false,
    usersList: [],
  },
};

export const WitnessAccount = "faisalamin";

export function updateCurrentSetting(setting: Setting) {
  CurrentSetting = setting;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// in ms
export const ViewCountTime = 10000;

export const DefaultNotificationFilters = {
  status: true,
  vote: {
    status: false,
    minRep: 25,
    minSp: 15,
    minVote: 0.001,
  },
  reply: {
    status: false,
    minRep: 25,
    minSp: 15,
  },
  follow: {
    status: false,
    minRep: 25,
    minSp: 0,
  },
  mention: {
    status: false,
    minRep: 25,
    minSp: 15,
  },
  resteem: {
    status: false,
    minRep: 25,
    minSp: 15,
  },
};

export const validProfileTabs = [
  "blog",
  "posts",
  "friends",
  "comments",
  "replies",
  "wallet",
  "notifications",
  "communities",
  "settings",
];
export const validBasicCats = ["trending", "created", "hot", "payout"];

export const validCats = validBasicCats.concat(["pinned", "about", "roles"]);

export const IntrestingList = [
  "faisalamin",
  "bountyking5",
  "steemchiller",
  "rme",
  "blacks",
  "the-gorilla",
  "justyy",
  "donekim",
  "upvu",
  "steempro.com",
  "blockseater",
  "ety001",
  "anpigon",
  "pennsif",
  // 'steemsports',
  // 'knozaki2015',
  // 'gavvet',
  // 'krnel',
  // 'papa-pepper',
  // 'ozchartart',
  // 'craig-grant',
  // 'ericvancewalton',
  // 'curie',
  // 'stellabelle',
  // 'doitvoluntarily',
  // 'sirwinchester',
  // 'sweetsssj',
  // 'kevinwong',
  // 'jrcornel',
  // 'thecryptofiend',
  // 'steemcleaners',
  // 'kingscrown',
  // 'opheliafu',
  // 'officialfuzzy',
  // 'steemtrail',
  // 'good-karma',
  // 'dollarvigilante',
  // 'sauravrungta',
  // 'chinadaily',
  // 'calaber24p',
  // 'kaylinart',
  // 'dantheman',
  // 'tuck-fheman',
  // 'mynameisbrian',
  // 'macksby',
  // 'hanshotfirst',
  // 'hilarski',
  // 'ats-david',
  // 'fyrstikken',
  // 'alexbeyman',
  // 'gringalicious',
  // 'donkeypong',
  // 'steempower',
  // 'marius19',
  // 'mindhunter',
  // 'the-alien',
  // 'kafkanarchy84',
  // 'dwinblood',
  // 'stephenkendal',
  // 'luzcypher',
  // 'pfunk',
  // 'oflyhigh',
  // 'dana-edwards',
  // 'cryptoctopus',
  // 'steemvoter',
  // 'myfirst',
  // 'elfkitchen',
  // 'barrydutton',
  // 'dragosroua',
  // 'jlufer',
  // 'acidyo',
  // 'timsaid',
  // 'timcliff',
  // 'lukestokes',
  // 'lily-da-vine',
  // 'meesterboom',
  // 'infovore',
  // 'klye',
  // 'charlieshrem',
  // 'rok-sivante',
  // 'ausbitbank',
  // 'everittdmickey',
  // 'homeartpictures',
  // 'birds90',
  // 'michelle.gent',
  // 'tamim',
  // 'clayop',
  // 'terrycraft',
  // 'b0y2k',
  // 'dragonslayer109',
  // 'heiditravels',
  // 'joseph',
  // 'ace108',
  // 'kus-knee',
  // 'gardenofeden',
  // 'cryptogee',
  // 'deanliu',
  // 'anwenbaumeister',
  // 'jamtaylor',
  // 'daveks',
  // 'masteryoda',
  // 'onceuponatime',
  // 'halo',
  // 'ash',
  // 'englishtchrivy',
  // 'penguinpablo',
  // 'yoonjang0707',
  // 'jerrybanfield',
  // 'cheetah',
  // 'bridgetbunchy',
  // 'gargon',
  // 'ocrdu',
  // 'nanzo-scoop',
  // 'surfermarly',
  // 'blockchainstudio',
  // 'steemfinex',
];
