import {
  CardHeading,
  CardList,
  EmojiSmile,
  Palette,
  QuestionCircle,
  Translate,
  Braces,
  Globe,
  ChatText,
} from 'react-bootstrap-icons'
import { getPreferredLanguage } from '../../config/language.mjs'

const createGenPrompt =
  ({
    message = '',
    isTranslation = false,
    targetLanguage = '',
    enableBidirectional = false,
    includeLanguagePrefix = false,
  }) =>
  async (selection) => {
    let preferredLanguage = targetLanguage

    if (!preferredLanguage) {
      preferredLanguage = await getPreferredLanguage()
    }

    let fullMessage = isTranslation
      ? `You are a professional translator. Translate the following text into ${preferredLanguage}, preserving meaning, tone, and formatting. Only provide the translated result.`
      : message
    if (enableBidirectional) {
      fullMessage += ` If the text is already in ${preferredLanguage}, translate it into English instead following the same requirements. Only provide the translated result.`
    }
    const prefix = includeLanguagePrefix ? `Reply in ${preferredLanguage}.` : ''
    return `${prefix}${fullMessage}:\n'''\n${selection}\n'''`
  }

export const config = {
  explain: {
    icon: <ChatText />,
    label: 'Explain',
    genPrompt: createGenPrompt({
      message:
        'You are an expert teacher. Explain the following content in simple terms and highlight the key points',
      includeLanguagePrefix: true,
    }),
  },
  translate: {
    icon: <Translate />,
    label: 'Translate',
    genPrompt: createGenPrompt({
      isTranslation: true,
    }),
  },
  translateToEn: {
    icon: <Globe />,
    label: 'Translate (To English)',
    genPrompt: createGenPrompt({
      isTranslation: true,
      targetLanguage: 'English',
    }),
  },
  translateToZh: {
    icon: <Globe />,
    label: 'Translate (To Chinese)',
    genPrompt: createGenPrompt({
      isTranslation: true,
      targetLanguage: 'Chinese',
    }),
  },
  translateBidi: {
    icon: <Globe />,
    label: 'Translate (Bidirectional)',
    genPrompt: createGenPrompt({
      isTranslation: true,
      enableBidirectional: true,
    }),
  },
  summary: {
    icon: <CardHeading />,
    label: 'Summary',
    genPrompt: createGenPrompt({
      message:
        'You are a professional summarizer. Summarize the following content in a few sentences, focusing on the key points',
      includeLanguagePrefix: true,
    }),
  },
  polish: {
    icon: <Palette />,
    label: 'Polish',
    genPrompt: createGenPrompt({
      message:
        'Act as a skilled editor. Correct grammar and word choice in the following text, improve readability and flow while preserving the original meaning, and return only the polished version',
    }),
  },
  sentiment: {
    icon: <EmojiSmile />,
    label: 'Sentiment Analysis',
    genPrompt: createGenPrompt({
      message:
        'You are an expert in sentiment analysis. Analyze the following content and provide a brief summary of the overall emotional tone, labeling it with a short descriptive word or phrase',
      includeLanguagePrefix: true,
    }),
  },
  divide: {
    icon: <CardList />,
    label: 'Divide Paragraphs',
    genPrompt: createGenPrompt({
      message:
        'You are a skilled editor. Divide the following text into clear, easy-to-read and easy-to-understand paragraphs',
    }),
  },
  code: {
    icon: <Braces />,
    label: 'Code Explain',
    genPrompt: createGenPrompt({
      message:
        'You are a senior software engineer and system architect. Break down the following code step by step, explain how each part works and why it was designed that way, note any potential issues, and summarize the overall purpose',
      includeLanguagePrefix: true,
    }),
  },
  ask: {
    icon: <QuestionCircle />,
    label: 'Ask',
    genPrompt: createGenPrompt({
      message:
        'Analyze the following content carefully and provide a concise answer or opinion with a short explanation',
      includeLanguagePrefix: true,
    }),
  },
        // Custom tools for content creation
  articleSummary: {
    icon: <CardHeading />,
    label: 'Article: Summary for Edu',
    genPrompt: createGenPrompt({
      message:
        'You are an expert content analyst. Create a structured educational summary of the following article with: 1) Main topic and key thesis, 2) Key points as bullet list, 3) Important concepts to explore further, 4) Potential lesson structure',
      includeLanguagePrefix: true,
    }),
  },
  videoScript: {
    icon: <ChatText />,
    label: 'Video: Generate Script',
    genPrompt: createGenPrompt({
      message:
        'You are a professional video scriptwriter. Transform the following content into an engaging video script with: 1) Hook (first 10 seconds), 2) Introduction, 3) Main content blocks with transitions, 4) Call to action. Include timing suggestions and visual cues',
      includeLanguagePrefix: true,
    }),
  },
  videoScenes: {
    icon: <CardList />,
    label: 'Video: Split into Scenes',
    genPrompt: createGenPrompt({
      message:
        'You are a video editor. Break down the following script into production scenes. For each scene provide: 1) Scene number and duration, 2) Visual description (what to show), 3) Narrator text, 4) B-roll suggestions',
      includeLanguagePrefix: true,
    }),
  },
  newsDigest: {
    icon: <CardHeading />,
    label: 'News: Create Digest',
    genPrompt: createGenPrompt({
      message:
        'You are a news analyst. Create a structured digest from the following news items: 1) Main trends and themes, 2) Most important developments by topic, 3) What matters for aviation/logistics/tech industries, 4) Summary in 2-3 sentences',
      includeLanguagePrefix: true,
    }),
  },
  newsToVideo: {
    icon: <ChatText />,
    label: 'News: Convert to Video Script',
    genPrompt: createGenPrompt({
      message:
        'You are a news video producer. Convert the following news into a short video script (2-3 minutes) with: 1) Catchy opening hook, 2) Key facts presented clearly, 3) Why it matters, 4) Closing summary. Keep it dynamic and engaging',
      includeLanguagePrefix: true,
    }),
  },
}
