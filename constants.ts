import { CharacterId, Character, StoryNode } from './types';

// Core Art Style Prompt - Enforced on all generations
export const STYLE_PROMPT = "Japanese Celluloid Anime Style (赛洛鲁/平涂), masterpiece, flat color, high contrast, 90s anime aesthetic, neon genesis evangelion art style, retro anime screenshot, grain, dvd quality";

export const CHARACTERS: Record<CharacterId, Character> = {
  [CharacterId.SHINJI]: {
    id: CharacterId.SHINJI,
    name: "碇 真嗣",
    visualPrompt: "Shinji Ikari, teenage boy, short brown hair, white short-sleeved dress shirt, black trousers, slender build",
    avatarStatic: "https://upload.wikimedia.org/wikipedia/en/6/67/Shinji_Ikari.png", // Placeholder until generated
    voicePitch: 1.0,
    voiceRate: 0.9,
    themeColor: "cyan-400"
  },
  [CharacterId.ASUKA]: {
    id: CharacterId.ASUKA,
    name: "惣流·明日香·兰格雷",
    visualPrompt: "Asuka Langley Soryu, teenage girl, long orange twin-tails, red interface headset clips, school uniform, white shirt with red ribbon, blue jumper dress",
    avatarStatic: "https://upload.wikimedia.org/wikipedia/en/2/28/Asuka_Langley_Soryu.png",
    voicePitch: 1.2,
    voiceRate: 1.15,
    themeColor: "red-500"
  },
  [CharacterId.REI]: {
    id: CharacterId.REI,
    name: "绫波 丽",
    visualPrompt: "Rei Ayanami, teenage girl, short pale blue hair, red eyes, school uniform, white shirt, blue jumper dress, bandaged arm",
    avatarStatic: "",
    voicePitch: 1.1,
    voiceRate: 0.75,
    themeColor: "blue-300"
  },
  [CharacterId.KAWORU]: {
    id: CharacterId.KAWORU,
    name: "渚 薰",
    visualPrompt: "Kaworu Nagisa, teenage boy, grey hair, red eyes, school uniform, white shirt, black trousers",
    avatarStatic: "",
    voicePitch: 0.9,
    voiceRate: 0.85,
    themeColor: "purple-400"
  },
  [CharacterId.TOJI]: {
    id: CharacterId.TOJI,
    name: "铃原 冬二",
    visualPrompt: "Toji Suzuhara, teenage boy, black track suit, short black hair",
    avatarStatic: "",
    voicePitch: 0.8,
    voiceRate: 1.0,
    themeColor: "stone-400"
  },
  [CharacterId.KENSUKE]: {
    id: CharacterId.KENSUKE,
    name: "相田 剑介",
    visualPrompt: "Kensuke Aida, teenage boy, glasses, camping gear, school uniform",
    avatarStatic: "",
    voicePitch: 1.0,
    voiceRate: 1.1,
    themeColor: "yellow-600"
  },
  [CharacterId.NARRATOR]: {
    id: CharacterId.NARRATOR,
    name: "SYSTEM",
    visualPrompt: "",
    avatarStatic: "",
    voicePitch: 0.7,
    voiceRate: 1.0,
    themeColor: "gray-500"
  },
  [CharacterId.UNKNOWN]: {
    id: CharacterId.UNKNOWN,
    name: "???",
    visualPrompt: "",
    avatarStatic: "",
    voicePitch: 1.0,
    voiceRate: 1.0,
    themeColor: "gray-500"
  },
};

export const STORY_SCRIPT: StoryNode[] = [
  {
    id: 1,
    speakerId: CharacterId.NARRATOR,
    text: "碇真嗣在抽屉里发现了一盒巧克力，长方形的盒子，里头划分成十二个小个子，装着十二枚长相别致的黑巧克力。",
    locationPrompt: "empty classroom, sunset, golden hour, lens flare, highly detailed desk, open drawer with yellow chocolate box",
    characterVisible: CharacterId.SHINJI,
    characterEmotion: "surprised, looking down"
  },
  {
    id: 2,
    speakerId: CharacterId.NARRATOR,
    text: "没有商业包装，只有红色的束带包着质朴的黄色盒子。他看完之后就立刻把巧克力推进书桌深处，假装无事发生。",
    locationPrompt: "empty classroom, sunset, golden hour",
    characterVisible: CharacterId.SHINJI,
    characterEmotion: "nervous, sweating, hiding something"
  },
  {
    id: 3,
    speakerId: CharacterId.ASUKA,
    text: "喂！笨蛋真嗣！你在那里磨磨蹭蹭干什么？",
    locationPrompt: "classroom door, sunset, silhouette",
    characterVisible: CharacterId.ASUKA,
    characterEmotion: "angry, hands on hips, standing in doorway"
  },
  {
    id: 4,
    speakerId: CharacterId.SHINJI,
    text: "啊……明日香。那个，你最近有没有去过厨房？",
    locationPrompt: "classroom, sunset",
    characterVisible: CharacterId.SHINJI,
    characterEmotion: "shy, averting eyes"
  },
  {
    id: 5,
    speakerId: CharacterId.ASUKA,
    text: "白痴！我没事去那种满是油烟的地方干什么？快点走啦！",
    locationPrompt: "classroom, sunset",
    characterVisible: CharacterId.ASUKA,
    characterEmotion: "mocking, annoyed"
  },
  {
    id: 6,
    speakerId: CharacterId.NARRATOR,
    text: "真嗣从没有在情人节接受过巧克力。驾驶员的身份，加上初号机暴走撕裂使徒的往事，让他像被挤干水分的毛巾一样干瘪。",
    locationPrompt: "dark psychological abstract background, geometric shapes, eva unit 01 silhouette, eerie red light",
    characterVisible: CharacterId.SHINJI,
    characterEmotion: "depressed, dark shadows over eyes"
  },
  {
    id: 7,
    speakerId: CharacterId.SHINJI,
    text: "“保持交流。平和。耐心。”……心理医生是这么说的。只要不被点燃导火索，我就不会爆炸。",
    locationPrompt: "dark psychological abstract background",
    characterVisible: CharacterId.SHINJI,
    characterEmotion: "empty expression, dead eyes"
  },
  {
    id: 8,
    speakerId: CharacterId.NARRATOR,
    text: "但他确实收到了一盒巧克力。为了搞清楚是谁，他去问了冬治。",
    locationPrompt: "school hallway, lockers, daylight",
    characterVisible: CharacterId.TOJI,
    characterEmotion: "embarrassed, scratching head"
  },
  {
    id: 9,
    speakerId: CharacterId.TOJI,
    text: "上次班长送了我一盒巧克力。所以这次我也送了她一盒。不过你别误会，只是回礼。我和她没有那个什么！",
    locationPrompt: "school hallway, lockers",
    characterVisible: CharacterId.TOJI,
    characterEmotion: "blushing, defensive, waving hands"
  },
  {
    id: 10,
    speakerId: CharacterId.KENSUKE,
    text: "呵呵，碇同学，你什么时候才能学会不要明知故问。尽管嘲笑我吧，你这个幸运狗。",
    locationPrompt: "school hallway, lockers",
    characterVisible: CharacterId.KENSUKE,
    characterEmotion: "adjusting glasses, smug but sad"
  },
  {
    id: 11,
    speakerId: CharacterId.NARRATOR,
    text: "中午的时候，真嗣在天台找到吃饭的绫波丽和渚薰。他们两个似乎在……交往？",
    locationPrompt: "school rooftop, blue sky, chain link fence, clouds",
    characterVisible: CharacterId.KAWORU,
    characterEmotion: "sitting, smiling gently"
  },
  {
    id: 12,
    speakerId: CharacterId.KAWORU,
    text: "那么，我亲爱的朋友……你是因为收到了巧克力，才来问是不是我们中的一个送的吗？",
    locationPrompt: "school rooftop, blue sky, wind blowing",
    characterVisible: CharacterId.KAWORU,
    characterEmotion: "mysterious smile, looking at viewer"
  },
  {
    id: 13,
    speakerId: CharacterId.SHINJI,
    text: "嗯……",
    locationPrompt: "school rooftop, blue sky",
    characterVisible: CharacterId.SHINJI,
    characterEmotion: "awkward"
  },
  {
    id: 14,
    speakerId: CharacterId.KAWORU,
    text: "很高兴能受到你的怀疑，遗憾的是，我们约好了情人节只给对方送礼物。",
    locationPrompt: "school rooftop, blue sky",
    characterVisible: CharacterId.REI,
    characterEmotion: "eating bento, neutral"
  },
  {
    id: 15,
    speakerId: CharacterId.KAWORU,
    text: "凭直觉来看，你认为会是谁呢？",
    locationPrompt: "school rooftop, blue sky",
    characterVisible: CharacterId.KAWORU,
    characterEmotion: "curious"
  },
  {
    id: 16,
    speakerId: CharacterId.SHINJI,
    text: "但是不可能。她不做饭，我已经问过了。",
    locationPrompt: "school rooftop, blue sky",
    characterVisible: CharacterId.SHINJI,
    characterEmotion: "thinking, conflicted"
  },
  {
    id: 17,
    speakerId: CharacterId.REI,
    text: "她经常撒谎。你知道的。",
    locationPrompt: "school rooftop, blue sky, close up on rei",
    characterVisible: CharacterId.REI,
    characterEmotion: "looking sideways, calm"
  },
  {
    id: 18,
    speakerId: CharacterId.NARRATOR,
    text: "放学后，明日香在鞋柜里发现了一篓子的巧克力。她本来想把它们全扔了。",
    locationPrompt: "school entrance, shoe lockers, evening sunset, deep orange light",
    characterVisible: CharacterId.ASUKA,
    characterEmotion: "annoyed, holding a plastic bag"
  },
  {
    id: 19,
    speakerId: CharacterId.ASUKA,
    text: "喂！真嗣！你给我站住！",
    locationPrompt: "street, evening, power lines, utility poles, sunset",
    characterVisible: CharacterId.ASUKA,
    characterEmotion: "shouting, angry face"
  },
  {
    id: 20,
    speakerId: CharacterId.SHINJI,
    text: "有何贵干？",
    locationPrompt: "street, evening",
    characterVisible: CharacterId.SHINJI,
    characterEmotion: "startled, turning around"
  },
  {
    id: 21,
    speakerId: CharacterId.ASUKA,
    text: "你问我？！看看，这一袋子的巧克力！好歹帮我分担一点吧！",
    locationPrompt: "street, evening",
    characterVisible: CharacterId.ASUKA,
    characterEmotion: "thrusting bag forward, pouting"
  },
  {
    id: 22,
    speakerId: CharacterId.NARRATOR,
    text: "真嗣伸出手，拎起袋子的一边。他们就这样平行地往家走去。",
    locationPrompt: "street, evening, long shadows of two people walking",
    characterVisible: undefined
  },
  {
    id: 23,
    speakerId: CharacterId.SHINJI,
    text: "那个，明日香，你真没去过厨房？",
    locationPrompt: "street, evening",
    characterVisible: CharacterId.SHINJI,
    characterEmotion: "hopeful but hesitant"
  },
  {
    id: 24,
    speakerId: CharacterId.ASUKA,
    text: "哈？我去做什么？……不过，我昨天倒是去了小光家。",
    locationPrompt: "street, evening",
    characterVisible: CharacterId.ASUKA,
    characterEmotion: "blushing intensely, looking away"
  },
  {
    id: 25,
    speakerId: CharacterId.NARRATOR,
    text: "真嗣抬头，一道波澜泛过他湖水般的眼睛。明日香踉跄一下，袋子一抖。",
    locationPrompt: "street, evening, close up on eyes",
    characterVisible: CharacterId.SHINJI,
    characterEmotion: "wide eyes, realization"
  },
  {
    id: 26,
    speakerId: CharacterId.SHINJI,
    text: "那你有看过这个袋子里的巧克力吗？",
    locationPrompt: "street, evening",
    characterVisible: CharacterId.SHINJI,
    characterEmotion: "gentle smile"
  },
  {
    id: 27,
    speakerId: CharacterId.ASUKA,
    text: "没有。",
    locationPrompt: "street, evening",
    characterVisible: CharacterId.ASUKA,
    characterEmotion: "frozen, surprised"
  },
  {
    id: 28,
    speakerId: CharacterId.NARRATOR,
    text: "她愣住了，想到自己往袋子里装巧克力的时候，里面有一个是手工制作的。",
    locationPrompt: "flashback to shoe locker, one specific yellow box among others",
    characterVisible: CharacterId.ASUKA,
    characterEmotion: "panicked, blushing"
  },
  {
    id: 29,
    speakerId: CharacterId.SHINJI,
    text: "呃……你可以回家再看看。",
    locationPrompt: "street, evening",
    characterVisible: CharacterId.SHINJI,
    characterEmotion: "blushing, smiling awkward"
  },
  {
    id: 30,
    speakerId: CharacterId.NARRATOR,
    text: "他红着脸，把袋子往前一拉，拉得明日香不得不跟着他走。",
    locationPrompt: "street, evening, silhouettes walking into the distance",
    characterVisible: undefined
  }
];
